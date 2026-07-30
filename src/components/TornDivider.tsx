import clsx from "clsx";

// A jagged, torn-paper top edge. The fill (via currentColor) should match the
// section ABOVE, so it reads as that section's "paper" torn to reveal this one.
const TORN_PATH = (() => {
  const w = 1200;
  const n = 60;
  const rnd = (i: number) => {
    const x = Math.sin(i * 127.1) * 43758.5453;
    return x - Math.floor(x);
  };
  let d = "M0 0 L1200 0 L1200 8";
  for (let i = n; i >= 0; i--) {
    const x = (i / n) * w;
    const y = 5 + rnd(i) * 11;
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return `${d} L0 8 Z`;
})();

/**
 * Torn-paper divider, placed as the first child of a `relative` section.
 * `colorClass` sets the fill (text color) — use the previous section's color.
 */
export function TornDivider({ colorClass, className }: { colorClass: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={clsx("pointer-events-none absolute inset-x-0 top-0 z-10 leading-[0]", colorClass, className)}
    >
      <svg viewBox="0 0 1200 20" preserveAspectRatio="none" className="h-3 w-full sm:h-4">
        <path fill="currentColor" d={TORN_PATH} />
      </svg>
    </div>
  );
}
