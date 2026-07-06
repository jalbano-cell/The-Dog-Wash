import { Phone, CalendarCheck } from "lucide-react";
import { business } from "@/data/business";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-stretch gap-px border-t border-sand-dark bg-white/95 backdrop-blur-md lg:hidden">
      <a
        href={business.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 bg-white py-3.5 text-sm font-semibold text-stone-800"
      >
        <Phone size={16} />
        Call Now
      </a>
      <a
        href="#booking"
        className="flex flex-1 items-center justify-center gap-2 bg-primary-600 py-3.5 text-sm font-semibold text-white"
      >
        <CalendarCheck size={16} />
        Book Appointment
      </a>
    </div>
  );
}
