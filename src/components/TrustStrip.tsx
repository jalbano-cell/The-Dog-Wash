import clsx from "clsx";
import { Award, BadgeCheck, Star, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatRating, type LocationInfo } from "@/data/locations";
import { business, realAwards } from "@/data/business";
import { Container } from "@/components/ui/Container";

/**
 * The single credentials strip directly under the hero — replaces the old
 * TrustBadges + TrustBar pair, which said overlapping things in two different
 * visual styles. Award comes first deliberately: it's the strongest claim the
 * studio has, and the hero has just introduced it.
 */
export function TrustStrip({ location }: { location: LocationInfo }) {
  const award = realAwards[0];

  const items: { icon: LucideIcon; label: string; sub: string }[] = [
    ...(award
      ? [{ icon: Award, label: "Award-winning groomer", sub: award }]
      : []),
    {
      icon: BadgeCheck,
      label: "Certified pet stylist",
      sub: business.credentials.certification,
    },
    {
      icon: Star,
      label: `${formatRating(location.rating.value)} / 5 on Google`,
      sub: `${location.rating.count}+ reviews`,
    },
    {
      icon: MapPin,
      label: `Local ${location.shortName} groomer`,
      sub: location.address.full,
    },
  ];

  return (
    <section aria-label="Credentials" className="bg-primary-900">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              /**
               * Rules are drawn *between* cells, never around the strip — a
               * cell that owns a trailing border leaves a rule hanging at the
               * container edge with nothing after it.
               *
               * Padding is symmetric about each rule for the same reason: the
               * cell before it pads on the right, the cell after pads on the
               * left, so every divider sits in an even gutter. The outermost
               * edges stay flush with the container so the strip lines up with
               * every other section.
               *
               * Laid out per-index rather than with nth-child variants because
               * the column count changes twice (1 → 2 → 4) and each breakpoint
               * needs a different cell to start a row.
               */
              className={clsx(
                "flex items-start gap-3 py-5 lg:py-6",
                // stacked: every cell but the first opens with a rule
                i > 0 && "border-t border-white/10",
                // 2-up: only cells that start a row keep it (so the last row's
                // rule spans both columns instead of half the strip)
                i === 1 && "sm:border-t-0",
                // 4-up: a single row, so no horizontal rules at all
                "lg:border-t-0",
                // Vertical rules and their gutters. Each cell gets at most one
                // border-left class per breakpoint — pairing `border-l` with
                // `border-l-0` on one element would leave the winner up to
                // Tailwind's own utility ordering rather than this logic.
                i % 2 === 1 && "sm:border-l sm:border-white/10 sm:pl-7",
                i > 0 && "lg:border-l lg:border-white/10 lg:pl-7",
                i < items.length - 1 && "sm:pr-7"
              )}
            >
              <item.icon size={16} className="mt-0.5 shrink-0 text-primary-300" />
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-white">{item.label}</p>
                <p className="mt-[3px] text-[12.5px] text-white/60">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
