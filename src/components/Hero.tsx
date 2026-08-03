"use client";

import Image from "next/image";
import { Award, Phone, ArrowRight, Star } from "lucide-react";
import { formatRating, type LocationInfo } from "@/data/locations";
import { realAwards, parseAward } from "@/data/business";
import { Container } from "@/components/ui/Container";
import { useBookingModal } from "@/components/BookingModalContext";

export function Hero({ location }: { location: LocationInfo }) {
  const { openBookingModal } = useBookingModal();

  // Composed as one string rather than separate flex children — otherwise the
  // row's gap opens up between "4.2" and the "·".
  const ratingLine = `${formatRating(location.rating.value)} · ${location.rating.count}+ Google reviews`;
  // The pill leads with the placing — the part that earns attention — rather
  // than the year the award data happens to start with.
  const award = realAwards[0];
  const parsed = award ? parseAward(award) : null;
  const awardPill = parsed ? `${parsed.placing} · ${parsed.event}` : award;

  return (
    <section
      id="top"
      className="relative min-h-[620px] overflow-hidden bg-primary-900 text-white lg:min-h-[780px]"
    >
      <Image
        src="/images/hero-grooming.jpg"
        alt="Groomer carefully finishing a small dog's coat at The Dog Wash"
        fill
        priority
        sizes="100vw"
        className="animate-hero-drift object-cover [transform-origin:60%_40%]"
      />
      {/* These alpha stops are load-bearing — tuned so the headline and body
          copy clear WCAG AA over the photograph. Don't lighten them. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,63,107,.94),rgba(18,63,107,.62)_52%,rgba(18,63,107,.72))]"
      />

      <Container className="relative flex min-h-[620px] flex-col justify-end py-14 lg:min-h-[780px] lg:py-16">
        <div className="max-w-[44rem] animate-rise-in">
          {awardPill ? (
            <p className="inline-flex items-center gap-[10px] rounded-full border border-white/45 py-[7px] pl-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-[11px] sm:tracking-[0.18em]">
              <Award size={14} className="shrink-0 text-accent-500" />
              {awardPill}
            </p>
          ) : null}

          <h1 className="mt-[22px] text-[44px] leading-[0.98] tracking-[-0.02em] text-balance sm:text-[62px] lg:text-[82px]">
            <em className="italic text-primary-200">Award-winning</em> dog grooming in {location.region}.
          </h1>

          {/* Label kept as a single element — a flex gap would otherwise open
              up between its words. */}
          <p className="mt-[18px] flex items-start gap-3 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-white">
            <span aria-hidden className="mt-[0.45em] h-px w-[34px] shrink-0 bg-accent-500" />
            <span>{location.eyebrow}</span>
          </p>

          <p className="mt-6 max-w-[32rem] text-[15.5px] leading-[1.7] text-white/[0.78] sm:text-[16.5px]">
            {location.descriptionShort}
          </p>

          <div className="mt-[34px] flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => openBookingModal(location)}
              className="inline-flex min-h-11 items-center gap-[11px] whitespace-nowrap rounded-full bg-accent-600 px-[26px] py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-accent-700"
            >
              Book an appointment
              <ArrowRight size={16} className="shrink-0" />
            </button>
            <a
              href={location.phoneHref}
              className="inline-flex min-h-11 items-center gap-[9px] whitespace-nowrap rounded-full border border-white/[0.34] px-6 py-[15px] text-[15px] font-medium text-white transition-colors hover:border-white/60"
            >
              <Phone size={15} className="shrink-0" />
              {location.phone}
            </a>
            <span className="inline-flex items-center gap-2 whitespace-nowrap text-[13.5px] text-white/[0.78]">
              <Star size={15} strokeWidth={0} className="shrink-0 fill-accent-500" />
              <span>{ratingLine}</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
