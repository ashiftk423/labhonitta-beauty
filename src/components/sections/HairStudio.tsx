"use client";

import { useState } from "react";
import { sound } from "@/lib/sound";
import MakeoverWheel, { type WheelItem } from "@/components/MakeoverWheel";
import { useFloatingVisibility } from "@/lib/useFloatingVisibility";

const STYLES: (WheelItem & { src: string; tag: string })[] = [
  { src: "/images/hair-long.webp", label: "Long Layers", tag: "Soft natural waves", color: "#3a2218" },
  { src: "/images/hair-styled.webp", label: "Styled Lob", tag: "Sleek salon blowout", color: "#5a2b22" },
  { src: "/images/hair-straight.webp", label: "Sleek Straight", tag: "Glossy & smooth", color: "#241016" },
  { src: "/images/hair-curls.webp", label: "Bouncy Curls", tag: "Voluminous ringlets", color: "#2a1810" },
  { src: "/images/hair-updo.webp", label: "Caramel Updo", tag: "Balayage colour", color: "#8a5a2b" },
];

export default function HairStudio() {
  const [active, setActive] = useState(0);
  const { ref: cardRef, visibility } = useFloatingVisibility<HTMLDivElement>();

  const pickStyle = (i: number) => {
    setActive(i);
    sound.snip();
  };

  return (
    <section
      id="hair"
      className="relative flex min-h-[100svh] items-center justify-center px-6 py-24"
    >
      <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="order-2 lg:order-1">
          <div
            ref={cardRef}
            className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2rem] border border-gold/20 bg-plum shadow-[0_30px_120px_-30px_rgba(217,162,115,0.5)]"
          >
            {STYLES.map((s, i) => (
              <div
                key={s.src}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-[900ms] ease-out"
                style={{
                  backgroundImage: `url(${s.src})`,
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

        <div className="order-1 flex flex-col items-center text-center lg:order-2 lg:items-start lg:text-left">
          <span className="text-xs uppercase tracking-[0.4em] text-rose/80">
            The Hair Studio
          </span>
          <h2 className="mt-3 font-display text-4xl font-light leading-tight sm:text-6xl">
            Find your <span className="text-gold-gradient">signature</span> style
          </h2>
          <p className="mt-5 max-w-md text-cream/65">
            Spin the wheel to preview salon hairstyles — cuts, curls, sleek
            blowouts and colour. The same craft we bring to your chair, from
            styling to spa-grade treatments.
          </p>

          <div className="mt-6">
            <p className="font-display text-2xl leading-none text-gold-gradient">
              {STYLES[active].label}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-cream/50">
              {STYLES[active].tag}
            </p>
          </div>

          <div className="lg:mt-7">
            <MakeoverWheel
              items={STYLES}
              value={active}
              onChange={pickStyle}
              icon="✂"
              visibility={visibility}
            />
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
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
