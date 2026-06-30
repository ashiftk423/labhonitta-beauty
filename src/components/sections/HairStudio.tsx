"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const STRANDS = 26;

/**
 * Pinned hair-cutting sequence. Long strands retract to a styled bob as the
 * user scrolls, scissors glide across the cut line, and trimmed pieces fall.
 * Entirely SVG + GSAP — sharp at any resolution, light on the GPU.
 */
export default function HairStudio() {
  const root = useRef<HTMLDivElement>(null);
  const scissors = useRef<SVGGElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=160%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // each strand retracts to a wavy bob length
      gsap.utils.toArray<SVGRectElement>(".strand").forEach((s, i) => {
        const target = 70 + Math.sin(i * 0.5) * 18; // styled bob line
        tl.to(
          s,
          { attr: { height: target }, ease: "none" },
          gsap.utils.mapRange(0, STRANDS, 0, 0.8, i)
        );
        // falling trimmed piece
        tl.fromTo(
          `.fall-${i}`,
          { y: 0, opacity: 0.9 },
          { y: 260, opacity: 0, ease: "power1.in" },
          gsap.utils.mapRange(0, STRANDS, 0, 0.8, i)
        );
      });

      // scissors travel across the cut line
      tl.fromTo(
        scissors.current,
        { x: -40, rotation: -8, transformOrigin: "center" },
        { x: 360, rotation: 8, ease: "none" },
        0
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hair"
      ref={root}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6"
    >
      <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <svg
            viewBox="0 0 360 360"
            className="mx-auto w-full max-w-md drop-shadow-[0_20px_60px_rgba(217,162,115,0.35)]"
          >
            <defs>
              <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a1018" />
                <stop offset="100%" stopColor="#5a2b22" />
              </linearGradient>
              <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f4c9a8" />
                <stop offset="100%" stopColor="#e3a07c" />
              </linearGradient>
            </defs>

            {/* face */}
            <ellipse cx="180" cy="150" rx="62" ry="74" fill="url(#skin)" />
            <circle cx="160" cy="140" r="5" fill="#3a1f1a" />
            <circle cx="200" cy="140" r="5" fill="#3a1f1a" />
            <path
              d="M165 170 Q180 182 195 170"
              stroke="#b25f63"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            {/* hair strands */}
            {Array.from({ length: STRANDS }).map((_, i) => {
              const x = 96 + i * ((168) / (STRANDS - 1));
              return (
                <g key={i}>
                  <rect
                    className="strand"
                    x={x}
                    y={70}
                    width={168 / STRANDS - 1.5}
                    height={210}
                    rx={3}
                    fill="url(#hairGrad)"
                  />
                  <rect
                    className={`fall-${i}`}
                    x={x}
                    y={250}
                    width={168 / STRANDS - 1.5}
                    height={26}
                    rx={3}
                    fill="url(#hairGrad)"
                  />
                </g>
              );
            })}

            {/* scissors */}
            <g ref={scissors}>
              <circle cx="0" cy="250" r="6" fill="none" stroke="#e9c98b" strokeWidth="3" />
              <circle cx="0" cy="266" r="6" fill="none" stroke="#e9c98b" strokeWidth="3" />
              <line x1="0" y1="250" x2="34" y2="258" stroke="#e9c98b" strokeWidth="3" strokeLinecap="round" />
              <line x1="0" y1="266" x2="34" y2="258" stroke="#e9c98b" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        <div className="order-1 lg:order-2">
          <span className="text-xs uppercase tracking-[0.4em] text-rose/80">
            The Hair Studio
          </span>
          <h2 className="mt-3 font-display text-4xl font-light leading-tight sm:text-6xl">
            Every <span className="text-gold-gradient">cut</span>, crafted live
          </h2>
          <p className="mt-5 max-w-md text-cream/65">
            Scroll to watch a precision cut take shape in real time — long
            lengths shaped into a flawless, modern silhouette. The same care we
            bring to your chair, from styling to spa-grade treatments.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Layer cut", "Bob & lob", "Keratin", "Hair spa"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-gold/30 px-4 py-1.5 text-sm text-cream/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
