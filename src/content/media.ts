/**
 * Media content config — MVP source of truth for captions + image paths.
 * Drop real photos into the matching public/ folders, then list them here.
 * Later CRM will edit this (or a server DB) instead of hand-editing.
 *
 * Folder map:
 *   public/images/bridal/   → bridal wheel (infinite-friendly list)
 *   public/images/hair/     → hair studio wheel
 *   public/images/gallery/slot-1 … slot-6  → fixed 6 gallery containers
 */

export type MediaItem = {
  src: string;
  label: string;
  tag?: string;
  color?: string;
};

export type GallerySlot = {
  id: string;
  /** Shown as caption / CRM label */
  caption: string;
  /** Tailwind span classes for the masonry cell */
  span: string;
  /** Soft gradient when no image loads */
  fallbackGrad: string;
  /**
   * Recommended export size so CRM users shoot/crop correctly.
   * Desktop cell ~ (max-w-7xl / 3) with auto-rows 180px.
   */
  sizeHint: {
    aspect: string;
    recommendPx: string;
    shape: "tall" | "wide";
    note: string;
  };
  /** Folder under /public/images/gallery/ */
  folder: string;
  /** Images for this slot only (auto-rotate every 3s) */
  images: string[];
};

/** AI placeholders — always available if custom files are missing / empty */
export const BRIDAL_FALLBACKS: MediaItem[] = [
  {
    src: "/images/bride-after.webp",
    label: "Signature Bridal",
    tag: "HD bridal glam",
    color: "#e9c98b",
  },
  {
    src: "/images/look-1.webp",
    label: "Classic Red Bridal",
    tag: "Traditional · temple gold",
    color: "#c0392b",
  },
  {
    src: "/images/look-2.webp",
    label: "Rose Romance",
    tag: "Soft dewy party glam",
    color: "#e8a6b8",
  },
  {
    src: "/images/look-3.webp",
    label: "Golden Reception",
    tag: "Bronze & champagne",
    color: "#d9a273",
  },
  {
    src: "/images/look-4.webp",
    label: "Bold Modern Diva",
    tag: "Editorial smokey",
    color: "#7a2e4a",
  },
];

export const HAIR_FALLBACKS: MediaItem[] = [
  {
    src: "/images/hair-long.webp",
    label: "Long Layers",
    tag: "Soft natural waves",
    color: "#3a2218",
  },
  {
    src: "/images/hair-styled.webp",
    label: "Styled Lob",
    tag: "Sleek salon blowout",
    color: "#5a2b22",
  },
  {
    src: "/images/hair-straight.webp",
    label: "Sleek Straight",
    tag: "Glossy & smooth",
    color: "#241016",
  },
  {
    src: "/images/hair-curls.webp",
    label: "Bouncy Curls",
    tag: "Voluminous ringlets",
    color: "#2a1810",
  },
  {
    src: "/images/hair-updo.webp",
    label: "Caramel Updo",
    tag: "Balayage colour",
    color: "#8a5a2b",
  },
];

/**
 * Custom bridal looks — add paths after dropping files into
 * public/images/bridal/ (e.g. 01.webp). Leave empty to use AI fallbacks.
 */
export const BRIDAL_CUSTOM: MediaItem[] = [
  // { src: "/images/bridal/01.webp", label: "Client Bridal", tag: "Real work", color: "#e9c98b" },
];

export const HAIR_CUSTOM: MediaItem[] = [
  // { src: "/images/hair/01.webp", label: "Client Cut", tag: "Real work", color: "#3a2218" },
];

/**
 * Landing-page work showcase (the marquee under the hero).
 * Drop real photos into public/images/work/ and list them in WORK_CUSTOM.
 * Portrait 3:4 crops look best — about 700 × 930 px.
 */
export const WORK_FALLBACKS: MediaItem[] = [
  { src: "/images/bride-after.webp", label: "Signature Bridal", tag: "Bridal Makeup" },
  { src: "/images/look-1.webp", label: "Classic Red Bridal", tag: "Bridal Makeup" },
  { src: "/images/hair-updo.webp", label: "Caramel Updo", tag: "Hair Styling" },
  { src: "/images/look-2.webp", label: "Rose Romance", tag: "Party Makeup" },
  { src: "/images/hair-curls.webp", label: "Bouncy Curls", tag: "Hair Styling" },
  { src: "/images/look-3.webp", label: "Golden Reception", tag: "Reception Look" },
  { src: "/images/hair-straight.webp", label: "Sleek Straight", tag: "Hair Treatment" },
  { src: "/images/look-4.webp", label: "Bold Modern Diva", tag: "Artist Makeup" },
];

export const WORK_CUSTOM: MediaItem[] = [
  // { src: "/images/work/01.webp", label: "Anjali's Wedding", tag: "Bridal Makeup" },
];

export function getWorkShowcase(): MediaItem[] {
  return WORK_CUSTOM.length > 0 ? WORK_CUSTOM : WORK_FALLBACKS;
}

export function getBridalLooks(): MediaItem[] {
  return BRIDAL_CUSTOM.length > 0 ? BRIDAL_CUSTOM : BRIDAL_FALLBACKS;
}

export function getHairStyles(): MediaItem[] {
  return HAIR_CUSTOM.length > 0 ? HAIR_CUSTOM : HAIR_FALLBACKS;
}

/**
 * Six fixed gallery containers — different sizes, separate image lists.
 * Put multiple images per slot; the UI auto-slides every 3 seconds.
 */
export const GALLERY_SLOTS: GallerySlot[] = [
  {
    id: "slot-1",
    caption: "Bridal Glam",
    span: "row-span-2",
    fallbackGrad: "from-rose/40 to-plum",
    sizeHint: {
      aspect: "2:3 (portrait)",
      recommendPx: "800 × 1200 px",
      shape: "tall",
      note: "Left column — tall cell (~2 rows). Prefer portrait bridal close-ups.",
    },
    folder: "gallery/slot-1",
    images: [],
  },
  {
    id: "slot-2",
    caption: "Reception Look",
    span: "",
    fallbackGrad: "from-rosegold/40 to-plum",
    sizeHint: {
      aspect: "3:2 (landscape)",
      recommendPx: "1200 × 800 px",
      shape: "wide",
      note: "Middle column — short cell (1 row). Landscape or cropped mid-shots.",
    },
    folder: "gallery/slot-2",
    images: [],
  },
  {
    id: "slot-3",
    caption: "Layer Cut",
    span: "",
    fallbackGrad: "from-gold/30 to-plum",
    sizeHint: {
      aspect: "3:2 (landscape)",
      recommendPx: "1200 × 800 px",
      shape: "wide",
      note: "Right column — short cell. Hair detail / side profile works well.",
    },
    folder: "gallery/slot-3",
    images: [],
  },
  {
    id: "slot-4",
    caption: "Engagement",
    span: "row-span-2",
    fallbackGrad: "from-rose/30 to-plum",
    sizeHint: {
      aspect: "2:3 (portrait)",
      recommendPx: "800 × 1200 px",
      shape: "tall",
      note: "Middle column — tall cell. Full engagement / mehndi portraits.",
    },
    folder: "gallery/slot-4",
    images: [],
  },
  {
    id: "slot-5",
    caption: "Keratin Shine",
    span: "",
    fallbackGrad: "from-rosegold/30 to-plum",
    sizeHint: {
      aspect: "3:2 (landscape)",
      recommendPx: "1200 × 800 px",
      shape: "wide",
      note: "Right column — short cell. Hair shine / before-after crop.",
    },
    folder: "gallery/slot-5",
    images: [],
  },
  {
    id: "slot-6",
    caption: "Party Makeover",
    span: "",
    fallbackGrad: "from-gold/40 to-plum",
    sizeHint: {
      aspect: "3:2 (landscape)",
      recommendPx: "1200 × 800 px",
      shape: "wide",
      note: "Bottom-left short cell on mobile stack; landscape party glam.",
    },
    folder: "gallery/slot-6",
    images: [],
  },
];
