"use client";

import { useCallback, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { FishTokenStep } from "@/data/fishtoken";

// Same idea as FeatureCoverflow: the active image sits centred at full size and the
// neighbours fan out to the sides, smaller and faded. Width scales with the viewport so
// the side images peek in on phones instead of pushing the page sideways.
const ITEM_WIDTH_EXPR = "clamp(280px, 78vw, 700px)";
const HEIGHT_RATIO = 0.82;
const OFFSET_RATIO = 0.7;
const SIDE_SCALE = 0.62;
const SIDE_OPACITY = 0.5;
const DRAG_THRESHOLD = 60;

export function StepCoverflow({ steps }: { steps: FishTokenStep[] }) {
  const count = steps.length;
  // Open on the middle step so there's an image on both sides.
  const [active, setActive] = useState(Math.floor(count / 2));

  const goTo = useCallback(
    (index: number) => setActive(Math.min(count - 1, Math.max(0, index))),
    [count],
  );
  const step = useCallback(
    (dir: 1 | -1) => setActive((a) => Math.min(count - 1, Math.max(0, a + dir))),
    [count],
  );

  // Capture is deferred until the gesture is a real drag so clicks on nested
  // buttons/images still land on them (see FeatureCoverflow for the same pattern).
  const drag = useRef<{ startX: number; pointerId: number; captured: boolean; triggered: boolean } | null>(null);
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { startX: e.clientX, pointerId: e.pointerId, captured: false, triggered: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.triggered) return;
    const dx = e.clientX - d.startX;
    if (!d.captured && Math.abs(dx) > 10) {
      e.currentTarget.setPointerCapture(d.pointerId);
      d.captured = true;
    }
    if (Math.abs(dx) > DRAG_THRESHOLD) {
      d.triggered = true;
      step(dx < 0 ? 1 : -1);
    }
  };
  const endDrag = () => {
    drag.current = null;
  };

  const current = steps[active];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="How FishToken works"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
      }}
    >
      <div
        className="relative overflow-hidden"
        style={
          {
            "--iw": ITEM_WIDTH_EXPR,
            "--ih": `calc(var(--iw) * ${HEIGHT_RATIO})`,
            height: "calc(var(--ih) + 24px)",
            touchAction: "pan-y",
            userSelect: "none",
          } as CSSProperties
        }
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        <button
          type="button"
          aria-label="Previous step"
          onClick={() => step(-1)}
          disabled={active === 0}
          className="absolute left-2 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink text-cream shadow-md transition hover:bg-teal disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft size={18} strokeWidth={3} />
        </button>

        {steps.map((s, i) => {
          const offset = i - active;
          const distance = Math.abs(offset);
          const isActive = offset === 0;
          return (
            <div
              key={s.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`Step ${i + 1} of ${count}: ${s.title}`}
              aria-hidden={!isActive}
              onClick={() => !isActive && goTo(i)}
              className="absolute left-1/2 top-1/2"
              style={{
                width: "var(--iw)",
                height: "var(--ih)",
                transform: `translate(-50%,-50%) translateX(calc(${offset} * var(--iw) * ${OFFSET_RATIO})) scale(${isActive ? 1 : SIDE_SCALE})`,
                opacity: isActive ? 1 : SIDE_OPACITY,
                zIndex: isActive ? 20 : 10 - distance,
                transition: "transform .45s cubic-bezier(.22,.8,.3,1), opacity .45s",
                cursor: isActive ? "default" : "pointer",
              }}
            >
              <div className="absolute inset-0" style={{ transform: `scale(${s.scale ?? 1})` }}>
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  draggable={false}
                  sizes="(min-width: 900px) 700px, 78vw"
                  className="object-contain"
                />
              </div>
            </div>
          );
        })}

        <button
          type="button"
          aria-label="Next step"
          onClick={() => step(1)}
          disabled={active === count - 1}
          className="absolute right-2 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink text-cream shadow-md transition hover:bg-teal disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight size={18} strokeWidth={3} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 px-4 text-center" aria-live="polite">
        <span className="font-display text-[clamp(18px,5.2vw,24px)] font-bold text-ink">{current.title}</span>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Go to step ${i + 1}: ${s.title}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            className="h-2 rounded-full transition-all duration-300"
            style={{ width: i === active ? 22 : 8, background: i === active ? "#0f7d84" : "rgba(23,33,31,0.15)" }}
          />
        ))}
      </div>
    </div>
  );
}
