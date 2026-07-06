# The Dog Wash — Website

Premium, modern marketing site for **The Dog Wash**, a dog grooming studio at
1500 Royal York Rd #38, Etobicoke, ON. Built with Next.js (App Router),
TypeScript, and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app` — routes, root layout, metadata, sitemap/robots
- `src/components` — homepage sections (Hero, Services, Reviews, Gallery, etc.)
- `src/components/ui` — small shared primitives (Container, SectionHeading, StarRating)
- `src/data` — business info, services, testimonials, and the image manifest
- `src/lib/schema.ts` — LocalBusiness (PetGroomer) JSON-LD structured data
- `public/images` — photography (see below)

## Photography

`src/data/image-manifest.json` is the single source of truth for every image
the site needs — filename, subject, aspect ratio, and alt text. Placeholder
graphics are generated from that manifest:

```bash
node scripts/generate-placeholder-images.mjs
```

To go live, replace the files in `public/images/` with real photography using
the **exact same filenames** listed in the manifest — no code changes needed.

## Content

Business details (address, phone, hours, rating) live in `src/data/business.ts`.
Update there to change anything shown across the site (header, footer, contact
section, and JSON-LD schema all read from this file).
