import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { business } from "@/data/business";
import { locations, type LocationInfo } from "@/data/locations";
import { Container } from "@/components/ui/Container";

/**
 * Footer nav links were ~17px tall — far under the 44px touch minimum, and
 * stacked closely enough to mis-tap. On mobile each becomes a full-width 44px
 * row (the padding itself provides the separation, so the list's own spacing
 * drops); on desktop they collapse back to the tighter text rhythm.
 */
const footerLink = "flex min-h-11 items-center hover:text-white lg:min-h-0";

export function Footer({ location }: { location: LocationInfo }) {
  return (
    <footer className="relative bg-stone-800 pb-28 pt-14 text-white/70 lg:pb-14">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl font-extrabold text-white">The Dog Wash</p>
            <p className="mt-3 text-sm leading-relaxed">
              Premium, calm dog grooming across Etobicoke — trusted by pet
              parents across Toronto.
            </p>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white/70 hover:text-white lg:mt-4 lg:min-h-0"
            >
              <InstagramIcon size={16} />
              the_dog_wash
            </a>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white">Explore</p>
            <ul className="mt-1 text-sm lg:mt-4 lg:space-y-2">
              <li><a href="#services" className={footerLink}>Services</a></li>
              <li><a href="#reviews" className={footerLink}>Reviews</a></li>
              <li><a href="#gallery" className={footerLink}>Gallery</a></li>
              <li><a href="#about" className={footerLink}>About</a></li>
              <li><Link href="/terms" className={footerLink}>Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white">Locations</p>
            <ul className="mt-1 text-sm lg:mt-4 lg:space-y-2">
              {locations.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={loc.isPrimary ? "/" : `/locations/${loc.slug}`}
                    className={
                      loc.slug === location.slug
                        ? "flex min-h-11 items-center font-semibold text-white lg:min-h-0"
                        : footerLink
                    }
                  >
                    {loc.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white">Contact</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                {location.address.full}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                <a href={location.phoneHref} className={footerLink}>
                  {location.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} The Dog Wash. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Etobicoke &amp; Georgetown, Ontario</span>
          </div>
        </div>
        <div className="mt-3 text-xs text-white/50">
          <p>
            Website powered and managed by{" "}
            <a
              href="https://omnigriddigital.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="-my-3.5 inline-block py-3.5 font-medium text-white/70 hover:text-white"
            >
              OmniGrid Digital
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
