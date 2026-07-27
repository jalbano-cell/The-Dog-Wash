import Image from "next/image";
import { Award, ShieldCheck, HeartHandshake, Trophy } from "lucide-react";
import type { LocationInfo } from "@/data/locations";
import { Container } from "@/components/ui/Container";
import { getImage } from "@/data/images";
import { realAwards } from "@/data/business";

export function About({ location }: { location: LocationInfo }) {
  const portrait = getImage("about-groomer-portrait.jpg");

  return (
    <section id="about" data-reveal className="bg-white py-20 lg:py-28">
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
              <Trophy size={16} />
              Award-Winning Groomer
            </p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            About Our {location.shortName} Location
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
            A luxury pet spa built on trust, care, and craft
          </h2>
          <p className="mt-6 text-base leading-relaxed text-stone-600">
            The Dog Wash&rsquo;s {location.shortName} location is on{" "}
            {location.address.line1} in {location.address.city}, led by an
            award-winning head groomer ranked among the top pet stylists in
            Canada. From breed-standard trims to creative styling, every
            appointment is handled by certified professionals who treat your
            dog like their own.
          </p>
          <p className="mt-4 text-base leading-relaxed text-stone-600">
            Our philosophy is simple: grooming should never feel rushed or
            stressful. We take the time to read each dog&rsquo;s comfort
            level, use gentle handling techniques, and keep our studio
            spotless — so every visit is as calm as it is transformative.
          </p>

          {realAwards.length > 0 ? (
            <div className="mt-8 rounded-2xl border border-primary-200 bg-primary-50 p-5">
              <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-primary-700">
                <Trophy size={16} />
                Award-Winning · Recognized &amp; Certified
              </p>
              <ul className="mt-3 space-y-2">
                {realAwards.map((award) => (
                  <li key={award} className="flex items-start gap-2 text-sm font-medium text-stone-700">
                    <Award size={15} className="mt-0.5 shrink-0 text-primary-600" />
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

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
