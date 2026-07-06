export type Feature = {
  title: string;
  description: string;
  icon: "heart" | "award" | "sparkles" | "leaf" | "wallet" | "mapPin";
};

export const features: Feature[] = [
  {
    title: "Gentle Handling",
    description:
      "Every dog is handled with patience and calm, low-stress techniques — no rushing, no rough restraint.",
    icon: "heart",
  },
  {
    title: "Award-Winning Groomers",
    description:
      "Our head groomer is a certified, award-winning stylist recognized among the top groomers in Canada.",
    icon: "award",
  },
  {
    title: "Clean, Sanitized Studio",
    description:
      "A modern, hygienic space with sanitized tools and stations for every single appointment.",
    icon: "sparkles",
  },
  {
    title: "Stress-Free Experience",
    description:
      "A quiet, comfortable environment designed to keep anxious pets relaxed from arrival to pickup.",
    icon: "leaf",
  },
  {
    title: "Fair, Transparent Pricing",
    description:
      "Straightforward pricing discussed upfront — no surprises, no hidden add-ons at pickup.",
    icon: "wallet",
  },
  {
    title: "Trusted Across Etobicoke",
    description:
      "A long-standing local studio with hundreds of five-star relationships built one dog at a time.",
    icon: "mapPin",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  rating: number;
  source: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Staff is friendly and really listens to requests. They took the time to understand exactly the cut we wanted.",
    name: "J. M.",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "Great price, great service — will definitely be going back. My dog came out looking better than ever.",
    name: "A. R.",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "They're so patient with my nervous rescue. You can tell they genuinely care about how the dogs feel, not just how they look.",
    name: "S. K.",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "Clean, professional, and my Goldendoodle actually gets excited when we pull into the parking lot now.",
    name: "T. L.",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "Booked a full groom for my Shih Tzu and the attention to detail was excellent. Will be our regular spot from now on.",
    name: "M. P.",
    rating: 4,
    source: "Google Review",
  },
];

export type GalleryPair = {
  id: string;
  breed: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
};

export const gallery: GalleryPair[] = [
  {
    id: "01",
    breed: "Goldendoodle",
    before: "/images/gallery-before-01.jpg",
    after: "/images/gallery-after-01.jpg",
    beforeAlt: "Goldendoodle with an overgrown, matted coat before grooming",
    afterAlt: "Goldendoodle with a neat, fluffy trimmed coat after grooming",
  },
  {
    id: "02",
    breed: "Shih Tzu",
    before: "/images/gallery-before-02.jpg",
    after: "/images/gallery-after-02.jpg",
    beforeAlt: "Shih Tzu with a long, shaggy coat before grooming",
    afterAlt: "Shih Tzu with a short, clean puppy-cut style after grooming",
  },
  {
    id: "03",
    breed: "Poodle Mix",
    before: "/images/gallery-before-03.jpg",
    after: "/images/gallery-after-03.jpg",
    beforeAlt: "Poodle mix with a dense, tangled coat before grooming",
    afterAlt: "Poodle mix with a rounded, breed-standard cut after grooming",
  },
];
