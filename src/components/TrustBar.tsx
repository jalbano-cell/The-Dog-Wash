import { Star, MapPin, Users, Sparkles, PawPrint } from "lucide-react";
import { business } from "@/data/business";
import { Container } from "@/components/ui/Container";

const items = [
  {
    icon: Star,
    label: `${business.rating.value} / 5 on Google`,
    sub: `${business.rating.count}+ reviews`,
  },
  {
    icon: MapPin,
    label: "Local Etobicoke Groomer",
    sub: "Royal York Rd studio",
  },
  {
    icon: Users,
    label: "Experienced Pet Care Staff",
    sub: "Award-winning stylists",
  },
  {
    icon: Sparkles,
    label: "Clean & Safe Facility",
    sub: "Sanitized every visit",
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-sand-dark/60 bg-white bg-dog-pattern py-8">
      <Container className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
        {items.map((item, index) => (
          <div key={item.label} className="relative flex items-center gap-3">
            {index > 0 ? (
              <PawPrint
                aria-hidden
                size={14}
                className="absolute -left-4 top-1/2 hidden -translate-y-1/2 -rotate-12 text-playful-400/50 sm:block"
              />
            ) : null}
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500/10 text-accent-600">
              <item.icon size={18} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-stone-800">{item.label}</p>
              <p className="truncate text-xs text-stone-500">{item.sub}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
