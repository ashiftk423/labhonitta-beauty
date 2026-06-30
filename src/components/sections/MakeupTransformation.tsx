"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Pinned, scroll-scrubbed transformation. As the user scrolls through this
 * section it stays fixed while the "after" (full glam) layer wipes across the
 * "before" layer via clip-path — like a living before/after reveal.
 *
 * Drop real photos at:  /public/images/bride-before.jpg  +  bride-after.jpg
 * (any 3:4 portrait). Until then, layered gradients stand in gracefully.
 */
export default function MakeupTransformation() {
  const root = useRef<HTMLDivElement>(null);
  const afterLayer = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const beforeLabel = useRef<HTMLSpanElement>(null);
  const afterLabel = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=140%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        afterLayer.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", ease: "none" },
        0
      )
        .fromTo(handle.current, { left: "0%" }, { left: "100%", ease: "none" }, 0)
        .to(beforeLabel.current, { opacity: 0, duration: 0.3 }, 0.2)
        .fromTo(
          afterLabel.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          0.5
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="bridal"
      ref={root}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6"
    >
      <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="text-xs uppercase tracking-[0.4em] text-rose/80">
            The Bridal Reveal
          </span>
          <h2 className="mt-3 font-display text-4xl font-light leading-tight sm:text-6xl">
            From <span className="text-cream">bare</span> to{" "}
            <span className="text-gold-gradient">breathtaking</span>
          </h2>
          <p className="mt-5 max-w-md text-cream/65">
            Scroll slowly and watch a complete bridal transformation unfold —
            base, contour, eyes, lips and the final glow, revealed stroke by
            stroke just as it happens on the chair.
          </p>
          <p className="mt-8 text-sm text-cream/45">
            ✦ Keep scrolling to complete the look
          </p>
        </div>

        {/* Before / After stage */}
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2rem] border border-gold/20 shadow-[0_30px_120px_-30px_rgba(217,162,115,0.5)]">
          {/* BEFORE layer */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(160deg,#2b2230,#473041 60%,#5a4150), url(/images/bride-before.jpg)",
              backgroundBlendMode: "overlay",
            }}
          >
            <span
              ref={beforeLabel}
              className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs uppercase tracking-widest text-cream/80"
            >
              Before
            </span>
          </div>

          {/* AFTER layer (clipped) */}
          <div
            ref={afterLayer}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              clipPath: "inset(0 100% 0 0)",
              backgroundImage:
                "linear-gradient(160deg,#e8a6b8,#d9a273 45%,#f6e3b8), url(/images/bride-after.jpg)",
              backgroundBlendMode: "overlay",
            }}
          >
            <span
              ref={afterLabel}
              className="absolute right-4 top-4 rounded-full bg-[#1a0a14]/60 px-3 py-1 text-xs uppercase tracking-widest text-gold"
            >
              After
            </span>
          </div>

          {/* divider handle */}
          <div
            ref={handle}
            className="absolute top-0 z-10 h-full w-[2px] -translate-x-1/2 bg-gold/90 shadow-[0_0_20px_rgba(233,201,139,0.9)]"
          >
            <span className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-xs text-[#1a0a14]">
              ↔
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
