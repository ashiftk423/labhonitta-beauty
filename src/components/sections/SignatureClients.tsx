"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getSignatureWork } from "@/content/media";

/** Celebrity clients — the strongest trust signal on the page. */
export default function SignatureClients() {
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const items = getSignatureWork().filter((w) => !failed[w.src]);
  if (items.length === 0) return null;

  return (
    <section
      id="signature"
      className="mx-auto max-w-6xl px-6 py-16 md:py-24"
      aria-label="Celebrity clients"
    >
      <div className="mb-10 text-center md:mb-14">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.4em] text-rose/80"
        >
          Signature Work
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-3 font-display text-3xl font-light sm:text-5xl"
        >
          Trusted by the <span className="text-gold-gradient">Stars</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted"
        >
          From celebrities like Manju Warrier to every bride in our chair — the
          same care, the same craft.
        </motion.p>
      </div>

      <ul className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {items.map((item, i) => (
          <motion.li
            key={item.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group relative aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-gold/25 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.5)]"
            style={{ backgroundColor: item.color }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.label}
              loading="lazy"
              decoding="async"
              onError={() => setFailed((f) => ({ ...f, [item.src]: true }))}
              style={{ objectPosition: item.focus }}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
            <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/35 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-white/90 [backdrop-filter:blur(6px)]">
              ★ {item.tag}
            </span>
            <p className="absolute inset-x-0 bottom-0 p-4 font-display text-lg leading-tight text-white md:text-xl">
              {item.label}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
