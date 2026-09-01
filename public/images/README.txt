Labhonitta image drop folders (MVP — no server yet)
====================================================

Put real photos here. Then list each file in:
  src/content/media.ts

Until you add custom paths there, Bridal / Hair keep using the AI fallback
images already in this folder (look-*.webp, hair-*.webp, bride-*.webp).

Folders
-------
bridal/          Bridal lookbook wheel — add as many as you want (3:4 portrait)
hair/            Hair studio wheel — unlimited (3:4 portrait)
gallery/slot-1/  Tall left cell     → 800×1200 (2:3)
gallery/slot-2/  Wide middle-top    → 1200×800 (3:2)
gallery/slot-3/  Wide right-top     → 1200×800 (3:2)
gallery/slot-4/  Tall middle        → 800×1200 (2:3)  "Engagement"
gallery/slot-5/  Wide right-mid     → 1200×800 (3:2)
gallery/slot-6/  Wide bottom        → 1200×800 (3:2)

Tips
----
- Prefer .webp for fast loading (or .jpg)
- Name files 01.webp, 02.webp, …
- Gallery: each slot can hold multiple images (auto-slides every 3s)
- CRM shortcut on the live site: Shift+A then Enter → /crm
- Future backend path planned: c:\labhinitta thrissur
