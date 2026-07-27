"use client";

import { Phone, CalendarCheck } from "lucide-react";
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
    <section id="booking" className="bg-stone-800 py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Book your dog&rsquo;s appointment today
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Book online in a few taps or call our {location.shortName} studio
            directly — we&rsquo;ll find the right time for you and your dog.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openBookingModal(location)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-700 sm:w-auto"
            >
              <CalendarCheck size={18} />
              Book Appointment
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
