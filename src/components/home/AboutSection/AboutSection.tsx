"use client";

import Link from "next/link";
import { ArrowRight, Target, Eye } from "lucide-react";
import { motion, useInView, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fetchCityCallsHomeAbout, resolveWebsiteImageUrl, type PublicHomeAbout } from "@/lib/api/cityCallsHome";

// Shown until (or if) Admin → Website Section → About can't be loaded.
const fallbackAbout: PublicHomeAbout = {
  eyebrow: "About CityCalls",
  heading: "Your Trusted Home Services Partner in Ghaziabad",
  highlight: "Home Services Partner",
  description:
    "We provide reliable and professional home services right at your doorstep. With a verified team of experts, " +
    "transparent pricing, and a customer-first approach, we ensure every repair and service is a stress-free experience.",
  points: [
    "Background-verified and highly trained professionals",
    "Transparent, upfront pricing with no hidden charges",
    "Flexible bookings tailored to your schedule",
    "Dedicated customer support for a hassle-free experience",
  ],
  missionTitle: "Our Mission",
  missionText: "To deliver safe, punctual, and premium home services that consistently exceed customer expectations.",
  visionTitle: "Our Vision",
  visionText: "To be the leading and most trusted home service brand, setting new benchmarks in quality and reliability.",
  buttonText: "Discover More",
  buttonLink: "/about",
  images: [
    { image: "/assets/Images/about1.png", alt: "CityCalls Professional Cleaning" },
    { image: "/assets/Images/about2.png", alt: "CityCalls Technician with Happy Family" },
    { image: "/assets/Images/about3.png", alt: "CityCalls Team Collaboration" },
  ],
  status: "ACTIVE",
};

// "Your Trusted Home Services Partner in Ghaziabad" + "Home Services Partner"
// → the text before, the highlighted words, and the text after.
function splitHeading(heading: string, highlight: string) {
  const index = highlight ? heading.indexOf(highlight) : -1;
  if (index < 0) return { before: heading, words: [] as string[], after: "" };
  return {
    before: heading.slice(0, index).trim(),
    words: highlight.split(/\s+/).filter(Boolean),
    after: heading.slice(index + highlight.length).trim(),
  };
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const wordVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const listContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const [content, setContent] = useState<PublicHomeAbout>(fallbackAbout);

  useEffect(() => {
    const controller = new AbortController();
    fetchCityCallsHomeAbout(controller.signal)
      .then((data) => {
        if (data) setContent({ ...fallbackAbout, ...data });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.warn("Using bundled About section because the CMS content could not be loaded.");
      });
    return () => controller.abort();
  }, []);

  const { before, words, after } = splitHeading(content.heading, content.highlight);
  const images = [0, 1, 2].map((i) => content.images?.[i] ?? fallbackAbout.images[i]);
  const imageSrc = (i: number) => (images[i]?.image ? resolveWebsiteImageUrl(images[i].image) : undefined);
  const points = content.points.filter(Boolean);
  const pillars = [
    { title: content.missionTitle, text: content.missionText },
    { title: content.visionTitle, text: content.visionText },
  ];

  if (content.status === "INACTIVE") return null;

  return (
    <section ref={sectionRef} className="pt-6 md:pt-10 pb-8 md:pb-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col order-2 lg:order-1"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
                className="h-px w-8 bg-primary"
              />
              <span className="uppercase tracking-[0.3em] text-primary font-bold text-xs">
                {content.eyebrow}
              </span>
            </motion.div>

            {/* Heading — per-word reveal */}
            <h2 className="text-2xl md:text-3xl lg:text-[34px] font-extrabold text-slate-900 leading-tight mb-6 font-display">
              {before && (
                <span className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span variants={wordVariants} className="inline-block will-change-transform">
                    {before}&nbsp;
                  </motion.span>
                </span>
              )}
              {words.length > 0 && (
              <span className="relative inline-block text-primary whitespace-nowrap align-bottom">
                <span className="inline-block overflow-hidden pb-1">
                  <motion.span
                    variants={containerVariants}
                    className="inline-flex"
                  >
                    {words.map((word, i) => (
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
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
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
              </span>
              )}
              {after && (
                <span className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span variants={wordVariants} className="inline-block will-change-transform">
                    &nbsp;{after}
                  </motion.span>
                </span>
              )}
            </h2>

            <motion.p
              variants={fadeUp}
              className="text-gray-800 text-sm mb-4 leading-relaxed max-w-lg"
            >
              {content.description}
            </motion.p>

            {/* Feature list — staggered */}
            <motion.ul variants={listContainerVariants} className="mb-5 space-y-1.5">
              {points.map((item, idx) => (
                <motion.li key={idx} variants={listItemVariants} className="flex items-center gap-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + idx * 0.09, ease: "backOut" }}
                    className="w-3.5 h-3.5 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </motion.div>
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Mission / Vision */}
            <div className="relative flex flex-col gap-4 mb-0 pl-1">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
                className="absolute left-[16px] top-4 bottom-4 border-l-2 border-dashed border-gray-300"
              />

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: 0.85 }}
                className="relative flex gap-3"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.9, ease: "backOut" }}
                  className="w-8 h-8 shrink-0 rounded-full border-2 border-primary bg-white flex items-center justify-center z-10 mt-1"
                >
                  <Target className="w-3.5 h-3.5 text-primary" />
                </motion.div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-0.5">{pillars[0].title}</h3>
                  <p className="text-[12px] text-gray-600 leading-relaxed">{pillars[0].text}</p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: 1.05 }}
                className="relative flex gap-3"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.1, ease: "backOut" }}
                  className="w-8 h-8 shrink-0 rounded-full border-2 border-[#4D4D4D] bg-white flex items-center justify-center z-10 mt-1"
                >
                  <Eye className="w-3.5 h-3.5 text-[#4D4D4D]" />
                </motion.div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-0.5">{pillars[1].title}</h3>
                  <p className="text-[12px] text-gray-600 leading-relaxed">{pillars[1].text}</p>
                </div>
              </motion.div>
            </div>

            {content.buttonText && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.25 }}
              className="flex justify-start mt-4"
            >
              <Link
                href={content.buttonLink || "/about"}
                className="group inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-[13px] font-bold text-primary border-2 border-primary bg-transparent hover:bg-primary hover:text-white transition-all shadow-sm w-fit"
              >
                {content.buttonText}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            )}
          </motion.div>

          {/* Images — clip-mask reveal grid */}
          <div className="relative order-1 lg:order-2">
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-orange-50 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gray-100 rounded-full blur-2xl -z-10" />

            <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[420px] md:h-[500px]">
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-md"
              >
                <motion.img
                  initial={{ scale: 1.15 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  src={imageSrc(0)}
                  alt={images[0]?.alt || "CityCalls Professional Cleaning"}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={isInView ? { clipPath: "inset(0 0 0% 0)" } : {}}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-md"
              >
                <motion.img
                  initial={{ scale: 1.15 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                  src={imageSrc(1)}
                  alt={images[1]?.alt || "CityCalls Technician with Happy Family"}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={isInView ? { clipPath: "inset(0 0 0% 0)" } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-md"
              >
                <motion.img
                  initial={{ scale: 1.15 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  src={imageSrc(2)}
                  alt={images[2]?.alt || "CityCalls Team Collaboration"}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
