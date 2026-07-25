import { gallery } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

export function Gallery() {
  return (
    <section id="gallery" data-reveal className="bg-cream py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="Real transformations, every breed"
          description="Drag the slider on each photo to reveal the before and after — the calm, careful results dog parents come back for."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {gallery.map((pair) => (
            <div key={pair.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-800/5">
              <BeforeAfterSlider
                before={pair.before}
                after={pair.after}
                beforeAlt={pair.beforeAlt}
                afterAlt={pair.afterAlt}
              />
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
