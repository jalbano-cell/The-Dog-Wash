import { Phone, MapPin, Clock, AtSign } from "lucide-react";
import type { LocationInfo } from "@/data/locations";
import { business } from "@/data/business";
import { Container } from "@/components/ui/Container";

function openDays(location: LocationInfo) {
  return location.hours
    .filter((h) => h.hours.toLowerCase() !== "closed")
    .map((h) => h.day.slice(0, 3))
    .join(", ");
}

export function TopBar({ location }: { location: LocationInfo }) {
  return (
    <div className="hidden bg-stone-800 text-white/75 md:block">
      <Container className="flex h-10 items-center justify-between text-xs">
        <div className="flex items-center gap-6">
          <a href={location.phoneHref} className="flex items-center gap-1.5 transition-colors hover:text-white">
            <Phone size={13} className="text-accent-500" />
            {location.phone}
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="text-accent-500" />
            {location.address.full}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-accent-500" />
            Open {openDays(location)}
          </span>
        </div>
        <a
          href={business.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 transition-colors hover:bg-accent-500 hover:text-white"
        >
          <AtSign size={13} />
          the_dog_wash
        </a>
      </Container>
    </div>
  );
}
