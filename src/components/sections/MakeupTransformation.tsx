"use client";

import { useState } from "react";
import MakeoverWheel, { type WheelItem } from "@/components/MakeoverWheel";
import { useFloatingVisibility } from "@/lib/useFloatingVisibility";
import { getBridalLooks } from "@/content/media";
import { isNear } from "@/lib/isNear";
import { useSwipe } from "@/lib/useSwipe";
import SwipeNav from "@/components/SwipeNav";

export default function MakeupTransformation() {
  const LOOKS = getBridalLooks() as (WheelItem & {
    src: string;
    tag?: string;
    focus?: string;
  })[];
  const [active, setActive] = useState(0);
  const { ref: cardRef, visibility } = useFloatingVisibility<HTMLDivElement>();

  const pickLook = (i: number) => {
    setActive(i);
  };
  const step = (dir: 1 | -1) =>
    setActive((i) => (i + dir + LOOKS.length) % LOOKS.length);
  const swipe = useSwipe(step);

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
          <h2 className="mt-3 font-display text-4xl font-light leading-tight text-cream sm:text-6xl">
            One muse, <span className="text-gold-gradient">infinite looks</span>
          </h2>
          <p className="mt-5 max-w-md text-muted">
            Swipe the photo or spin the makeover wheel to glide through our signature
            transformations — from classic red bridal to bold editorial glam.
          </p>

          <div className="mt-6">
            <p className="font-display text-2xl leading-none text-gold-gradient">
              {LOOKS[active]?.label}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-soft">
              {LOOKS[active]?.tag}
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
          {...swipe}
          className="relative mx-auto aspect-[3/4] w-full max-w-md touch-pan-y select-none overflow-hidden rounded-[2rem] border border-gold/20 bg-plum shadow-[0_30px_120px_-30px_rgba(217,162,115,0.5)]"
        >
          {LOOKS.map((l, i) =>
            isNear(i, active, LOOKS.length) ? (
              <div
                key={l.src}
                className="absolute inset-0 bg-cover transition-opacity duration-[900ms] ease-out"
                style={{
                  backgroundImage: `url(${l.src})`,
                  backgroundPosition: l.focus ?? "center",
                  backgroundColor: l.color,
                  opacity: i === active ? 1 : 0,
                  animation:
                    i === active ? "kenburns 7s ease-out forwards" : "none",
                }}
              />
            ) : null
          )}
          <div
            key={active}
            className="pointer-events-none absolute inset-0 z-10"
            style={{ animation: "sheen 1s ease-out forwards" }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/45 to-transparent" />
          <SwipeNav
            index={active}
            count={LOOKS.length}
            onStep={step}
            className="absolute bottom-4 left-4 z-20"
          />
        </div>
      </div>
    </section>
  );
}
