"use client";

import { Target, Users } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { aboutStoryDefaults, type AboutStoryData } from "@/lib/api/aboutPage";

const wordVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function AboutStory({ content = aboutStoryDefaults }: { content?: AboutStoryData }) {
  // Heading = lead text + highlighted words (green, underlined) + any tail.
  const at = content.highlight ? content.heading.indexOf(content.highlight) : -1;
  const lead = at < 0 ? content.heading : content.heading.slice(0, at);
  const tail = at < 0 ? "" : content.heading.slice(at + content.highlight.length);
  const headingWords = at < 0 ? [] : content.highlight.split(/\s+/).filter(Boolean);

  return (
    <section className="pt-8 pb-12 bg-gray-50 overflow-hidden">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Media Grid */}
          <div className="grid grid-cols-2 gap-4">
            {content.images.map(({ image: imgSrc, imageAlt }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5, rotate: idx % 2 === 0 ? -5 : 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.15, type: "spring", bounce: 0.4 }}
                className="relative overflow-hidden rounded-2xl aspect-square bg-muted flex items-center justify-center group shadow-md"
              >
                <img
                  src={imgSrc}
                  alt={imageAlt || `About Story ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {/* Eyebrow */}
            {content.eyebrow && <motion.div 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} 
              className="flex items-center gap-3 mb-4"
            >
              <motion.div
                variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.5 } } }}
                style={{ transformOrigin: "left" }}
                className="h-px w-8 bg-primary"
              />
              <span className="uppercase tracking-[0.2em] text-primary-dark font-bold text-xs">
                {content.eyebrow}
              </span>
            </motion.div>}

            {/* Heading — per-word reveal */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif leading-[1.15] mb-6">
              <span className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span variants={wordVariants} className="inline-block will-change-transform">
                  {lead.trimEnd()}{headingWords.length > 0 && "\u00A0"}
                </motion.span>
              </span>
              {headingWords.length > 0 && <span className="relative inline-block text-primary whitespace-nowrap align-bottom">
                <span className="inline-block overflow-hidden pb-1">
                  <motion.span
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
                    className="inline-flex"
                  >
                    {headingWords.map((word, i) => (
                      <motion.span
                        key={i}
                        variants={wordVariants}
                        className="inline-block will-change-transform mr-[0.25em]"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.span>
                </span>
                <motion.svg
                  viewBox="0 0 220 20"
                  className="absolute left-0 -bottom-1 w-full h-3 md:h-4"
                  preserveAspectRatio="none"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.7 } }
                  }}
                >
                  <path
                    d="M2 12 Q 55 2, 110 11 T 218 10"
                    fill="none"
                    stroke="currentColor"
                    className="stroke-primary"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>}
              {tail.trim() && (
                <span className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span variants={wordVariants} className="inline-block will-change-transform">{tail.trim()}</motion.span>
                </span>
              )}
            </h2>

            <motion.div 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} 
              className="space-y-4 mb-10"
            >
              {[content.paragraphOne, content.paragraphTwo].filter(Boolean).map((text, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{text}</p>
              ))}
            </motion.div>

            {/* Mission Box */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div 
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4, delay: 0.2 } } }} 
                className="bg-card border border-border p-6 rounded-2xl hover:border-primary transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-xl text-primary">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-ink uppercase tracking-wide text-sm">
                    {content.missionTitle}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {content.missionText}
                </p>
              </motion.div>

              <motion.div 
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4, delay: 0.35 } } }} 
                className="bg-card border border-border p-6 rounded-2xl hover:border-primary transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-xl text-primary">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-ink uppercase tracking-wide text-sm">
                    {content.teamTitle}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {content.teamText}
                </p>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
