"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { gallery } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Gallery() {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxImage]);

  return (
    <section id="gallery" className="bg-cream bg-dog-pattern py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="Real transformations, every breed"
          description="A look at the calm, careful grooming results our clients come back for."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {gallery.map((pair) => (
            <div key={pair.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-800/5">
              <div className="grid grid-cols-2 gap-px bg-sand-dark/60">
                <button
                  type="button"
                  onClick={() => setLightboxImage({ src: pair.before, alt: pair.beforeAlt })}
                  className="relative aspect-[3/4] cursor-zoom-in"
                >
                  <Image
                    src={pair.before}
                    alt={pair.beforeAlt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 16vw, 45vw"
                    className="object-cover"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-stone-800/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Before
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxImage({ src: pair.after, alt: pair.afterAlt })}
                  className="relative aspect-[3/4] cursor-zoom-in"
                >
                  <Image
                    src={pair.after}
                    alt={pair.afterAlt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 16vw, 45vw"
                    className="object-cover"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-primary-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    After
                  </span>
                </button>
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-stone-800">{pair.breed}</p>
                <p className="text-xs text-stone-500">Full grooming transformation</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {lightboxImage ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-stone-800/80 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxImage(null);
          }}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>
          <div className="relative aspect-[3/4] h-[85vh] max-h-[85vh] max-w-full">
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              fill
              sizes="90vw"
              className="rounded-2xl object-contain"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
