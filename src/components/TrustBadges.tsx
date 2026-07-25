import { Award, BadgeCheck, Star } from "lucide-react";
import type { LocationInfo } from "@/data/locations";
import { business } from "@/data/business";
import { Container } from "@/components/ui/Container";

export function TrustBadges({ location }: { location: LocationInfo }) {
  const badges = [
    {
      icon: Award,
      title: "Award-Winning Groomer",
      sub: business.credentials.award,
    },
    {
      icon: BadgeCheck,
      title: "Certified Pet Stylist",
      sub: business.credentials.certification,
    },
    {
      icon: Star,
      title: `${location.rating.value}★ Google Rating`,
      sub: `${location.rating.count}+ reviews`,
    },
  ];

  return (
    <section aria-label="Credentials" data-reveal className="bg-white pt-4">
      <Container>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex items-center gap-3 rounded-2xl border border-sand-dark/70 bg-primary-50/50 px-4 py-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
                <badge.icon size={18} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-stone-800">{badge.title}</p>
                <p className="truncate text-xs text-stone-500">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
