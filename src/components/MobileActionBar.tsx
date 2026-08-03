"use client";

import { Phone } from "lucide-react";
import type { LocationInfo } from "@/data/locations";
import { useBookingModal } from "@/components/BookingModalContext";

export function MobileActionBar({ location }: { location: LocationInfo }) {
  const { openBookingModal } = useBookingModal();

  return (
    // pb-safe clears the iPhone home indicator — it depends on
    // `viewportFit: "cover"` in app/layout.tsx, without which env() is 0.
    <div className="pb-safe fixed inset-x-0 bottom-0 z-70 flex items-stretch border-t border-border-input bg-white/[0.96] backdrop-blur-[10px] lg:hidden">
      <a
        href={location.phoneHref}
        className="flex min-h-[52px] flex-1 items-center justify-center gap-2 py-[15px] text-[14px] font-semibold text-primary-900"
      >
        <Phone size={15} />
        Call now
      </a>
      <button
        type="button"
        onClick={() => openBookingModal(location)}
        className="min-h-[52px] flex-1 bg-accent-600 py-[15px] text-[14px] font-semibold text-white"
      >
        Book appointment
      </button>
    </div>
  );
}
