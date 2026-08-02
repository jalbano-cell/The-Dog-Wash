"use client";

import Image from "next/image";
import {
  Scissors,
  Droplets,
  Hand,
  Ear,
  Wind,
  Dog,
  Smile,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { getServicesForLocation } from "@/data/services";
import type { LocationInfo } from "@/data/locations";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useBookingModal } from "@/components/BookingModalContext";

const iconMap = {
  scissors: Scissors,
  droplets: Droplets,
  hand: Hand,
  ear: Ear,
  wind: Wind,
  puppy: Dog,
  smile: Smile,
  shield: ShieldCheck,
  sparkles: Sparkles,
};

export function Services({ location }: { location: LocationInfo }) {
  const services = getServicesForLocation(location.slug);
  const { openBookingModal } = useBookingModal();

  return (
    <section id="services" data-reveal className="bg-cream py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our Services"
          title="Grooming services"
          titleMuted={`at our ${location.shortName} studio`}
          description="Premium care from certified, dog-loving hands — whether your pup needs a single service or a full spa day, we treat them like our own."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.slug}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-stone-800/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary-600 shadow-sm">
                    <Icon size={17} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold text-stone-800">{service.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-500">
                    {service.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => openBookingModal(location, { service: service.name })}
                    // min-h-11 (44px) so the primary per-service CTA is a full
                    // touch target — it was 28px tall, well under the minimum.
                    className="mt-3 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-700"
                  >
                    Book Now
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-50 transition-transform group-hover:translate-x-0.5">
                      <ArrowRight size={13} />
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
