import { gallery } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

export function Gallery() {
  return (
    <section id="gallery" className="bg-primary-900 py-20 text-white lg:py-[104px]">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <SectionHeading
            eyebrow="Transformations"
            title="Before, and"
            titleItalic="after"
            tone="dark"
            className="max-w-[34rem]"
          />
          <p className="max-w-[20rem] text-[15px] leading-[1.7] text-white/60">
            Drag each photo to reveal the result — the calm, careful work dog parents come back
            for.
          </p>
        </div>

        <div className="mt-10 grid gap-[22px] sm:grid-cols-2 lg:mt-[52px] lg:grid-cols-3">
          {gallery.map((pair) => (
            <figure key={pair.id} className="m-0">
              <BeforeAfterSlider
                before={pair.before}
                after={pair.after}
                beforeAlt={pair.beforeAlt}
                afterAlt={pair.afterAlt}
              />
              <figcaption className="mt-3.5 flex items-baseline justify-between gap-3">
                <span className="font-display text-[21px]">{pair.breed}</span>
                <span className="text-[11px] uppercase tracking-[0.12em] text-white/60">
                  Full groom
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
