"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { GallerySlot } from "@/content/media";
import { useSwipe } from "@/lib/useSwipe";

const SLIDE_MS = 3000;
const HOLD_AFTER_SWIPE_MS = 5000;

type Props = {
  slot: GallerySlot;
  index: number;
};

/**
 * One gallery container: own image list, auto-advance every 3s,
 * swipe / drag left-right, pause while pressed or hovered.
 */
export default function GallerySlotCard({ slot, index }: Props) {
  const images = slot.images;
  const hasImages = images.length > 0;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const pressed = useRef(false);
  const resumeTimer = useRef<number | null>(null);

  const usable = images.filter((img) => !failed[img.src]);
  const count = usable.length;
  const showImage = count > 0;
  const current = count > 0 ? active % count : 0;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (count < 2) return;
      setActive((i) => (i + dir + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (!showImage || count < 2 || paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setInterval(() => go(1), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [showImage, count, paused, go]);

  // After a manual swipe, hold the photo a little longer before auto-play resumes.
  const holdManual = useCallback(() => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      if (!pressed.current) setPaused(false);
    }, HOLD_AFTER_SWIPE_MS);
  }, []);

  useEffect(
    () => () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    },
    []
  );

  const swipe = useSwipe((dir) => go(dir));

  const onPointerDown = (e: React.PointerEvent) => {
    pressed.current = true;
    setPaused(true);
    swipe.onPointerDown(e);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pressed.current = false;
    swipe.onPointerUp(e);
    holdManual();
  };

  const onPointerCancel = () => {
    pressed.current = false;
    swipe.onPointerCancel();
    holdManual();
  };

  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (!pressed.current) setPaused(false);
      }}
      className={`group relative touch-pan-y overflow-hidden rounded-3xl border border-[color:var(--card-border)] bg-gradient-to-br ${slot.fallbackGrad} ${slot.span} select-none`}
      aria-label={`${slot.caption} gallery slot`}
    >
      {/* Only the visible photo and its neighbours are mounted (so the
          cross-fade works both ways), keeping big slots from downloading
          every photo up front. */}
      {showImage &&
        usable.map((img, i) => {
          const isCurrent = i === current;
          const near =
            isCurrent ||
            i === (current + 1) % count ||
            i === (current - 1 + count) % count;
          if (!near) return null;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.src}
              src={img.src}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              onError={() => setFailed((f) => ({ ...f, [img.src]: true }))}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              style={{ opacity: isCurrent ? 1 : 0, objectPosition: img.focus }}
            />
          );
        })}

      {!showImage && hasImages && (
        <div className="absolute inset-0 bg-gradient-to-br opacity-80" />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0610]/70 via-transparent to-transparent opacity-80" />

      <div className="absolute inset-0 flex items-end p-5">
        <figcaption className="font-display text-xl text-[#f7ede4] drop-shadow-md transition-opacity duration-500 group-hover:opacity-100 md:opacity-90">
          {slot.caption}
        </figcaption>
      </div>

      {count > 1 && count <= 8 && (
        <div className="absolute right-3 top-3 flex gap-1.5 rounded-full bg-black/30 px-2 py-1.5 [backdrop-filter:blur(6px)]">
          {usable.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? "w-4 bg-rosegold" : "w-1.5 bg-cream/35"
              }`}
            />
          ))}
        </div>
      )}
      {count > 8 && (
        <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[10px] tabular-nums tracking-[0.15em] text-white/85 [backdrop-filter:blur(6px)]">
          {current + 1} / {count}
        </span>
      )}
    </motion.figure>
  );
}
