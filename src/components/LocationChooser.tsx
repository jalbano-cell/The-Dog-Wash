import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, PawPrint, Star, Clock } from "lucide-react";
import { locations, formatRating, getOpenDaysSummary } from "@/data/locations";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

/**
 * The site's front door: a full-bleed dark page whose only job is to send you
 * to one of the two studios.
 *
 * The layout is built around that job — the intro block is sized so the cards
 * break the fold on a phone and sit fully in view on a laptop. It deliberately
 * does *not* vertically centre the intro in the viewport: that reads well in a
 * screenshot but pushes the actual choice off-screen on every real device.
 */
export function LocationChooser() {
  return (
    <div className="flex min-h-dvh flex-col bg-primary-900 text-white">
      <Container className="flex items-center justify-between gap-4 py-6 lg:py-8">
        <div className="flex items-center gap-[9px]">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-primary-900">
            <PawPrint size={16} />
          </span>
          <span className="font-display text-[25px] leading-none">The Dog Wash</span>
        </div>
        <span className="hidden text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:block">
          Two studios near Toronto
        </span>
      </Container>

      {/* Centred only from lg up, where the whole page comfortably fits the
          viewport and top-aligning would leave a dead band under the cards.
          Phones stay top-aligned: there the content is taller than the screen,
          and centring would push the first card below the fold. */}
      <Container className="flex flex-1 flex-col pb-12 pt-2 lg:justify-center lg:pb-16 lg:pt-6">
        {/* Headline and intro share a row on desktop: the headline alone runs to
            a ~30rem measure, which left the right half of a 1200px container
            empty. Baseline-aligned at the bottom so the two blocks sit on one
            optical line rather than floating apart. */}
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-12">
          <div className="lg:col-span-7">
            <Eyebrow tone="dark">Choose your location</Eyebrow>
            <h1 className="mt-5 text-balance text-[38px] leading-[1.04] tracking-[-0.02em] sm:text-[50px] lg:text-[58px]">
              Premium dog grooming, <em className="italic text-primary-300">calm &amp; careful</em>
            </h1>
          </div>
          <p className="mt-5 max-w-[34rem] text-[15.5px] leading-[1.7] text-white/65 sm:text-[16px] lg:col-span-5 lg:mt-0 lg:pb-[0.4em]">
            Pick the studio closest to you to see services, hours and pricing — and to book your
            dog&rsquo;s appointment.
          </p>
        </div>

        {/* Two-up from md, not lg: on a tablet the single-column stack pushed the
            second studio entirely below the fold, which defeats the point of a
            chooser. At 768px each card still clears ~340px, enough for the meta
            row to wrap to two lines rather than truncate. */}
        <div className="mt-8 grid gap-4 sm:gap-[18px] md:grid-cols-2 lg:mt-12 lg:gap-[22px]">
          {locations.map((location, index) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              // bg-primary-900 under the photo: the card is a dark block before
              // the image decodes, so it never flashes the page background
              // through as a white rectangle.
              className="group relative isolate min-h-[380px] overflow-hidden rounded-[3px] bg-primary-900 ring-1 ring-white/10 transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400 hover:ring-white/25 sm:min-h-[400px] lg:min-h-[clamp(340px,46vh,460px)]"
            >
              <Image
                src={`/images/${location.exteriorImage}`}
                alt={`The Dog Wash ${location.shortName} storefront exterior`}
                fill
                sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 50vw, 590px"
                // Next 16 deprecates `priority` in favour of `preload`, but for
                // an above-the-fold image the docs point at loading/fetchPriority
                // instead. Only the first card is guaranteed in view on a phone;
                // the second stays lazy so mobile doesn't pay for both. On
                // desktop it's in the viewport anyway, which native lazy-loading
                // fetches immediately.
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                className="object-cover transition-transform duration-[600ms] ease-out motion-safe:group-hover:scale-[1.04]"
              />
              {/* The scrim is tuned per breakpoint because the text block is a
                  near-fixed height while the card is not: it fills roughly the
                  bottom two-thirds on a phone, and on desktop anywhere from
                  ~45% to ~60% as the card flexes with viewport height. A single
                  set of stops therefore strands the eyebrow and studio name on
                  bare photo at some sizes — over the white Etobicoke sign and
                  Georgetown's sky, exactly where a 10px light-blue label
                  disappears. Both ramps stay near-opaque past the top of their
                  own text zone, then fall away fast so the storefront still
                  reads across the top of the card. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,63,107,.97)_0%,rgba(18,63,107,.93)_58%,rgba(18,63,107,.6)_80%,rgba(18,63,107,.18)_100%)] lg:bg-[linear-gradient(to_top,rgba(18,63,107,.96)_0%,rgba(18,63,107,.92)_62%,rgba(18,63,107,.5)_84%,rgba(18,63,107,.1)_100%)]"
              />
              <div className="relative flex h-full flex-col justify-end p-6 sm:p-7 lg:p-[34px]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-300">
                  {location.eyebrow.split(" · ")[0]}
                </p>
                <h2 className="mt-2.5 text-[32px] leading-[1.05] sm:text-[34px] lg:text-[42px]">
                  {location.shortName}
                </h2>
                {/* Card content is bottom-aligned, so a wrapped address pushes
                    that card's heading up and the two studios stop lining up.
                    Only the md–lg band actually wraps (Etobicoke's address fits
                    on one line again once the cards widen at lg), so the second
                    line is reserved there and released above it. */}
                <p className="mt-2 max-w-[24rem] text-[14.5px] leading-[1.65] text-white/75 md:min-h-[48px] lg:min-h-0">
                  {location.address.full}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-[18px] gap-y-2 text-[12.5px] text-white/70 lg:mt-[18px]">
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <Star size={13} strokeWidth={0} className="fill-accent-500" />
                    {formatRating(location.rating.value)} · {location.rating.count}+ reviews
                  </span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <Clock size={13} />
                    {getOpenDaysSummary(location)}
                  </span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <Phone size={13} />
                    {location.phone}
                  </span>
                </div>
                <span className="mt-5 inline-flex w-fit items-center gap-[9px] whitespace-nowrap rounded-full bg-white px-[22px] py-3 text-[14px] font-semibold text-primary-900 transition-colors duration-200 group-hover:bg-primary-100 lg:mt-[26px]">
                  View this studio
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 motion-safe:group-hover:translate-x-[3px]"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
