import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import type { LocationInfo } from "@/data/locations";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { getImage } from "@/data/images";

export function Contact({ location }: { location: LocationInfo }) {
  const exterior = getImage(location.exteriorImage);
  const mapSrc = `https://maps.google.com/maps?q=${location.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="contact" data-reveal className="bg-cream py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Visit Us"
          title="Find our"
          titleMuted={`${location.shortName} location`}
          description={`Conveniently located on ${location.address.line1} — walk-ins welcome when space allows, appointments preferred.`}
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="relative aspect-video overflow-hidden rounded-3xl shadow-sm ring-1 ring-stone-800/5">
              <Image
                src={`/images/${exterior.filename}`}
                alt={exterior.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-3xl bg-white p-5 ring-1 ring-stone-800/5">
                <MapPin size={20} className="mt-0.5 shrink-0 text-primary-600" />
                <div>
                  <p className="text-sm font-bold text-stone-800">Address</p>
                  <p className="text-sm text-stone-600">{location.address.full}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-3xl bg-white p-5 ring-1 ring-stone-800/5">
                <Phone size={20} className="mt-0.5 shrink-0 text-primary-600" />
                <div>
                  <p className="text-sm font-bold text-stone-800">Phone</p>
                  <a href={location.phoneHref} className="text-sm text-stone-600 hover:text-primary-600">
                    {location.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 ring-1 ring-stone-800/5">
              <div className="mb-3 flex items-center gap-2">
                <Clock size={18} className="text-primary-600" />
                <p className="text-sm font-bold text-stone-800">Hours</p>
              </div>
              <dl className="grid grid-cols-1 gap-y-1.5 text-sm">
                {location.hours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between border-b border-sand-dark/50 py-1.5 last:border-0">
                    <dt className="text-stone-600">{h.day}</dt>
                    <dd
                      className={
                        h.hours === "Closed" ? "text-stone-400" : "font-medium text-stone-800"
                      }
                    >
                      {h.hours}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <ContactForm location={location} />
        </div>

        <div className="mt-8 min-h-[320px] overflow-hidden rounded-3xl shadow-sm ring-1 ring-stone-800/5">
          <iframe
            title="The Dog Wash location map"
            src={mapSrc}
            className="h-full min-h-[320px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Container>
    </section>
  );
}
