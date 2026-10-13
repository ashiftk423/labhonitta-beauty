import { useRef } from "react";

/**
 * Horizontal swipe / drag detection via pointer events. Pair the target with
 * `touch-pan-y` so vertical page scrolling still works on phones.
 */
export function useSwipe(onSwipe: (dir: 1 | -1) => void, threshold = 40) {
  const start = useRef<{ x: number; y: number } | null>(null);

  return {
    onPointerDown: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      start.current = { x: e.clientX, y: e.clientY };
    },
    onPointerUp: (e: React.PointerEvent) => {
      const s = start.current;
      start.current = null;
      if (!s) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy) * 1.2) {
        onSwipe(dx < 0 ? 1 : -1);
      }
    },
    onPointerCancel: () => {
      start.current = null;
    },
  };
}
