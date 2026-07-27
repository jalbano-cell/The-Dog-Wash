import { Award, BadgeCheck, Star } from "lucide-react";
import type { LocationInfo } from "@/data/locations";
import { business, realAwards } from "@/data/business";
import { Container } from "@/components/ui/Container";

export function TrustBadges({ location }: { location: LocationInfo }) {
  const awardCount = realAwards.length;
  const awardSub =
    awardCount > 1 ? `${awardCount}× award winner` : realAwards[0] ?? "Multiple grooming awards";

  return (
    <section aria-label="Credentials" data-reveal className="bg-white pt-4">
      <Container>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* Featured: award-winning gets the emphasis treatment. */}
          <div className="flex items-center gap-3 rounded-2xl bg-primary-600 px-4 py-3.5 shadow-md shadow-primary-600/20 ring-1 ring-primary-600 sm:col-span-1">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary-600">
              <Award size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-extrabold uppercase tracking-wide text-white">
                Award-Winning Groomer
              </p>
              <p className="truncate text-xs font-medium text-primary-100">{awardSub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-sand-dark/70 bg-primary-50/50 px-4 py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
              <BadgeCheck size={18} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-stone-800">Certified Pet Stylist</p>
              <p className="truncate text-xs text-stone-500">{business.credentials.certification}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-sand-dark/70 bg-primary-50/50 px-4 py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
              <Star size={18} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-stone-800">{location.rating.value}★ Google Rating</p>
              <p className="truncate text-xs text-stone-500">{location.rating.count}+ reviews</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
