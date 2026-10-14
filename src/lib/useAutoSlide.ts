"use client";

import { useEffect, useRef, type RefObject } from "react";

const INTERVAL_MS = 4500;
/** Quiet period after a swipe / spin / tap so auto-play never fights the visitor. */
const HOLD_AFTER_TOUCH_MS = 8000;

/**
 * Calls `onNext` every few seconds while `targetRef` is on screen and the tab
 * is visible. Pauses for a while after `lastTouchRef` is bumped.
 */
export function useAutoSlide(
  targetRef: RefObject<HTMLElement | null>,
  lastTouchRef: RefObject<number>,
  onNext: () => void
) {
  const nextRef = useRef(onNext);
  useEffect(() => {
    nextRef.current = onNext;
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let onScreen = false;
    const el = targetRef.current;
    const io = el
      ? new IntersectionObserver(([e]) => (onScreen = e.isIntersecting), {
          threshold: 0.35,
        })
      : null;
    if (el && io) io.observe(el);

    const id = window.setInterval(() => {
      if (!onScreen || document.hidden) return;
      if (Date.now() - lastTouchRef.current < HOLD_AFTER_TOUCH_MS) return;
      nextRef.current();
    }, INTERVAL_MS);

    return () => {
      window.clearInterval(id);
      io?.disconnect();
    };
  }, [targetRef, lastTouchRef]);
}
