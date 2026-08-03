import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, PawPrint, Star } from "lucide-react";
import { locations, formatRating } from "@/data/locations";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function LocationChooser() {
  return (
    <div className="flex min-h-dvh flex-col bg-primary-900 text-white">
      <Container className="flex items-center justify-between gap-4 py-8 lg:py-10">
        <div className="flex items-center gap-[9px]">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-primary-900">
            <PawPrint size={16} />
          </span>
          <span className="font-display text-[25px] leading-none">The Dog Wash</span>
        </div>
        <span className="hidden text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:block">
          Two studios near Toronto
        </span>
      </Container>

      <Container className="flex flex-1 flex-col justify-center pb-16 lg:pb-20">
        <Eyebrow tone="dark">Choose your location</Eyebrow>
        <h1 className="mt-[22px] max-w-[30rem] text-[42px] leading-[1.02] tracking-[-0.02em] sm:text-[56px] lg:text-[70px]">
          Premium dog grooming, <em className="italic text-primary-300">calm &amp; careful</em>
        </h1>
        <p className="mt-[22px] max-w-[34rem] text-[15.5px] leading-[1.7] text-white/65 sm:text-[16.5px]">
          Pick the studio closest to you to see services, hours and pricing — and to book your
          dog&rsquo;s appointment.
        </p>

        <div className="mt-10 grid gap-[22px] lg:mt-14 lg:grid-cols-2">
          {locations.map((location) => (
            <Link
              key={location.slug}
              href={location.isPrimary ? `/locations/${location.slug}` : `/locations/${location.slug}`}
              className="group relative min-h-[360px] overflow-hidden rounded-[3px] transition-opacity hover:opacity-[0.94] lg:min-h-[420px]"
            >
              <Image
                src={`/images/${location.exteriorImage}`}
                alt={`The Dog Wash ${location.shortName} storefront exterior`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,63,107,.94),rgba(18,63,107,.4)_55%,rgba(18,63,107,.12))]"
              />
              <div className="relative flex h-full flex-col justify-end p-7 lg:p-[34px]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-300">
                  {location.eyebrow.split(" · ")[0]}
                </p>
                <h2 className="mt-3 text-[34px] leading-[1.05] lg:text-[42px]">
                  {location.shortName}
                </h2>
                <p className="mt-2.5 max-w-[24rem] text-[14.5px] leading-[1.65] text-white/75">
                  {location.address.full}
                </p>
                <div className="mt-[22px] flex flex-wrap items-center gap-[18px] text-[12.5px] text-white/70">
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <Star size={13} strokeWidth={0} className="fill-accent-500" />
                    {formatRating(location.rating.value)} · {location.rating.count}+ reviews
                  </span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <Phone size={13} />
                    {location.phone}
                  </span>
                </div>
                <span className="mt-[26px] inline-flex w-fit items-center gap-[9px] whitespace-nowrap rounded-full bg-white px-[22px] py-3 text-[14px] font-semibold text-primary-900">
                  View this studio
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
