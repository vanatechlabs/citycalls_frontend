"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

// Blog hero, laid out like the Design House site's page hero: full-width
// photo with parallax, soft moving glows, a centred serif title whose
// highlighted words get a hand-drawn underline, and a scroll hint — in
// CityCalls greens.
export function BlogHero({
  title,
  highlight,
  description,
  image,
  imageAlt,
}: {
  title: string;
  highlight?: string;
  description?: string;
  image: string;
  imageAlt?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  // `highlight` is part of `title` (e.g. "Guides, Tips & Stories" / "Stories"),
  // same as Admin → Background Section; that part shows in green, underlined.
  const at = highlight ? title.indexOf(highlight) : -1;
  const before = at >= 0 ? title.slice(0, at) : title;
  const highlighted = at >= 0 ? highlight : "";
  const after = at >= 0 ? title.slice(at + (highlight?.length ?? 0)) : "";

  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.5, ease: "easeInOut", delay: 0.5 }, opacity: { duration: 0.3, delay: 0.5 } },
    },
  };

  return (
    <section ref={ref} className="relative h-[50vh] min-h-[400px] overflow-hidden bg-[#0a0a0a]">
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        {/* Same overlay as the service page heroes: dark on the left, clear on the right */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <img src={image} alt={imageAlt || title} className="h-full w-full object-cover" />
      </motion.div>

      {/* Soft moving glows */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/3 top-1/3 h-96 w-96 rounded-full bg-primary blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-1/3 h-96 w-96 rounded-full bg-emerald-500 blur-[100px]"
        />
      </div>

      <motion.div style={{ opacity, y: textY }} className="relative z-20 flex h-full items-center justify-center">
        <div className="container-x max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-3xl leading-tight tracking-wide text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] sm:text-4xl md:text-5xl"
            >
              {before}
              {highlighted && (
                <span className="relative inline-block">
                  <span className="text-primary">{highlighted}</span>
                  <motion.svg
                    className="absolute -bottom-1 left-0 h-2 w-full text-white/80 md:-bottom-2 md:h-3"
                    viewBox="0 0 200 12"
                    fill="none"
                    initial="hidden"
                    animate="visible"
                    aria-hidden
                  >
                    <motion.path d="M2 10C60 2, 140 2, 198 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" variants={pathVariants} />
                  </motion.svg>
                </span>
              )}
              {after}
            </motion.h1>

            {description && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mx-auto max-w-2xl text-sm font-normal tracking-wide text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.6)] md:text-base"
              >
                {description}
              </motion.p>
            )}

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-gray-400/40 bg-black/20 p-1.5 backdrop-blur-sm"
        >
          <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="h-2 w-1 rounded-full bg-gray-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
