"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { sound } from "@/lib/sound";
import { hapticSnap, hapticTick } from "@/lib/haptics";

export type WheelItem = { color: string; label: string };

const AUTO_MS = 5000;

/**
 * Spinnable makeover wheel. Drag, click a shade, scroll over it, or let it
 * auto-advance every 5 s (spins visually in sync). Haptic tick on each change.
 */
export default function MakeoverWheel({
  items,
  value,
  onChange,
  icon,
  autoPlay = false,
  visibility = 1,
}: {
  items: WheelItem[];
  value: number;
  onChange: (i: number) => void;
  icon?: ReactNode;
  autoPlay?: boolean;
  /** 0→1 mobile floating opacity, scroll-driven by the owning section.
   *  Ignored on desktop where the wheel is always inline & fully visible. */
  visibility?: number;
}) {
  const n = items.length;
  const seg = 360 / n;

  const rootRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(-value * seg);
  const [dragging, setDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  // From tablet up (>=768px) the wheel sits inline below the text and is always
  // visible. Below that it floats in the corner with scroll-driven opacity.
  const [isInline, setIsInline] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [kbSpinning, setKbSpinning] = useState(false);

  const rotationRef = useRef(rotation);
  const lastAngleRef = useRef(0);
  const valueRef = useRef(value);
  const kbHintTimerRef = useRef<number | null>(null);
  rotationRef.current = rotation;
  valueRef.current = value;

  const flashKbHint = () => {
    setKbSpinning(true);
    if (kbHintTimerRef.current) window.clearTimeout(kbHintTimerRef.current);
    kbHintTimerRef.current = window.setTimeout(() => setKbSpinning(false), 2800);
  };

  useEffect(() => {
    return () => {
      if (kbHintTimerRef.current) window.clearTimeout(kbHintTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsInline(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Track whether this wheel is on screen, so the global arrow keys only drive
  // the wheel the user is currently looking at.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setOnScreen(e.isIntersecting),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const norm = (i: number) => ((i % n) + n) % n;

  const emit = (idx: number, fromUser: boolean, silent = false) => {
    if (idx === valueRef.current) return;
    onChange(idx);
    if (fromUser) hapticSnap();
    else hapticTick();
    if (!silent) sound.tick();
  };

  // Sync dial angle when value changes (auto or external).
  useEffect(() => {
    if (dragging) return;
    let target = -value * seg;
    const cur = rotationRef.current;
    while (target - cur > 180) target -= 360;
    while (target - cur < -180) target += 360;
    setRotation(target);
  }, [value, seg, dragging]);

  // Optional auto-spin (disabled by default — the wheel is user-driven).
  useEffect(() => {
    if (!autoPlay || n < 2) return;
    const id = window.setInterval(() => {
      if (dragging || document.hidden) return;
      emit(norm(valueRef.current + 1), false, true);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [autoPlay, n, dragging]);

  const angleOf = (clientX: number, clientY: number) => {
    const el = discRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    return (
      (Math.atan2(
        clientY - (r.top + r.height / 2),
        clientX - (r.left + r.width / 2)
      ) *
        180) /
      Math.PI
    );
  };

  const onPointerDown = (e: React.PointerEvent) => {
    discRef.current?.setPointerCapture(e.pointerId);
    setDragging(true);
    lastAngleRef.current = angleOf(e.clientX, e.clientY);
    hapticTick();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const a = angleOf(e.clientX, e.clientY);
    let d = a - lastAngleRef.current;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    lastAngleRef.current = a;
    setRotation(rotationRef.current + d);
    const idx = norm(Math.round(-(rotationRef.current + d) / seg));
    if (idx !== valueRef.current) emit(idx, false);
  };

  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    const snapped = Math.round(rotationRef.current / seg) * seg;
    setRotation(snapped);
    emit(norm(Math.round(-snapped / seg)), true);
    hapticSnap();
  };

  const step = (dir: number) => {
    emit(norm(value + dir), true);
  };

  const onWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
    step(e.deltaY > 0 ? 1 : -1);
  };

  const spinFromKeyboard = (dir: number) => {
    flashKbHint();
    step(dir);
  };

  const handleDiscKeyDown = (e: React.KeyboardEvent) => {
    if (!e.shiftKey) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      spinFromKeyboard(1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      spinFromKeyboard(-1);
    }
  };

  // Shift + arrows spin the wheel. Plain arrows keep scrolling the page.
  useEffect(() => {
    if (!onScreen) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return;
      if (!e.shiftKey) return;

      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        spinFromKeyboard(1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        spinFromKeyboard(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScreen, value, n]);

  // Floating opacity/slide only applies on phones (< md). On tablet/desktop the
  // wheel is inline and always fully visible, so no inline style overrides it.
  const floatStyle =
    mounted && !isInline
      ? {
          opacity: visibility,
          transform: `translateY(${(1 - visibility) * 22}px)`,
          pointerEvents: (visibility > 0.05 ? "auto" : "none") as
            | "auto"
            | "none",
        }
      : undefined;

  return (
    <div
      ref={rootRef}
      style={floatStyle}
      className={[
        "z-40 flex select-none flex-col items-center gap-2",
        // --- phones (< md): floating glassy dial, bottom-right, above sound btn ---
        "fixed bottom-[88px] right-3 rounded-[28px] border border-gold/20 bg-white/[0.06] p-2.5 backdrop-blur-md transition-[opacity,transform] duration-300 ease-out",
        // --- tablet & desktop (md+): inline in the column, no floating chrome ---
        "md:pointer-events-auto md:static md:bottom-auto md:right-auto md:z-auto md:translate-y-0 md:gap-3 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:opacity-100 md:backdrop-blur-none",
      ].join(" ")}
    >
      <div className="relative h-[112px] w-[112px] sm:h-[132px] sm:w-[132px] lg:h-[200px] lg:w-[200px]">
        <div className="absolute left-1/2 top-[-2px] z-30 h-0 w-0 -translate-x-1/2 border-l-[9px] border-r-[9px] border-t-[14px] border-l-transparent border-r-transparent border-t-gold drop-shadow-[0_0_6px_rgba(233,201,139,0.9)]" />

        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#e9c98b,#d9a273,#e8a6b8,#3a1430,#e9c98b)] p-[2px] shadow-[0_0_40px_-10px_rgba(217,162,115,0.8)]">
          <div className="h-full w-full rounded-full bg-[#160b1c]" />
        </div>

        <div
          ref={discRef}
          role="slider"
          tabIndex={0}
          aria-label="Makeover wheel — spin to change the look"
          aria-valuenow={value + 1}
          aria-valuemin={1}
          aria-valuemax={n}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          onWheel={onWheel}
          onKeyDown={handleDiscKeyDown}
          className="absolute inset-[8px] cursor-grab touch-none rounded-full active:cursor-grabbing focus:outline-none"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: dragging ? "none" : "transform 0.65s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {items.map((item, i) => {
            const a = (i * seg - 90) * (Math.PI / 180);
            const x = 50 + Math.cos(a) * 42;
            const y = 50 + Math.sin(a) * 42;
            const isActive = i === value;
            return (
              <button
                key={item.label}
                tabIndex={-1}
                aria-label={item.label}
                onClick={(e) => {
                  e.stopPropagation();
                  if (i !== value) emit(i, true);
                }}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: isActive ? 26 : 18,
                  height: isActive ? 26 : 18,
                  background: item.color,
                  boxShadow: isActive
                    ? "0 0 0 3px rgba(247,237,228,0.85), 0 0 16px rgba(233,201,139,0.9)"
                    : "0 0 0 2px rgba(255,255,255,0.25)",
                }}
              />
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-[34%] z-20 flex items-center justify-center rounded-full bg-gradient-to-br from-[#241225] to-[#0d0610] text-gold shadow-[inset_0_0_12px_rgba(0,0,0,0.6)]">
          <span className="text-lg">{icon ?? "✦"}</span>
        </div>
      </div>

      <p className="max-w-[130px] animate-pulse text-center text-[9px] uppercase leading-tight tracking-[0.18em] text-gold/70 lg:max-w-none lg:text-[10px] lg:tracking-[0.28em]">
        ✨ Spin me to see the transformation
      </p>

      {/* Keyboard shortcut hint — always on tablet/desktop, pulses while spinning */}
      <div
        className={[
          "hidden flex-col items-center gap-1.5 text-center transition-all duration-300 md:flex",
          kbSpinning ? "scale-105 opacity-100" : "opacity-70",
        ].join(" ")}
        aria-live="polite"
      >
        <p
          className={[
            "text-[10px] uppercase tracking-[0.22em] transition-colors duration-300",
            kbSpinning ? "text-gold" : "text-cream/45",
          ].join(" ")}
        >
          {kbSpinning ? "Spinning look" : "Keyboard shortcut"}
        </p>
        <p className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-cream/60">
          <kbd className="rounded border border-gold/25 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-gold/90">
            Shift
          </kbd>
          <span className="text-cream/35">+</span>
          <kbd className="rounded border border-gold/25 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-gold/90">
            ← →
          </kbd>
          <span className="text-cream/35">to spin</span>
        </p>
        {kbSpinning && (
          <p className="text-[10px] text-cream/50">
            Arrow keys alone scroll the page
          </p>
        )}
      </div>
    </div>
  );
}
