# Labhonitta media & CRM notes (MVP)

## What is live now
- Dark (default) + light theme toggle in the navbar
- Gallery: 6 fixed slots, each with its own folder & size
- Auto-slide every 3s; swipe / press-drag for prev / next
- Bridal & Hair wheels: custom folders or AI fallbacks
- CRM stub: `Shift+A` then `Enter` → `/crm` (hardcoded superadmin login)

## Superadmin (hardcoded MVP)
- Email: `ashifzaheer423@gmail.com`
- Password: `labhonitta@ashif`

## Where to put images
| Area | Folder | Size |
|------|--------|------|
| Bridal wheel | `public/images/bridal/` | 3:4 · ~900×1200+ |
| Hair wheel | `public/images/hair/` | 3:4 · ~900×1200+ |
| Gallery slot-1 | `public/images/gallery/slot-1/` | **800×1200** tall |
| Gallery slot-2 | `public/images/gallery/slot-2/` | **1200×800** wide |
| Gallery slot-3 | `public/images/gallery/slot-3/` | **1200×800** wide |
| Gallery slot-4 | `public/images/gallery/slot-4/` | **800×1200** tall |
| Gallery slot-5 | `public/images/gallery/slot-5/` | **1200×800** wide |
| Gallery slot-6 | `public/images/gallery/slot-6/` | **1200×800** wide |

After dropping files, register paths in `src/content/media.ts`.

## Later (not built yet)
- Docker + PostgreSQL + .NET C# API (same pattern as Kattar)
- Project / backend home: `c:\labhinitta thrissur`
- Full CRM: upload images, edit captions, user management, change audit log
- Server fetch with AI-image fallback when offline
