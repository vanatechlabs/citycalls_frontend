"use client";

import { motion, useInView } from "framer-motion";
import { Wrench, Zap, Sparkles, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const processes = [
  {
    id: 1,
    icon: Wrench,
    title: "Expert Plumbers",
    number: "01",
    description: "Quick and reliable plumbing services for leaks, fittings, and repairs.",
  },
  {
    id: 2,
    icon: Zap,
    title: "Electrical Repairs",
    number: "02",
    description: "Certified electricians for wiring, appliance installation, and fault fixing.",
  },
  {
    id: 3,
    icon: Sparkles,
    title: "Deep Cleaning",
    number: "03",
    description: "Professional cleaning services for a spotless home and fresh ambiance.",
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Appliance Service",
    number: "04",
    description: "AC, RO, and Washing Machine repair by verified technicians.",
  },
];

const headingLines = ["Home repairs everywhere,", "impactful online services,", "enhanced experiences"];

const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const wordVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.94, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { delay: 0.5 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -12 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { delay: 0.5 + i * 0.1 + 0.2, duration: 0.4, ease: "backOut" as any },
  }),
};

export function PremiumServices() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const [hovered, setHovered] = useState(false);
  const [autoRevealed, setAutoRevealed] = useState(false);

  // Auto reveal on scroll when entering section, then auto hide after ~3 seconds
  useEffect(() => {
    if (isInView) {
      const showTimer = setTimeout(() => {
        setAutoRevealed(true);
      }, 700);

      const hideTimer = setTimeout(() => {
        setAutoRevealed(false);
      }, 3700);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isInView]);

  const isImageVisible = hovered || autoRevealed;

  return (
    <section ref={sectionRef} className="pt-10 pb-10 bg-[#FAF9F6] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Heading Section */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-slate-900 leading-[1.2] tracking-tight">
              {headingLines.map((line, li) => (
                <motion.span
                  key={li}
                  variants={lineVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="block overflow-hidden pb-1"
                >
                  {line.split(" ").map((word, wi) => (
                    <motion.span
                      key={wi}
                      variants={wordVariants}
                      className={`inline-block mr-[0.28em] will-change-transform ${
                        li === 1 ? "text-primary" : ""
                      }`}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </h2>
          </div>

          <div
            className="relative flex items-start gap-6 max-w-lg lg:pb-2 cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-gray-500 text-[13px] md:text-sm leading-relaxed relative z-10 transition-colors duration-300"
              style={{ color: isImageVisible ? "#334155" : undefined }}
            >
              CityCalls is dedicated to providing accessible, high-quality home repairs. From
              emergency plumbing to deep cleaning, our verified experts ensure every service is
              engaging, effective, and tailored to meet the diverse needs of your modern
              household. We bring premium care right to your doorstep, exactly when you need it.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5, ease: "backOut" }}
              className="relative z-10 flex-shrink-0 w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 transition-all duration-300"
              style={
                isImageVisible
                  ? { color: "var(--color-primary, #94d052)", borderColor: "var(--color-primary, #94d052)", background: "rgba(148,208,82,0.05)" }
                  : undefined
              }
            >
              <motion.span
                animate={isImageVisible ? { scale: 1.15, rotate: 45 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex"
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.span>
            </motion.button>

            {/* Popup image — auto-reveals on scroll and on hover */}
            <motion.div
              initial={false}
              animate={
                isImageVisible
                  ? { opacity: 1, scale: 1, y: 8, rotate: 2, clipPath: "inset(0% 0% 0% 0%)" }
                  : { opacity: 0, scale: 0.85, y: 0, rotate: -6, clipPath: "inset(0% 0% 100% 0%)" }
              }
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="absolute top-full right-8 mt-1 w-52 h-36 rounded-2xl overflow-hidden z-50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] pointer-events-none origin-top-right"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80"
                alt="CityCalls Premium Service"
                animate={isImageVisible ? { scale: 1 } : { scale: 1.25 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={isImageVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="absolute bottom-3 left-4 flex items-center gap-1.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                  Top Rated
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processes.map((process, idx) => (
            <motion.div
              key={process.id}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group relative bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl hover:border-[#4D4D4D] transition-all duration-300"
            >
              <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-500 absolute top-0 left-0 z-10" />

              <div className="absolute top-2 right-3 text-[56px] font-black text-[#94d052]/15 group-hover:text-[#94d052]/30 leading-none select-none transition-colors duration-300 pointer-events-none">
                {process.number}
              </div>

              <div className="relative z-10 p-5 flex flex-col items-start text-left h-full">
                <motion.div
                  custom={idx}
                  variants={iconVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="w-12 h-12 flex items-center justify-center mb-3 bg-[#4D4D4D]/5 border-2 border-[#4D4D4D]/10 group-hover:bg-[#4D4D4D] group-hover:border-[#4D4D4D] transition-all duration-300 rounded-lg"
                >
                  <process.icon
                    className="w-6 h-6 text-[#4D4D4D] group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </motion.div>

                <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-1">
                  Service {process.number}
                </span>

                <h3 className="text-lg font-bold text-[#4D4D4D] group-hover:text-primary mb-2 uppercase tracking-wider transition-colors duration-300">
                  {process.title}
                </h3>

                <div className="w-6 h-0.5 bg-gray-200 group-hover:w-10 group-hover:bg-primary transition-all duration-500 mb-3" />

                <p className="text-slate-500 text-[13px] leading-relaxed flex-grow">
                  {process.description}
                </p>
              </div>

              <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[36px] border-l-transparent border-b-[36px] border-b-[#4D4D4D]/10 group-hover:border-b-primary/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
