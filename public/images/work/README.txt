Landing-page work showcase images
=================================

These appear in the "Our Recent Work" marquee right under the hero,
and the first 4 also show as small thumbnails inside the hero badge.

Size:  portrait 3:4  ->  700 x 930 px (or larger, same ratio)
Format: .webp preferred (fastest), .jpg also fine
Naming: 01.webp, 02.webp, 03.webp ...

After adding files, list them in src/content/media.ts under WORK_CUSTOM:

  export const WORK_CUSTOM: MediaItem[] = [
    { src: "/images/work/01.webp", label: "Anjali's Wedding", tag: "Bridal Makeup" },
    { src: "/images/work/02.webp", label: "Reception Glam",   tag: "Reception Look" },
  ];

While WORK_CUSTOM is empty, the AI placeholder images are used automatically.
