"use client";

import { motion } from "framer-motion";
import { SERVICE_STRIP } from "@/content/site";

/**
 * Slim service bar sitting directly under the hero — six quick entry points
 * into what the parlour offers. Scrolls sideways on phones.
 */
export default function ServiceStrip() {
  return (
    <section aria-label="What we offer" className="px-3 pt-10 sm:px-6 md:pt-14">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-7xl rounded-3xl border border-gold/20 bg-[color:var(--glass-bg)] px-2 py-2 [backdrop-filter:blur(12px)] md:px-4 md:py-3"
      >
        <ul className="no-scrollbar flex snap-x snap-mandatory divide-x divide-gold/15 overflow-x-auto">
          {SERVICE_STRIP.map((s) => (
            <li key={s.title} className="min-w-[210px] flex-1 snap-start md:min-w-0">
              <a
                href={s.href}
                className="flex h-full items-start gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-gold/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rosegold/30 to-rose/10 text-base"
                >
                  {s.glyph}
                </span>
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-cream">
                    {s.title}
                  </span>
                  <span className="mt-1 block text-[11px] leading-snug text-muted-soft">
                    {s.desc}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
