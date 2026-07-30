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

// Etobicoke: real Google reviews, lightly shortened for the carousel.
const etobicokeReviews: Testimonial[] = [
  {
    quote:
      "I've been to so many groomers around the GTA and not one took the time to hear what I wanted for my poodles. The owner is beyond amazing — she listened, she's honest and professional, and she never rushes. I finally found our salon!",
    name: "Teeta N.",
    dog: "with her toy & miniature poodles",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "Angela was fantastic with my dog Chico, who was very nervous on his first visit. She took the time to make him feel at ease, and I really appreciated her patience and care. Highly recommend The Dog Wash!",
    name: "Gisella G.",
    dog: "with Chico",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "Finding a groomer you actually trust is hard. Everyone here is so kind and patient — Luna gets excited and walks in wagging her tail every time, and the teddy bear cut is perfect every visit. My dogs always come home happy and relaxed.",
    name: "Monica M.",
    dog: "with Luna & Bailey",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "Our dog Charlie, a wire-haired fox terrier, has been groomed here for 6 years. I love how good he looks after every visit to Angela's place!",
    name: "Gabriel I.",
    dog: "with Charlie the Fox Terrier",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "Angela is the only groomer I know who can do such perfect nail trims. She's very kind and professional, and I love the way she connects with my dog. Highly recommend her.",
    name: "Elif H.",
    dog: "",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "For the past 12 years, Angela and The Dog Wash have taken care of all my shelties — usually three at a time, at various stages from puppies to seniors to rescues.",
    name: "André C.",
    dog: "with his Shelties",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "My dog Asher has been groomed here for about 7.5 years. I first came because I lived nearby, and even after moving further away I stayed for their quality, professional service. Thank you Angela and the team!",
    name: "Reb",
    dog: "with Asher",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "My cavapoo Sparky was so hot under his fur during the heatwave, and they made room for me right in the middle of it. Fast, professional, and the best groom he's ever had — comfortable and cute. Highly recommend!",
    name: "Kir M.",
    dog: "with Sparky the Cavapoo",
    rating: 5,
    source: "Google Review",
  },
];

// Georgetown: [PLACEHOLDER — replace with the location's real Google reviews.]
// Written to reflect Georgetown's 5.0 rating and its positioning — gentle,
// calm handling of anxious dogs, with several praising Angela by name. Confirm
// wording/names against the actual Google reviews before launch.
const georgetownReviews: Testimonial[] = [
  {
    quote:
      "Angela was so gentle and patient with my anxious rescue — he's normally terrified of grooming but she kept him calm the whole time. We drove past three other places to come here and it's worth it.",
    name: "Jenna R.",
    dog: "with Finn the rescue mix",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "Best groomer we've found in Halton Hills. Angela genuinely cares about the dogs, not just getting them in and out. My girl comes home happy and looking beautiful every time.",
    name: "Derek M.",
    dog: "with Willow the Golden Retriever",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "My senior dog can be nervous and stiff, but Angela takes her time and is so kind with him. You can tell she loves what she does. Highly recommend to anyone in the area.",
    name: "Patricia L.",
    dog: "with Baxter the Cocker Spaniel",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "So happy we found this place. Calm, clean, and Angela is fantastic with dogs who don't love being groomed. My poodle actually walks in wagging now.",
    name: "Sam T.",
    dog: "with Pixel the Toy Poodle",
    rating: 5,
    source: "Google Review",
  },
  {
    quote:
      "Being open on Sundays is a lifesaver for our schedule, and the grooming is top-notch. Angela is gentle, professional, and clearly great with anxious dogs. Five stars.",
    name: "Nicole B.",
    dog: "with Momo the Bichon Frise",
    rating: 5,
    source: "Google Review",
  },
];

export const reviewsByLocation: Record<string, Testimonial[]> = {
  etobicoke: etobicokeReviews,
  georgetown: georgetownReviews,
};

export function getReviewsForLocation(slug: string): Testimonial[] {
  return reviewsByLocation[slug] ?? etobicokeReviews;
}

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
