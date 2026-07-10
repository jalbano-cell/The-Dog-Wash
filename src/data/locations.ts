export type LocationInfo = {
  slug: string;
  shortName: string;
  displayName: string;
  tagline: string;
  descriptionShort: string;
  phone: string;
  phoneHref: string;
  address: {
    line1: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    full: string;
  };
  mapQuery: string;
  geo: { lat: number; lng: number };
  rating: { value: number; count: number; provider: string };
  hours: { day: string; hours: string }[];
  hoursSchema: { days: string[]; opens: string; closes: string }[];
  exteriorImage: string;
  bookingEmail: string;
  isPrimary?: boolean;
};

export const locations: LocationInfo[] = [
  {
    slug: "etobicoke",
    shortName: "Etobicoke",
    displayName: "The Dog Wash – Etobicoke",
    tagline: "Etobicoke's Premium Dog Grooming Studio",
    descriptionShort:
      "Award-winning, certified pet stylists delivering calm, careful grooming for every breed — in a clean, modern studio your dog will actually enjoy.",
    phone: "(416) 242-2501",
    phoneHref: "tel:+14162422501",
    address: {
      line1: "1500 Royal York Rd #38",
      city: "Etobicoke",
      region: "ON",
      postalCode: "M9P 3B6",
      country: "CA",
      full: "1500 Royal York Rd #38, Etobicoke, ON M9P 3B6",
    },
    mapQuery: "1500 Royal York Rd %2338, Etobicoke, ON M9P 3B6",
    geo: { lat: 43.6725, lng: -79.5388 },
    rating: { value: 4.2, count: 220, provider: "Google" },
    hours: [
      { day: "Monday", hours: "Closed" },
      { day: "Tuesday", hours: "9:00 AM – 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM – 5:00 PM" },
      { day: "Thursday", hours: "10:00 AM – 6:00 PM" },
      { day: "Friday", hours: "9:00 AM – 5:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 5:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
    hoursSchema: [
      { days: ["Tuesday", "Wednesday", "Friday", "Saturday"], opens: "09:00", closes: "17:00" },
      { days: ["Thursday"], opens: "10:00", closes: "18:00" },
    ],
    exteriorImage: "contact-facility-exterior-etobicoke.jpg",
    bookingEmail: "johnalbano2015@gmail.com",
    isPrimary: true,
  },
  {
    // Real address/coordinates resolved from the owner's Google Maps link
    // (maps.app.goo.gl/4vNqiGCHnmL5FXbx5) via reverse geocoding. Services are
    // still placeholders — swap src/data/services.ts entries for this slug
    // once the owner provides the real service list, and confirm the rating
    // once the location's real Google review data is available.
    slug: "limehouse",
    shortName: "Limehouse",
    displayName: "The Dog Wash Inc.",
    tagline: "Limehouse's Express Self-Serve Wash & Grooming Bar",
    descriptionShort:
      "A fast, affordable self-serve wash bar plus express grooming services — for pet parents who want a quick, quality clean without booking a full spa day.",
    phone: "(905) 702-9274",
    phoneHref: "tel:+19057029274",
    address: {
      line1: "13364 Highway 7",
      city: "Halton Hills",
      region: "ON",
      postalCode: "L7G 4S4",
      country: "CA",
      full: "13364 Highway 7, Halton Hills, ON L7G 4S4",
    },
    mapQuery: "43.6582941,-79.9619322",
    geo: { lat: 43.6582941, lng: -79.9619322 },
    rating: { value: 4.6, count: 85, provider: "Google" },
    hours: [
      { day: "Monday", hours: "Closed" },
      { day: "Tuesday", hours: "Closed" },
      { day: "Wednesday", hours: "Closed" },
      { day: "Thursday", hours: "9:00 AM – 5:00 PM" },
      { day: "Friday", hours: "Closed" },
      { day: "Saturday", hours: "Closed" },
      { day: "Sunday", hours: "9:00 AM – 5:00 PM" },
    ],
    hoursSchema: [{ days: ["Thursday", "Sunday"], opens: "09:00", closes: "17:00" }],
    exteriorImage: "contact-facility-exterior-limehouse.jpg",
    bookingEmail: "johnalbano2016@gmail.com",
  },
];

export function getLocationBySlug(slug: string): LocationInfo | undefined {
  return locations.find((location) => location.slug === slug);
}

export function getPrimaryLocation(): LocationInfo {
  return locations.find((location) => location.isPrimary) ?? locations[0];
}

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export type DayHours = { closed: true } | { closed: false; opens: string; closes: string };

export function getHoursForDate(location: LocationInfo, date: Date): DayHours {
  const dayName = WEEKDAYS[date.getDay()];
  const entry = location.hoursSchema.find((h) => h.days.includes(dayName));
  if (!entry) return { closed: true };
  return { closed: false, opens: entry.opens, closes: entry.closes };
}
