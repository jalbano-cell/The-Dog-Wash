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

  return (
    <section id="booking" className="bg-stone-800 py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
            Book your dog&rsquo;s appointment{" "}
            <span className="text-primary-300">today</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
            Book online in a few taps or call our {location.shortName} studio
            directly — we&rsquo;ll find the right time for you and your dog.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openBookingModal(location)}
              className="group inline-flex w-full items-center justify-between gap-3 rounded-full bg-primary-600 py-2 pl-7 pr-2 text-base font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-700 sm:w-auto"
            >
              Book Appointment
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary-600 transition-transform group-hover:translate-x-0.5">
                <ArrowRight size={18} />
              </span>
            </button>
            <a
              href={location.phoneHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              <Phone size={18} />
              Call {location.phone}
            </a>
          </div>

          <p className="mt-6 text-xs text-white/50">Hours: {hoursSummary(location)}</p>
        </div>
      </Container>
    </section>
  );
}
