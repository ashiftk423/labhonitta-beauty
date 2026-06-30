"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a 0→1 visibility value for a floating element tied to a target
 * element's (the image card's) position on screen:
 *
 *   - 0   while the card is still well below the viewport centre
 *   - 1   once the card reaches / passes centre  (fully shown)
 *   - 0   again as the card scrolls up toward the end of the section
 *
 * Attach the returned `ref` to the image card. Drives the mobile floating wheel.
 */
export function useFloatingVisibility<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visibility, setVisibility] = useState(0);

  useEffect(() => {
    let raf = 0;

    const compute = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // d: card-centre offset from viewport centre, in viewport heights.
      //  +ve  → card is below centre (not there yet)
      //  0    → card centred
      //  -ve  → card has scrolled above centre (heading to section end)
      const d = (rect.top + rect.height / 2 - vh / 2) / vh;

      let v: number;
      if (d >= 0.35) v = 0; // still approaching centre
      else if (d > -0.05) v = (0.35 - d) / 0.4; // fade in toward centre
      else if (d >= -0.35) v = 1; // fully shown band
      else if (d > -0.7) v = (d + 0.7) / 0.35; // fade out near section end
      else v = 0;

      v = Math.max(0, Math.min(1, v));
      setVisibility((prev) => (Math.abs(prev - v) > 0.012 ? v : prev));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, visibility };
}
