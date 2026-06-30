"use client";

import { motion } from "framer-motion";

/**
 * Masonry-ish portfolio grid. Replace each gradient tile with real work by
 * dropping photos into /public/images/gallery and swapping the `bg` style.
 */
const ITEMS = [
  { label: "Bridal Glam", span: "row-span-2", grad: "from-rose/40 to-plum" },
  { label: "Reception Look", span: "", grad: "from-rosegold/40 to-plum" },
  { label: "Layer Cut", span: "", grad: "from-gold/30 to-plum" },
  { label: "Engagement", span: "row-span-2", grad: "from-rose/30 to-plum" },
  { label: "Keratin Shine", span: "", grad: "from-rosegold/30 to-plum" },
  { label: "Party Makeover", span: "", grad: "from-gold/40 to-plum" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-6 py-28 md:py-36">
      <div className="mb-14 text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-rose/80">
          Real brides, real glow
        </span>
        <h2 className="mt-3 font-display text-4xl font-light sm:text-6xl">
          The <span className="text-gold-gradient">Gallery</span>
        </h2>
      </div>

      <div className="grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-3">
        {ITEMS.map((it, i) => (
          <motion.figure
            key={it.label}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ scale: 1.02 }}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${it.grad} ${it.span}`}
          >
            <div className="absolute inset-0 flex items-end p-5">
              <figcaption className="translate-y-2 font-display text-xl text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {it.label}
              </figcaption>
            </div>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
