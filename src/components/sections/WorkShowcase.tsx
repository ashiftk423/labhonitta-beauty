"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getWorkShowcase } from "@/content/media";

const AUTO_SPEED = 40;
const RESUME_AFTER_MS = 2500;

/**
 * Landing-page proof of work: an endless strip of salon photos that drifts on
 * its own and can also be swiped, dragged, trackpad-scrolled or stepped with
 * the arrow buttons. Auto-scroll resumes shortly after the visitor lets go.
 */
export default function WorkShowcase() {
  const work = getWorkShowcase();
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const usable = work.filter((w) => !failed[w.src]);

  const scrollerRef = useRef<HTMLUListElement>(null);
  const pos = useRef(0);
  const pausedUntil = useRef(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(
    null
  );

  const pause = (ms = RESUME_AFTER_MS) => {
    pausedUntil.current = performance.now() + ms;
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let raf = 0;
    let last = performance.now();

    const tick = (t: number) => {
      const dt = Math.min(64, t - last);
      last = t;
      const half = el.scrollWidth / 2;
      const auto =
        !reduce &&
        !drag.current &&
        !document.hidden &&
        t > pausedUntil.current;

      pos.current = auto
        ? pos.current + (AUTO_SPEED * dt) / 1000
        : el.scrollLeft;

      // The list is rendered twice, so jumping by half its width is invisible.
      if (half > 0) {
        if (pos.current >= half) pos.current -= half;
        else if (pos.current <= 0) pos.current += half;
      }
      if (Math.abs(el.scrollLeft - pos.current) > 0.5) {
        el.scrollLeft = pos.current;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Lenis owns vertical wheel scrolling on the window, so sideways trackpad
    // gestures over the strip are handled here before they reach it.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      e.stopPropagation();
      pause();
      el.scrollLeft += e.deltaX;
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("wheel", onWheel);
    };
  }, [usable.length]);

  if (usable.length === 0) return null;

  const track = [...usable, ...usable];

  const step = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    pause(RESUME_AFTER_MS + 600);
    el.scrollBy({ left: dir * (card.clientWidth + 20), behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    pause();
    if (e.pointerType !== "mouse") return;
    drag.current = {
      x: e.clientX,
      left: e.currentTarget.scrollLeft,
      moved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    e.currentTarget.scrollLeft = d.left - dx;
  };

  const endDrag = () => {
    if (!drag.current) return;
    const moved = drag.current.moved;
    drag.current = null;
    pause();
    if (moved) {
      // Swallow the click that follows a drag so cards don't navigate.
      window.addEventListener(
        "click",
        (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
        },
        { capture: true, once: true }
      );
    }
  };

  const arrowBtn =
    "absolute top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-[color:var(--nav-bg)] text-lg text-cream shadow-lg [backdrop-filter:blur(10px)] transition hover:border-gold/60 hover:text-gold sm:flex";

  return (
    <section
      id="work"
      className="relative overflow-hidden py-16 md:py-20"
      aria-label="Our recent work"
    >
      <div className="mx-auto mb-8 max-w-7xl px-6 text-center md:mb-10">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.4em] text-rose/80"
        >
          Straight from our chair
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-3 font-display text-3xl font-light sm:text-5xl"
        >
          Our <span className="text-gold-gradient">Recent Work</span>
        </motion.h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[color:var(--bg)] to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[color:var(--bg)] to-transparent md:w-28" />

        <button
          type="button"
          aria-label="Previous work"
          onClick={() => step(-1)}
          className={`${arrowBtn} left-4 md:left-8`}
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next work"
          onClick={() => step(1)}
          className={`${arrowBtn} right-4 md:right-8`}
        >
          →
        </button>

        <ul
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onTouchStart={() => pause()}
          onTouchEnd={() => pause()}
          onFocus={() => pause(6000)}
          className="no-scrollbar flex cursor-grab select-none gap-4 overflow-x-auto px-4 active:cursor-grabbing md:gap-6"
        >
          {track.map((item, i) => (
            <li key={`${item.src}-${i}`} className="shrink-0">
              <a
                href="#gallery"
                draggable={false}
                tabIndex={i < usable.length ? 0 : -1}
                aria-hidden={i >= usable.length ? true : undefined}
                className="group relative block h-[230px] w-[172px] overflow-hidden rounded-2xl border border-[color:var(--card-border)] bg-plum focus:outline-none focus-visible:ring-2 focus-visible:ring-gold md:h-[320px] md:w-[240px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onError={() =>
                    setFailed((f) => ({ ...f, [item.src]: true }))
                  }
                  style={{
                    objectPosition: item.focus,
                    backgroundColor: item.color,
                  }}
                  className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3.5 text-left md:p-4">
                  <p className="font-display text-base leading-tight text-white md:text-lg">
                    {item.label}
                  </p>
                  {item.tag && (
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/70">
                      {item.tag}
                    </p>
                  )}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-center md:mt-10">
        <a
          href="#gallery"
          className="inline-block rounded-full border border-gold/50 px-7 py-3 text-sm font-medium text-gold transition-colors hover:border-gold hover:bg-gold/10"
        >
          View the full gallery
        </a>
      </div>
    </section>
  );
}
