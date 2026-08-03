"use client";

import { Phone, ArrowRight } from "lucide-react";
import type { LocationInfo } from "@/data/locations";
import { Container } from "@/components/ui/Container";
import { useBookingModal } from "@/components/BookingModalContext";

function hoursSummary(location: LocationInfo) {
  const openDays = location.hours.filter((h) => h.hours !== "Closed");
  if (openDays.length === 0) return "";
  return openDays.map((h) => `${h.day.slice(0, 3)} ${h.hours}`).join(" · ");
}

export function BookingCTA({ location }: { location: LocationInfo }) {
  const { openBookingModal } = useBookingModal();
  const summary = hoursSummary(location);

  return (
    <section id="booking" className="relative overflow-hidden bg-primary-600 py-16 text-white lg:py-24">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
        <div className="max-w-[34rem]">
          <h2 className="text-[34px] leading-[1.06] sm:text-[42px] lg:text-[50px]">
            Book your dog&rsquo;s appointment <em className="italic text-primary-200">today</em>
          </h2>
          {/* Composed as one string, not JSX text around an expression: with a
              line break between `{shortName}` and "studio", React's text
              separator absorbs the space and it renders "Etobicokestudio". */}
          <p className="mt-[18px] text-[16px] leading-[1.7] text-white/[0.72]">
            {`Book online in a few taps or call our ${location.shortName} studio directly — we’ll find the right time for you and your dog.`}
          </p>
          {summary ? (
            <p className="mt-5 text-[12px] tracking-[0.06em] text-white/60">Hours: {summary}</p>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-col gap-3 lg:min-w-[260px]">
          <button
            type="button"
            onClick={() => openBookingModal(location)}
            className="inline-flex min-h-11 items-center justify-between gap-3 whitespace-nowrap rounded-full bg-white px-[26px] py-[15px] text-[15px] font-semibold text-primary-900 transition-colors hover:bg-primary-100"
          >
            Book appointment
            <ArrowRight size={16} className="shrink-0" />
          </button>
          <a
            href={location.phoneHref}
            className="inline-flex min-h-11 items-center justify-center gap-[9px] whitespace-nowrap rounded-full border border-white/[0.32] px-[26px] py-[15px] text-[15px] font-medium text-white transition-colors hover:border-white/60"
          >
            <Phone size={15} className="shrink-0" />
            {location.phone}
          </a>
        </div>
      </Container>
    </section>
  );
}
