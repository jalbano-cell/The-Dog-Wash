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
    <section id="services" data-reveal className="bg-cream py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Services"
          title={`Grooming services at our ${location.shortName} studio`}
          description="Premium care from certified, dog-loving hands — whether your pup needs a single service or a full spa day, we treat them like our own."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.slug}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-800/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden">
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
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold text-stone-800">{service.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
                    {service.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => openBookingModal(location, { service: service.name })}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-700"
                  >
                    Book Now
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
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
