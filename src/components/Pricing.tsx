"use client";

import clsx from "clsx";
import { Check } from "lucide-react";
import type { LocationInfo } from "@/data/locations";
import { getPricingForLocation } from "@/data/pricing";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useBookingModal } from "@/components/BookingModalContext";

// Medium is the size most dogs fall into, so it carries the dark treatment and
// the badge rather than being picked as an upsell.
const FEATURED_SIZE = "Medium";

export function Pricing({ location }: { location: LocationInfo }) {
  const pricing = getPricingForLocation(location.slug);
  const { openBookingModal } = useBookingModal();

  return (
    <section id="pricing" className="bg-white py-20 lg:py-[104px]">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Simple,"
          titleItalic="size-based pricing"
          className="max-w-[36rem]"
          description="Every dog is different, so full grooms start from a base price by size. Final price depends on breed, coat condition and size — always confirmed before we start."
        />

        <div className="mt-10 grid items-start gap-[22px] lg:mt-[52px] lg:grid-cols-[1.6fr_1fr]">
          {/* One bordered container with the cells butted together — the
              dividers are the cells' own left borders, not a grid gap. */}
          <div className="grid overflow-hidden rounded-[3px] border border-border sm:grid-cols-3">
            {pricing.sizeTiers.map((tier) => {
              const featured = tier.size === FEATURED_SIZE;
              return (
                <div
                  key={tier.size}
                  className={clsx(
                    "flex flex-col border-t border-border-light px-6 py-[30px] first:border-t-0 sm:border-l sm:border-t-0 sm:first:border-l-0",
                    featured ? "bg-primary-900" : "bg-white"
                  )}
                >
                  <div className="flex min-h-[22px] flex-wrap items-center justify-between gap-1.5">
                    <p
                      className={clsx(
                        "whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-[0.18em]",
                        featured ? "text-primary-300" : "text-stone-300"
                      )}
                    >
                      {tier.size}
                    </p>
                    {/* accent-600, not -500: white on the lighter pink is only
                        3.5:1, and this badge sets at 9.5px. */}
                    {featured ? (
                      <span className="shrink-0 whitespace-nowrap rounded-full bg-accent-600 px-[9px] py-[3px] text-[9.5px] font-semibold uppercase tracking-[0.1em] text-white">
                        Most common
                      </span>
                    ) : null}
                  </div>

                  <p
                    className={clsx(
                      "mt-4 font-display text-[46px] leading-none",
                      featured ? "text-white" : "text-primary-900"
                    )}
                  >
                    <span className="align-top text-[22px] leading-[1.6]">$</span>
                    {tier.fullGroomFrom}
                  </p>
                  <p
                    className={clsx(
                      "mt-1.5 text-[12.5px]",
                      featured ? "text-white/60" : "text-stone-400"
                    )}
                  >
                    Full groom, {tier.weight.toLowerCase()}
                  </p>

                  <ul className="mt-[22px] flex flex-1 flex-col gap-[9px]">
                    {tier.inclusions.map((inc) => (
                      <li
                        key={inc}
                        className={clsx(
                          "flex items-start gap-2 text-[13px] leading-[1.55]",
                          featured ? "text-white/[0.82]" : "text-stone-600"
                        )}
                      >
                        <Check
                          size={14}
                          className={clsx(
                            "mt-[3px] shrink-0",
                            featured ? "text-primary-300" : "text-accent-500"
                          )}
                        />
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() =>
                      openBookingModal(location, { service: pricing.bookingService })
                    }
                    className={clsx(
                      "mt-[26px] min-h-11 rounded-full border px-[18px] text-[13px] font-semibold transition-colors",
                      featured
                        ? "border-white bg-white text-primary-900 hover:bg-primary-100"
                        : "border-border-input bg-transparent text-primary-600 hover:border-primary-600"
                    )}
                  >
                    Book now
                  </button>
                </div>
              );
            })}
          </div>

          <div className="rounded-[3px] border border-border bg-cream px-7 py-[30px]">
            <h3 className="text-[26px] text-primary-900">Add-on services</h3>
            <p className="mt-1.5 text-[13px] text-stone-400">
              Add any of these to a groom, or book them on their own.
            </p>
            <dl className="mt-[22px]">
              {pricing.addOns.map((addOn) => (
                <div
                  key={addOn.name}
                  className="flex items-baseline justify-between gap-3 border-b border-dashed border-[#dfe8f3] py-[11px]"
                >
                  <dt className="text-[13.5px] text-stone-700">{addOn.name}</dt>
                  <dd className="font-display text-[19px] text-primary-900">${addOn.price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
