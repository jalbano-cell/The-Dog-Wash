"use client";

import { Phone, MessageSquare, CalendarCheck } from "lucide-react";
import type { LocationInfo } from "@/data/locations";
import { useBookingModal } from "@/components/BookingModalContext";

export function MobileActionBar({ location }: { location: LocationInfo }) {
  const { openBookingModal } = useBookingModal();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-stretch gap-px border-t border-sand-dark bg-white/95 backdrop-blur-md lg:hidden">
      <a
        href={location.phoneHref}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 bg-white py-3 text-xs font-semibold text-stone-800"
      >
        <Phone size={17} />
        Call
      </a>
      <a
        href={location.sms}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 bg-white py-3 text-xs font-semibold text-stone-800"
      >
        <MessageSquare size={17} />
        Text
      </a>
      <button
        type="button"
        onClick={() => openBookingModal(location)}
        className="flex flex-[1.4] items-center justify-center gap-2 bg-primary-600 py-3 text-sm font-semibold text-white"
      >
        <CalendarCheck size={17} />
        Book
      </button>
    </div>
  );
}
