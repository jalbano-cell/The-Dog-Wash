import type { ReactNode } from "react";
import clsx from "clsx";

type Tone = "light" | "dark";

/**
 * The small caps label that opens every section, preceded by a short pink
 * rule.
 *
 * The label text and the rule are siblings inside one flex row, but the label
 * itself must stay a **single element** — splitting it into multiple children
 * lets the row's `gap` land between words, which reads as a broken space.
 */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={clsx(
        // items-start, not items-center: these labels wrap on narrow screens,
        // and a centred rule would float against the middle of a two-line
        // block instead of sitting on the first line.
        "flex items-start gap-3 text-[10.5px] font-semibold uppercase tracking-[0.22em]",
        tone === "dark" ? "text-primary-300" : "text-stone-400",
        className
      )}
    >
      <span aria-hidden className="mt-[0.45em] h-px w-[34px] shrink-0 bg-accent-500" />
      <span>{children}</span>
    </p>
  );
}

/**
 * Section header: eyebrow, then a display headline whose trailing clause is
 * italic and muted. `title`/`titleItalic` are separate props rather than one
 * node so every section gets the same two-tone treatment without repeating the
 * `<em>` styling.
 */
export function SectionHeading({
  eyebrow,
  title,
  titleItalic,
  description,
  tone = "light",
  as: Tag = "h2",
  className,
  descriptionClassName,
}: {
  eyebrow: string;
  title: ReactNode;
  titleItalic?: ReactNode;
  description?: ReactNode;
  tone?: Tone;
  as?: "h1" | "h2";
  className?: string;
  descriptionClassName?: string;
}) {
  return (
    <div className={className}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <Tag
        className={clsx(
          "mt-5 text-[34px] leading-[1.06] tracking-[-0.015em] sm:text-[42px] lg:text-[52px]",
          tone === "dark" ? "text-white" : "text-primary-900"
        )}
      >
        {title}
        {titleItalic ? (
          <>
            {" "}
            <em className={clsx("italic", tone === "dark" ? "text-primary-300" : "text-stone-500")}>
              {titleItalic}
            </em>
          </>
        ) : null}
      </Tag>
      {description ? (
        <p
          className={clsx(
            "mt-[18px] text-[15px] leading-[1.7]",
            tone === "dark" ? "text-white/60" : "text-stone-500",
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
