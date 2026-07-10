"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, PawPrint } from "lucide-react";
import clsx from "clsx";
import type { LocationInfo } from "@/data/locations";
import { Container } from "@/components/ui/Container";
import { useBookingModal } from "@/components/BookingModalContext";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#reviews", label: "Reviews" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Header({ location }: { location: LocationInfo }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-sand-dark/60 bg-cream/90 backdrop-blur-md"
          : "border-b border-transparent bg-cream/40 backdrop-blur-sm"
      )}
    >
      <Container className="flex h-18 items-center justify-between py-3">
        <Link href="#top" className="group flex items-baseline gap-2">
          <PawPrint
            size={22}
            className="mb-0.5 shrink-0 -rotate-12 text-playful-500 transition-transform duration-300 group-hover:animate-wag"
          />
          <span className="font-display text-xl font-extrabold tracking-tight text-stone-800">
            The Dog Wash
          </span>
          <span className="hidden text-xs font-medium text-primary-600 sm:inline">
            {location.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-600 transition-colors hover:text-primary-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={location.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-stone-800 transition-colors hover:text-primary-600"
          >
            <Phone size={16} />
            {location.phone}
          </a>
          <button
            type="button"
            onClick={() => openBookingModal(location)}
            className="rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md"
          >
            Book Appointment
          </button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-stone-800 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {menuOpen ? (
        <div className="border-t border-sand-dark/60 bg-cream lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-sand"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2 px-3">
              <a
                href={location.phoneHref}
                className="flex items-center justify-center gap-2 rounded-full border border-primary-600 px-5 py-2.5 text-sm font-semibold text-primary-600"
              >
                <Phone size={16} />
                Call Now
              </a>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openBookingModal(location);
                }}
                className="rounded-full bg-primary-600 px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                Book Appointment
              </button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
