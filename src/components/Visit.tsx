import Image from "next/image";
import clsx from "clsx";
import type { LocationInfo } from "@/data/locations";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { FaqAccordion } from "@/components/FaqAccordion";

const cellLabel = "text-[10.5px] font-semibold uppercase tracking-[0.16em] text-stone-300";

/**
 * Address, hours, map and the contact form — with the FAQ folded in beside it
 * rather than occupying a full section of its own.
 */
export function Visit({ location }: { location: LocationInfo }) {
  const mapSrc = `https://maps.google.com/maps?q=${location.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="visit" className="bg-cream py-20 lg:py-[104px]">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Visit us"
              title="Find our"
              titleItalic={`${location.shortName} studio`}
              description={`Conveniently located on ${location.address.line1} — walk-ins welcome when space allows, appointments preferred.`}
            />

            <div className="relative mt-8 aspect-16/10 overflow-hidden rounded-[3px]">
              <Image
                src={`/images/${location.exteriorImage}`}
                alt={`The Dog Wash ${location.shortName} storefront exterior`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Hairlines drawn by a 1px gap over a border-coloured backing,
                same trick as the Studio care grid. */}
            <div className="mt-[22px] grid gap-px rounded-[3px] border border-border bg-border sm:grid-cols-2">
              <div className="bg-white px-[22px] py-5">
                <p className={cellLabel}>Address</p>
                <p className="mt-2 text-[14px] leading-[1.6] text-primary-900">{location.address.full}</p>
              </div>
              <div className="bg-white px-[22px] py-5">
                <p className={cellLabel}>Phone</p>
                <a
                  href={location.phoneHref}
                  className="mt-1 inline-flex min-h-11 items-center text-[14px] text-primary-600 hover:text-primary-500"
                >
                  {location.phone}
                </a>
              </div>
              <div className="bg-white px-[22px] py-5 sm:col-span-2">
                <p className={cellLabel}>Hours</p>
                <dl className="mt-3">
                  {location.hours.map((h) => {
                    const closed = h.hours.toLowerCase() === "closed";
                    return (
                      <div
                        key={h.day}
                        className="flex items-baseline justify-between gap-3 border-b border-dashed border-border-light py-1.5 last:border-b-0"
                      >
                        <dt className="text-[13.5px] text-stone-600">{h.day}</dt>
                        <dd
                          className={clsx(
                            "text-[13.5px] font-medium",
                            closed ? "text-stone-300" : "text-primary-900"
                          )}
                        >
                          {h.hours}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>

            <div className="mt-[22px] overflow-hidden rounded-[3px] border border-border">
              <iframe
                title={`Map to The Dog Wash ${location.shortName}`}
                src={mapSrc}
                loading="lazy"
                className="block h-[300px] w-full border-0"
              />
            </div>
          </div>

          <div>
            <ContactForm location={location} />
            <div className="mt-8">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
