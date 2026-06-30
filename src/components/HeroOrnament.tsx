"use client";

import { motion } from "framer-motion";

/**
 * Elegant animated centerpiece for the hero — no photos. Concentric art-deco
 * rings rotate slowly, refined gold beauty-tool glyphs orbit and float, and
 * sparkles drift. Pure SVG + Framer Motion, smooth and very light.
 */

const TOOLS = [
  // makeup brush
  "M14 3.5c1.4-1.4 3.6-1.4 5 0s1.4 3.6 0 5L11 16.5l-5 1 1-5L14 3.5Z",
  // lipstick
  "M9 2h6v5H9V2Zm-1 6h8v3a4 4 0 0 1-4 4 4 4 0 0 1-4-4V8Zm1 10h6v4H9v-4Z",
  // scissors
  "M6 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8.5 9.5 21 18M8.5 14.5 21 6",
  // flower
  "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-6c2 0 3 2 3 4s-1 2-3 2-3 0-3-2 1-4 3-4Zm0 20c-2 0-3-2-3-4s1-2 3-2 3 0 3 2-1 4-3 4ZM2 12c0-2 2-3 4-3s2 1 2 3-0 3-2 3-4-1-4-3Zm20 0c0 2-2 3-4 3s-2-1-2-3 0-3 2-3 4 1 4 3Z",
];

export default function HeroOrnament() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
      <div className="relative h-[min(78vw,560px)] w-[min(78vw,560px)]">
        {/* soft glow core */}
        <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(closest-side,rgba(217,162,115,0.16),rgba(232,166,184,0.06),transparent)] blur-2xl" />

        {/* rotating rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-dashed border-gold/25"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          className="absolute inset-[10%] rounded-full border border-rose/20"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          className="absolute inset-[22%] rounded-full border border-dashed border-rosegold/30"
        />

        {/* breathing inner ring */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          className="absolute inset-[33%] rounded-full border border-gold/40"
        />

        {/* orbiting beauty tools */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 38, ease: "linear", repeat: Infinity }}
          className="absolute inset-0"
        >
          {TOOLS.map((d, i) => {
            const angle = (i / TOOLS.length) * Math.PI * 2;
            const r = 46; // % radius
            const x = 50 + Math.cos(angle) * r;
            const y = 50 + Math.sin(angle) * r;
            return (
              <motion.div
                key={i}
                className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full glass"
                style={{ left: `${x}%`, top: `${y}%` }}
                animate={{ rotate: -360 }}
                transition={{ duration: 38, ease: "linear", repeat: Infinity }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="url(#og)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <defs>
                    <linearGradient id="og" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f6e3b8" />
                      <stop offset="100%" stopColor="#e8a6b8" />
                    </linearGradient>
                  </defs>
                  <path d={d} />
                </svg>
              </motion.div>
            );
          })}
        </motion.div>

        {/* drifting sparkles */}
        {Array.from({ length: 14 }).map((_, i) => {
          const left = (i * 37) % 100;
          const delay = (i % 7) * 0.6;
          return (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-gold"
              style={{ left: `${left}%`, top: `${(i * 53) % 100}%` }}
              animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4] }}
              transition={{
                duration: 2.6,
                delay,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
