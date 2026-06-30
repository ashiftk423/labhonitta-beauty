"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/lenis";

const WORDMARK = "Labhonitta";

/**
 * Premium branded intro: a full-screen plum curtain where the "Labhonitta"
 * word-mark draws in with a gold shimmer and a thin progress line fills,
 * then the curtain splits and lifts to reveal the page.
 *
 * Mounted above <SmoothScroll> in layout.tsx. Locks Lenis while visible and
 * skips the whole animation under prefers-reduced-motion.
 */
export default function Intro() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const lineRef = useRef<HTMLSpanElement>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      unlockScroll();
      setDone(true);
      return;
    }

    lockScroll();

    // Safety net: no matter what happens with GSAP, never leave the curtain up
    // or scroll locked for more than this.
    const failSafe = window.setTimeout(() => {
      unlockScroll();
      setDone(true);
    }, 4000);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          window.clearTimeout(failSafe);
          unlockScroll();
          setDone(true);
        },
      });

      gsap.set(lettersRef.current, { yPercent: 120, opacity: 0 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

      tl.to(lettersRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.045,
      })
        .to(
          lineRef.current,
          { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
          "-=0.55"
        )
        .to({}, { duration: 0.35 })
        .to(contentRef.current, {
          opacity: 0,
          y: -24,
          duration: 0.4,
          ease: "power2.in",
        })
        .to(
          topRef.current,
          { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
          "<"
        )
        .to(
          bottomRef.current,
          { yPercent: 100, duration: 0.8, ease: "power4.inOut" },
          "<"
        );
    }, rootRef);

    return () => {
      window.clearTimeout(failSafe);
      ctx.revert();
    };
  }, []);

  if (done) return null;

  const panel =
    "absolute inset-x-0 h-1/2 bg-[radial-gradient(120%_100%_at_50%_50%,#3a1430_0%,#1c0a18_60%,#0d0610_100%)]";

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[200] overflow-hidden"
    >
      <div ref={topRef} className={`${panel} top-0`} />
      <div ref={bottomRef} className={`${panel} bottom-0`} />

      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-6"
      >
        <h1 className="font-display text-gold-gradient animate-shimmer text-center text-[clamp(2.75rem,11vw,7rem)] font-light leading-none tracking-tight">
          <span className="inline-flex overflow-hidden pb-[0.12em]">
            {WORDMARK.split("").map((ch, i) => (
              <span
                key={`${ch}-${i}`}
                ref={(el) => {
                  if (el) lettersRef.current[i] = el;
                }}
                className="inline-block"
              >
                {ch}
              </span>
            ))}
          </span>
        </h1>

        <span
          ref={lineRef}
          className="block h-px w-[min(280px,60vw)] bg-gradient-to-r from-transparent via-rosegold to-transparent"
        />

        <p className="text-[0.7rem] uppercase tracking-[0.4em] text-cream/60">
          Ladies Beauty Parlour
        </p>
      </div>
    </div>
  );
}
