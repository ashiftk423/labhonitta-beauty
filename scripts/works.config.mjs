/**
 * Which real photo goes where on the site.
 *
 * `dir` is relative to the works folder passed to optimize-works.mjs.
 * List order = display order. Add a new photo by appending an entry and
 * re-running:  node scripts/optimize-works.mjs "<works folder>"
 */

const BRIDES = "brides-20261012T061348Z-1-001/brides";
const HAIR = "hair studio -20261012T061350Z-1-001/hair studio";
const RECENT = "recent works-20261012T061352Z-1-001/recent works";
const GALLERY = "gallery -20261012T061348Z-1-001/gallery";
const SIGNATURE =
  "signature ( with manju maam and other celibrities )-20261012T061354Z-1-001/signature ( with manju maam and other celibrities )";
const ABOUT =
  "about ( cards and hookable images )-20261012T144616Z-1-001/about ( cards and hookable images )";

export const HERO = {
  dir: BRIDES,
  file: "Untitled design_20261010_121119_0000.png",
};

export const ABOUT_PHOTO = {
  dir: ABOUT,
  file: "file_00000000dcc081f492a464ed1b5f3c71.png",
};

export const BRIDAL = {
  dir: BRIDES,
  items: [
    ["Untitled design_20261010_121119_0000.png", "Heritage Gold Bride", "Kanjeevaram Bridal"],
    ["IMG-20250927-WA0033.jpg", "Rose Gold Glow", "HD Bridal Makeup"],
    ["Untitled design_20261010_121304_0000.png", "Temple Jewel Bride", "Traditional Bridal"],
    ["IMG-20250927-WA0038(1).jpg", "Crimson Silk Bride", "Traditional Bridal"],
    ["IMG-20260422-WA0025.jpg", "Emerald Grace", "Bridal Makeup"],
    ["IMG-20260610-WA0002.jpg", "Scarlet Garden Bride", "Outdoor Bridal"],
    ["IMG-20260629-WA0010 (1).jpg", "Ivory Gown Bride", "Christian Bridal"],
    ["IMG-20260422-WA0023.jpg", "Royal Purple Silk", "Kanjeevaram Bridal"],
    ["IMG-20260317-WA0009.jpg", "Kasavu Smile", "Kerala Bridal"],
    ["IMG_20261001_110819.png", "Golden Kerala Bride", "Traditional Bridal"],
    ["IMG-20250617-WA0004.jpg", "Classic Kerala Bride", "Traditional Bridal"],
    ["IMG-20260729-WA0008.jpg", "White Lace Elegance", "Christian Bridal"],
    ["IMG_20260926_081322.jpg", "Kasavu Grace", "Kerala Bridal"],
    ["IMG20230807155259.jpg", "Pearl Saree Bride", "Bridal Makeup"],
    ["PXL_20260320_042650081.PORTRAIT.jpg", "Maroon Muhurtham", "Traditional Bridal"],
    ["IMG-20250927-WA0036.jpg", "Pink Silk Celebration", "Bridal Makeup"],
    ["IMG-20260422-WA0026.jpg", "Golden Kasavu", "Kerala Bridal"],
    ["IMG-20260422-WA0022.jpg", "Set Saree Classic", "Kerala Bridal"],
    ["IMG-20251213-WA0004.jpg", "Ivory & Gold", "Kerala Bridal"],
    ["PXL_20260531_013403421.jpg", "Pure Kasavu", "Kerala Bridal"],
    ["PXL_20260531_044420346.MP.jpg", "Wine Silk Bride", "Traditional Bridal"],
    ["file_000000005bd881f4bab77f4c0a964f36.png", "Peacock Blue Bride", "Bridal Makeup"],
  ],
};

export const HAIR_STYLES = {
  dir: HAIR,
  items: [
    ["Untitled design_20261010_123209_0000.png", "Bridal Half-Up", "Bridal Hairdo"],
    ["IMG-20260114-WA0019.jpg", "Jasmine Bridal Bun", "Bridal Hairdo"],
    ["file_000000006e1481f4b97a2f84ca91d6b4.png", "Caramel Curls", "Colour & Curls"],
    ["file_00000000ff9481f4b77c7db3cedb7c4b.png", "Silky Straight", "Smoothening"],
    ["file_0000000059988246a297e340406f611a.png", "Glam Waves", "Curls"],
    ["IMG_20261008_183925.png", "Soft Brunette Curls", "Curls"],
    ["PXL_20260822_083144049.jpg", "Highlight Waves", "Hair Colour"],
    ["1786597881072.png", "Voluminous Curls", "Curls"],
  ],
};

export const RECENT_WORK = {
  dir: RECENT,
  items: [
    ["Untitled design_20261010_132441_0000.png", "Lilac Glam Portrait", "Photoshoot"],
    ["ELF23DSC01260.jpg.jpeg", "Egyptian Queen", "Theme Makeup"],
    ["DSC07804.jpg", "Ivory Tissue Saree", "Party Makeup"],
    ["ELF190DSC02164.jpg.jpeg", "Black & Gold Editorial", "Group Shoot"],
    ["Untitled design_20261011_185146_0000.png", "Wine Silk Elegance", "Party Makeup"],
    ["PXP_5048.JPG", "Coral Silk Heritage", "Photoshoot"],
    ["ELF221DSC02356.jpg.jpeg", "Editorial Curls", "Theme Makeup"],
    ["PXP_5653.JPG", "Emerald Drape", "Photoshoot"],
    ["ELF42DSC01418.jpg.jpeg", "Golden Era Ensemble", "Group Shoot"],
    ["IMG-20250825-WA0005.jpg", "Green Silk Glow", "Engagement Look"],
    ["ELF218DSC02343.jpg.jpeg", "Noir Editorial", "Theme Makeup"],
  ],
};

export const SIGNATURE_WORK = {
  dir: SIGNATURE,
  items: [
    ["with Manju Warrier pic1.jpg", "With Manju Warrier", "Celebrity Client"],
    ["file_00000000149c81f480553bf09a70025f.png", "Celebrity Glam", "Celebrity Client"],
    ["pic2.png", "Shining the Brightest Star", "Celebrity Client"],
    ["Untitled design_20261010_155936_0000.png", "Celebrity Makeover", "Celebrity Client"],
  ],
};

/**
 * "*" = every image in the folder, sorted by filename.
 * `focus` overrides the crop (CSS object-position) for photos where the
 * face sits unusually high or low.
 */
export const GALLERY_SLOTS = {
  "slot-1": {
    dir: `${GALLERY}/bridal glam`,
    files: "*",
    focus: {
      "IMG20230807155259.jpg": "50% 35%",
      "IMG_20261001_110819.png": "50% 8%",
      "Untitled design_20261010_121119_0000.png": "50% 8%",
    },
  },
  "slot-2": {
    dir: `${GALLERY}/reception look`,
    files: "*",
    focus: { "IMG_20260922_134349.png": "50% 4%" },
  },
  "slot-3": {
    dir: HAIR,
    files: [
      "Untitled design_20261010_123209_0000.png",
      "IMG-20260114-WA0019.jpg",
      "1786597881072.png",
      "IMG_20261008_183925.png",
    ],
  },
  "slot-4": { dir: `${GALLERY}/engagemet`, files: "*" },
  "slot-5": {
    dir: HAIR,
    files: [
      "file_000000006e1481f4b97a2f84ca91d6b4.png",
      "file_00000000ff9481f4b77c7db3cedb7c4b.png",
      "file_0000000059988246a297e340406f611a.png",
      "PXL_20260822_083144049.jpg",
    ],
  },
  "slot-6": {
    dir: `${GALLERY}/party makeover`,
    files: "*",
    focus: {
      "Screenshot_2026-08-31-07-52-55-67_1c337646f29875672b5a61192b9010f9.jpg":
        "50% 0%",
    },
  },
};
