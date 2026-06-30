"use client";

import { useState } from "react";
import MakeoverWheel, { type WheelItem } from "@/components/MakeoverWheel";
import { useFloatingVisibility } from "@/lib/useFloatingVisibility";

const LOOKS: (WheelItem & { src: string; tag: string })[] = [
  { src: "/images/bride-after.webp", label: "Signature Bridal", tag: "HD bridal glam", color: "#e9c98b" },
  { src: "/images/look-1.webp", label: "Classic Red Bridal", tag: "Traditional · temple gold", color: "#c0392b" },
  { src: "/images/look-2.webp", label: "Rose Romance", tag: "Soft dewy party glam", color: "#e8a6b8" },
  { src: "/images/look-3.webp", label: "Golden Reception", tag: "Bronze & champagne", color: "#d9a273" },
  { src: "/images/look-4.webp", label: "Bold Modern Diva", tag: "Editorial smokey", color: "#7a2e4a" },
];

export default function MakeupTransformation() {
  const [active, setActive] = useState(0);
  const { ref: cardRef, visibility } = useFloatingVisibility<HTMLDivElement>();

  const pickLook = (i: number) => {
    setActive(i);
  };

  return (
    <section
      id="bridal"
      className="relative flex min-h-[100svh] items-center justify-center px-6 py-24"
    >
      <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="text-xs uppercase tracking-[0.4em] text-rose/80">
            The Bridal Lookbook
          </span>
          <h2 className="mt-3 font-display text-4xl font-light leading-tight sm:text-6xl">
            One muse, <span className="text-gold-gradient">infinite looks</span>
          </h2>
          <p className="mt-5 max-w-md text-cream/65">
            Spin the makeover wheel to glide through our signature
            transformations — from classic red bridal to bold editorial glam.
          </p>

          <div className="mt-6">
            <p className="font-display text-2xl leading-none text-gold-gradient">
              {LOOKS[active].label}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-cream/50">
              {LOOKS[active].tag}
            </p>
          </div>

          <div className="lg:mt-7">
            <MakeoverWheel
              items={LOOKS}
              value={active}
              onChange={pickLook}
              icon="💄"
              visibility={visibility}
            />
          </div>
        </div>

        <div
          ref={cardRef}
          className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2rem] border border-gold/20 bg-plum shadow-[0_30px_120px_-30px_rgba(217,162,115,0.5)]"
        >
          {LOOKS.map((l, i) => (
            <div
              key={l.src}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-[900ms] ease-out"
              style={{
                backgroundImage: `url(${l.src})`,
                opacity: i === active ? 1 : 0,
                animation: i === active ? "kenburns 7s ease-out forwards" : "none",
              }}
            />
          ))}
          <div
            key={active}
            className="pointer-events-none absolute inset-0 z-10"
            style={{ animation: "sheen 1s ease-out forwards" }}
          />
        </div>
      </div>
    </section>
  );
}
