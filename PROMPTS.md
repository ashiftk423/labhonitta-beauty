# Handoff Prompts — paste these into Cursor / any AI agent

Each prompt is self-contained. Run them **in order**. Copy one block at a time
into the chat of the agent working inside this project, wait for it to finish,
then move to the next.

> Shared context (the agent already has the code, but this reminds it):
> This is a Next.js 16 + TypeScript + Tailwind v4 site for "Labhonitta Ladies
> Beauty Parlour". 3D = three.js + @react-three/fiber + drei +
> @react-three/postprocessing. Scroll = GSAP ScrollTrigger synced with Lenis
> (see `src/components/SmoothScroll.tsx` and `src/lib/gsap.ts`). UI motion =
> Framer Motion. Sections live in `src/components/sections`. Keep everything
> responsive (mobile/tablet/desktop) and 60fps; respect `prefers-reduced-motion`.

---

## PROMPT 1 — Branded intro loader + page-curtain reveal

```
Create a premium intro loader for this Next.js site. Add `src/components/Intro.tsx`
(client component) that shows a full-screen plum overlay with the "Labhonitta"
word-mark drawing in with a gold shimmer and a thin progress line, then lifts up
like a curtain (GSAP, ~2s total) revealing the page. Mount it in `app/layout.tsx`
above SmoothScroll. While it's visible, lock scroll via Lenis (call lenis.stop()).
Skip the animation when prefers-reduced-motion. Make it not block hydration.
```

## PROMPT 2 — Real photos + Makeup Transformation polish

```
I added real images at /public/images/bride-before.jpg and bride-after.jpg (3:4).
In `src/components/sections/MakeupTransformation.tsx`, remove the gradient
blend so the real photos show cleanly, add a subtle gold particle burst that
follows the reveal divider as it crosses, and add 3 floating step labels
("Base", "Eyes", "Final glow") that fade in at 25%/55%/90% scroll progress.
Keep it pinned and scrubbed. Verify it still works if the images are missing.
```

## PROMPT 3 — Apple-style image-sequence scrubbing (the "4K transformation")

```
Add a new pinned section `src/components/sections/SequenceReveal.tsx` that does
Apple-style scroll-scrubbed image-sequence playback for a makeover. I will place
frames at /public/sequence/frame_0001.webp ... frame_0090.webp.
Requirements:
- Draw the current frame to a <canvas> sized with devicePixelRatio for 4K crispness.
- Preload all frames with a small concurrency-limited loader and show a % counter.
- Use GSAP ScrollTrigger pin + scrub to map scroll progress -> frame index.
- Responsive: canvas uses object-fit cover logic; recompute on resize.
- Add it to app/page.tsx between MakeupTransformation and HairStudio.
Make it degrade gracefully (show frame 1) if frames are missing.
```

## PROMPT 4 — Interactive 3D model rotated by scroll

```
Add an optional glTF model to the 3D scene. Create
`src/components/three/HeroModel.tsx` using drei `useGLTF` and `useGLTF.preload`,
loading /public/models/object.glb (a stylized lipstick or perfume bottle).
Float it near the hero, and rotate it on scroll by reading a shared scroll
progress value (use a lightweight zustand store or a ref updated from
ScrollTrigger). Add Suspense fallback. If the model file is missing, render
nothing without crashing. Keep DPR clamped and dispose on unmount.
```

## PROMPT 5 — Testimonials carousel (4.9★, 175 reviews)

```
Add `src/components/sections/Testimonials.tsx`: an auto-scrolling, draggable
testimonials marquee using Framer Motion, styled with the existing `glass` and
gold-gradient classes. Seed 6 realistic short reviews for a Thrissur bridal
parlour, each with name, star rating, and service tag. Pause on hover, fully
responsive, accessible. Insert it after Gallery in app/page.tsx.
```

## PROMPT 6 — Per-section color grading + scroll progress bar

```
1) Add a thin fixed top scroll-progress bar (gold gradient) driven by Lenis.
2) As the user scrolls each section, smoothly animate the CSS variables --bg and
   --bg-soft (defined in globals.css) using GSAP ScrollTrigger, giving each
   section its own mood (hero=deep plum, bridal=rose, hair=warm gold, etc).
Keep transitions subtle and 60fps. No layout shift.
```

## PROMPT 7 — Performance + accessibility pass

```
Do a performance + a11y pass:
- In `src/components/three/Scene.tsx`, lower particle count and DPR on mobile
  (detect via matchMedia / window.innerWidth) and pause the canvas render loop
  when the tab is hidden (document visibilitychange).
- Add aria-labels and focus styles to all interactive elements.
- Ensure every GSAP/Framer animation is disabled or reduced under
  prefers-reduced-motion.
- Run `npm run build` and fix any warnings. Report Lighthouse-style wins.
```

## PROMPT 8 — Deploy to Vercel

```
Prepare this project for production deploy on Vercel:
- Add a proper OG image and favicon for "Labhonitta Ladies Beauty Parlour".
- Add app/sitemap.ts and app/robots.ts.
- Confirm `npm run build` passes.
- Give me step-by-step commands to deploy via the Vercel CLI and to connect the
  domain labhonittabeautyparlour.com.
```

---

### Tip
If an agent ever loses context, prepend any prompt with:
"Read README.md and PLAN.md first, then: …"
