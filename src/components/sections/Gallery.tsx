"use client";

import { motion } from "framer-motion";
import { GALLERY_SLOTS } from "@/content/media";
import GallerySlotCard from "@/components/GallerySlotCard";

/**
 * Fixed 6-slot masonry gallery. Each slot has its own size + image list
 * (see src/content/media.ts and public/images/gallery/slot-*).
 * Images auto-slide every 3s; swipe / press-drag for prev/next.
 */
export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-6 py-28 md:py-36">
      <div className="mb-14 text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-rose/80">
          Real brides, real glow
        </span>
        <h2 className="mt-3 font-display text-4xl font-light text-cream sm:text-6xl">
          The <span className="text-gold-gradient">Gallery</span>
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 max-w-md text-sm text-muted"
        >
          Swipe or hold a tile to browse — each frame is sized for its own slot.
        </motion.p>
      </div>

      <div className="grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-3">
        {GALLERY_SLOTS.map((slot, i) => (
          <GallerySlotCard key={slot.id} slot={slot} index={i} />
        ))}
      </div>
    </section>
  );
}
