"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
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
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/25 text-cream transition hover:border-gold/50 hover:bg-white/5"
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

/** Highlights whichever section is currently filling the viewport. */
function useActiveSection() {
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const sections = LINKS.map((l) =>
      document.querySelector<HTMLElement>(l.href)
    ).filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -35% 0px" }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return active;
}

export default function Navbar() {
  const active = useActiveSection();

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
                aria-current={active === l.href ? "page" : undefined}
                className={`text-sm transition-colors hover:text-gold ${
                  active === l.href ? "text-gold" : "text-cream/80"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-rosegold to-rose px-4 py-2 text-xs font-medium text-ink transition-transform hover:scale-105 md:px-5 md:text-sm"
          >
            Book Now
          </a>
        </div>
      </nav>

      {/* Phones & small tablets: every link stays visible in a swipeable pill rail */}
      <div className="mx-3 mt-2 md:hidden">
        <ul className="no-scrollbar flex snap-x snap-mandatory items-center gap-2 overflow-x-auto rounded-full border border-gold/15 bg-[color:var(--nav-bg)] px-2 py-2 [backdrop-filter:blur(10px)]">
          {LINKS.map((l) => (
            <li key={l.href} className="snap-start">
              <a
                href={l.href}
                aria-current={active === l.href ? "page" : undefined}
                className={`block whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active === l.href
                    ? "bg-gradient-to-r from-rosegold to-rose text-ink"
                    : "border border-gold/20 text-cream/80"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.header>
  );
}
