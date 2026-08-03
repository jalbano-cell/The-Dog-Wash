"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { LocationInfo } from "@/data/locations";
import { getServicesForLocation } from "@/data/services";
import { getPricingForLocation } from "@/data/pricing";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useBookingModal } from "@/components/BookingModalContext";

export function Services({ location }: { location: LocationInfo }) {
  const { openBookingModal } = useBookingModal();
  const services = getServicesForLocation(location.slug);
  const pricing = getPricingForLocation(location.slug);

  // The location's headline service leads as a tall photo card; the rest fill
  // a compact two-column list beside it.
  const [featured, ...rest] = services;
  const fromPrice = pricing.sizeTiers[0]?.fullGroomFrom;

  if (!featured) return null;

  return (
    <section id="services" className="bg-cream py-20 lg:py-[104px]">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <SectionHeading
            eyebrow="Services"
            title="Every service,"
            titleItalic="handled with patience"
            className="max-w-[34rem]"
          />
          <p className="max-w-[22rem] text-[15px] leading-[1.7] text-stone-500">
            Premium care from certified, dog-loving hands — whether your pup needs a single
            service or a full spa day, we treat them like our own.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-[22px] lg:mt-[52px] lg:grid-cols-[1.35fr_1fr_1fr]">
          <article className="relative min-h-[380px] overflow-hidden rounded-[3px] bg-navy text-white lg:min-h-[440px]">
            <Image
              src={featured.image}
              alt={featured.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover opacity-[0.92]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,40,63,.92),rgba(18,40,63,.25)_55%,rgba(18,40,63,.05))]"
            />
            <div className="relative flex h-full flex-col justify-end p-7 lg:p-[34px]">
              {/* accent-400, not -500: the brighter pink is only 4.25:1 over
                  the photo overlay and this label sets at 10px. */}
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-400">
                Most booked
              </p>
              <h3 className="mt-3 text-[30px] leading-[1.08] lg:text-[38px]">{featured.name}</h3>
              <p className="mt-3 max-w-[24rem] text-[14.5px] leading-[1.7] text-white/75">
                {featured.description}
              </p>
              <div className="mt-[22px] flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => openBookingModal(location, { service: featured.name })}
                  className="inline-flex min-h-11 items-center gap-[9px] rounded-full bg-accent-600 px-[22px] text-[14px] font-semibold text-white transition-colors hover:bg-accent-700"
                >
                  Book this
                  <ArrowRight size={15} />
                </button>
                {fromPrice ? (
                  <span className="text-[13px] text-white/60">from ${fromPrice}</span>
                ) : null}
              </div>
            </div>
          </article>

          <div className="grid gap-[22px] sm:grid-cols-2 lg:col-span-2">
            {rest.map((service) => (
              <article
                key={service.slug}
                className="flex flex-col overflow-hidden rounded-[3px] border border-border bg-white transition-colors hover:border-primary-300"
              >
                <div className="flex gap-4 p-5">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[2px]">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-sans text-[15px] font-semibold tracking-[-0.005em] text-navy">
                      {service.name}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-[1.6] text-stone-400">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-light px-5">
                  <span className="text-[11px] uppercase tracking-[0.1em] text-stone-300">
                    Add-on or standalone
                  </span>
                  <button
                    type="button"
                    onClick={() => openBookingModal(location, { service: service.name })}
                    className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-primary-600 transition-colors hover:text-primary-500"
                  >
                    Book
                    <ArrowRight size={13} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
