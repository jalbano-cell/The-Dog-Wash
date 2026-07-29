import { Quote } from "lucide-react";
import { getReviewsForLocation } from "@/data/content";
import type { LocationInfo } from "@/data/locations";
import { Container } from "@/components/ui/Container";
import { StarRating } from "@/components/ui/StarRating";
import { CountUp } from "@/components/CountUp";

export function Reviews({ location }: { location: LocationInfo }) {
  const testimonials = getReviewsForLocation(location.slug);
  // Duplicated once so the marquee can loop seamlessly (track translates -50%).
  const track = [...testimonials, ...testimonials];

  return (
    <section id="reviews" className="overflow-hidden bg-primary-700 py-24 text-white lg:py-32">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary-100">
            Reviews
          </p>
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            What {location.shortName} pet parents{" "}
            <span className="text-primary-300">are saying</span>
          </h2>
          <div className="mt-5 flex items-center gap-2">
            <StarRating rating={location.rating.value} />
            <span className="text-sm font-medium text-primary-100">
              {location.rating.value} average from <CountUp end={location.rating.count} />+ Google reviews
            </span>
          </div>
        </div>
      </Container>

      {/* Auto-scrolling review cards. Pauses on hover; users who prefer reduced
          motion get a static, horizontally scrollable row instead. */}
      <div
        className="group relative mt-16 flex overflow-hidden motion-reduce:overflow-x-auto"
        aria-label="Customer reviews"
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-primary-700 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-primary-700 to-transparent" />

        <div className="flex w-max animate-marquee pl-6 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {track.map((t, i) => (
            <article
              key={i}
              aria-hidden={i >= testimonials.length}
              className="mr-6 flex w-[300px] shrink-0 flex-col rounded-3xl bg-white p-7 text-left text-stone-800 shadow-lg sm:w-[380px]"
            >
              <Quote size={24} className="text-primary-300" />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-700">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 border-t border-sand-dark/60 pt-4">
                <StarRating rating={t.rating} size={15} />
                <p className="mt-2 text-sm font-bold text-stone-800">
                  {t.name}
                  <span className="font-normal text-stone-500"> {t.dog}</span>
                </p>
                <p className="text-xs text-stone-400">{t.source}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
