import type Lenis from "lenis";

/**
 * Tiny module-level registry so components that live *outside* the
 * <SmoothScroll> subtree (e.g. the intro curtain mounted above it in
 * layout.tsx) can still lock/unlock the single Lenis instance.
 */
let instance: Lenis | null = null;
let locked = false;

export function registerLenis(l: Lenis | null) {
  instance = l;
  if (l && locked) l.stop();
}

export function getLenis() {
  return instance;
}

/** Lock scrolling. Safe to call before Lenis exists — it'll apply on register. */
export function lockScroll() {
  locked = true;
  instance?.stop();
}

/** Release the scroll lock and jump back to the top. */
export function unlockScroll() {
  locked = false;
  instance?.start();
}
