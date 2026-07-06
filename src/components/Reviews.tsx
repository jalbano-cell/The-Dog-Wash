"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/content";
import { business } from "@/data/business";
import { Container } from "@/components/ui/Container";
import { StarRating } from "@/components/ui/StarRating";

export function Reviews() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section id="reviews" className="bg-primary-700 py-20 text-white lg:py-28">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-100">
            Reviews
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What Etobicoke pet parents are saying
          </h2>
          <div className="mt-4 flex items-center gap-2">
            <StarRating rating={business.rating.value} />
            <span className="text-sm font-medium text-primary-100">
              {business.rating.value} average from {business.rating.count}+ Google reviews
            </span>
          </div>
        </div>

        <div className="relative mx-auto mt-14 max-w-2xl">
          <Quote className="mx-auto mb-4 text-primary-300" size={32} />
          <div className="min-h-[180px] text-center">
            <p className="text-xl font-medium leading-relaxed sm:text-2xl">
              &ldquo;{testimonials[index].quote}&rdquo;
            </p>
            <div className="mt-6 flex flex-col items-center gap-2">
              <StarRating rating={testimonials[index].rating} />
              <p className="text-sm font-semibold text-primary-100">
                {testimonials[index].name} &middot; {testimonials[index].source}
              </p>
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
