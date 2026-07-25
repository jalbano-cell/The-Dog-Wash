"use client";

import { useEffect, useState, type FormEvent } from "react";
import { X, Phone, CalendarCheck, CheckCircle2, Dog, MapPin, ChevronDown, AlertCircle, Loader2 } from "lucide-react";
import clsx from "clsx";
import { locations, getHoursForDate, type LocationInfo } from "@/data/locations";
import { getServicesForLocation } from "@/data/services";
import { DatePicker } from "@/components/DatePicker";
import { TimePicker } from "@/components/TimePicker";

function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const dogSizes = [
  { value: "small", label: "Small", sub: "Under 20 lbs", iconSize: 20 },
  { value: "medium", label: "Medium", sub: "20–50 lbs", iconSize: 30 },
  { value: "large", label: "Large", sub: "50+ lbs", iconSize: 42 },
] as const;

export function BookingModal({
  location,
  presetService,
  onClose,
}: {
  location: LocationInfo;
  presetService?: string;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState(location);
  const [dogSize, setDogSize] = useState<(typeof dogSizes)[number]["value"] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const availableServices = getServicesForLocation(currentLocation.slug);
  const [selectedService, setSelectedService] = useState(() =>
    presetService && availableServices.some((s) => s.name === presetService) ? presetService : ""
  );

  const hoursForSelectedDate = selectedDate ? getHoursForDate(currentLocation, selectedDate) : null;

  function handleLocationChange(next: LocationInfo) {
    setCurrentLocation(next);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedService("");
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        body: new FormData(e.currentTarget),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong sending your request — please call us instead.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-800/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-stone-800/5 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-sand hover:text-stone-800"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-600">
              <CheckCircle2 size={28} />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-stone-800">Request sent!</h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-600">
              {`Thanks for reaching out to our ${currentLocation.shortName} studio — we’ll email you a confirmation shortly, or call or text if we need anything else.`}
            </p>
            <a
              href={currentLocation.phoneHref}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-primary-600 px-6 py-2.5 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
            >
              <Phone size={16} />
              Or call {currentLocation.phone}
            </a>
          </div>
        ) : (
          <>
            <div className="mb-6 pr-8">
              <h2 id="booking-modal-title" className="text-2xl font-bold text-stone-800">
                Book an appointment
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Tell us a bit about your dog and we&rsquo;ll follow up to confirm a
                time.
              </p>

              <div className="mt-4 rounded-2xl border-2 border-primary-200 bg-primary-50 p-3">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary-700">
                  <MapPin size={13} />
                  Studio location
                </p>
                <div className="flex gap-2">
                  {locations.map((loc) => {
                    const isActive = loc.slug === currentLocation.slug;
                    return (
                      <button
                        key={loc.slug}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => handleLocationChange(loc)}
                        className={clsx(
                          "flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition-all",
                          isActive
                            ? "bg-primary-600 text-white shadow-sm"
                            : "bg-white text-stone-600 ring-1 ring-primary-200 hover:text-primary-600"
                        )}
                      >
                        {loc.shortName}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="location" value={currentLocation.slug} />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-name" className="mb-1.5 block text-xs font-semibold text-stone-700">
                    Your name
                  </label>
                  <input
                    id="booking-name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-sand-dark bg-cream/50 px-4 py-2.5 text-sm text-stone-800 outline-none transition-colors focus:border-primary-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="booking-phone" className="mb-1.5 block text-xs font-semibold text-stone-700">
                    Phone number
                  </label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-xl border border-sand-dark bg-cream/50 px-4 py-2.5 text-sm text-stone-800 outline-none transition-colors focus:border-primary-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="booking-email" className="mb-1.5 block text-xs font-semibold text-stone-700">
                  Email address
                </label>
                <input
                  id="booking-email"
                  name="customerEmail"
                  type="email"
                  required
                  placeholder="We'll send your confirmation here"
                  className="w-full rounded-xl border border-sand-dark bg-cream/50 px-4 py-2.5 text-sm text-stone-800 outline-none transition-colors focus:border-primary-500 focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="booking-service" className="mb-1.5 block text-xs font-semibold text-stone-700">
                  Service
                </label>
                <div className="relative">
                  <select
                    id="booking-service"
                    name="service"
                    required
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-sand-dark bg-cream/50 px-4 py-2.5 pr-10 text-sm text-stone-800 outline-none transition-colors focus:border-primary-500 focus:bg-white"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {availableServices.map((service) => (
                      <option key={service.slug} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                    <option value="custom">Custom — not sure / something else</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                </div>
              </div>

              {selectedService === "custom" ? (
                <div>
                  <label htmlFor="booking-custom-service" className="mb-1.5 block text-xs font-semibold text-stone-700">
                    Tell us what you&rsquo;re looking for
                  </label>
                  <input
                    id="booking-custom-service"
                    name="customService"
                    type="text"
                    placeholder="e.g. Just a nail trim and ear cleaning"
                    className="w-full rounded-xl border border-sand-dark bg-cream/50 px-4 py-2.5 text-sm text-stone-800 outline-none transition-colors focus:border-primary-500 focus:bg-white"
                  />
                </div>
              ) : null}

              <input type="hidden" name="date" value={selectedDate ? toISODate(selectedDate) : ""} />
              <input type="hidden" name="time" value={selectedTime ?? ""} />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 block text-xs font-semibold text-stone-700">Preferred date</p>
                  <DatePicker
                    value={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setSelectedTime(null);
                    }}
                    isDateDisabled={(date) => getHoursForDate(currentLocation, date).closed}
                  />
                </div>
                <div>
                  <p className="mb-1.5 block text-xs font-semibold text-stone-700">Preferred time</p>
                  <TimePicker
                    value={selectedTime}
                    onChange={setSelectedTime}
                    disabled={!hoursForSelectedDate || hoursForSelectedDate.closed}
                    opensAt={hoursForSelectedDate && !hoursForSelectedDate.closed ? hoursForSelectedDate.opens : undefined}
                    closesAt={hoursForSelectedDate && !hoursForSelectedDate.closed ? hoursForSelectedDate.closes : undefined}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-dog-name" className="mb-1.5 block text-xs font-semibold text-stone-700">
                    Dog&rsquo;s name
                  </label>
                  <input
                    id="booking-dog-name"
                    name="dogName"
                    type="text"
                    placeholder="e.g. Bailey"
                    className="w-full rounded-xl border border-sand-dark bg-cream/50 px-4 py-2.5 text-sm text-stone-800 outline-none transition-colors focus:border-primary-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="booking-dog-breed" className="mb-1.5 block text-xs font-semibold text-stone-700">
                    Breed
                  </label>
                  <input
                    id="booking-dog-breed"
                    name="dogBreed"
                    type="text"
                    placeholder="e.g. Goldendoodle"
                    className="w-full rounded-xl border border-sand-dark bg-cream/50 px-4 py-2.5 text-sm text-stone-800 outline-none transition-colors focus:border-primary-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <p className="mb-1.5 block text-xs font-semibold text-stone-700">Dog&rsquo;s size</p>
                <input type="hidden" name="dogSize" value={dogSize ?? ""} />
                <div className="grid grid-cols-3 gap-3">
                  {dogSizes.map((size) => {
                    const isSelected = dogSize === size.value;
                    return (
                      <button
                        key={size.value}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setDogSize(size.value)}
                        className={clsx(
                          "flex flex-col items-center gap-2 rounded-2xl border px-2 py-4 text-center transition-colors",
                          isSelected
                            ? "border-primary-600 bg-primary-50"
                            : "border-sand-dark bg-cream/50 hover:border-primary-300"
                        )}
                      >
                        <span className="flex h-11 items-end justify-center">
                          <Dog
                            size={size.iconSize}
                            className={clsx("transition-colors", isSelected ? "text-primary-600" : "text-stone-400")}
                          />
                        </span>
                        <span
                          className={clsx(
                            "text-xs font-semibold",
                            isSelected ? "text-primary-700" : "text-stone-700"
                          )}
                        >
                          {size.label}
                        </span>
                        <span className="text-[10px] text-stone-500">{size.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="booking-message" className="mb-1.5 block text-xs font-semibold text-stone-700">
                  Notes — anything else we should know?
                </label>
                <textarea
                  id="booking-message"
                  name="message"
                  rows={3}
                  placeholder="e.g. A bit nervous around dryers, needs a specific shampoo"
                  className="w-full resize-none rounded-xl border border-sand-dark bg-cream/50 px-4 py-2.5 text-sm text-stone-800 outline-none transition-colors focus:border-primary-500 focus:bg-white"
                />
              </div>

              {submitError ? (
                <p className="flex items-center gap-1.5 text-sm font-medium text-red-600">
                  <AlertCircle size={15} />
                  {submitError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-primary-600/20 transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <CalendarCheck size={18} />
                    Send Booking Request
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 flex items-center justify-center gap-2 border-t border-sand-dark/70 pt-5 text-sm text-stone-600">
              Prefer to call?
              <a
                href={currentLocation.phoneHref}
                className="inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:text-primary-700"
              >
                <Phone size={14} />
                {currentLocation.phone}
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
