"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Award, BadgeCheck, CheckCircle2, Clock, HandCoins, Headphones, Heart, HomeIcon, IndianRupee, Leaf, PhoneCall, ShieldCheck,
  Sparkles, Star, ThumbsUp, Timer, Truck, Users, Wrench, Zap, type LucideIcon,
} from "lucide-react";
import {
  fetchCityCallsKeyFeatures,
  type PublicKeyFeature,
  type PublicKeyFeaturesSection,
} from "@/lib/api/cityCallsHome";

// Icon names chosen in Admin → Website Section → Key Features.
const ICONS: Record<string, LucideIcon> = {
  BadgeCheck, HandCoins, Timer, Home: HomeIcon, Wrench, ShieldCheck, Clock, Star, ThumbsUp, Users,
  Sparkles, Award, Headphones, Truck, IndianRupee, Zap, Heart, CheckCircle2, PhoneCall, Leaf,
};

// Shown until the admin data loads (or if it can't).
const fallbackSection: PublicKeyFeaturesSection = {
  eyebrow: "Why choose us",
  heading: "Six reasons CityCalls is Ghaziabad's default.",
  highlight: "Ghaziabad's default.",
  description: "We don't just fix appliances — we build trust and long-lasting partnerships through transparency, quality, and exceptional doorstep service.",
};

const fallbackFeatures: PublicKeyFeature[] = [
  { _id: "f1", sortOrder: 1, icon: "BadgeCheck", title: "Verified technicians", description: "Background-checked, trained, rated." },
  { _id: "f2", sortOrder: 2, icon: "HandCoins", title: "Transparent pricing", description: "Flat rates. No surprises at the end." },
  { _id: "f3", sortOrder: 3, icon: "Timer", title: "On-time guarantee", description: "We arrive within your slot or refund." },
  { _id: "f4", sortOrder: 4, icon: "Home", title: "Doorstep service", description: "Zero commute. Zero waiting rooms." },
  { _id: "f5", sortOrder: 5, icon: "Wrench", title: "Genuine spare parts", description: "Only OEM-grade parts, ever." },
  { _id: "f6", sortOrder: 6, icon: "ShieldCheck", title: "30-day warranty", description: "Every job covered post-service." },
];

// Cards come in one after another once the grid scrolls into view.
const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.8 },
  },
};

export function WhyChooseUs() {
  const [section, setSection] = useState<PublicKeyFeaturesSection>(fallbackSection);
  const [features, setFeatures] = useState<PublicKeyFeature[]>(fallbackFeatures);

  useEffect(() => {
    const controller = new AbortController();
    fetchCityCallsKeyFeatures(controller.signal)
      .then((data) => {
        if (data?.section) setSection({ ...fallbackSection, ...data.section });
        if (Array.isArray(data?.features)) setFeatures(data.features);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.warn("Using bundled key features because the CMS data could not be loaded.");
      });
    return () => controller.abort();
  }, []);

  // The green highlight goes on its own line on wide screens.
  const at = section.highlight ? section.heading.indexOf(section.highlight) : -1;
  const headingStart = at >= 0 ? section.heading.slice(0, at) : section.heading;
  const headingEnd = at >= 0 ? section.heading.slice(at + section.highlight.length) : "";

  if (features.length === 0) return null;

  return (
    <section className="relative py-8 bg-ink overflow-hidden border-t border-white/5">
      {/* Coloured light behind the glass cards, so the frosting has something to blur */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[45%] h-72 w-72 rounded-full bg-primary/25 blur-[100px]" />
        <div className="absolute right-[10%] top-[30%] h-64 w-64 rounded-full bg-[#d4af37]/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[110px]" />
      </div>

      <div className="container-x relative mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="flex flex-col items-center justify-center mb-8 text-center"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} 
            className="flex items-center gap-3 mb-6"
          >
            <motion.div 
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.5 } } }} 
              style={{ transformOrigin: "right" }}
              className="h-px w-8 bg-primary" 
            />
            <span className="uppercase tracking-[0.3em] text-primary font-bold text-[12px]">
              {section.eyebrow}
            </span>
            <motion.div 
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.5 } } }} 
              style={{ transformOrigin: "left" }}
              className="h-px w-8 bg-primary" 
            />
          </motion.div>
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} 
            className="text-3xl md:text-4xl lg:text-[40px] font-serif text-white leading-tight font-bold"
          >
            {headingStart}
            {at >= 0 && (
              <>
                <br className="hidden md:block" />
                <span className="text-primary">{section.highlight}</span>
                {headingEnd}
              </>
            )}
          </motion.h2>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} 
            className="text-white/50 mt-6 max-w-2xl mx-auto text-[14px] leading-relaxed"
          >
            {section.description}
          </motion.p>
        </motion.div>

        {/* List Layout */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {features.map((feature, i) => {
            const Icon = ICONS[feature.icon] ?? BadgeCheck;
            return (
            <motion.div
              key={feature._id}
              variants={cardVariants}
              // Frosted glass card
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.09] via-white/[0.04] to-white/[0.015] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_20px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl backdrop-saturate-150 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_24px_48px_-20px_rgba(124,179,66,0.45)]"
            >
              {/* glossy top + light sweep on hover */}
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.07] to-transparent" />
              <span aria-hidden className="pointer-events-none absolute -inset-y-6 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent opacity-0 transition-all duration-1000 group-hover:left-[130%] group-hover:opacity-100" />
              <span aria-hidden className="pointer-events-none absolute right-3 top-2 text-[26px] font-black leading-none text-white/[0.05] transition-colors duration-500 group-hover:text-primary/15">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative w-11 h-11 overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-white/[0.14] to-white/[0.03] flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_18px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md group-hover:bg-primary group-hover:border-primary/70 transition-all duration-300">
                <span aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                <Icon size={20} className="relative text-primary group-hover:text-white transition-colors" strokeWidth={1.75} />
              </div>
              <div className="relative min-w-0 pr-8">
                <h3 className="truncate text-[14px] font-bold text-white mb-0.5 uppercase tracking-wide group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="truncate text-[13px] text-white/60 leading-snug" title={feature.description}>{feature.description}</p>
              </div>
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
