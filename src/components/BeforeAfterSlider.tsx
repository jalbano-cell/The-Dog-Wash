"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

/**
 * Before/after reveal driven by raw pointer events rather than a range input:
 * the whole figure is the drag surface, so there's no thumb to hunt for on a
 * phone. `setPointerCapture` keeps the drag alive when the finger leaves the
 * element, and `touch-action: none` stops the browser claiming the gesture as
 * a scroll mid-drag.
 *
 * Keyboard users get the same control through the arrow keys — the handle
 * itself is a focusable `role="slider"`, which is why the drag surface stays a
 * plain div rather than becoming a second interactive element.
 */
export function BeforeAfterSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const frameRef = useRef<HTMLDivElement>(null);

  function setFromClientX(clientX: number) {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }

  return (
    <div
      ref={frameRef}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) setFromClientX(e.clientX);
      }}
      onPointerUp={(e) => {
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
          // Capture can already be gone if the pointer was cancelled.
        }
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
      className="relative aspect-4/5 w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-[3px]"
    >
      <Image
        src={after}
        alt={afterAlt}
        fill
        draggable={false}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
      <span className="absolute right-3 top-3 z-10 rounded-full bg-navy/80 px-[11px] py-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white">
        After
      </span>

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={before}
          alt={beforeAlt}
          fill
          draggable={false}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-[11px] py-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-navy">
          Before
        </span>
      </div>

      <div
        className="absolute inset-y-0 z-10 w-[1.5px] bg-white"
        style={{ left: `${pos}%` }}
      >
        <button
          type="button"
          role="slider"
          aria-label="Drag to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
          }}
          // 44px on touch (dragging is the whole interaction), tightening to
          // the 36px visual on pointer devices.
          className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-primary-600 shadow-[0_4px_12px_rgba(0,0,0,.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 lg:h-9 lg:w-9"
        >
          <MoveHorizontal size={15} />
        </button>
      </div>
    </div>
  );
}
