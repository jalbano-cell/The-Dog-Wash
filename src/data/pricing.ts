// Per-location pricing. Add-on prices are a flat $15 for now (client will
// finalize later). Keep the "from $" format; the UI adds the "from" label.
// Different locations can carry different prices.

export type SizeTier = {
  size: "Small" | "Medium" | "Large";
  weight: string;
  /** Starting price for a Full Groom, e.g. "65". Rendered as "from $65". */
  fullGroomFrom: string;
  inclusions: string[];
};

export type AddOn = {
  name: string;
  /** e.g. "15" or "15–25". Rendered as "$15". */
  price: string;
};

export type LocationPricing = {
  /**
   * Service name (must match a service in src/data/services.ts for this
   * location) that the size-tier "Book now" buttons pre-select in the booking
   * form.
   */
  bookingService: string;
  sizeTiers: SizeTier[];
  addOns: AddOn[];
};

const etobicoke: LocationPricing = {
  bookingService: "Full Grooming",
  sizeTiers: [
    {
      size: "Small",
      weight: "Under 20 lbs",
      fullGroomFrom: "125",
      inclusions: ["Bath, blow-dry & brush-out", "Breed-standard haircut", "Nail trim & ear cleaning"],
    },
    {
      size: "Medium",
      weight: "20–50 lbs",
      fullGroomFrom: "140",
      inclusions: ["Bath, blow-dry & brush-out", "Full haircut & styling", "Nail trim & ear cleaning"],
    },
    {
      size: "Large",
      weight: "50+ lbs",
      fullGroomFrom: "160",
      inclusions: ["Bath, blow-dry & brush-out", "Full haircut & styling", "Nail trim, ear cleaning & extra care time"],
    },
  ],
  addOns: [
    { name: "Nail Trim", price: "15" },
    { name: "Ear Cleaning", price: "15" },
    { name: "De-Shedding Treatment", price: "15" },
    { name: "Teeth Cleaning", price: "15" },
    { name: "Flea & Tick Treatment", price: "15" },
  ],
};

const georgetown: LocationPricing = {
  bookingService: "Bath & Brush",
  sizeTiers: [
    {
      size: "Small",
      weight: "Under 20 lbs",
      fullGroomFrom: "125",
      inclusions: ["Warm bath & blow-dry", "De-tangling brush-out", "Nail trim & ear cleaning"],
    },
    {
      size: "Medium",
      weight: "20–50 lbs",
      fullGroomFrom: "140",
      inclusions: ["Warm bath & blow-dry", "De-tangling brush-out", "Nail trim & ear cleaning"],
    },
    {
      size: "Large",
      weight: "50+ lbs",
      fullGroomFrom: "160",
      inclusions: ["Warm bath & blow-dry", "De-tangling brush-out", "Nail trim, ear cleaning & extra care time"],
    },
  ],
  addOns: [
    { name: "Nail Trim", price: "15" },
    { name: "Ear Cleaning", price: "15" },
    { name: "De-Shedding Treatment", price: "15" },
    { name: "Teeth Cleaning", price: "15" },
    { name: "Flea & Tick Treatment", price: "15" },
  ],
};

const pricingByLocation: Record<string, LocationPricing> = {
  etobicoke,
  georgetown,
};

export function getPricingForLocation(slug: string): LocationPricing {
  return pricingByLocation[slug] ?? etobicoke;
}
