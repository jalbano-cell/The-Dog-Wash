"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { getReviewsForLocation } from "@/data/content";
import type { LocationInfo } from "@/data/locations";
import { Container } from "@/components/ui/Container";
import { StarRating } from "@/components/ui/StarRating";
import { CountUp } from "@/components/CountUp";

export function Reviews({ location }: { location: LocationInfo }) {
  const testimonials = getReviewsForLocation(location.slug);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, paused]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  }

  return (
    <section id="reviews" className="bg-primary-700 py-20 text-white lg:py-28">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-100">
            Reviews
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What {location.address.city} pet parents are saying
          </h2>
          <div className="mt-4 flex items-center gap-2">
            <StarRating rating={location.rating.value} />
            <span className="text-sm font-medium text-primary-100">
              {location.rating.value} average from <CountUp end={location.rating.count} />+ Google reviews
            </span>
          </div>
        </div>

        <div
          className="relative mx-auto mt-14 max-w-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-roledescription="carousel"
          aria-label="Customer reviews"
        >
          <Quote className="mx-auto mb-4 text-primary-300" size={32} />
          <div className="min-h-[200px] text-center" aria-live="polite">
            <p className="text-xl font-medium leading-relaxed sm:text-2xl">
              &ldquo;{testimonials[index].quote}&rdquo;
            </p>
            <div className="mt-6 flex flex-col items-center gap-2">
              <StarRating rating={testimonials[index].rating} />
              <p className="text-sm font-semibold text-white">
                {testimonials[index].name}
                <span className="font-normal text-primary-100"> {testimonials[index].dog}</span>
              </p>
              <p className="text-xs text-primary-100/80">{testimonials[index].source}</p>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name + i}
                  aria-label={`Go to review ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
