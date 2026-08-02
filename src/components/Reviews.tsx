import { Star } from "lucide-react";
import { getReviewsForLocation } from "@/data/content";
import { formatRating, type LocationInfo } from "@/data/locations";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Reviews({ location }: { location: LocationInfo }) {
  const testimonials = getReviewsForLocation(location.slug);
  // Duplicated once so the marquee loops seamlessly — the track translates
  // exactly -50%, landing the copy back where the original started.
  const track = [...testimonials, ...testimonials];

  return (
    <section id="reviews" className="overflow-hidden border-t border-border bg-white py-20 lg:py-[104px]">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
        <SectionHeading
          eyebrow="Reviews"
          title={`What ${location.shortName} pet parents`}
          titleItalic="are saying"
          className="max-w-[34rem]"
        />
        <div className="shrink-0 sm:text-right">
          <p className="font-display text-[44px] leading-none text-navy lg:text-[54px]">
            {formatRating(location.rating.value)}
          </p>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-stone-400">
            Average from {location.rating.count}+ Google reviews
          </p>
        </div>
      </Container>

      <div className="relative mt-10 flex overflow-hidden lg:mt-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent lg:w-[90px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent lg:w-[90px]"
        />
        {/* Paused on hover so a quote can actually be read, and stopped
            outright for anyone who asked for reduced motion. */}
        <div className="flex w-max animate-marquee pl-6 hover:[animation-play-state:paused] motion-reduce:animate-none lg:pl-10">
          {track.map((review, i) => (
            <article
              key={`${review.name}-${i}`}
              className="mr-[22px] flex w-[300px] shrink-0 flex-col rounded-[3px] border border-border bg-cream p-7 sm:w-[370px]"
            >
              <span className="flex items-center gap-[3px]">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} strokeWidth={0} className="fill-accent-500" />
                ))}
              </span>
              <p className="mt-4 flex-1 font-display text-[19px] leading-[1.45] text-navy">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="mt-5 border-t border-border pt-3.5">
                <p className="text-[13.5px] font-semibold text-navy">{review.name}</p>
                <p className="mt-0.5 text-[12.5px] text-stone-400">
                  {[review.dog, review.source].filter(Boolean).join(" · ")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
