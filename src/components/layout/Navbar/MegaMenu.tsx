"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { isCurrentPath } from "./Navbar";

const a1 = "/assets/icons/a1.webp";
const a2 = "/assets/icons/a2.webp";
const a3 = "/assets/icons/a3.webp";
const a4 = "/assets/icons/a4.webp";
const a5 = "/assets/icons/a5.webp";
const a6 = "/assets/icons/a6.webp";
const a7 = "/assets/icons/a7.webp";

interface ServiceItem {
  slug: string;
  name: string;
  // Present when this link comes from the admin's Navbar List Management
  // (Cloudinary-uploaded preview image, and the exact website path an admin
  // configured) — falls back to the built-in icon set and /services/:slug
  // when absent, so hardcoded serviceCategories entries keep working as-is.
  image?: string | null;
  path?: string;
}

interface ServiceCategory {
  id: string;
  label: string;
  services: ServiceItem[];
}

interface MegaMenuProps {
  category: ServiceCategory;
  onNavigate: () => void;
}

const homeApplianceIcons: Record<string, string> = {
  "refrigerator-service": a1,
  "ac-service": a2,
  "washing-machine-services": a3,
  "television-repair-services": a4,
  "microwave-oven-services": a5,
  "geyser-repair-services": a6,
  "chimney-repair-services": a7,
};

const iconList = [a1, a2, a3, a4, a5, a6, a7];

function getServiceIconImage(slug: string, name: string, index: number): string {
  const s = slug.toLowerCase();
  const n = name.toLowerCase();

  if (homeApplianceIcons[s]) return homeApplianceIcons[s];

  if (s.includes("refrigerator") || n.includes("refrigerator") || n.includes("fridge")) return a1;
  if (s.includes("ac") || n.includes("ac") || n.includes("air")) return a2;
  if (s.includes("washing") || n.includes("washing")) return a3;
  if (s.includes("television") || s.includes("tv") || n.includes("tv") || n.includes("television")) return a4;
  if (s.includes("microwave") || s.includes("oven") || n.includes("microwave") || n.includes("oven")) return a5;
  if (s.includes("geyser") || n.includes("geyser")) return a6;
  if (s.includes("chimney") || n.includes("chimney")) return a7;

  return iconList[index % iconList.length];
}

const panelVariants: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    // Drop the clip-path once open so the notch and shadow aren't cut off.
    transitionEnd: { clipPath: "none" },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.08 },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export function MegaMenu({ category, onNavigate }: MegaMenuProps) {
  const pathname = usePathname() ?? "/";
  const categoryHeaderTitle = `${category.label.toUpperCase()}${
    category.label.toUpperCase().endsWith("SERVICES") ? "" : " SERVICES"
  }`;
  // Home Cleaning's icons have more empty space around them, so they're drawn
  // larger inside the same box (the row and text don't move).
  const isHomeCleaning = category.id === "home-cleaning" || /^home cleaning$/i.test(category.label.trim());

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 4, transition: { duration: 0.12 } }}
      className="absolute left-0 top-full pt-3 z-50"
    >
      {/* Solid dark card (no see-through glass) under the nav item, with a small notch pointing up at it. */}
      <span aria-hidden className="absolute left-7 top-[7px] h-3 w-3 rotate-45 rounded-[2px] border-l border-t border-white/10 bg-[#121a24]" />
      <div className="relative w-[290px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#121a24] to-[#0c121a] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)]">
        {/* Header: category + how many services */}
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-2.5">
          <span className="truncate text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
            {categoryHeaderTitle}
          </span>
          <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {category.services.length}
          </span>
        </div>

        {/* Services */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="max-h-[min(60vh,380px)] overflow-y-auto overscroll-contain p-1.5"
        >
          {category.services.map((s, index) => {
            const iconSrc = s.image || getServiceIconImage(s.slug, s.name, index);
            const href = s.path || `/services/${s.slug}`;
            // The page being viewed stays highlighted the same way as on hover.
            const isCurrent = isCurrentPath(pathname, href);
            return (
              <motion.div key={s.slug} variants={rowVariants}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`group relative flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors duration-200 hover:bg-white/[0.05] ${
                    isCurrent ? "bg-primary/10" : ""
                  }`}
                >
                  {/* green bar on the left for hover / current page */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-primary transition-opacity duration-200 group-hover:opacity-100 ${isCurrent ? "opacity-100" : "opacity-0"}`}
                  />
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/[0.06] ring-1 ring-white/10 transition-colors duration-200 group-hover:bg-white/[0.1] group-hover:ring-primary/50">
                    <img loading="lazy" decoding="async"
                      src={iconSrc}
                      alt=""
                      className={`h-7 w-7 object-contain transition-transform duration-200 ${
                        isHomeCleaning ? "scale-[1.25] group-hover:scale-[1.35]" : "group-hover:scale-110"
                      }`}
                    />
                  </span>
                  <span className={`min-w-0 flex-1 truncate text-[13px] font-semibold transition-colors duration-150 group-hover:text-primary ${isCurrent ? "text-primary" : "text-white"}`}>
                    {s.name}
                  </span>
                  <ChevronRight
                    size={14}
                    className={`shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary ${isCurrent ? "text-primary" : "text-slate-600"}`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer: View all services */}
        <Link
          href="/services"
          onClick={onNavigate}
          className="group/btn flex items-center justify-between gap-3 border-t border-white/[0.07] bg-white/[0.03] px-4 py-2.5 transition-colors duration-200 hover:bg-primary/10"
        >
          <span className="flex items-center gap-2">
            <LayoutGrid className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors group-hover/btn:text-primary">
              View all services
            </span>
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white transition-transform duration-200 group-hover/btn:translate-x-0.5">
            <ArrowRight size={12} />
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
