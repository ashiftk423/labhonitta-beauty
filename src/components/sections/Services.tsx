"use client";

import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "Bridal Makeup",
    desc: "Signature HD & airbrush bridal looks that last from the muhurtham to the last dance.",
    points: ["HD / Airbrush", "Engagement & Reception", "Trial session"],
    glyph: "💍",
  },
  {
    title: "Artist Makeup",
    desc: "Editorial, party and event makeovers sculpted to your features and the occasion.",
    points: ["Party glam", "Saree draping", "Photoshoot looks"],
    glyph: "✦",
  },
  {
    title: "Hair Cutting",
    desc: "Precision cuts and styling — from classic layers to bold modern silhouettes.",
    points: ["Layer & blunt cuts", "Blow-dry styling", "Kids friendly"],
    glyph: "✂",
  },
  {
    title: "Hair Treatment",
    desc: "Smoothening, keratin, spa and repair therapies for healthy, luminous hair.",
    points: ["Keratin & smoothening", "Hair spa", "Anti-dandruff"],
    glyph: "🌿",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
      <div className="mb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.4em] text-rose/80"
        >
          What we craft
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-3 font-display text-4xl font-light sm:text-6xl"
        >
          Our <span className="text-gold-gradient">Signature Services</span>
        </motion.h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-3xl p-7 glass"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-rosegold/20 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rosegold/30 to-rose/10 text-2xl">
              {s.glyph}
            </div>
            <h3 className="font-display text-2xl text-cream">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/65">{s.desc}</p>
            <ul className="mt-5 space-y-2">
              {s.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-cream/75">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
