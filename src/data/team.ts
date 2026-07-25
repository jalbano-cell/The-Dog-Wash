export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  /**
   * Optional image filename in /public/images. When omitted, the UI shows an
   * initials avatar — useful until real team photos are provided.
   */
  image?: string;
  imageAlt?: string;
  isFounder?: boolean;
};

// Founder story and last name are [PLACEHOLDER] — confirm with the client.
// Additional members are data-driven: add or remove entries below (1–3 extra
// cards render cleanly). Drop in a real photo filename per member when ready.
export const team: TeamMember[] = [
  {
    name: "Angela [PLACEHOLDER last name]",
    role: "Founder & Head Groomer",
    bio: "[PLACEHOLDER — founder story: 2–3 warm sentences about Angela, how she started The Dog Wash, her certifications, and what grooming means to her.]",
    image: "about-groomer-portrait.jpg", // [PLACEHOLDER — swap for a real photo of Angela]
    imageAlt: "Angela, founder and head groomer at The Dog Wash",
    isFounder: true,
  },
  {
    name: "[PLACEHOLDER — team member]",
    role: "Pet Stylist",
    bio: "[PLACEHOLDER — one warm sentence about this stylist.]",
  },
  {
    name: "[PLACEHOLDER — team member]",
    role: "Bathing & Care Specialist",
    bio: "[PLACEHOLDER — one warm sentence about this team member.]",
  },
];
