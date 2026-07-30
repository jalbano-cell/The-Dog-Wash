import type { ReactNode } from "react";
import clsx from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  titleMuted,
  description,
  align = "left",
  as: Tag = "h2",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  /** Trailing part of the headline rendered in a muted tone (two-tone editorial look). */
  titleMuted?: ReactNode;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  action?: ReactNode;
}) {
  const centered = align === "center";

  return (
    <div
      className={clsx(
        "gap-6",
        centered ? "mx-auto max-w-2xl text-center" : "flex flex-col md:flex-row md:items-end md:justify-between"
      )}
    >
      <div className={clsx(centered ? "" : "max-w-2xl")}>
        {eyebrow ? (
          <p
            className={clsx(
              "mb-1 font-script text-2xl font-bold text-accent-600 sm:text-[1.6rem]",
              centered ? "text-center" : "text-left"
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <Tag className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-stone-800 sm:text-5xl">
          {title}
          {titleMuted ? <span className="text-stone-400"> {titleMuted}</span> : null}
        </Tag>
        {description ? (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-500 sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {action && !centered ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
