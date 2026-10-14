/**
 * Converts the client's original photos into web-sized WebP files under
 * public/images/ and writes src/content/works.generated.ts.
 *
 *   node scripts/optimize-works.mjs "C:\path\to\works"
 *
 * What goes where (and the captions) lives in scripts/works.config.mjs.
 */
import sharp from "sharp";
import { mkdirSync, readdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as cfg from "./works.config.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const WORKS = process.argv[2];
if (!WORKS || !existsSync(WORKS)) {
  console.error("Usage: node scripts/optimize-works.mjs <works folder>");
  process.exit(1);
}

const IMG = /\.(jpe?g|png|webp)$/i;
/** Faces sit in the upper third of almost every portrait here. */
const DEFAULT_FOCUS = "50% 20%";
const CARD = { width: 960, height: 1440 };
const QUALITY = 78;

const WATERMARK = {
  file: join(PUBLIC, "images/watermark/logo transparant.png"),
  /** Logo width as a share of the photo's shorter side. */
  width: 0.46,
  /** Vertical centre of the logo — below faces, above most caption overlays. */
  y: 0.68,
  opacity: 0.45,
  shadowOpacity: 0.4,
};

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const hex = ({ r, g, b }) =>
  "#" +
  [r, g, b]
    .map((v) => Math.round(v).toString(16).padStart(2, "0"))
    .join("");

/**
 * Signature colour for wheel dots: the most vivid pixels from the middle of
 * the frame (the outfit), so dark studio backgrounds don't win.
 */
async function accentColor(buf, w, h) {
  const { data } = await sharp(buf)
    .extract({
      left: Math.round(w * 0.2),
      top: Math.round(h * 0.25),
      width: Math.round(w * 0.6),
      height: Math.round(h * 0.6),
    })
    .resize(24, 24, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const px = [];
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    px.push({ r, g, b, score: sat * (max / 255) });
  }
  px.sort((a, b) => b.score - a.score);
  const top = px.slice(0, Math.max(1, Math.round(px.length * 0.15)));
  const sum = top.reduce(
    (s, p) => ({ r: s.r + p.r, g: s.g + p.g, b: s.b + p.b }),
    { r: 0, g: 0, b: 0 }
  );
  return hex({
    r: sum.r / top.length,
    g: sum.g / top.length,
    b: sum.b / top.length,
  });
}

/** Logo cropped to its visible pixels — the source PNG has wide empty margins. */
const watermarkLogo = await sharp(WATERMARK.file).ensureAlpha().trim().png().toBuffer();

/** Scales the alpha channel of an RGBA buffer and paints every pixel one colour. */
async function tint(png, rgb, opacity) {
  const { data, info } = await sharp(png)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    data[i] = rgb[0];
    data[i + 1] = rgb[1];
    data[i + 2] = rgb[2];
    data[i + 3] = Math.round(data[i + 3] * opacity);
  }
  return sharp(data, { raw: info }).png().toBuffer();
}

/** Composite layers for a soft-shadowed logo baked into a w×h photo. */
async function watermarkLayers(w, h) {
  const logoW = Math.round(Math.min(w, h) * WATERMARK.width);
  const logo = await sharp(watermarkLogo).resize({ width: logoW }).png().toBuffer();
  const { height: logoH } = await sharp(logo).metadata();
  const blur = Math.max(2, Math.round(logoW / 120));
  const pad = blur * 3;
  const shadow = await sharp(await tint(logo, [0, 0, 0], WATERMARK.shadowOpacity))
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .blur(blur)
    .png()
    .toBuffer();
  const left = Math.round((w - logoW) / 2);
  const top = Math.min(h - logoH - 4, Math.round(h * WATERMARK.y - logoH / 2));
  return [
    { input: shadow, left: left - pad, top: top - pad + 1 },
    { input: await tint(logo, [255, 255, 255], WATERMARK.opacity), left, top },
  ];
}

/** Removes webp files this script generated earlier (READMEs stay). */
function resetDir(rel) {
  const dir = join(PUBLIC, rel);
  mkdirSync(dir, { recursive: true });
  for (const f of readdirSync(dir)) {
    if (f.endsWith(".webp")) rmSync(join(dir, f));
  }
}

async function convert(srcRel, outRel, box = CARD) {
  const input = join(WORKS, srcRel);
  const { data: resized, info } = await sharp(input, { failOn: "none" })
    .rotate()
    .resize({ ...box, fit: "inside", withoutEnlargement: true })
    .png()
    .toBuffer({ resolveWithObject: true });
  const data = await sharp(resized)
    .composite(await watermarkLayers(info.width, info.height))
    .webp({ quality: QUALITY, effort: 5 })
    .toBuffer();
  writeFileSync(join(PUBLIC, outRel), data);
  return {
    src: "/" + outRel.replace(/\\/g, "/"),
    w: info.width,
    h: info.height,
    color: await accentColor(resized, info.width, info.height),
    kb: Math.round(data.length / 1024),
  };
}

async function captioned(section, outDir) {
  resetDir(`images/${outDir}`);
  const out = [];
  for (const [file, label, tag, focus] of section.items) {
    const name = `${outDir}/${slug(label)}.webp`;
    const img = await convert(`${section.dir}/${file}`, `images/${name}`);
    out.push({ ...img, label, tag, focus: focus ?? DEFAULT_FOCUS });
    console.log(`  ${img.src}  ${img.w}x${img.h}  ${img.kb}KB`);
  }
  return out;
}

async function gallery() {
  const result = {};
  for (const [slot, { dir, files, focus = {} }] of Object.entries(
    cfg.GALLERY_SLOTS
  )) {
    const outDir = `gallery/${slot}`;
    resetDir(`images/${outDir}`);
    const list =
      files === "*"
        ? readdirSync(join(WORKS, dir)).filter((f) => IMG.test(f)).sort()
        : files;
    result[slot] = [];
    for (const [i, file] of list.entries()) {
      const name = `images/${outDir}/${String(i + 1).padStart(2, "0")}.webp`;
      const img = await convert(`${dir}/${file}`, name);
      result[slot].push({ src: img.src, focus: focus[file] ?? DEFAULT_FOCUS });
    }
    console.log(`  ${outDir}: ${list.length} photos`);
  }
  return result;
}

console.log("hero / about");
resetDir("images/hero");
resetDir("images/about");
const heroSrc = `${cfg.HERO.dir}/${cfg.HERO.file}`;
const hero = await convert(heroSrc, "images/hero/bride.webp", {
  width: 1400,
  height: 1900,
});
const heroSmall = await convert(heroSrc, "images/hero/bride-800.webp", {
  width: 800,
  height: 1100,
});
const about = await convert(
  `${cfg.ABOUT_PHOTO.dir}/${cfg.ABOUT_PHOTO.file}`,
  "images/about/artist-at-work.webp",
  { width: 900, height: 1300 }
);

console.log("bridal");
const bridal = await captioned(cfg.BRIDAL, "bridal");
console.log("hair");
const hair = await captioned(cfg.HAIR_STYLES, "hair");
console.log("recent work");
const work = await captioned(cfg.RECENT_WORK, "work");
console.log("signature");
const signature = await captioned(cfg.SIGNATURE_WORK, "signature");
console.log("gallery");
const slots = await gallery();

const strip = ({ kb, ...rest }) => rest;
const ts = `// Generated by scripts/optimize-works.mjs — edit scripts/works.config.mjs instead.

export type WorkPhoto = {
  src: string;
  w: number;
  h: number;
  label: string;
  tag: string;
  /** Dominant colour — used for wheel dots and loading backgrounds. */
  color: string;
  /** CSS object-position that keeps the face in frame. */
  focus: string;
};

export type SlotPhoto = { src: string; focus: string };

export const HERO_PHOTO = {
  src: ${JSON.stringify(hero.src)},
  srcSet: ${JSON.stringify(`${heroSmall.src} ${heroSmall.w}w, ${hero.src} ${hero.w}w`)},
};

export const ABOUT_PHOTO = { src: ${JSON.stringify(about.src)} };

export const BRIDAL_PHOTOS: WorkPhoto[] = ${JSON.stringify(bridal.map(strip), null, 2)};

export const HAIR_PHOTOS: WorkPhoto[] = ${JSON.stringify(hair.map(strip), null, 2)};

export const WORK_PHOTOS: WorkPhoto[] = ${JSON.stringify(work.map(strip), null, 2)};

export const SIGNATURE_PHOTOS: WorkPhoto[] = ${JSON.stringify(signature.map(strip), null, 2)};

export const GALLERY_PHOTOS: Record<string, SlotPhoto[]> = ${JSON.stringify(slots, null, 2)};
`;
writeFileSync(join(ROOT, "src/content/works.generated.ts"), ts);
console.log("wrote src/content/works.generated.ts");
