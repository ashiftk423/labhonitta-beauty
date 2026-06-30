"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Bridal", href: "#bridal" },
  { label: "Hair Studio", href: "#hair" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-full px-5 py-3 glass md:mt-5 md:px-8">
        <a href="#home" className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold tracking-wide text-gold-gradient">
            Labhonitta
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.35em] text-rose/70 sm:block">
            Beauty Parlour
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-cream/80 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-gradient-to-r from-rosegold to-rose px-5 py-2 text-sm font-medium text-[#1a0a14] transition-transform hover:scale-105 md:block"
        >
          Book Now
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-cream transition ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-cream transition ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-cream transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl px-6 py-4 glass md:hidden"
          >
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3 text-cream/85 hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 block rounded-full bg-gradient-to-r from-rosegold to-rose py-3 text-center font-medium text-[#1a0a14]"
              >
                Book Now
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
