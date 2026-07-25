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
  /** Dog name + breed, e.g. "Milo the Goldendoodle". */
  dog: string;
  rating: number;
  source: string;
};

// [PLACEHOLDER] reviews written in a realistic voice — replace each entry with
// a real Google review (quote, reviewer first name + last initial, and their
// dog's name/breed) before launch.
export const testimonials: Testimonial[] = [
  {
    quote:
      "The staff really listened to exactly the cut we wanted and took their time getting it right. My girl came home looking incredible and completely relaxed.",
    name: "Sarah M.",
    dog: "with Milo the Goldendoodle",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "Great price and even better service — you can tell they genuinely love dogs. We've already booked our next appointment.",
    name: "Andrew R.",
    dog: "with Bailey the Cocker Spaniel",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "They're so patient with my nervous rescue. They care about how the dogs feel, not just how they look — that means everything to me.",
    name: "Steph K.",
    dog: "with Luna the rescue mix",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "Clean, professional, and somehow my dog actually gets excited when we pull into the parking lot now. That says it all.",
    name: "Tom L.",
    dog: "with Cooper the Bernedoodle",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "Booked a full groom for my Shih Tzu and the attention to detail was excellent. This is our regular spot from now on.",
    name: "Maria P.",
    dog: "with Coco the Shih Tzu",
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
    breed: "Toy Poodle",
    before: "/images/gallery-before-01.jpg",
    after: "/images/gallery-after-01.jpg",
    beforeAlt: "Toy Poodle with an overgrown, matted coat before grooming",
    afterAlt: "Toy Poodle with a neat, fluffy trimmed coat after grooming",
  },
  {
    id: "02",
    breed: "Shih Tzu",
    before: "/images/gallery-before-02.jpg",
    after: "/images/gallery-after-02.jpg",
    beforeAlt: "Black and white Shih Tzu with a wet, matted coat before grooming",
    afterAlt: "Black and white Shih Tzu with a neat, trimmed coat after grooming",
  },
  {
    id: "03",
    breed: "Poodle Mix",
    before: "/images/gallery-before-03.jpg",
    after: "/images/gallery-after-03.jpg",
    beforeAlt: "Brown Poodle Mix mid-bath, covered in shampoo suds",
    afterAlt: "Brown Poodle Mix with a fluffy, rounded breed-standard cut after grooming",
  },
];
