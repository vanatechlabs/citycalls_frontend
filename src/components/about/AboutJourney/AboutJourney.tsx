"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Flag, Users, Building2, Trophy, Rocket, Star, TrainFront, Sparkles } from "lucide-react";
import { useRef } from "react";

const s1 = "/assets/Services/s1.png";
const s2 = "/assets/Services/s2.png";
const s3 = "/assets/Services/s3.png";
const s4 = "/assets/Services/s4.png";
const s5 = "/assets/Services/s5.png";
const s6 = "/assets/Services/s6.png";

const milestones = [
  {
    year: "2022",
    title: "The Beginning",
    description: "Started CityCalls with a mission to simplify home services across all households.",
    icon: Flag,
    image: s1,
    tag: "Milestone 01",
  },
  {
    year: "2023",
    title: "Growing Community",
    description: "Reached 1,000+ happy customers and rapidly expanded our service categories.",
    icon: Users,
    image: s2,
    tag: "Milestone 02",
  },
  {
    year: "2024",
    title: "Wider Reach",
    description: "Onboarded top-rated verified professionals serving thousands of doorstep requests.",
    icon: Building2,
    image: s3,
    tag: "Milestone 03",
  },
  {
    year: "2025",
    title: "Trusted by Many",
    description: "Crossed 10,000+ completed orders with glowing 5-star customer reviews.",
    icon: Trophy,
    image: s4,
    tag: "Milestone 04",
  },
  {
    year: "2026",
    title: "Scaling Nationwide",
    description: "Expanding into major new cities with automated booking and instant dispatch.",
    icon: Rocket,
    image: s5,
    tag: "Milestone 05",
  },
  {
    year: "2027",
    title: "The Road Ahead",
    description: "Redefining home maintenance with AI scheduling and unmatched reliability.",
    icon: Star,
    image: s6,
    tag: "Future Vision",
  },
];

export function AboutJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 40%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  const trackHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const trainTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const trainOpacity = useTransform(smoothProgress, [0, 0.03], [0, 1]);

  return (
    <section className="bg-white py-8 md:py-12 overflow-hidden relative">
      <div className="container-x mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3e8914]/10 text-[#3e8914] text-[11px] font-bold uppercase tracking-widest mb-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Our Story &amp; Growth
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black font-sans text-ink mb-3 tracking-tight"
          >
            Our Journey
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-16 h-1.5 bg-[#3e8914] mx-auto rounded-full"
          />
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto px-4 md:px-0">
          
          {/* ===== Railway Track Line (Background Gray) ===== */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-6 pointer-events-none z-0">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gray-200 rounded-full" />
            <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-gray-200 rounded-full" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #9ca3af 0px, #9ca3af 3px, transparent 3px, transparent 18px)",
              }}
            />
          </div>

          {/* ===== Railway Track Line (Foreground Animated Green Fill) ===== */}
          <motion.div
            style={{ height: trackHeight }}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-8 w-6 overflow-hidden pointer-events-none z-[1]"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#3e8914] rounded-full shadow-[0_0_8px_#3e8914]" />
            <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-[#3e8914] rounded-full shadow-[0_0_8px_#3e8914]" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #3e8914 0px, #3e8914 3px, transparent 3px, transparent 18px)",
              }}
            />
          </motion.div>

          {/* ===== Train Icon Moving along Track ===== */}
          <motion.div
            style={{ top: trainTop, opacity: trainOpacity }}
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] pointer-events-none"
          >
            <div className="w-12 h-12 rounded-full bg-[#3e8914] shadow-[0_4px_20px_rgba(62,137,20,0.6)] flex items-center justify-center ring-4 ring-white">
              <TrainFront className="w-5 h-5 text-white" />
            </div>
          </motion.div>

          {/* ===== Milestones List ===== */}
          <div className="relative z-10 flex flex-col gap-10 md:gap-14">
            {milestones.map((item, index) => {
              const Icon = item.icon;
              // Alternating: Even -> Text Left, Image Right | Odd -> Image Left, Text Right
              const isLeft = index % 2 === 0;

              return (
                <div key={item.year} className="relative">
                  
                  {/* ===== Desktop 3-Column Layout ===== */}
                  <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-12 w-full">
                    
                    {/* Left Column */}
                    <div className="w-full flex justify-end">
                      {isLeft ? (
                        /* Text Details on Left */
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="text-right max-w-md w-full"
                        >
                          <span className="font-black text-[#3e8914] text-xs px-3.5 py-1 bg-[#3e8914]/10 rounded-full border border-[#3e8914]/20 inline-block mb-2.5 shadow-sm">
                            {item.year}
                          </span>
                          <h4 className="font-extrabold text-ink text-2xl mb-2 tracking-tight">
                            {item.title}
                          </h4>
                          <p className="text-muted-foreground text-[14px] leading-relaxed">
                            {item.description}
                          </p>
                        </motion.div>
                      ) : (
                        /* Image Card on Left */
                        <motion.div
                          initial={{ opacity: 0, scale: 0.88, x: -50 }}
                          whileInView={{ opacity: 1, scale: 1, x: 0 }}
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          whileHover={{ scale: 1.03, y: -4 }}
                          className="relative h-52 w-full max-w-md rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.12)] border-2 border-white ring-1 ring-black/10 group cursor-pointer"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-300" />
                          <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/20 shadow-md">
                            {item.tag}
                          </span>
                        </motion.div>
                      )}
                    </div>

                    {/* Center Node Icon (Mathematically 50% Centered) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, amount: 0.4 }}
                      transition={{ type: "spring", stiffness: 120, damping: 14 }}
                      className="flex justify-center z-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#3e8914] flex items-center justify-center shadow-[0_6px_20px_rgba(62,137,20,0.4)] ring-4 ring-white transition-transform duration-300 hover:scale-110">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </motion.div>

                    {/* Right Column */}
                    <div className="w-full flex justify-start">
                      {!isLeft ? (
                        /* Text Details on Right */
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="text-left max-w-md w-full"
                        >
                          <span className="font-black text-[#3e8914] text-xs px-3.5 py-1 bg-[#3e8914]/10 rounded-full border border-[#3e8914]/20 inline-block mb-2.5 shadow-sm">
                            {item.year}
                          </span>
                          <h4 className="font-extrabold text-ink text-2xl mb-2 tracking-tight">
                            {item.title}
                          </h4>
                          <p className="text-muted-foreground text-[14px] leading-relaxed">
                            {item.description}
                          </p>
                        </motion.div>
                      ) : (
                        /* Image Card on Right */
                        <motion.div
                          initial={{ opacity: 0, scale: 0.88, x: 50 }}
                          whileInView={{ opacity: 1, scale: 1, x: 0 }}
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          whileHover={{ scale: 1.03, y: -4 }}
                          className="relative h-52 w-full max-w-md rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.12)] border-2 border-white ring-1 ring-black/10 group cursor-pointer"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-300" />
                          <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/20 shadow-md">
                            {item.tag}
                          </span>
                        </motion.div>
                      )}
                    </div>

                  </div>

                  {/* ===== Mobile Stack Layout ===== */}
                  <div className="flex md:hidden flex-col gap-4 w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#3e8914] flex items-center justify-center shrink-0 shadow-md ring-2 ring-white">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-[#3e8914] text-xs px-2.5 py-0.5 bg-[#3e8914]/10 rounded-full border border-[#3e8914]/20">
                          {item.year}
                        </span>
                        <h4 className="font-bold text-ink text-lg mt-1">{item.title}</h4>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-xs leading-relaxed pl-1">
                      {item.description}
                    </p>

                    <div className="relative h-44 w-full rounded-2xl overflow-hidden shadow-md border-2 border-white">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className="absolute bottom-2.5 left-3 text-[9px] font-bold text-white uppercase bg-black/50 backdrop-blur-md px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
