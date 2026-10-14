"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ABOUT_IMAGE, BUSINESS, STATS } from "@/content/site";
import { InstagramIcon } from "@/components/icons";

const STAT_ROWS = [
  { glyph: "🏆", value: STATS.experience, label: STATS.experienceLabel },
  { glyph: "💐", value: STATS.clients, label: STATS.clientsLabel },
  { glyph: "⭐", value: STATS.rating, label: STATS.ratingLabel },
];

export default function About() {
  const [src, setSrc] = useState(ABOUT_IMAGE.src);

  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr_0.7fr] lg:gap-10">
        {/* ------- story ------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-rose/80">
            About Labhonitta by Soumya
          </span>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-cream sm:text-5xl">
            Where <span className="text-gold-gradient">Passion</span>
            <br />
            Creates Perfection
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted lg:mx-0">
            For over {STATS.experience.replace("+", "")} years,{" "}
            {BUSINESS.name} has been the name {STATS.clients} brides across{" "}
            {BUSINESS.region} — and celebrities like Manju Warrier — trust. We believe every bride is unique and deserves a
            look that enhances her natural beauty and inner glow — from the
            first trial to the final touch-up on your big day.
          </p>

          <p className="mt-8 font-display text-3xl italic text-gold-gradient">
            {BUSINESS.founder}
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.26em] text-muted-soft">
            {BUSINESS.founderRole}
          </p>
          <a
            href={BUSINESS.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mx-auto mt-3 flex w-fit items-center gap-2 text-sm text-rose transition-colors hover:text-gold lg:mx-0"
          >
            <InstagramIcon /> {BUSINESS.instagramHandle}
          </a>

          <a
            href="#services"
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-rosegold to-rose px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-transform hover:scale-105"
          >
            Know More About Us
          </a>
        </motion.div>

        {/* ------- arched portrait ------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[330px] overflow-hidden rounded-t-full rounded-b-[2rem] border border-gold/25 bg-plum shadow-[0_30px_90px_-30px_rgba(0,0,0,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={ABOUT_IMAGE.alt}
              loading="lazy"
              decoding="async"
              onError={() => setSrc(ABOUT_IMAGE.fallback)}
              className="h-full w-full object-cover object-[50%_30%]"
            />
          </div>
        </motion.div>

        {/* ------- stats ------- */}
        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="order-3 mx-auto flex w-full max-w-sm flex-col divide-y divide-gold/15 lg:mx-0"
        >
          {STAT_ROWS.map((s) => (
            <li key={s.label} className="flex items-center gap-4 py-5">
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rosegold/30 to-rose/10 text-lg"
              >
                {s.glyph}
              </span>
              <span>
                <span className="block font-display text-3xl leading-none text-cream">
                  {s.value}
                </span>
                <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-muted-soft">
                  {s.label}
                </span>
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
