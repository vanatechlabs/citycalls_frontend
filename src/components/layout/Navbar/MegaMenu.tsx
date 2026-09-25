"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Home,
  LayoutGrid,
} from "lucide-react";
import { motion } from "framer-motion";

const a1 = "/assets/icons/a1.png";
const a2 = "/assets/icons/a2.png";
const a3 = "/assets/icons/a3.png";
const a4 = "/assets/icons/a4.png";
const a5 = "/assets/icons/a5.png";
const a6 = "/assets/icons/a6.png";
const a7 = "/assets/icons/a7.png";

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

const panelVariants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as any },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.08 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as any },
  },
};

export function MegaMenu({ category, onNavigate }: MegaMenuProps) {
  const categoryHeaderTitle = `${category.label.toUpperCase()}${
    category.label.toUpperCase().endsWith("SERVICES") ? "" : " SERVICES"
  }`;

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 4, transition: { duration: 0.12 } }}
      className="absolute left-0 top-full pt-2.5 z-50"
    >
      <div className="w-[315px] rounded-xl border border-white/10 bg-[#0c121e] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Header: Home Icon + CityCalls Logo + Divider + Category Name */}
        <div className="px-4 py-3.5 flex items-center gap-2 border-b border-white/[0.08] bg-white/[0.02]">
          <Home className="w-4 h-4 text-primary shrink-0" strokeWidth={2.2} />
          <span className="text-[13px] font-semibold tracking-tight flex items-center">
            <span className="text-primary">City</span>
            <span className="text-white">Calls</span>
          </span>
          <span className="text-white/20 text-xs mx-0.5">|</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 truncate">
            {categoryHeaderTitle}
          </span>
        </div>

        {/* Services List */}
        <motion.div variants={listVariants} initial="hidden" animate="visible" className="divide-y divide-white/[0.06]">
          {category.services.map((s, index) => {
            const iconSrc = s.image || getServiceIconImage(s.slug, s.name, index);
            return (
              <motion.div key={s.slug} variants={rowVariants}>
                <Link
                  href={s.path || `/services/${s.slug}`}
                  onClick={onNavigate}
                  className="group flex items-center gap-3.5 px-4 py-2.5 hover:bg-white/[0.04] transition-colors duration-150"
                >
                  <img
                    src={iconSrc}
                    alt={s.name}
                    className="w-8 h-8 object-contain shrink-0 group-hover:scale-110 transition-transform duration-200"
                  />
                  <span className="text-[13px] font-semibold text-white tracking-normal group-hover:text-primary transition-colors duration-150 truncate">
                    {s.name}
                  </span>
                  <ChevronRight
                    size={14}
                    className="ml-auto shrink-0 text-slate-500 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200"
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Button: View All Services card */}
        <div className="p-3 border-t border-white/[0.06]">
          <Link
            href="/services"
            onClick={onNavigate}
            className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#070b13] border border-white/[0.08] hover:border-primary/50 hover:bg-white/[0.03] transition-all duration-200 group/btn"
          >
            <div className="flex items-center gap-2.5">
              <LayoutGrid className="w-4 h-4 text-primary shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white group-hover/btn:text-primary transition-colors">
                VIEW ALL SERVICES
              </span>
            </div>
            <ArrowRight
              size={13}
              className="text-slate-400 group-hover/btn:text-primary group-hover/btn:translate-x-0.5 transition-all duration-200"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
