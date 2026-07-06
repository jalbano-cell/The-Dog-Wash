export const business = {
  name: "The Dog Wash",
  legalName: "The Dog Wash",
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
  instagram: "https://www.instagram.com/the_dog_wash/",
  geo: {
    lat: 43.6725,
    lng: -79.5388,
  },
  rating: {
    value: 4.2,
    count: 220,
    provider: "Google",
  },
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
};
