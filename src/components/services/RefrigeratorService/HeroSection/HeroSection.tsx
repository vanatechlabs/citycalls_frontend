"use client";

import { ShieldCheck, Clock, IndianRupee } from "lucide-react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import type { PublicPageBackground } from "@/lib/api/pageBackgrounds";
import type { PublicServicePage } from "@/lib/api/servicePages";

const refBg = "/assets/Banner/refbg.png";

// Same text treatment as the home page hero carousel.
const HERO_FONT = "var(--font-plus-jakarta-sans), sans-serif";
const HERO_TEXT_SHADOW = "1px 1px 2px rgba(0,0,0,0.4), 0 4px 18px rgba(0,0,0,0.35)";
const HIGHLIGHT_COLOR = "#7BB50B";

interface HeroProps {
  service: { slug: string; name: string; image?: string; short?: string };
  content?: PublicServicePage;
  // Admin → Background Section entry for this page; overrides the fields it sets.
  background?: PublicPageBackground | null;
}

type TitleWord = { word: string; highlight: boolean };

// "Refrigerator Service in\nGhaziabad" + "Ghaziabad" → lines of words, with
// the highlighted part flagged so it can be coloured.
function titleLines(title: string, highlight: string): TitleWord[][] {
  const index = highlight ? title.indexOf(highlight) : -1;
  const segments =
    index < 0
      ? [{ text: title, highlight: false }]
      : [
          { text: title.slice(0, index), highlight: false },
          { text: highlight, highlight: true },
          { text: title.slice(index + highlight.length), highlight: false },
        ];

  const lines: TitleWord[][] = [[]];
  for (const segment of segments) {
    segment.text.split("\n").forEach((part, partIndex) => {
      if (partIndex > 0) lines.push([]);
      for (const word of part.split(/\s+/).filter(Boolean)) {
        lines[lines.length - 1].push({ word, highlight: segment.highlight });
      }
    });
  }
  return lines.filter((line) => line.length > 0);
}

const lineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

// Each word rises out of its line mask while coming into focus.
const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0, filter: "blur(8px)" },
  visible: { y: "0%", opacity: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function HeroSection({ service, content, background }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const features = (background?.features.length ? background.features : content?.heroFeatures) ?? [
    { title: "Expert", subtitle: "Technicians" },
    { title: "Same Day", subtitle: "Service" },
    { title: "Transparent", subtitle: "Pricing" },
    { title: "30-Day", subtitle: "Warranty" },
  ];
  const featureIcons = [ShieldCheck, Clock, IndianRupee, ShieldCheck];

  const lines = background
    ? titleLines(background.heading, background.highlight ?? "")
    : content
    ? titleLines(content.heroTitle, content.heroHighlight)
    : titleLines(`${service.name} in\nGhaziabad`, "Ghaziabad");

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-ink text-white"
      style={{ perspective: "1000px", fontFamily: HERO_FONT }}
    >
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${background?.image || content?.heroImage || (service.slug === "refrigerator-service" ? refBg : service.image)})`,
          y: bgY,
        }}
        {...(background?.imageAlt && { role: "img", "aria-label": background.imageAlt })}
      />
      {/* Shade the left side (where the text sits) — the right stays clear */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      <div className="container-x relative flex flex-col items-center justify-between gap-10 py-12 md:py-16 lg:flex-row">
        <motion.div className="max-w-2xl transform-gpu" style={{ y, opacity, rotateX, scale, transformOrigin: "top center" }}>
          {/* Subtitle — frosted glass chip with a live dot */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <div className="relative inline-flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-white/40 bg-gradient-to-br from-white/25 via-white/10 to-white/[0.06] px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_0_rgba(255,255,255,0.1),0_8px_24px_-8px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150">
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(124,179,66,0.9)]" />
              </span>
              <span className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-white" style={{ textShadow: HERO_TEXT_SHADOW }}>
                {background?.subheading || content?.heroEyebrow || "Professional & Reliable"}
              </span>
            </div>
          </motion.div>

          {/* Title — per-word slide-up reveal, masked per line */}
          <h1
            className="mb-4 text-[32px] font-bold leading-[1.12] tracking-tight text-white sm:text-[38px] md:text-[44px] lg:text-[52px]"
            style={{ letterSpacing: "-0.01em", textShadow: HERO_TEXT_SHADOW }}
          >
            {lines.map((line, li) => (
              <motion.span key={li} variants={lineVariants} initial="hidden" animate="visible" className="block overflow-hidden pb-1">
                {line.map((item, wi) => (
                  <motion.span
                    key={wi}
                    variants={wordVariants}
                    className="mr-[0.28em] inline-block will-change-transform"
                    style={item.highlight ? { color: HIGHLIGHT_COLOR } : undefined}
                  >
                    {item.word}
                  </motion.span>
                ))}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 max-w-xl text-[14px] font-medium leading-relaxed tracking-wide text-white/90 md:text-[15px] lg:text-base"
            style={{ textShadow: HERO_TEXT_SHADOW }}
          >
            {background?.description || content?.heroDescription || service.short || "Cooling issues, gas refill, ice buildup — sorted at your doorstep."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-5 text-xs font-semibold md:gap-8"
          >
            {features.slice(0, 4).map((feature, index) => {
              const Icon = featureIcons[index] ?? ShieldCheck;
              return (
                <div key={`${feature.title}-${index}`} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-md">
                    <Icon size={20} className="text-[#88be1e]" />
                  </div>
                  <span style={{ textShadow: HERO_TEXT_SHADOW }}>{feature.title}<br />{feature.subtitle}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
