import Image from "next/image";
import { Heart, Award, Sparkles, Leaf, Wallet, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { LocationInfo } from "@/data/locations";
import { features } from "@/data/content";
import { realAwards, parseAward } from "@/data/business";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

const featureIcons: Record<string, LucideIcon> = {
  heart: Heart,
  award: Award,
  sparkles: Sparkles,
  leaf: Leaf,
  wallet: Wallet,
  mapPin: MapPin,
};

/**
 * The studio story — folds together what used to be the separate About and
 * WhyChooseUs sections. The award now leads on the portrait band instead of
 * sitting in its own callout box further down.
 */
export function Studio({ location }: { location: LocationInfo }) {
  const award = realAwards[0];
  const parsed = award ? parseAward(award) : null;

  return (
    <section id="studio" className="bg-cream pb-20 lg:pb-[104px]">
      <div className="relative h-[340px] overflow-hidden bg-primary-900 lg:h-[420px]">
        <Image
          src="/images/about-groomer-portrait.jpg"
          alt="The Dog Wash's award-winning head groomer with a freshly groomed dog"
          fill
          sizes="100vw"
          className="object-cover [object-position:center_32%]"
        />
        {/* Contrast-tuned like the hero overlay — don't lighten. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,63,107,.88),rgba(18,63,107,.6)_60%,rgba(18,63,107,.66))]"
        />
        <Container className="relative flex h-full flex-col justify-end pb-10 text-white lg:pb-11">
          <Eyebrow className="!text-white">The {location.shortName} studio</Eyebrow>
          {award ? (
            <p className="mt-4 max-w-[30rem] font-display text-[30px] leading-[1.14] lg:text-[38px]">
              {parsed ? (
                <>
                  {parsed.placing} —{" "}
                  <em className="italic text-primary-200">
                    {parsed.event}, {parsed.year}
                  </em>
                </>
              ) : (
                award
              )}
            </p>
          ) : null}
          <p className="mt-3 max-w-[26rem] text-[14.5px] leading-[1.7] text-white/80">
            Led by a certified head groomer ranked among the top pet stylists in Canada.
          </p>
        </Container>
      </div>

      <Container className="grid items-start gap-12 pt-14 lg:grid-cols-2 lg:gap-[72px] lg:pt-[72px]">
        <div>
          <h2 className="text-[34px] leading-[1.06] tracking-[-0.015em] text-primary-900 sm:text-[42px] lg:text-[52px]">
            Award-winning grooming,{" "}
            <em className="italic text-stone-500">built on trust and craft</em>
          </h2>
          <p className="mt-6 text-[15.5px] leading-[1.75] text-stone-600">
            The Dog Wash&rsquo;s {location.shortName} location is on {location.address.line1} in{" "}
            {location.address.city}, led by an award-winning head groomer ranked among the top
            pet stylists in Canada. From breed-standard trims to creative styling, every
            appointment is handled by certified professionals who treat your dog like their own.
          </p>
          <p className="mt-3.5 text-[15.5px] leading-[1.75] text-stone-600">
            Our philosophy is simple: grooming should never feel rushed or stressful. We take the
            time to read each dog&rsquo;s comfort level, use gentle handling techniques, and keep
            our studio spotless — so every visit is as calm as it is transformative.
          </p>
        </div>

        {/* The 1px gap over a border-coloured background is what draws the
            hairlines between cells — cheaper than per-cell borders that would
            double up at the seams. */}
        <div className="grid gap-px rounded-[3px] border border-border bg-border sm:grid-cols-2">
          {features.map((feature, i) => {
            const Icon = featureIcons[feature.icon] ?? Sparkles;
            return (
              <div key={feature.title} className="bg-white px-[22px] py-5">
                {/* Alternating blue/pink across the grid — six identical blue
                    glyphs was the largest place the brand's pink had gone
                    missing entirely. */}
                <Icon
                  size={17}
                  className={i % 2 === 0 ? "text-primary-600" : "text-accent-500"}
                />
                <p className="mt-3 text-[14px] font-semibold text-primary-900">{feature.title}</p>
                <p className="mt-1.5 text-[13px] leading-[1.6] text-stone-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
