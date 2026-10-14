"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BUSINESS, HERO_SEALS, STATS } from "@/content/site";
import { getBridalLooks } from "@/content/media";
import MakeoverWheel, { type WheelItem } from "@/components/MakeoverWheel";
import SwipeNav from "@/components/SwipeNav";
import { isNear } from "@/lib/isNear";
import { useSwipe } from "@/lib/useSwipe";

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
    <div className="flex h-[104px] w-[104px] flex-col items-center justify-center rounded-full border border-gold/45 bg-[color:var(--surface)]/85 px-3 text-center shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] [backdrop-filter:blur(10px)] md:h-[126px] md:w-[126px]">
      {top && (
        <span className="font-display text-2xl leading-none text-gold-gradient md:text-3xl">
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
  const step = (dir: 1 | -1) =>
    setActive((i) => (i + dir + LOOKS.length) % LOOKS.length);
  const swipe = useSwipe(step);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center px-5 pb-16 pt-32 sm:px-6 md:pb-20 md:pt-28"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.02fr] lg:gap-8">
        {/* ---------------- copy ---------------- */}
        <div className="relative z-20 order-2 text-center lg:order-1 lg:text-left">
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
        </div>

        {/* ---------------- bridal lookbook card ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 lg:order-2"
        >
          <div
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
              className="absolute left-4 top-4 z-20"
            />
            <MakeoverWheel
              items={LOOKS}
              value={active}
              onChange={setActive}
              icon="💄"
              onCard
              className="absolute bottom-[84px] right-3 sm:bottom-[92px] lg:bottom-auto lg:right-5 lg:top-5"
            />
          </div>

          {/* seals overlap the bottom-left corner of the photo */}
          <div className="absolute -bottom-7 left-1/2 flex -translate-x-1/2 gap-3 lg:left-auto lg:right-auto lg:-left-14 lg:bottom-10 lg:translate-x-0 lg:flex-col lg:gap-4">
            {HERO_SEALS.map((s) => (
              <Seal key={s.bottom} top={s.top} bottom={s.bottom} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
