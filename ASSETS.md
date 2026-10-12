# Labhonitta media & CRM notes (MVP)

## What is live now
- Light (default) + dark theme toggle in the navbar
- Gallery: 6 fixed slots, each with its own photos
- Auto-slide every 3s; swipe / press-drag for prev / next
- Bridal & Hair wheels, Recent Work strip, celebrity section: real client photos
  (AI images in `public/images/*.webp` are only a fallback)
- CRM stub: `Shift+A` then `Enter` → `/crm` (hardcoded superadmin login)

## Superadmin (hardcoded MVP)
- Email: `ashifzaheer423@gmail.com`
- Password: `labhonitta@ashif`

## Adding / changing photos
Originals stay outside the repo (e.g. `Downloads\labhonitta\works`).

1. Add the photo to the right subfolder of the works folder.
2. List it in `scripts/works.config.mjs` (order = display order, with caption
   and tag). Gallery slots marked `"*"` pick up every file automatically.
3. Run `node scripts/optimize-works.mjs "C:\Users\Ashif saheer\Downloads\labhonitta\works"`

The script resizes to max 960×1440 WebP (~50–200 KB each), writes them to
`public/images/{hero,about,bridal,hair,work,signature,gallery/slot-N}/` and
regenerates `src/content/works.generated.ts`. Don't edit that file by hand.

If a face gets cropped off in a short gallery cell, add a `focus` override
(CSS object-position, e.g. `"50% 8%"`) for that file in the config.

| Area | Source folder | Notes |
|------|---------------|-------|
| Hero | one photo from `brides` | 3:4, face in top half |
| About arch | `about` | top is rounded — leave head-room |
| Bridal wheel | `brides` | any count, wheel dots shrink to fit |
| Hair wheel | `hair studio` | |
| Recent Work strip | `recent works` | 3:4 cards |
| Trusted by the Stars | `signature` | |
| Gallery slot-1 Bridal Glam | `gallery/bridal glam` | tall cell |
| Gallery slot-2 Reception Look | `gallery/reception look` | wide cell |
| Gallery slot-3 Hair Styling | picked from `hair studio` | wide cell |
| Gallery slot-4 Engagement | `gallery/engagemet` | tall cell |
| Gallery slot-5 Curls & Shine | picked from `hair studio` | wide cell |
| Gallery slot-6 Party Makeover | `gallery/party makeover` | wide cell |

## Later (not built yet)
- Docker + PostgreSQL + .NET C# API (same pattern as Kattar)
- Project / backend home: `c:\labhinitta thrissur`
- Full CRM: upload images, edit captions, user management, change audit log
- Server fetch with AI-image fallback when offline
