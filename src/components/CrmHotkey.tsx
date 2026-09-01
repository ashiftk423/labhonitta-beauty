"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * Hidden CRM entry: press Shift+A, then Enter within 1.5s → /crm
 * (MVP stub — full auth/backend later)
 */
export default function CrmHotkey() {
  const router = useRouter();
  const armed = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.shiftKey && (e.key === "A" || e.key === "a") && !e.ctrlKey && !e.metaKey && !e.altKey) {
        armed.current = true;
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          armed.current = false;
        }, 1500);
        return;
      }

      if (armed.current && e.key === "Enter") {
        e.preventDefault();
        armed.current = false;
        if (timer.current) clearTimeout(timer.current);
        router.push("/crm");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [router]);

  return null;
}
