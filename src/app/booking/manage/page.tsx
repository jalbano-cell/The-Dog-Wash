import type { Metadata } from "next";
import { getLocationBySlug } from "@/data/locations";
import { verifyBookingToken } from "@/lib/bookingToken";
import { googleCalendarUrl } from "@/lib/calendar";

export const metadata: Metadata = {
  title: "Manage booking request",
  robots: { index: false, follow: false },
};

function serviceLine(service: string, customService: string) {
  return service === "custom" ? `Custom — ${customService || "not specified"}` : service || "Not specified";
}

const fieldClass =
  "w-full rounded-xl border border-sand-dark bg-cream/50 px-3 py-2 text-sm text-stone-800 outline-none focus:border-primary-500 focus:bg-white";

export default async function ManageBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;
  const booking = verifyBookingToken(token);
  const location = booking ? getLocationBySlug(booking.locationSlug) : undefined;

  if (!booking || !location) {
    return (
      <main className="mx-auto max-w-md px-6 py-16 text-center">
        <h1 className="text-xl font-bold text-stone-800">This link isn&rsquo;t valid</h1>
        <p className="mt-2 text-sm text-stone-600">
          It may have been altered or is from an old email. Open the original booking request email and try again.
        </p>
      </main>
    );
  }

  const requestedDateTime =
    booking.date && booking.time ? `${booking.date}T${booking.time}` : booking.date ? `${booking.date}T09:00` : "";
  const calendarUrl = location.bookingMode === "calendar" ? googleCalendarUrl(booking, location) : null;

  return (
    <main className="mx-auto max-w-lg px-6 py-12">
      <div className="rounded-3xl border border-sand-dark/70 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
          The Dog Wash — {location.shortName}
        </p>
        <h1 className="mt-1 font-display text-2xl font-extrabold text-stone-800">Booking request</h1>

        <dl className="mt-6 divide-y divide-sand-dark/60 text-sm">
          {[
            ["Name", booking.name],
            ["Phone", booking.phone],
            ["Email", booking.customerEmail],
            ["Service", serviceLine(booking.service, booking.customService)],
            ["Requested date", booking.date || "Not specified"],
            ["Requested time", booking.time || "Not specified"],
            ["Dog", [booking.dogName, booking.dogBreed].filter(Boolean).join(" — ") || "Not specified"],
            ["Size", booking.dogSize || "Not specified"],
            ["Notes", booking.message || "None"],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-4 py-2.5">
              <dt className="w-32 shrink-0 font-medium text-stone-500">{label}</dt>
              <dd className="text-stone-800">{value}</dd>
            </div>
          ))}
        </dl>

        {/* Approve the requested time — available for both modes */}
        <form method="POST" action="/api/booking/approve" className="mt-7">
          <input type="hidden" name="token" value={token} />
          <input type="hidden" name="by" value="owner" />
          <button
            type="submit"
            className="w-full rounded-full bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-navy"
          >
            {location.bookingMode === "calendar" ? "Approve & confirm" : "Approve requested time"}
          </button>
        </form>

        {location.bookingMode === "calendar" && calendarUrl ? (
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-accent-500 px-6 py-3 text-sm font-semibold text-accent-600 transition-colors hover:bg-accent-500/10"
          >
            📅 Add to your Google Calendar
          </a>
        ) : null}

        {location.bookingMode === "approve" ? (
          <div className="mt-6 rounded-2xl border border-sand-dark/70 bg-cream p-5">
            <p className="text-sm font-bold text-stone-800">…or offer two alternative times</p>
            <p className="mt-1 text-xs text-stone-500">
              The customer gets an email to pick whichever works — their choice is confirmed automatically.
            </p>
            <form method="GET" action="/api/booking/offer" className="mt-4 space-y-3">
              <input type="hidden" name="token" value={token} />
              <div>
                <label htmlFor="t1" className="mb-1 block text-xs font-semibold text-stone-700">
                  Option 1
                </label>
                <input id="t1" name="t1" type="datetime-local" required defaultValue={requestedDateTime} className={fieldClass} />
              </div>
              <div>
                <label htmlFor="t2" className="mb-1 block text-xs font-semibold text-stone-700">
                  Option 2
                </label>
                <input id="t2" name="t2" type="datetime-local" required className={fieldClass} />
              </div>
              <button
                type="submit"
                className="w-full rounded-full border border-primary-600 px-6 py-3 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
              >
                Email these two times
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </main>
  );
}
