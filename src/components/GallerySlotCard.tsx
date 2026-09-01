"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { GallerySlot } from "@/content/media";

const SLIDE_MS = 3000;

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
  const startX = useRef<number | null>(null);
  const dragging = useRef(false);

  const usable = images.filter((src) => !failed[src]);
  const count = usable.length;
  const showImage = count > 0;

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

  useEffect(() => {
    setActive(0);
  }, [slot.id, images.join("|")]);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    dragging.current = true;
    setPaused(true);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current || startX.current == null) {
      setPaused(false);
      return;
    }
    const dx = e.clientX - startX.current;
    dragging.current = false;
    startX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    setPaused(false);
  };

  const onPointerCancel = () => {
    dragging.current = false;
    startX.current = null;
    setPaused(false);
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
        if (!dragging.current) setPaused(false);
      }}
      className={`group relative touch-pan-y overflow-hidden rounded-3xl border border-[color:var(--card-border)] bg-gradient-to-br ${slot.fallbackGrad} ${slot.span} select-none`}
      aria-label={`${slot.caption} gallery slot`}
    >
      {showImage &&
        usable.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            onError={() => setFailed((f) => ({ ...f, [src]: true }))}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            style={{ opacity: i === active % count ? 1 : 0 }}
          />
        ))}

      {!showImage && hasImages && (
        <div className="absolute inset-0 bg-gradient-to-br opacity-80" />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0610]/70 via-transparent to-transparent opacity-80" />

      <div className="absolute inset-0 flex items-end p-5">
        <figcaption className="font-display text-xl text-[#f7ede4] drop-shadow-md transition-opacity duration-500 group-hover:opacity-100 md:opacity-90">
          {slot.caption}
        </figcaption>
      </div>

      {count > 1 && (
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {usable.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === active % count
                  ? "w-4 bg-rosegold"
                  : "w-1.5 bg-cream/35"
              }`}
            />
          ))}
        </div>
      )}
    </motion.figure>
  );
}
