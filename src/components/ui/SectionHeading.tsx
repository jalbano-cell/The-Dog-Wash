import clsx from "clsx";
import { PawPrint } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow ? (
        <p
          className={clsx(
            "mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-600",
            align === "center" ? "justify-center" : "justify-start"
          )}
        >
          <PawPrint size={13} className="-rotate-12 text-playful-500" />
          {eyebrow}
        </p>
      ) : null}
      <Tag className="text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
        {title}
      </Tag>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
