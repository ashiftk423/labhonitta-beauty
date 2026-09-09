"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getWorkShowcase } from "@/content/media";

/**
 * Landing-page proof of work: a continuous marquee of real salon photos.
 * Pauses on hover/focus, and each card is a link into the gallery.
 */
export default function WorkShowcase() {
  const work = getWorkShowcase();
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const usable = work.filter((w) => !failed[w.src]);

  if (usable.length === 0) return null;

  // Duplicated once so the -50% translate loops seamlessly.
  const track = [...usable, ...usable];

  return (
    <section
      id="work"
      className="relative overflow-hidden py-16 md:py-20"
      aria-label="Our recent work"
    >
      <div className="mx-auto mb-8 max-w-7xl px-6 text-center md:mb-10">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.4em] text-rose/80"
        >
          Straight from our chair
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-3 font-display text-3xl font-light sm:text-5xl"
        >
          Our <span className="text-gold-gradient">Recent Work</span>
        </motion.h2>
      </div>

      <div className="work-marquee-track relative">
        {/* Soft edge fades so cards melt into the page background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[color:var(--bg)] to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[color:var(--bg)] to-transparent md:w-28" />

        <ul className="animate-work-marquee flex w-max gap-4 md:gap-6">
          {track.map((item, i) => (
            <li key={`${item.src}-${i}`} className="shrink-0">
              <a
                href="#gallery"
                className="group relative block h-[230px] w-[172px] overflow-hidden rounded-2xl border border-[color:var(--card-border)] bg-plum focus:outline-none focus-visible:ring-2 focus-visible:ring-gold md:h-[320px] md:w-[240px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onError={() =>
                    setFailed((f) => ({ ...f, [item.src]: true }))
                  }
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3.5 text-left md:p-4">
                  <p className="font-display text-base leading-tight text-white md:text-lg">
                    {item.label}
                  </p>
                  {item.tag && (
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/70">
                      {item.tag}
                    </p>
                  )}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-center md:mt-10">
        <a
          href="#gallery"
          className="inline-block rounded-full border border-gold/50 px-7 py-3 text-sm font-medium text-gold transition-colors hover:border-gold hover:bg-gold/10"
        >
          View the full gallery
        </a>
      </div>
    </section>
  );
}
