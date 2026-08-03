"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, PawPrint, MapPin, ChevronsUpDown } from "lucide-react";
import type { LocationInfo } from "@/data/locations";
import { Container } from "@/components/ui/Container";
import { useBookingModal } from "@/components/BookingModalContext";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#pricing", label: "Pricing" },
  { href: "#studio", label: "Studio" },
  { href: "#visit", label: "Visit" },
];

export function Header({ location }: { location: LocationInfo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBookingModal } = useBookingModal();

  return (
    <header className="sticky top-0 z-60 w-full border-b border-border bg-cream/[0.92] backdrop-blur-[12px]">
      {/* Every group is shrink-0: the wordmark must never compress, so at
          narrow widths the nav drops out (below lg) rather than squeezing it. */}
      <Container className="flex h-[74px] items-center justify-between gap-4">
        <div className="flex shrink-0 items-center gap-[10px]">
          {/* -my-2/py-2 extends the tap area past 44px without changing the
              header's height. */}
          <Link href="#top" className="-my-2 flex shrink-0 items-center gap-[9px] py-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-900 text-white">
              <PawPrint size={16} />
            </span>
            <span className="whitespace-nowrap font-display text-[25px] leading-none tracking-[-0.01em] text-primary-900">
              The Dog Wash
            </span>
          </Link>
          <Link
            href="/"
            aria-label="Change location"
            className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-border-input bg-white px-[11px] py-[5px] text-[11px] font-semibold uppercase tracking-[0.09em] text-primary-600 transition-colors hover:border-primary-600 sm:inline-flex"
          >
            <MapPin size={11} />
            {location.shortName}
            <ChevronsUpDown size={11} className="opacity-50" />
          </Link>
        </div>

        <nav className="hidden shrink-0 items-center gap-[clamp(11px,1.6vw,28px)] lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[13px] font-medium text-stone-600 transition-colors hover:text-primary-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <a
            href={location.phoneHref}
            aria-label="Call the studio"
            title={location.phone}
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-border-input text-primary-900 transition-colors hover:border-primary-600 hover:text-primary-600"
          >
            <Phone size={15} />
          </a>
          <button
            type="button"
            onClick={() => openBookingModal(location)}
            className="shrink-0 whitespace-nowrap rounded-full bg-accent-600 px-[22px] py-[11px] text-[13.5px] font-semibold text-white transition-colors hover:bg-accent-700"
          >
            Book appointment
          </button>
        </div>

        <button
          type="button"
          className="-mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary-900 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {menuOpen ? (
        <div className="border-t border-border bg-cream lg:hidden">
          <Container className="flex flex-col py-3">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-11 items-center gap-2 rounded-sm px-1 text-[14px] font-semibold text-primary-600"
            >
              <MapPin size={15} />
              Change location ({location.shortName})
            </Link>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center rounded-sm px-1 text-[14px] font-medium text-stone-600"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={location.phoneHref}
                className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-border-input px-5 text-[14px] font-semibold text-primary-900"
              >
                <Phone size={15} />
                {location.phone}
              </a>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openBookingModal(location);
                }}
                className="min-h-11 rounded-full bg-accent-600 px-5 text-center text-[14px] font-semibold text-white"
              >
                Book appointment
              </button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
