"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type WheelEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { features } from "@/data/features";
import type { Feature } from "@/types";

// Phone width scales with viewport (clamp) so the carousel fits narrow phones instead of
// sitting edge-to-edge at a fixed 280px; height/gaps stay proportional via CSS var() + ratios
// derived from the original 280px desktop design, so nothing changes above ~467px viewport.
const PHONE_WIDTH_EXPR = "clamp(160px, 60vw, 280px)";
const HEIGHT_RATIO = 578 / 280;
const GAP_BASE_RATIO = 230 / 280;
const GAP_STEP_RATIO = 190 / 280;
const SCALE_MIN = 0.5;
const SCALE_FALLOFF = 0.14;
const OPACITY_MIN = 0.85;
const OPACITY_FALLOFF = 0.05;
const WHEEL_THRESHOLD = 12;
const WHEEL_DEBOUNCE = 450;
const DRAG_THRESHOLD = 70;
const COUNT = features.length;

/** Signed translateX (as a CSS calc() expression) for a card `distance` steps from active — each further step adds a full --gap-step, so the fan widens rather than repeating a fixed spacing. */
function translateXExprFor(offset: number) {
  if (offset === 0) return "0px";
  const distance = Math.abs(offset);
  const sign = offset > 0 ? 1 : -1;
  return `calc(${sign} * (var(--gap-base) + ${distance - 1} * var(--gap-step)))`;
}

function scaleFor(distance: number) {
  if (distance === 0) return 1;
  return Math.max(SCALE_MIN, 1 - distance * SCALE_FALLOFF);
}

function opacityFor(distance: number) {
  if (distance === 0) return 1;
  return Math.max(OPACITY_MIN, 1 - distance * OPACITY_FALLOFF);
}

function PhonePlaceholder({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  const filename = feature.mediaSrc?.split("/").pop() ?? "";
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center"
      style={{ background: feature.tint }}
    >
      <span
        className="grid h-10 w-10 place-items-center rounded-2xl border"
        style={{ borderColor: feature.border, background: "rgba(255,255,255,0.65)" }}
      >
        <Icon size={20} strokeWidth={1.9} style={{ color: feature.ink }} />
      </span>
      <span className="font-mono text-[9px] text-ink/40">{filename}</span>
    </div>
  );
}

function PhoneScreen({ feature, isActive }: { feature: Feature; isActive: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // autoPlay starts fetching as soon as the element mounts, so `loadeddata` can
  // fire before this effect attaches — re-check readyState directly to catch that race.
  useEffect(() => {
    if ((videoRef.current?.readyState ?? 0) >= 2) setLoaded(true);
  }, []);

  // Only the centered card plays; every other card stays paused, and the
  // centered one always restarts from frame zero instead of resuming.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <div className="absolute inset-0">
      <PhonePlaceholder feature={feature} />
      {feature.mediaSrc ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
          style={{ opacity: loaded ? 1 : 0 }}
          src={feature.mediaSrc}
          preload="auto"
          muted
          loop
          playsInline
          onLoadedData={() => setLoaded(true)}
        />
      ) : null}
    </div>
  );
}

export function FeatureCoverflow() {
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    setActive(Math.min(COUNT - 1, Math.max(0, index)));
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setActive((a) => Math.min(COUNT - 1, Math.max(0, a + dir)));
  }, []);

  const wheelLocked = useRef(false);
  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < WHEEL_THRESHOLD || wheelLocked.current) return;
    e.preventDefault();
    wheelLocked.current = true;
    step(delta > 0 ? 1 : -1);
    setTimeout(() => {
      wheelLocked.current = false;
    }, WHEEL_DEBOUNCE);
  };

  // Pointer capture is deferred until the gesture proves itself a drag — capturing
  // eagerly on pointerdown retargets the native click event to the container, which
  // would silently break clicks on the arrows/dots/phones nested inside it.
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

  const activeFeature = features[active];

  return (
    <div>
      <div
        className="relative overflow-hidden"
        style={
          {
            "--pw": PHONE_WIDTH_EXPR,
            "--ph": `calc(var(--pw) * ${HEIGHT_RATIO})`,
            "--gap-base": `calc(var(--pw) * ${GAP_BASE_RATIO})`,
            "--gap-step": `calc(var(--pw) * ${GAP_STEP_RATIO})`,
            height: "calc(var(--ph) + 24px)",
            touchAction: "pan-y",
            userSelect: "none",
          } as CSSProperties
        }
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        <button
          type="button"
          aria-label="Previous feature"
          onClick={() => step(-1)}
          disabled={active === 0}
          className="absolute left-2 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#1653cc] text-white shadow-md transition hover:bg-[#1348ad] disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft size={18} strokeWidth={3} />
        </button>

        {features.map((feature, i) => {
          const offset = i - active;
          const distance = Math.abs(offset);

          return (
            <div
              key={feature.tag}
              role="button"
              tabIndex={offset !== 0 ? 0 : -1}
              aria-label={`Show ${feature.title}`}
              onClick={() => offset !== 0 && goTo(i)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && offset !== 0) {
                  e.preventDefault();
                  goTo(i);
                }
              }}
              className="absolute left-1/2 top-1/2"
              style={{
                width: "var(--pw)",
                height: "var(--ph)",
                transform: `translate(-50%,-50%) translateX(${translateXExprFor(offset)}) scale(${scaleFor(distance)})`,
                opacity: opacityFor(distance),
                zIndex: offset === 0 ? 30 : 20 - distance,
                transition: "transform .45s cubic-bezier(.22,.8,.3,1), opacity .45s",
                cursor: offset === 0 ? "default" : "pointer",
              }}
            >
              <div className="relative h-full w-full overflow-hidden bg-white shadow-xl" style={{ borderRadius: 28 }}>
                <PhoneScreen feature={feature} isActive={offset === 0} />
              </div>
            </div>
          );
        })}

        <button
          type="button"
          aria-label="Next feature"
          onClick={() => step(1)}
          disabled={active === COUNT - 1}
          className="absolute right-2 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#1653cc] text-white shadow-md transition hover:bg-[#1348ad] disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight size={18} strokeWidth={3} />
        </button>
      </div>

      <div className="mt-2 flex items-center justify-center" style={{ height: 40 }}>
        <span className="font-display text-[clamp(18px,5.2vw,24px)] font-bold text-ink text-center px-4">{activeFeature.title}</span>
      </div>

      <div className="mt-2 flex items-center justify-center gap-2">
        {features.map((feature, i) => (
          <button
            key={feature.tag}
            type="button"
            aria-label={`Go to ${feature.title}`}
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
