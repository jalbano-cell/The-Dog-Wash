import Image from "next/image";
import { gallery } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Gallery() {
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
                <div className="relative aspect-[4/3]">
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
                </div>
                <div className="relative aspect-[4/3]">
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
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-stone-800">{pair.breed}</p>
                <p className="text-xs text-stone-500">Full grooming transformation</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
