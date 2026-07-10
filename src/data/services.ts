export type Service = {
  slug: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  icon: "scissors" | "droplets" | "hand" | "ear" | "wind" | "puppy" | "smile" | "shield" | "sparkles";
  /** Slugs of the locations (see src/data/locations.ts) that offer this service. */
  locations: string[];
};

export const services: Service[] = [
  {
    slug: "full-grooming",
    name: "Full Grooming",
    description:
      "A complete head-to-tail groom — bath, cut, styling and finishing touches — tailored to your dog's breed and coat.",
    image: "/images/service-full-grooming.jpg",
    alt: "Freshly groomed white fluffy dog wearing a plaid bow tie collar, sitting on a grooming table",
    icon: "scissors",
    locations: ["etobicoke"],
  },
  {
    slug: "bath-brush",
    name: "Bath & Brush",
    description:
      "A gentle, thorough wash and blow-dry with de-tangling brush-out, leaving coats soft, clean and fresh.",
    image: "/images/service-bath-brush.jpg",
    alt: "Soapy Poodle Mix getting a bath in a grooming tub",
    icon: "droplets",
    locations: ["etobicoke", "limehouse"],
  },
  {
    slug: "nail-trimming",
    name: "Nail Trimming",
    description:
      "Careful, low-stress nail trims and filing to keep paws healthy and comfortable between visits.",
    image: "/images/service-nail-trim.jpg",
    alt: "Close-up of a groomer trimming a dog's nails with clippers",
    icon: "hand",
    locations: ["etobicoke", "limehouse"],
  },
  {
    slug: "ear-cleaning",
    name: "Ear Cleaning",
    description:
      "Gentle ear cleaning to help prevent buildup, irritation and infection — especially for floppy-eared breeds.",
    image: "/images/service-ear-cleaning.jpg",
    alt: "Groomer gently cleaning a Golden Retriever's ear with a wipe",
    icon: "ear",
    locations: ["etobicoke", "limehouse"],
  },
  {
    slug: "deshedding",
    name: "De-Shedding Treatment",
    description:
      "A specialized treatment that removes loose undercoat to cut down shedding and keep your home fur-free.",
    image: "/images/service-deshedding.jpg",
    alt: "Groomer de-shedding a Golden Retriever's coat with a slicker brush",
    icon: "wind",
    locations: ["etobicoke", "limehouse"],
  },
  {
    slug: "puppy-grooming",
    name: "Puppy Grooming",
    description:
      "A soft introduction to grooming for puppies — short, positive sessions that build lifelong comfort and trust.",
    image: "/images/service-puppy-grooming.jpg",
    alt: "Groomer combing and trimming a red Toy Poodle puppy's coat",
    icon: "puppy",
    locations: ["etobicoke"],
  },
  {
    slug: "teeth-cleaning",
    name: "Teeth Cleaning",
    description:
      "Basic dental hygiene care to help freshen breath and support healthy teeth and gums.",
    image: "/images/service-teeth-cleaning.jpg",
    alt: "Groomer cleaning a Golden Retriever's teeth with a finger toothbrush",
    icon: "smile",
    locations: ["etobicoke"],
  },
  {
    slug: "flea-tick-treatment",
    name: "Flea & Tick Treatment",
    description:
      "A soothing treatment bath formulated to help clear fleas and ticks and calm irritated skin.",
    image: "/images/service-flea-tick.jpg",
    alt: "Applying a spot-on flea and tick treatment to a dog's coat",
    icon: "shield",
    locations: ["etobicoke", "limehouse"],
  },
  {
    slug: "self-serve-wash",
    name: "Self-Serve Wash Station",
    description:
      "Bring your dog in and use our walk-up wash stations — we supply the shampoo, towels and dryers, you supply the belly rubs.",
    image: "/images/service-self-serve-wash.jpg",
    alt: "Self-serve dog wash station with steps, tub, and coin-operated control panel",
    icon: "sparkles",
    locations: ["limehouse"],
  },
];

export function getServicesForLocation(slug: string): Service[] {
  return services.filter((service) => service.locations.includes(slug));
}
