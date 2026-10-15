"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin } from "lucide-react";
import type { LocationPageLink } from "@/lib/api/locationPages";

const clean = (path: string) => path.replace(/\/+$/, "").toLowerCase() || "/";

// City links above the footer, like Design House's location chips: the home
// page lists its "Home Services in <city>" pages, a service page its own
// city pages (Admin → Blog Section → Location Page List). Nothing shows on
// other pages, or when a page has no published city pages.
export function LocationStrip({ links }: { links: LocationPageLink[] }) {
  const pathname = clean(usePathname() ?? "/");
  const here = links.filter((link) => clean(link.servicePath) === pathname);
  if (here.length === 0) return null;
  const name = here[0].serviceName;

  return (
    <section aria-label={`${name} by city`} className="border-t border-black/5 bg-[#f7f9f4]">
      <div className="container-x flex flex-col gap-3 py-6 md:flex-row md:items-center md:gap-5">
        <h2 className="shrink-0 text-[12px] font-black uppercase tracking-[0.18em] text-ink/70">
          {name} <span className="text-primary-dark">in</span>
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {here.map((link) => (
            <Link
              key={link._id}
              href={`/${link.slug}`}
              title={link.title}
              className="group inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1.5 text-[12px] font-semibold text-ink/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-dark hover:bg-primary-dark hover:text-white hover:shadow-md"
            >
              <MapPin className="h-3 w-3 text-primary-dark transition-colors group-hover:text-white" />
              {link.location}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
