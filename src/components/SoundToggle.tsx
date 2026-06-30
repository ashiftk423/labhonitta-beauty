"use client";

import { useEffect, useState } from "react";
import { sound } from "@/lib/sound";

/**
 * Floating sound control (bottom-left). Enables wheel spin ticks only — no ambient.
 */
export default function SoundToggle() {
  const [muted, setMuted] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return sound.subscribe((s) => setMuted(s.muted));
  }, []);

  if (!mounted) return null;

  return (
    <button
      aria-label={muted ? "Turn sound on" : "Turn sound off"}
      aria-pressed={!muted}
      onClick={() => sound.toggle()}
      className="fixed bottom-5 left-5 z-[120] flex h-12 w-12 items-center justify-center rounded-full glass transition-transform hover:scale-110 active:scale-95"
    >
      <span className="flex h-5 items-end gap-[3px]">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-gradient-to-t from-rosegold to-gold"
            style={{
              height: muted ? "5px" : undefined,
              animation: muted
                ? "none"
                : `eq 0.9s ease-in-out ${i * 0.12}s infinite alternate`,
            }}
          />
        ))}
      </span>
    </button>
  );
}
