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
  ArrowRight,
} from "lucide-react";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap = {
  scissors: Scissors,
  droplets: Droplets,
  hand: Hand,
  ear: Ear,
  wind: Wind,
  puppy: Dog,
  smile: Smile,
  shield: ShieldCheck,
};

export function Services() {
  return (
    <section id="services" className="bg-cream py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Services"
          title="Grooming services for every dog, every coat"
          description="Premium care backed by certified technique — book a single service or a full spa day."
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
                  <a
                    href="#booking"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-700"
                  >
                    Book Now
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
