"use client";

import { motion } from "framer-motion";
import HeroOrnament from "@/components/HeroOrnament";

const fade = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
    >
      {/* Elegant animated salon-themed centerpiece (no photos) */}
      <HeroOrnament />

      <motion.p
        custom={0}
        variants={fade}
        initial="hidden"
        animate="show"
        className="mb-5 text-xs uppercase tracking-[0.5em] text-rose/80"
      >
        Thrissur · Kerala · Since the heart of bridal artistry
      </motion.p>

      <motion.h1
        custom={1}
        variants={fade}
        initial="hidden"
        animate="show"
        className="font-display text-5xl font-light leading-[0.95] sm:text-7xl md:text-8xl lg:text-[8.5rem]"
      >
        <span className="block text-cream">Where Beauty</span>
        <span className="block text-gold-gradient animate-shimmer">Becomes Art</span>
      </motion.h1>

      <motion.p
        custom={2}
        variants={fade}
        initial="hidden"
        animate="show"
        className="mt-7 max-w-xl text-base text-cream/70 sm:text-lg"
      >
        Bridal makeup, artist makeovers, precision hair cutting & rejuvenating
        treatments — crafted into a flawless transformation, just for you.
      </motion.p>

      <motion.div
        custom={3}
        variants={fade}
        initial="hidden"
        animate="show"
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <a
          href="#bridal"
          className="rounded-full bg-gradient-to-r from-gold via-rosegold to-rose px-8 py-3.5 font-medium text-[#1a0a14] shadow-[0_0_40px_-8px_rgba(217,162,115,0.7)] transition-transform hover:scale-105"
        >
          See the Transformation
        </a>
        <a
          href="#services"
          className="rounded-full border border-gold/40 px-8 py-3.5 font-medium text-cream/90 transition-colors hover:border-gold hover:text-gold"
        >
          Explore Services
        </a>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-cream/50">
          Scroll
        </span>
        <span className="relative h-10 w-6 rounded-full border border-cream/30">
          <motion.span
            animate={{ y: [4, 16, 4] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold"
          />
        </span>
      </motion.div>
    </section>
  );
}
