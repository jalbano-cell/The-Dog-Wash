import Link from "next/link";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { business } from "@/data/business";
import { locations, type LocationInfo } from "@/data/locations";
import { Container } from "@/components/ui/Container";

/**
 * Footer nav links are full-width 44px rows on mobile (the padding itself
 * provides the separation, so the list needs no extra spacing there); on
 * desktop they collapse back to the tighter text rhythm.
 */
const footerLink =
  "flex min-h-11 items-center transition-colors hover:text-white lg:min-h-0";
const columnHeading =
  "text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white";

const exploreLinks = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#pricing", label: "Pricing" },
  { href: "#studio", label: "Studio" },
];

export function Footer({ location }: { location: LocationInfo }) {
  return (
    // pb-28 clears the fixed mobile action bar; desktop drops back to the
    // designed 96px.
    <footer className="bg-navy pb-28 pt-16 text-white/[0.62] lg:pb-24">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          <div>
            <p className="font-display text-[26px] text-white">The Dog Wash</p>
            <p className="mt-3.5 max-w-[20rem] text-[13.5px] leading-[1.7]">
              Premium, calm dog grooming in Etobicoke and Georgetown — trusted by pet parents
              across the GTA.
            </p>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-11 items-center gap-2 text-[13.5px] text-white/70 transition-colors hover:text-white lg:mt-4"
            >
              <InstagramIcon size={15} />
              the_dog_wash
            </a>
          </div>

          <div>
            <p className={columnHeading}>Explore</p>
            <ul className="mt-1 text-[13.5px] lg:mt-[18px] lg:space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={footerLink}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/terms" className={footerLink}>
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={columnHeading}>Locations</p>
            <ul className="mt-1 text-[13.5px] lg:mt-[18px] lg:space-y-2">
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
            <p className={columnHeading}>Contact</p>
            <ul className="mt-1 text-[13.5px] lg:mt-[18px] lg:space-y-3">
              <li className="py-2 leading-[1.6] lg:py-0">{location.address.full}</li>
              <li>
                <a href={location.phoneHref} className={footerLink}>
                  {location.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-[22px] text-[12px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} The Dog Wash. All rights reserved.</p>
          <p>
            Website powered and managed by{" "}
            <a
              href="https://omnigriddigital.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="-my-3.5 inline-block py-3.5 text-white/65 transition-colors hover:text-white"
            >
              OmniGrid Digital
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
