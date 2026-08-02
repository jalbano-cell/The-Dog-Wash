"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function buildMonthGrid(monthStart: Date) {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const MONTH_LABEL = new Intl.DateTimeFormat("en-CA", { month: "long", year: "numeric" });
const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const DISPLAY_FORMAT = new Intl.DateTimeFormat("en-CA", { weekday: "short", month: "short", day: "numeric" });

export function DatePicker({
  value,
  onChange,
  isDateDisabled,
}: {
  value: Date | null;
  onChange: (date: Date) => void;
  isDateDisabled?: (date: Date) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(value ?? new Date()));
  const containerRef = useRef<HTMLDivElement>(null);
  const today = startOfDay(new Date());

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

  const cells = buildMonthGrid(viewMonth);
  const canGoPrev = startOfMonth(viewMonth) > startOfMonth(today);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 w-full items-center gap-2 rounded-xl border border-sand-dark bg-cream/50 px-4 py-2.5 text-left text-sm text-stone-800 outline-none transition-colors focus:border-primary-500 focus:bg-white"
      >
        <Calendar size={16} className="shrink-0 text-primary-600" />
        <span className={value ? "text-stone-800" : "text-stone-400"}>
          {value ? DISPLAY_FORMAT.format(value) : "Select a date"}
        </span>
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+6px)] z-20 w-72 rounded-2xl border border-sand-dark bg-white p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
              disabled={!canGoPrev}
              aria-label="Previous month"
              className="flex h-8 w-8 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-sand disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft size={16} />
            </button>
            <p className="text-sm font-semibold text-stone-800">{MONTH_LABEL.format(viewMonth)}</p>
            <button
              type="button"
              onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
              aria-label="Next month"
              className="flex h-8 w-8 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-sand"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-stone-400">
            {WEEKDAY_LABELS.map((d) => (
              <span key={d} className="py-1">
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((date, i) => {
              if (!date) return <span key={i} />;
              const disabled = date < today || Boolean(isDateDisabled?.(date));
              const isSelected = value ? isSameDay(date, value) : false;
              const isToday = isSameDay(date, today);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(date);
                    setOpen(false);
                  }}
                  className={clsx(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs transition-colors",
                    disabled && "cursor-not-allowed text-stone-300",
                    !disabled && !isSelected && "text-stone-700 hover:bg-sand",
                    isSelected && "bg-primary-600 font-semibold text-white",
                    !isSelected && isToday && !disabled && "ring-1 ring-primary-300"
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
