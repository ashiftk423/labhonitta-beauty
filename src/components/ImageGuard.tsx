"use client";

import { useEffect } from "react";

/** Blocks the right-click menu and drag-out on photos ("Save image as…"). */
export default function ImageGuard() {
  useEffect(() => {
    const block = (e: Event) => {
      if ((e.target as HTMLElement | null)?.tagName === "IMG") e.preventDefault();
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
    };
  }, []);

  return null;
}
