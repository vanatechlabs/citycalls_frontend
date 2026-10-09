"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

// Blog hero with the same look as the service page heroes: photo with the
// left side shaded, a frosted glass chip with a live dot, a big Plus Jakarta
// heading whose words rise in one by one (highlight in green), soft text
// shadow, and the scroll-away tilt.

const HERO_FONT = "var(--font-plus-jakarta-sans), sans-serif";
const HERO_TEXT_SHADOW = "1px 1px 2px rgba(0,0,0,0.4), 0 4px 18px rgba(0,0,0,0.35)";
const HIGHLIGHT_COLOR = "#7BB50B";

type TitleWord = { word: string; highlight: boolean };

// "Guides, Tips & Stories" + "Stories" → words, with the highlight flagged.
function titleWords(title: string, highlight?: string): TitleWord[] {
  const index = highlight ? title.indexOf(highlight) : -1;
  const segments =
    index < 0 || !highlight
      ? [{ text: title, highlight: false }]
      : [
          { text: title.slice(0, index), highlight: false },
          { text: highlight, highlight: true },
          { text: title.slice(index + highlight.length), highlight: false },
        ];
  return segments.flatMap((s) => s.text.split(/\s+/).filter(Boolean).map((word) => ({ word, highlight: s.highlight })));
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

export function BlogHero({
  title,
  highlight,
  description,
  image,
  imageAlt,
  eyebrow,
}: {
  // `highlight` is part of `title` (same as Admin → Background Section).
  title: string;
  highlight?: string;
  description?: string;
  image: string;
  imageAlt?: string;
  // Text in the glass chip above the heading.
  eyebrow?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const words = titleWords(title, highlight);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[400px] items-center overflow-hidden bg-ink text-white md:min-h-[50vh]"
      style={{ perspective: "1000px", fontFamily: HERO_FONT }}
    >
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${image})`, y: bgY }}
        role="img"
        aria-label={imageAlt || title}
      />
      {/* Shade the left side (where the text sits) — the right stays clear */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      <div className="container-x relative w-full py-12 md:py-16">
        <motion.div className="max-w-2xl transform-gpu" style={{ y, opacity, rotateX, scale, transformOrigin: "top center" }}>
          {/* Frosted glass chip with a live dot */}
          {eyebrow && (
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
                  {eyebrow}
                </span>
              </div>
            </motion.div>
          )}

          {/* Title — per-word slide-up reveal */}
          <h1
            className="mb-4 text-[32px] font-bold leading-[1.12] tracking-tight text-white sm:text-[38px] md:text-[44px] lg:text-[min(52px,3.6vw,7vh)]"
            style={{ letterSpacing: "-0.01em", textShadow: HERO_TEXT_SHADOW }}
          >
            <motion.span variants={lineVariants} initial="hidden" animate="visible" className="block overflow-hidden pb-1">
              {words.map((item, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="mr-[0.28em] inline-block will-change-transform"
                  style={item.highlight ? { color: HIGHLIGHT_COLOR } : undefined}
                >
                  {item.word}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl text-[14px] font-medium leading-relaxed tracking-wide text-white/90 md:text-[15px] lg:text-[clamp(14px,2.6vh,16px)]"
              style={{ textShadow: HERO_TEXT_SHADOW }}
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
