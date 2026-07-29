import { Heart, Award, Sparkles, Leaf, Wallet, MapPin, PawPrint } from "lucide-react";
import { features } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap = {
  heart: Heart,
  award: Award,
  sparkles: Sparkles,
  leaf: Leaf,
  wallet: Wallet,
  mapPin: MapPin,
};

const iconStyles = [
  "bg-primary-600 text-white",
  "bg-playful-500 text-white",
];

export function WhyChooseUs() {
  return (
    <section id="why-us" data-reveal className="bg-white py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Why Choose The Dog Wash"
          title="The care"
          titleMuted="every dog parent hopes for"
          description="A calm environment, experienced hands, and honest pricing — everything that makes grooming stress-free for you and your dog."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-sand-dark/60 bg-cream p-8 transition-colors hover:border-primary-300"
              >
                <PawPrint
                  aria-hidden
                  size={72}
                  className="pointer-events-none absolute -bottom-4 -right-4 rotate-12 text-stone-800/[0.04] transition-transform duration-300 group-hover:rotate-[24deg] group-hover:scale-110"
                />
                <span
                  className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:animate-wag ${iconStyles[index % iconStyles.length]}`}
                >
                  <Icon size={20} />
                </span>
                <h3 className="relative mt-5 text-lg font-bold text-stone-800">{feature.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-stone-600">
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
