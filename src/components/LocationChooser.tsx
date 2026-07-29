import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, ArrowRight, PawPrint } from "lucide-react";
import { locations } from "@/data/locations";
import { getImage } from "@/data/images";
import { business } from "@/data/business";
import { Container } from "@/components/ui/Container";
import { StarRating } from "@/components/ui/StarRating";

function openDaysSummary(hours: { day: string; hours: string }[]) {
  const open = hours.filter((h) => h.hours.toLowerCase() !== "closed");
  if (open.length === 0) return "Hours by appointment";
  const short = (d: string) => d.slice(0, 3);
  return `Open ${short(open[0].day)}–${short(open[open.length - 1].day)}`;
}

export function LocationChooser() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="border-b border-sand-dark/60">
        <Container className="flex h-18 items-center justify-center py-3 sm:justify-start">
          <span className="flex items-baseline gap-2">
            <PawPrint size={22} className="mb-0.5 shrink-0 -rotate-12 text-playful-500" />
            <span className="font-display text-xl font-extrabold tracking-tight text-stone-800">
              The Dog Wash
            </span>
          </span>
        </Container>
      </header>

      <main className="flex flex-1 flex-col justify-center py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
              <MapPin size={13} />
              Two Studios
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-stone-800 sm:text-6xl">
              Choose your <span className="text-stone-400">location</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-stone-600 sm:text-lg">
              Pick the studio nearest you to see services, hours, and book your
              dog&apos;s appointment.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {locations.map((location) => {
              const image = getImage(location.exteriorImage);
              return (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-sand-dark/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={`/images/${image.filename}`}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-800/45 to-transparent" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary-600 backdrop-blur">
                      <MapPin size={12} />
                      {location.shortName}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2">
                      <StarRating rating={location.rating.value} size={15} />
                      <span className="text-xs font-medium text-stone-500">
                        {location.rating.value} ({location.rating.count})
                      </span>
                    </div>

                    <h2 className="mt-3 font-display text-2xl font-extrabold text-stone-800">
                      {location.shortName}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
                      {location.tagline}
                    </p>

                    <dl className="mt-4 space-y-2 text-sm text-stone-600">
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="mt-0.5 shrink-0 text-accent-500" />
                        <span>{location.address.full}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="shrink-0 text-accent-500" />
                        <span>{location.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="shrink-0 text-accent-500" />
                        <span>{openDaysSummary(location.hours)}</span>
                      </div>
                    </dl>

                    <span className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-primary-700">
                      Visit {location.shortName} studio
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </main>

      <footer className="border-t border-sand-dark/60 py-6">
        <Container className="text-center text-xs text-stone-500">
          © {new Date().getFullYear()} {business.name} · Premium dog grooming in Etobicoke &amp; Georgetown
        </Container>
      </footer>
    </div>
  );
}
