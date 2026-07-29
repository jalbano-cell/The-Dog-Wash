"use client";

import { Check, ArrowRight, Dog } from "lucide-react";
import type { LocationInfo } from "@/data/locations";
import { getPricingForLocation } from "@/data/pricing";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useBookingModal } from "@/components/BookingModalContext";

const sizeIcon = { Small: 22, Medium: 32, Large: 42 } as const;

export function Pricing({ location }: { location: LocationInfo }) {
  const pricing = getPricingForLocation(location.slug);
  const { openBookingModal } = useBookingModal();

  return (
    <section id="pricing" data-reveal className="bg-white py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Simple,"
          titleMuted="size-based pricing"
          description="Every dog is different, so full grooms start from a base price by size. Here's what dog parents can expect before we begin."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pricing.sizeTiers.map((tier, index) => {
            const featured = index === 1;
            return (
              <div
                key={tier.size}
                className={`group flex flex-col rounded-3xl border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  featured ? "border-primary-300 ring-1 ring-primary-300" : "border-sand-dark/70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                    <Dog size={sizeIcon[tier.size]} />
                  </span>
                  {featured ? (
                    <span className="rounded-full bg-primary-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                      Most common
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-5 font-display text-xl font-extrabold text-stone-800">
                  {tier.size} Dog
                </h3>
                <p className="text-sm text-stone-500">{tier.weight}</p>

                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">from</span>
                  <span className="font-display text-3xl font-extrabold text-stone-800">${tier.fullGroomFrom}</span>
                </p>
                <p className="text-xs font-medium text-stone-500">Full Groom</p>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {tier.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent-500" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => openBookingModal(location, { service: pricing.bookingService })}
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                    featured
                      ? "bg-primary-600 text-white hover:bg-primary-700"
                      : "bg-primary-50 text-primary-600 hover:bg-primary-100"
                  }`}
                >
                  Book now
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Add-on services */}
        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-sand-dark/70 bg-cream p-6 sm:p-8">
          <h3 className="font-display text-lg font-extrabold text-stone-800">Add-on services</h3>
          <p className="mt-1 text-sm text-stone-500">Add any of these to a groom, or book them on their own.</p>
          <dl className="mt-5 divide-y divide-sand-dark/60">
            {pricing.addOns.map((addOn) => (
              <div key={addOn.name} className="flex items-center justify-between py-3">
                <dt className="text-sm font-medium text-stone-700">{addOn.name}</dt>
                <dd className="font-display text-base font-bold text-stone-800">${addOn.price}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-stone-500">
          Final price depends on breed, coat condition, and size — confirmed before we start.
        </p>
      </Container>
    </section>
  );
}
