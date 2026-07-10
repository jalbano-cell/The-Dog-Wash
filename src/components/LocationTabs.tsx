"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin } from "lucide-react";
import clsx from "clsx";
import { locations } from "@/data/locations";

function hrefForSlug(slug: string) {
  const location = locations.find((l) => l.slug === slug);
  return location?.isPrimary ? "/" : `/locations/${slug}`;
}

export function LocationTabs() {
  const pathname = usePathname();

  return (
    <div className="border-b border-sand-dark/60 bg-white py-4">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-6 sm:flex-row sm:justify-center lg:px-10">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
          Choose your location
        </span>
        <div className="flex items-center gap-2 rounded-full bg-sand p-1.5">
          {locations.map((location) => {
            const href = hrefForSlug(location.slug);
            const isActive = pathname === href;
            return (
              <Link
                key={location.slug}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all",
                  isActive
                    ? "bg-primary-600 text-white shadow-sm"
                    : "text-stone-600 hover:text-primary-600"
                )}
              >
                <MapPin size={14} />
                {location.shortName}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
