import type { CSSProperties } from "react";
import Image from "next/image";
import { Phone, CalendarCheck, MapPin, ShieldCheck, PawPrint } from "lucide-react";
import { business } from "@/data/business";
import { Container } from "@/components/ui/Container";
import { StarRating } from "@/components/ui/StarRating";
import { getImage } from "@/data/images";

export function Hero() {
  const heroImage = getImage("hero-dog-grooming.jpg");

  return (
    <section id="top" className="relative overflow-hidden bg-cream bg-dog-pattern pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary-100/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-0 h-72 w-72 rounded-full bg-playful-100/70 blur-3xl"
      />
      <PawPrint
        aria-hidden
        size={36}
        style={{ "--paw-rotate": "-18deg" } as CSSProperties}
        className="pointer-events-none absolute left-[6%] top-16 hidden -rotate-[18deg] text-playful-400/40 animate-bounce-slow sm:block"
      />
      <PawPrint
        aria-hidden
        size={26}
        style={{ "--paw-rotate": "10deg", animationDelay: "0.6s" } as CSSProperties}
        className="pointer-events-none absolute left-[16%] top-40 hidden rotate-[10deg] text-primary-300/50 animate-bounce-slow sm:block"
      />
      <PawPrint
        aria-hidden
        size={20}
        style={{ "--paw-rotate": "-6deg", animationDelay: "1.2s" } as CSSProperties}
        className="pointer-events-none absolute left-[24%] top-[68%] hidden -rotate-[6deg] text-playful-400/40 animate-bounce-slow lg:block"
      />
      <Container className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div className="animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sand-dark bg-white/70 px-4 py-1.5 text-xs font-semibold text-stone-600">
            <MapPin size={14} className="text-primary-600" />
            Etobicoke&rsquo;s Trusted Dog Groomer
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-stone-800 sm:text-5xl lg:text-[3.4rem]">
            Premium dog grooming,
            <span className="text-primary-600"> calm &amp; careful</span> from
            start to finish.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
            {business.descriptionShort}{" "}
            Book your dog&rsquo;s next groom at our Royal York studio in
            Etobicoke.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 text-base font-semibold text-white shadow-md shadow-primary-600/20 transition-all hover:bg-primary-700 hover:shadow-lg"
            >
              <CalendarCheck size={18} />
              Book Appointment
            </a>
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-800/15 bg-white px-7 py-3.5 text-base font-semibold text-stone-800 transition-all hover:border-primary-600 hover:text-primary-600"
            >
              <Phone size={18} />
              Call Now
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-sand-dark/70 pt-6">
            <div className="flex items-center gap-2.5">
              <StarRating rating={business.rating.value} />
              <span className="text-sm font-semibold text-stone-800">
                {business.rating.value}
                <span className="font-normal text-stone-600">
                  {" "}
                  ({business.rating.count}+ Google reviews)
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-stone-600">
              <ShieldCheck size={16} className="text-primary-600" />
              Certified, Award-Winning Stylists
            </div>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="relative aspect-video overflow-hidden rounded-3xl shadow-2xl shadow-stone-800/10 ring-1 ring-stone-800/5">
            <Image
              src={`/images/${heroImage.filename}`}
              alt={heroImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden items-start gap-3 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-stone-800/5 sm:flex">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-playful-100 text-playful-600">
              <PawPrint size={16} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                Local &amp; Trusted
              </p>
              <p className="mt-1 text-sm font-bold text-stone-800">
                Serving Etobicoke &amp; Toronto
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
