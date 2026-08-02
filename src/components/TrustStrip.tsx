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
    <section aria-label="Credentials" className="bg-navy">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              // Stacked rows are separated by bottom rules; at lg the strip
              // becomes four columns divided by right rules instead.
              className="flex items-start gap-3 border-b border-white/10 py-5 pr-7 last:border-b-0 lg:border-b-0 lg:border-r lg:py-6"
            >
              <item.icon size={16} className="mt-0.5 shrink-0 text-primary-300" />
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-white">{item.label}</p>
                <p className="mt-[3px] text-[12.5px] text-white/55">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
