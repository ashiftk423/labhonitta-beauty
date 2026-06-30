# Project Plan — Labhonitta 3D Beauty Website

## Vision

A "game-like", scroll-driven experience where every scroll triggers an
optimized, continuous transition. Premium luxury feel (rose-gold + plum),
4K-crisp visuals, 60fps on mobile and desktop.

## What is already built (foundation — done ✅)

1. **Stack & tooling** — Next.js 16 + TS + Tailwind v4, all 3D/animation libs installed.
2. **Smooth scroll engine** — Lenis synced to GSAP ScrollTrigger (the backbone of all scroll animation).
3. **Live 3D background** — golden-dust particle field + liquid rose-gold orbs, Bloom + Vignette post-processing, pointer parallax. Client-only, never blocks first paint.
4. **Navbar** — glass, responsive, animated mobile menu, WhatsApp "Book Now".
5. **Hero** — staggered reveal, shimmer gold headline, scroll cue.
6. **Services** — 4 cards: Bridal Makeup, Artist Makeup, Hair Cutting, Hair Treatment.
7. **Makeup Transformation** — PINNED before→after clip-path reveal scrubbed by scroll. Drops in real photos automatically.
8. **Hair Studio** — PINNED SVG haircut: strands retract to a styled bob + scissors glide + trimmed pieces fall, all scroll-scrubbed.
9. **Gallery** — responsive animated portfolio grid.
10. **Contact** — real business details (address, +91 90202 40426, hours, 4.9★) + WhatsApp booking form.
11. **Footer**, SEO metadata, reduced-motion fallback, custom scrollbar.

## Roadmap (suggested order)

### Phase 1 — Content & realism (highest impact, no new code patterns)
- [ ] Add real photos: `bride-before.jpg`, `bride-after.jpg`, gallery images.
- [ ] Replace gallery gradient tiles with real work + lightbox on click.
- [ ] Real testimonials carousel (you have 175 reviews @ 4.9★).

### Phase 2 — Deeper 3D / cinematic scroll
- [ ] **Image-sequence scrubbing** (Apple-style): export ~60 frames of a makeup
      or haircut sequence, draw to `<canvas>`, scrub frame index with ScrollTrigger.
      This is the most realistic "transformation" upgrade and stays performant.
- [ ] Optional **glTF 3D model** (e.g. a stylized mannequin / perfume bottle /
      lipstick) loaded with drei `useGLTF`, rotated by scroll.
- [ ] Section-to-section color grading: animate background palette per section.

### Phase 3 — Polish & performance
- [ ] Per-device particle count + DPR clamp; pause WebGL when tab hidden.
- [ ] Lazy-mount heavy sections; `prefers-reduced-motion` full audit.
- [ ] Lighthouse pass (target 90+ mobile). Preload hero font.
- [ ] Add `loading.tsx` + a branded intro curtain animation.

### Phase 4 — Launch
- [ ] Wire real booking (WhatsApp is live; optionally add a form backend / email).
- [ ] Connect domain `labhonittabeautyparlour.com`.
- [ ] Deploy to Vercel (`vercel` or push to GitHub + import).
- [ ] OG image, sitemap, Google Business profile link, analytics.

## Performance principles (keep these)
- WebGL canvas is `position: fixed`, `pointer-events-none`, client-only.
- `dpr={[1, 1.8]}` caps retina cost; particle count is tunable.
- All scroll animations go through the single Lenis+ScrollTrigger pipeline.
- Pinned sections use `anticipatePin` + `scrub` for smoothness.
