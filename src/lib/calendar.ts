import type { BookingPayload } from "@/lib/bookingToken";
import type { LocationInfo } from "@/data/locations";

// Appointments are booked in 2-hour blocks; calendar events span that window.
const EVENT_DURATION_MINUTES = 120;
const TIMEZONE = "America/Toronto";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

/** Formats a local date/time (no timezone conversion) as YYYYMMDDTHHMMSS. */
function toCalStamp(year: number, month: number, day: number, minutes: number) {
  const hh = Math.floor(minutes / 60);
  const mm = minutes % 60;
  return `${year}${pad(month)}${pad(day)}T${pad(hh)}${pad(mm)}00`;
}

function serviceLine(booking: Pick<BookingPayload, "service" | "customService">) {
  return booking.service === "custom"
    ? `Custom — ${booking.customService || "not specified"}`
    : booking.service || "Grooming";
}

/**
 * Builds an "Add to Google Calendar" URL for a confirmed booking. Returns null
 * if the booking has no date/time to schedule.
 */
export function googleCalendarUrl(booking: BookingPayload, location: LocationInfo): string | null {
  if (!booking.date || !booking.time) return null;

  const [year, month, day] = booking.date.split("-").map(Number);
  const [hour, minute] = booking.time.split(":").map(Number);
  if (!year || !month || !day || Number.isNaN(hour) || Number.isNaN(minute)) return null;

  const startMinutes = hour * 60 + minute;
  const endMinutes = startMinutes + EVENT_DURATION_MINUTES;
  const start = toCalStamp(year, month, day, startMinutes);
  const end = toCalStamp(year, month, day, endMinutes);

  const dog = [booking.dogName, booking.dogBreed].filter(Boolean).join(" — ");
  const details = [
    `Service: ${serviceLine(booking)}`,
    `Customer: ${booking.name}`,
    `Phone: ${booking.phone}`,
    `Email: ${booking.customerEmail}`,
    dog ? `Dog: ${dog}` : "",
    booking.dogSize ? `Size: ${booking.dogSize}` : "",
    booking.message ? `Notes: ${booking.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Grooming — ${booking.dogName || booking.name} · The Dog Wash ${location.shortName}`,
    dates: `${start}/${end}`,
    details,
    location: location.address.full,
    ctz: TIMEZONE,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
