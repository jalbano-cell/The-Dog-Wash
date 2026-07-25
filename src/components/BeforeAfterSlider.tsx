"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

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
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function updateFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      setPos((p) => Math.max(0, p - 2));
    } else if (e.key === "ArrowRight") {
      setPos((p) => Math.min(100, p + 2));
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/4] w-full touch-none select-none overflow-hidden"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging) updateFromClientX(e.clientX);
      }}
      onPointerUp={(e) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        setDragging(false);
      }}
    >
      {/* After image (base layer) */}
      <Image
        src={after}
        alt={afterAlt}
        fill
        loading="lazy"
        sizes="(min-width: 768px) 32vw, 90vw"
        className="object-cover"
        draggable={false}
      />
      <span className="pointer-events-none absolute right-2 top-2 z-10 rounded-full bg-primary-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
        After
      </span>

      {/* Before image (clipped overlay) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={before}
          alt={beforeAlt}
          fill
          loading="lazy"
          sizes="(min-width: 768px) 32vw, 90vw"
          className="object-cover"
          draggable={false}
        />
        <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-stone-800/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          Before
        </span>
      </div>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/90 shadow-[0_0_6px_rgba(0,0,0,0.35)]"
        style={{ left: `${pos}%` }}
      >
        <button
          type="button"
          role="slider"
          aria-label="Drag to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-primary-600 shadow-md ring-1 ring-stone-800/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
        >
          <MoveHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}
