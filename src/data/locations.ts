export type LocationInfo = {
  slug: string;
  shortName: string;
  displayName: string;
  tagline: string;
  descriptionShort: string;
  /**
   * Small caps label under the hero headline, and the only per-location copy
   * the redesign added. Kept as data (not derived) because the two studios
   * describe themselves differently: Etobicoke is a full-service studio,
   * Georgetown leads with self-serve.
   */
  eyebrow: string;
  /**
   * The area the hero headline claims ("Award-winning dog grooming in
   * {region}"). Distinct from shortName because Georgetown's studio is
   * physically in Limehouse and serves Halton Hills more broadly.
   */
  region: string;
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
  /** Cities/areas served — used in LocalBusiness structured data. */
  areaServed: string[];
  /** One-line description used in the page's LocalBusiness JSON-LD. */
  seoDescription: string;
  hours: { day: string; hours: string }[];
  hoursSchema: { days: string[]; opens: string; closes: string }[];
  exteriorImage: string;
  bookingEmail: string;
  /**
   * How a booking request is handled once Angela reviews it:
   * - "approve": she approves the requested time or offers the customer two
   *   alternative times to pick from.
   * - "calendar": she approves and the confirmation includes an
   *   "Add to Google Calendar" link.
   */
  bookingMode: "approve" | "calendar";
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
    eyebrow: "Certified pet stylists · Etobicoke studio",
    region: "Etobicoke",
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
    geo: { lat: 43.6885, lng: -79.5225 },
    rating: { value: 4.2, count: 220, provider: "Google" },
    areaServed: ["Etobicoke", "Toronto"],
    seoDescription:
      "Award-winning dog grooming studio in Etobicoke, Toronto. Full grooming, bath & brush, nail trims and more from certified pet stylists.",
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
    bookingEmail: "johnalbano2016@gmail.com",
    bookingMode: "approve",
    isPrimary: true,
  },
  {
    // Services are still placeholders — swap src/data/services.ts entries for
    // this slug once the owner provides the real service list.
    slug: "georgetown",
    shortName: "Georgetown",
    displayName: "The Dog Wash Inc.",
    tagline: "Georgetown's Express Self-Serve Wash & Grooming Bar",
    descriptionShort:
      "A fast, affordable self-serve wash bar plus express grooming services — for pet parents who want a quick, quality clean without booking a full spa day.",
    eyebrow: "Self-serve wash & express grooming · Georgetown",
    region: "Halton Hills",
    phone: "(905) 702-9274",
    phoneHref: "tel:+19057029274",
    address: {
      line1: "ON-7",
      city: "Limehouse",
      region: "ON",
      postalCode: "L7G 4S4",
      country: "CA",
      full: "ON-7, Limehouse, ON L7G 4S4",
    },
    mapQuery: "43.660379,-79.964538",
    geo: { lat: 43.660379, lng: -79.964538 },
    rating: { value: 5.0, count: 6, provider: "Google" },
    areaServed: ["Georgetown", "Halton Hills", "Limehouse", "Acton", "Milton"],
    seoDescription:
      "Award-winning dog grooming studio serving Georgetown and Halton Hills. Full grooming, bath & brush, nail trims and more from certified pet stylists.",
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
    exteriorImage: "contact-facility-exterior-georgetown.jpg",
    bookingEmail: "johnalbano2016@gmail.com",
    bookingMode: "calendar",
  },
];

/**
 * Ratings always read to one decimal — a stored 5.0 is the number 5, which
 * would otherwise print as a bare "5" next to Etobicoke's "4.2".
 */
export function formatRating(value: number): string {
  return value.toFixed(1);
}

const DAY_ABBREVIATIONS: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

/**
 * The days a studio is open, collapsed into runs — "Tue–Sat", "Thu & Sun".
 *
 * Derived from `hours` rather than stored alongside it so the two can't drift
 * apart when someone edits opening times. Deliberately days-only: the location
 * chooser needs enough to pick a studio, not the full timetable.
 *
 * Runs are consecutive within the Mon-first `hours` array, so a studio open
 * Sunday *and* Monday reads "Mon & Sun" rather than wrapping the week. Neither
 * studio does that today, and a wrap-around rule would be guesswork.
 */
export function getOpenDaysSummary(location: LocationInfo): string {
  const runs: string[][] = [];
  let previousIndex = -2;

  location.hours.forEach((entry, index) => {
    if (entry.hours.toLowerCase() === "closed") return;
    const abbreviation = DAY_ABBREVIATIONS[entry.day] ?? entry.day;
    if (index === previousIndex + 1) runs[runs.length - 1].push(abbreviation);
    else runs.push([abbreviation]);
    previousIndex = index;
  });

  const parts = runs.map((run) => (run.length > 1 ? `${run[0]}–${run[run.length - 1]}` : run[0]));

  if (parts.length === 0) return "By appointment";
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(", ")} & ${parts[parts.length - 1]}`;
}

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
