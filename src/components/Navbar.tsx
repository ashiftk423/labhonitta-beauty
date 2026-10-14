"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { BUSINESS } from "@/content/site";
import { InstagramIcon, PhoneIcon, PinIcon } from "@/components/icons";

const QUICK_ACTIONS = [
  { label: "Call us", href: BUSINESS.phoneHref, Icon: PhoneIcon, external: false },
  { label: "Find us on Google Maps", href: BUSINESS.mapsUrl, Icon: PinIcon, external: true },
  { label: "Follow us on Instagram", href: BUSINESS.instagramUrl, Icon: InstagramIcon, external: true },
];

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
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
      className="flex h-8 w-8 shrink-0 md:h-9 md:w-9 items-center justify-center rounded-full border border-gold/25 text-cream transition hover:border-gold/50 hover:bg-white/5"
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

/**
 * Highlights the last linked section whose top has passed a line 35% down
 * the screen. Position-based (not visibility ratios) so sections taller than
 * the phone screen still light up, and unlinked sections in between keep the
 * previous link active.
 */
function useActiveSection() {
  const [active, setActive] = useState("#home");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = LINKS[0].href;
      for (const l of LINKS) {
        const el = document.querySelector<HTMLElement>(l.href);
        if (el && el.getBoundingClientRect().top <= line) current = l.href;
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) current = LINKS[LINKS.length - 1].href;
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return active;
}

/** Keeps the active pill visible in the swipeable mobile rail. */
function useCenterActivePill(active: string) {
  const railRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const pill = rail?.querySelector<HTMLElement>(`a[href="${active}"]`);
    if (!rail || !pill) return;
    const railBox = rail.getBoundingClientRect();
    const pillBox = pill.getBoundingClientRect();
    rail.scrollTo({
      left:
        rail.scrollLeft +
        (pillBox.left - railBox.left) -
        (railBox.width - pillBox.width) / 2,
      behavior: "smooth",
    });
  }, [active]);

  return railRef;
}

export default function Navbar() {
  const active = useActiveSection();
  const railRef = useCenterActivePill(active);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 transform-gpu [backface-visibility:hidden]"
    >
      <nav className="mx-3 mt-3 flex h-12 max-w-6xl items-center justify-between rounded-full border border-gold/15 bg-[color:var(--nav-bg)] px-3 [backface-visibility:hidden] min-[400px]:px-4 [transform:translateZ(0)] [backdrop-filter:blur(10px)] md:mx-4 md:mt-4 md:h-14 md:px-7 xl:mx-auto">
        <a href="#home" aria-label="Labhonitta by Soumya — home" className="flex items-center gap-2">
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold tracking-wide text-gold-gradient md:text-2xl">
              Labhonitta
            </span>
            <span className="-mt-0.5 self-end font-display text-[13px] italic text-rose md:text-sm">
              by Soumya
            </span>
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.35em] text-rose/70 sm:block lg:hidden xl:block">
            Beauty Parlour
          </span>
        </a>

        <ul className="hidden items-center gap-4 lg:flex xl:gap-7">
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

        <div className="flex items-center gap-1.5 md:gap-3 lg:gap-2 xl:gap-3">
          <ul className="flex items-center gap-1 md:gap-1.5">
            {QUICK_ACTIONS.map(({ label, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/25 text-gold transition hover:border-gold/60 hover:bg-white/5 md:h-9 md:w-9"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <a
            href="#contact"
            className="whitespace-nowrap rounded-full bg-gradient-to-r from-rosegold to-rose px-3 py-2 text-xs font-medium text-ink transition-transform hover:scale-105 md:px-5 md:text-sm"
          >
            Book<span className="hidden min-[400px]:inline"> Now</span>
          </a>
        </div>
      </nav>

      {/* Phones & tablets: every link stays visible in a swipeable pill rail */}
      <div className="mx-3 mt-2 md:mx-4 lg:hidden">
        <ul
          ref={railRef}
          className="no-scrollbar flex snap-x snap-mandatory items-center gap-2 overflow-x-auto rounded-full border border-gold/15 bg-[color:var(--nav-bg)] px-2 py-2 [backdrop-filter:blur(10px)]">
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
