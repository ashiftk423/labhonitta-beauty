# Labhonitta — Ladies Beauty Parlour (Premium 3D Website)

An immersive, game-like 3D website for **Labhonitta Ladies Beauty Parlour**,
Thrissur. Built for buttery scroll-driven storytelling: a live golden-dust 3D
backdrop, a pinned bridal **before → after** reveal, and a scroll-scrubbed
**hair-cutting** animation. Fully responsive (mobile / tablet / desktop) and
tuned for 60fps.

## Tech stack

| Concern              | Library                                   |
| -------------------- | ----------------------------------------- |
| Framework            | Next.js 16 (App Router) + TypeScript      |
| Styling              | Tailwind CSS v4                           |
| 3D / WebGL           | three.js · @react-three/fiber · drei      |
| Post-processing      | @react-three/postprocessing (Bloom)       |
| Scroll animation     | GSAP + ScrollTrigger                      |
| Smooth scrolling     | Lenis                                     |
| UI motion            | Framer Motion                             |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project structure

```
src/
  app/
    layout.tsx        fonts (Cormorant + Inter), metadata, SmoothScroll
    page.tsx          section composition
    globals.css       design tokens + luxury theme
  lib/
    gsap.ts           gsap + ScrollTrigger singleton
  components/
    SmoothScroll.tsx  Lenis ↔ GSAP sync
    BackgroundCanvas.tsx   client-only loader for the 3D scene
    Navbar.tsx · Footer.tsx
    three/
      Scene.tsx       fixed WebGL canvas + Bloom/Vignette
      GoldenDust.tsx  GPU particle field
      FloatingOrbs.tsx liquid rose-gold spheres
    sections/
      Hero.tsx
      Services.tsx
      MakeupTransformation.tsx   ← pinned before/after reveal
      HairStudio.tsx             ← scroll-scrubbed haircut
      Gallery.tsx
      Contact.tsx                ← WhatsApp booking + real details
```

## Add your real photos

See `public/images/README.txt`. Drop `bride-before.jpg` and `bride-after.jpg`
(3:4 portraits) and the transformation reveal uses them automatically.

## Where to go next

See **PLAN.md** for the roadmap and **PROMPTS.md** for ready-to-paste prompts
to extend the site (real 3D model, image-sequence scrubbing, more sections).
