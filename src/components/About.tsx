import Image from "next/image";
import { Award, ShieldCheck, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getImage } from "@/data/images";

export function About() {
  const portrait = getImage("about-groomer-portrait.jpg");

  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl ring-1 ring-stone-800/5">
            <Image
              src={`/images/${portrait.filename}`}
              alt={portrait.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-primary-600 p-4 text-white shadow-xl sm:block">
            <p className="flex items-center gap-2 text-sm font-bold">
              <Award size={16} />
              Top 10 Groomer in Canada
            </p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            About The Dog Wash
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
            A luxury pet spa built on trust, care, and craft
          </h2>
          <p className="mt-6 text-base leading-relaxed text-stone-600">
            The Dog Wash is a luxury pet spa on Royal York Rd in Etobicoke, led
            by an award-winning head groomer ranked among the top pet stylists
            in Canada. From breed-standard trims to creative styling, every
            appointment is handled by certified professionals who treat your
            dog like their own.
          </p>
          <p className="mt-4 text-base leading-relaxed text-stone-600">
            Our philosophy is simple: grooming should never feel rushed or
            stressful. We take the time to read each dog&rsquo;s comfort
            level, use gentle handling techniques, and keep our studio
            spotless — so every visit is as calm as it is transformative.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-primary-600" />
              <div>
                <p className="text-sm font-bold text-stone-800">Safety First</p>
                <p className="text-sm text-stone-600">
                  Calm, controlled handling for every breed and temperament.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <HeartHandshake size={20} className="mt-0.5 shrink-0 text-primary-600" />
              <div>
                <p className="text-sm font-bold text-stone-800">Genuine Care</p>
                <p className="text-sm text-stone-600">
                  Friendly staff who listen to exactly what you and your dog need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
