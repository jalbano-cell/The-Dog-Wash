"use client";

import { Phone, ArrowRight, MapPin, Sun, Award, ShieldCheck } from "lucide-react";
import type { LocationInfo } from "@/data/locations";
import { Container } from "@/components/ui/Container";
import { StarRating } from "@/components/ui/StarRating";
import { useBookingModal } from "@/components/BookingModalContext";
import { realAwards } from "@/data/business";

// Starburst "seal" path (12-point), computed once.
const BURST_PATH = (() => {
  const points = 12;
  const [outer, inner, cx, cy] = [50, 39, 50, 50];
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i * Math.PI) / points - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"}${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  }
  return `${d}Z`;
})();

export function Hero({ location }: { location: LocationInfo }) {
  const { openBookingModal } = useBookingModal();
  const opensSunday = location.hours.some(
    (h) => h.day === "Sunday" && h.hours.toLowerCase() !== "closed"
  );

  return (
    <section id="top" className="relative overflow-hidden bg-primary-700 text-white">
      {/* Background photo (drop the file at /public/images/hero-grooming.jpg).
          Until it exists, the blue section colour shows through gracefully. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/images/hero-grooming.jpg')] bg-cover bg-center"
      />
      {/* Blue overlays — lighter, so the photo reads through; top darkened to keep the headline legible */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-primary-700/35" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-stone-800/40 via-transparent to-transparent"
      />
      {/* Soft accent glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-16 h-56 w-56 rotate-12 rounded-[45%_55%_50%_50%/55%_45%_55%_45%] bg-white/[0.05]"
      />

      <Container className="relative py-16 lg:py-24">
        {/* Pill tags */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide backdrop-blur">
            <Award size={13} />
            Award-Winning Groomer
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
            <MapPin size={13} />
            {location.tagline}
          </span>
          {opensSunday ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-4 py-1.5 text-xs font-bold text-white shadow-sm">
              <Sun size={13} />
              Open Sundays
            </span>
          ) : null}
        </div>

        {/* Headline */}
        <div className="relative mx-auto mt-8 max-w-4xl text-center">
          <span className="pointer-events-none absolute -left-2 -top-6 hidden h-20 w-20 rotate-[-12deg] items-center justify-center sm:flex lg:-left-8">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-accent-500" aria-hidden>
              <path fill="currentColor" d={BURST_PATH} />
            </svg>
            <span className="relative text-center text-[10px] font-extrabold uppercase leading-[1.1] text-white">
              Award
              <br />
              Winning
            </span>
          </span>
          <h1 className="font-display text-[2.5rem] font-extrabold leading-[1.03] tracking-tight sm:text-6xl sm:leading-[0.95] lg:text-7xl">
            Premium dog grooming,{" "}
            <span className="text-playful-400">calm &amp; careful</span>{" "}
            <span className="text-white/55">from start to finish.</span>
          </h1>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-white/80 sm:text-lg">
          {location.descriptionShort}{" "}
          Book your dog&rsquo;s next visit at our {location.shortName} studio in {location.address.city}.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => openBookingModal(location)}
            className="group inline-flex items-center justify-between gap-3 rounded-full bg-accent-500 py-2 pl-7 pr-2 text-base font-semibold text-white shadow-lg shadow-accent-600/30 transition-all hover:bg-accent-600"
          >
            Book Appointment
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent-600 transition-transform group-hover:translate-x-0.5">
              <ArrowRight size={18} />
            </span>
          </button>
          <a
            href={location.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/15"
          >
            <Phone size={18} />
            Call Now
          </a>
        </div>

        {/* Floating cards composition */}
        <div className="mt-10 grid items-stretch gap-5 sm:mt-14 lg:grid-cols-3">
          {/* Left: social proof */}
          <div className="flex flex-col justify-center rounded-3xl bg-white p-6 text-stone-800 shadow-xl transition-transform duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-2">
              <StarRating rating={location.rating.value} />
              <span className="text-sm font-bold text-stone-800">{location.rating.value}</span>
            </div>
            <p className="mt-2 text-sm text-stone-500">
              {location.rating.count}+ Google reviews
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-stone-800">
              <ShieldCheck size={16} className="text-primary-600" />
              Certified, Award-Winning Stylists
            </p>
          </div>

          {/* Center: our groomers */}
          <div className="flex flex-col justify-center rounded-3xl bg-accent-500 p-6 text-white shadow-xl transition-transform duration-300 hover:-translate-y-1">
            <p className="text-xs font-bold uppercase tracking-wide text-white/80">Our Groomers</p>
            <p className="mt-1.5 flex items-center gap-2 text-base font-extrabold">
              <Award size={18} />
              Certified &amp; Award-Winning Stylists
            </p>
            {realAwards[0] ? <p className="mt-2 text-sm text-white/90">{realAwards[0]}</p> : null}
          </div>

          {/* Right: local & trusted */}
          <div className="flex flex-col justify-center rounded-3xl bg-white p-6 text-stone-800 shadow-xl transition-transform duration-300 hover:-translate-y-1">
            <p className="text-xs font-bold uppercase tracking-wide text-stone-500">Local &amp; Trusted</p>
            <p className="mt-1.5 text-base font-extrabold text-stone-800">
              Serving {location.areaServed[0]} &amp; {location.areaServed[1]}
            </p>
            <p className="mt-2 text-sm text-stone-500">Calm, careful grooming, close to home.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
