"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { BUSINESS, HERO_SEALS, STATS } from "@/content/site";
import { getBridalLooks } from "@/content/media";
import MakeoverWheel, { type WheelItem } from "@/components/MakeoverWheel";
import SwipeNav from "@/components/SwipeNav";
import { isNear } from "@/lib/isNear";
import { useSwipe } from "@/lib/useSwipe";
import { useFloatingVisibility } from "@/lib/useFloatingVisibility";
import { useAutoSlide } from "@/lib/useAutoSlide";

const LOOKS = getBridalLooks() as (WheelItem & {
  src: string;
  tag?: string;
  focus?: string;
})[];

const fade = {
  hidden: { opacity: 0, y: 34 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.25 + i * 0.13,
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

/** Small art-deco divider under the headline. */
function Ornament() {
  return (
    <span className="mt-7 flex items-center gap-3" aria-hidden>
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-rosegold sm:w-20" />
      <svg width="34" height="12" viewBox="0 0 34 12" fill="none">
        <path
          d="M17 1c3 0 4.5 2 7 2s3.5-1.4 5-1.4M17 1c-3 0-4.5 2-7 2S6.5 1.6 5 1.6M17 11c3 0 4.5-2 7-2s3.5 1.4 5 1.4M17 11c-3 0-4.5-2-7-2s-3.5 1.4-5 1.4"
          stroke="currentColor"
          className="text-rosegold"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <circle cx="17" cy="6" r="2.4" className="fill-gold" />
      </svg>
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-rosegold sm:w-20" />
    </span>
  );
}

function Seal({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="flex h-[88px] w-[88px] flex-col items-center justify-center rounded-full border border-gold/45 bg-[color:var(--surface)]/85 px-2 text-center sm:h-[104px] sm:w-[104px] sm:px-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] [backdrop-filter:blur(10px)] md:h-[126px] md:w-[126px]">
      {top && (
        <span className="font-display text-xl leading-none text-gold-gradient sm:text-2xl md:text-3xl">
          {top}
        </span>
      )}
      <span
        className={`whitespace-pre-line text-[8px] uppercase leading-[1.5] tracking-[0.16em] text-cream/80 md:text-[9px] ${
          top ? "mt-1" : ""
        }`}
      >
        {bottom}
      </span>
    </div>
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);
  const lastTouchRef = useRef(0);
  const pick = (i: number) => {
    lastTouchRef.current = Date.now();
    setActive(i);
  };
  const step = (dir: 1 | -1) => {
    lastTouchRef.current = Date.now();
    setActive((i) => (i + dir + LOOKS.length) % LOOKS.length);
  };
  const swipe = useSwipe(step);
  const { ref: cardRef, visibility } = useFloatingVisibility<HTMLDivElement>();
  useAutoSlide(cardRef, lastTouchRef, () =>
    setActive((i) => (i + 1) % LOOKS.length)
  );

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center px-5 pb-16 pt-32 sm:px-6 md:pb-20 md:pt-28 lg:pt-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.02fr] lg:gap-8">
        {/* ---------------- copy ---------------- */}
        <div className="relative z-20 order-1 text-center lg:text-left">
          <motion.p
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="font-display text-2xl italic text-rose sm:text-3xl"
          >
            Don&apos;t just makeup,
          </motion.p>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-2 font-display text-4xl font-light leading-[1.08] text-cream sm:text-5xl lg:text-6xl xl:text-[4.2rem]"
          >
            We will bring out the{" "}
            <span className="text-gold-gradient animate-shimmer">
              best bride
            </span>{" "}
            in you.
          </motion.h1>

          <motion.div
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="flex justify-center lg:justify-start"
          >
            <Ornament />
          </motion.div>

          <motion.p
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mx-auto mt-7 max-w-md text-[15px] leading-relaxed text-muted lg:mx-0"
          >
            Celebrity makeup artist with {STATS.experience} years of
            expertise — bridal makeup, artist makeovers, hair styling and
            treatments, trusted by {STATS.clients} happy brides across{" "}
            {BUSINESS.region}.
          </motion.p>

          <motion.div
            custom={4}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold via-rosegold to-rose px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink shadow-[0_0_40px_-10px_rgba(232,197,71,0.6)] transition-transform hover:scale-105"
            >
              Book Your Appointment
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#work"
              className="rounded-full border border-gold/45 px-7 py-3.5 text-sm font-medium text-gold transition-colors hover:border-gold hover:bg-gold/10"
            >
              See our work
            </a>
          </motion.div>

          {/* desktop: wheel under the copy (phones get the floating one below) */}
          <motion.div
            custom={5}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 hidden items-center gap-7 lg:flex"
          >
            <MakeoverWheel
              items={LOOKS}
              value={active}
              onChange={pick}
              icon="💄"
              compact
            />
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-rose/80">
                Bridal lookbook · {active + 1}/{LOOKS.length}
              </span>
              <p className="mt-2 font-display text-3xl leading-tight text-gold-gradient">
                {LOOKS[active]?.label}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-soft">
                {LOOKS[active]?.tag}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ---------------- bridal lookbook card ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2"
        >
          <div
            ref={cardRef}
            {...swipe}
            className="relative mx-auto aspect-[4/5] w-full max-w-[420px] touch-pan-y select-none overflow-hidden rounded-[2rem] border border-gold/25 bg-plum shadow-[0_40px_120px_-40px_rgba(0,0,0,0.55)] sm:aspect-[3/4] lg:max-w-none lg:rounded-[2.5rem]"
          >
            {LOOKS.map((l, i) =>
              isNear(i, active, LOOKS.length) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={l.src}
                  src={l.src}
                  alt={i === active ? `${l.label} — bridal makeup by ${BUSINESS.founder}` : ""}
                  fetchPriority={i === 0 ? "high" : undefined}
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out"
                  style={{
                    objectPosition: l.focus ?? "50% 20%",
                    backgroundColor: l.color,
                    opacity: i === active ? 1 : 0,
                    animation: i === active ? "kenburns 7s ease-out forwards" : "none",
                  }}
                />
              ) : null
            )}
            <div
              key={active}
              className="pointer-events-none absolute inset-0 z-10"
              style={{ animation: "sheen 1s ease-out forwards" }}
            />
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[color:var(--bg)]/45 lg:via-transparent lg:to-transparent" />

            <SwipeNav
              index={active}
              count={LOOKS.length}
              onStep={step}
              className="absolute bottom-4 left-4 z-20 lg:bottom-auto lg:top-4"
            />
          </div>
          {/* phones & tablets: look name under the photo; the wheel floats like Hair Studio's */}
          <div className="mt-5 text-center lg:hidden">
            <p className="font-display text-2xl leading-none text-gold-gradient">
              {LOOKS[active]?.label}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-soft">
              {LOOKS[active]?.tag}
            </p>
          </div>

          {/* phones: a row under the look name · desktop: overlapping the photo's left edge */}
          <div className="mt-5 flex justify-center gap-2 sm:gap-3 lg:absolute lg:left-0 lg:bottom-10 lg:mt-0 lg:flex-col lg:gap-4">
            {HERO_SEALS.map((s) => (
              <Seal key={s.bottom} top={s.top} bottom={s.bottom} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Outside the scaled card wrapper so `position: fixed` stays tied to the screen */}
      <div className="lg:hidden">
        <MakeoverWheel
          items={LOOKS}
          value={active}
          onChange={pick}
          icon="💄"
          visibility={visibility}
        />
      </div>
    </section>
  );
}
