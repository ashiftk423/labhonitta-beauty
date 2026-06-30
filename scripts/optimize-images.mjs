// Converts the large character PNGs in public/images into optimized WebP.
// Run with: node scripts/optimize-images.mjs
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const dir = join(process.cwd(), "public", "images");
const files = await readdir(dir);

for (const file of files) {
  if (extname(file).toLowerCase() !== ".png") continue;
  const input = join(dir, file);
  const output = join(dir, `${basename(file, ".png")}.webp`);
  await sharp(input)
    .resize({ width: 1024, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(output);
  const before = (await stat(input)).size;
  const after = (await stat(output)).size;
  console.log(
    `${file}: ${(before / 1024).toFixed(0)}KB -> ${basename(output)}: ${(after / 1024).toFixed(0)}KB`
  );
}
console.log("Done.");
