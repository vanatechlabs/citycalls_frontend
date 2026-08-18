import { motion, useScroll, useTransform } from "framer-motion";
import { Flag, Users, Building2, Trophy, Rocket, Star, TrainFront, Sparkles } from "lucide-react";
import { useRef } from "react";

import s1 from "@/assets/Services/s1.png";
import s2 from "@/assets/Services/s2.png";
import s3 from "@/assets/Services/s3.png";
import s4 from "@/assets/Services/s4.png";
import s5 from "@/assets/Services/s5.png";
import s6 from "@/assets/Services/s6.png";

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

const textVariantsLeft = {
  hidden: { opacity: 0, x: -50, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 16, duration: 0.7 },
  },
};

const textVariantsRight = {
  hidden: { opacity: 0, x: 50, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 16, duration: 0.7 },
  },
};

const imageVariantsLeft = {
  hidden: { opacity: 0, scale: 0.75, rotateY: -28, x: -30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 85, damping: 14, duration: 0.85 },
  },
};

const imageVariantsRight = {
  hidden: { opacity: 0, scale: 0.75, rotateY: 28, x: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 85, damping: 14, duration: 0.85 },
  },
};

export function AboutJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.35"],
  });

  const trackHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const trainTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const trainOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <section className="bg-white py-12 md:py-20 overflow-hidden">
      <div className="container-x mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3e8914]/10 text-[#3e8914] text-[11px] font-bold uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Our Story &amp; Growth
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold font-sans text-ink mb-4"
          >
            Our Journey
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-1.5 bg-[#3e8914] mx-auto rounded-full"
          />
        </div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* ===== Railway track (background, gray, always full height) ===== */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-6">
            {/* two rails */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gray-200 rounded-full" />
            <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-gray-200 rounded-full" />
            {/* sleepers / ties */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #e5e7eb 0px, #e5e7eb 4px, transparent 4px, transparent 22px)",
              }}
            />
          </div>

          {/* ===== Railway track (foreground, colored, fills as you scroll) ===== */}
          <motion.div
            style={{ height: trackHeight }}
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-6 overflow-hidden z-[1]"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#3e8914] rounded-full" />
            <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-[#3e8914] rounded-full" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #3e8914 0px, #3e8914 4px, transparent 4px, transparent 22px)",
              }}
            />
          </motion.div>

          {/* ===== Train riding the track ===== */}
          <motion.div
            style={{ top: trainTop, opacity: trainOpacity }}
            className="absolute left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] hidden sm:flex"
          >
            <div className="w-11 h-11 rounded-full bg-[#3e8914] shadow-[0_4px_20px_rgba(62,137,20,0.6)] flex items-center justify-center ring-4 ring-white">
              <TrainFront className="w-5 h-5 text-white" />
            </div>
          </motion.div>

          {/* ===== Milestones ===== */}
          <div className="relative z-[3] flex flex-col gap-14 md:gap-20">
            {milestones.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;

              return (
                <div key={item.year} className="relative flex items-center md:min-h-[200px]">
                  {/* Mobile layout: icon + text + image */}
                  <div className="flex md:hidden items-start gap-4 w-full pl-0">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ type: "spring", stiffness: 120 }}
                      className="relative shrink-0 mt-1"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#3e8914] flex items-center justify-center shadow-[0_4px_15px_rgba(62,137,20,0.3)]">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.6 }}
                      className="flex-1"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-black text-[#3e8914] text-xs px-2.5 py-0.5 bg-[#3e8914]/10 rounded-full border border-[#3e8914]/20">
                          {item.year}
                        </span>
                        <h4 className="font-bold text-ink text-[16px]">{item.title}</h4>
                      </div>
                      <p className="text-muted-foreground text-[13px] leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Cool Mobile Image Frame */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85, rotateX: -15 }}
                        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ type: "spring", stiffness: 90 }}
                        className="relative h-44 w-full rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.12)] border-2 border-white ring-1 ring-black/5"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <span className="absolute bottom-2.5 left-3 text-[10px] font-bold text-white uppercase tracking-wider bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">
                          {item.tag}
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Desktop layout: text on one side, track node, 3D animated image on opposite side */}
                  <div className="hidden md:flex w-full items-center">
                    {/* Left Side */}
                    <div
                      className={`w-1/2 ${
                        isLeft ? "pr-12 text-right" : "order-3 pl-12 text-left"
                      }`}
                    >
                      {isLeft ? (
                        <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: false, amount: 0.4 }}
                          variants={textVariantsLeft}
                        >
                          <span className="font-black text-[#3e8914] text-xs px-3 py-1 bg-[#3e8914]/10 rounded-full border border-[#3e8914]/20 inline-block mb-2 shadow-sm">
                            {item.year}
                          </span>
                          <h4 className="font-extrabold text-ink text-xl mb-2 tracking-tight">
                            {item.title}
                          </h4>
                          <p className="text-muted-foreground text-[13.5px] leading-relaxed max-w-md ml-auto">
                            {item.description}
                          </p>
                        </motion.div>
                      ) : (
                        /* 3D Image Card on Left Side */
                        <div style={{ perspective: 1200 }}>
                          <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.4 }}
                            variants={imageVariantsLeft}
                            whileHover={{ scale: 1.04, rotateY: 5, y: -4 }}
                            className="relative h-48 w-full max-w-md rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.15)] border-2 border-white ring-1 ring-black/10 group cursor-pointer"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                            <div className="absolute bottom-3 left-3 flex items-center gap-2">
                              <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 shadow-sm">
                                {item.tag}
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </div>

                    {/* Center Track Node */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: false, amount: 0.4 }}
                      transition={{ type: "spring", stiffness: 120, damping: 14 }}
                      className="order-2 shrink-0 mx-4 z-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#3e8914] flex items-center justify-center shadow-[0_6px_20px_rgba(62,137,20,0.4)] ring-4 ring-white transition-transform duration-300 hover:scale-110">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </motion.div>

                    {/* Right Side */}
                    <div
                      className={`w-1/2 ${
                        !isLeft ? "order-1 pr-12 text-right" : "pl-12 text-left"
                      }`}
                    >
                      {!isLeft ? (
                        <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: false, amount: 0.4 }}
                          variants={textVariantsRight}
                        >
                          <span className="font-black text-[#3e8914] text-xs px-3 py-1 bg-[#3e8914]/10 rounded-full border border-[#3e8914]/20 inline-block mb-2 shadow-sm">
                            {item.year}
                          </span>
                          <h4 className="font-extrabold text-ink text-xl mb-2 tracking-tight">
                            {item.title}
                          </h4>
                          <p className="text-muted-foreground text-[13.5px] leading-relaxed max-w-md">
                            {item.description}
                          </p>
                        </motion.div>
                      ) : (
                        /* 3D Image Card on Right Side */
                        <div style={{ perspective: 1200 }}>
                          <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.4 }}
                            variants={imageVariantsRight}
                            whileHover={{ scale: 1.04, rotateY: -5, y: -4 }}
                            className="relative h-48 w-full max-w-md rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.15)] border-2 border-white ring-1 ring-black/10 group cursor-pointer"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                            <div className="absolute bottom-3 left-3 flex items-center gap-2">
                              <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 shadow-sm">
                                {item.tag}
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      )}
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