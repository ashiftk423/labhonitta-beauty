"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Bridal", href: "#bridal" },
  { label: "Hair Studio", href: "#hair" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 text-cream transition hover:border-gold/50 hover:bg-white/5"
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M20.5 14.2A8.2 8.2 0 0 1 9.8 3.5 7.4 7.4 0 1 0 20.5 14.2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 transform-gpu [backface-visibility:hidden]"
    >
      <nav className="mx-3 mt-3 flex h-12 max-w-6xl items-center justify-between rounded-full border border-gold/15 bg-[color:var(--nav-bg)] px-4 [backface-visibility:hidden] [transform:translateZ(0)] [backdrop-filter:blur(10px)] md:mx-auto md:mt-4 md:h-14 md:px-7">
        <a href="#home" className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold tracking-wide text-gold-gradient md:text-2xl">
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

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-rosegold to-rose px-5 py-2 text-sm font-medium text-ink transition-transform hover:scale-105"
          >
            Book Now
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`h-0.5 w-6 bg-cream transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-cream transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-cream transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-3 mt-2 overflow-hidden rounded-3xl px-6 py-4 glass-drawer md:hidden"
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
                className="mt-3 block rounded-full bg-gradient-to-r from-rosegold to-rose py-3 text-center font-medium text-ink"
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
