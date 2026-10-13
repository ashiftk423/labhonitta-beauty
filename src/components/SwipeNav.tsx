"use client";

/** Prev / counter / next pill shown on swipeable photo cards. */
export default function SwipeNav({
  index,
  count,
  onStep,
  className = "",
}: {
  index: number;
  count: number;
  onStep: (dir: 1 | -1) => void;
  className?: string;
}) {
  if (count < 2) return null;

  const btn =
    "flex h-8 w-8 items-center justify-center rounded-full text-base text-white transition hover:bg-white/20 active:scale-90";

  return (
    <div
      className={`flex items-center gap-1 rounded-full border border-white/25 bg-black/35 p-1 text-white [backdrop-filter:blur(8px)] ${className}`}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Previous photo"
        onClick={() => onStep(-1)}
        className={btn}
      >
        ‹
      </button>
      <span className="min-w-[3.25rem] text-center text-[11px] tabular-nums tracking-[0.12em] text-white/90">
        {index + 1} / {count}
      </span>
      <button
        type="button"
        aria-label="Next photo"
        onClick={() => onStep(1)}
        className={btn}
      >
        ›
      </button>
    </div>
  );
}
