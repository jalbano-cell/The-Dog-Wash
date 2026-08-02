"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, ChevronDown } from "lucide-react";
import clsx from "clsx";

function formatTimeLabel(minutes: number) {
  const hour24 = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

// Appointments are booked in 2-hour blocks, spaced 2 hours apart, with the last
// start of the day early enough for the block to finish by close.
const APPOINTMENT_DURATION_MINUTES = 120;
const SLOT_GAP_MINUTES = 120;

function buildSlots(opensAt: string, closesAt: string) {
  const start = toMinutes(opensAt);
  const end = toMinutes(closesAt);
  const slots: { value: string; label: string }[] = [];
  for (let m = start; m + APPOINTMENT_DURATION_MINUTES <= end; m += SLOT_GAP_MINUTES) {
    const hh = Math.floor(m / 60)
      .toString()
      .padStart(2, "0");
    const mm = (m % 60).toString().padStart(2, "0");
    slots.push({ value: `${hh}:${mm}`, label: formatTimeLabel(m) });
  }
  return slots;
}

export function TimePicker({
  value,
  onChange,
  opensAt,
  closesAt,
  disabled,
}: {
  value: string | null;
  onChange: (time: string) => void;
  opensAt?: string;
  closesAt?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const slots = opensAt && closesAt ? buildSlots(opensAt, closesAt) : [];
  const selectedLabel = value ? formatTimeLabel(toMinutes(value)) : null;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 w-full items-center gap-2 rounded-xl border border-sand-dark bg-cream/50 px-4 py-2.5 text-left text-sm text-stone-800 outline-none transition-colors focus:border-primary-500 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Clock size={16} className="shrink-0 text-primary-600" />
        <span className={clsx("flex-1", selectedLabel ? "text-stone-800" : "text-stone-400")}>
          {selectedLabel ?? (disabled ? "Select a date first" : "Select a time")}
        </span>
        <ChevronDown size={14} className="shrink-0 text-stone-400" />
      </button>

      {open && !disabled ? (
        <div className="absolute left-0 top-[calc(100%+6px)] z-20 max-h-56 w-full min-w-[10rem] overflow-y-auto rounded-2xl border border-sand-dark bg-white p-2 shadow-xl">
          {slots.length === 0 ? (
            <p className="px-3 py-2 text-xs text-stone-500">No available times.</p>
          ) : (
            slots.map((slot) => {
              const isSelected = value === slot.value;
              return (
                <button
                  key={slot.value}
                  type="button"
                  onClick={() => {
                    onChange(slot.value);
                    setOpen(false);
                  }}
                  className={clsx(
                    "block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    isSelected ? "bg-primary-600 font-semibold text-white" : "text-stone-700 hover:bg-sand"
                  )}
                >
                  {slot.label}
                </button>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}
