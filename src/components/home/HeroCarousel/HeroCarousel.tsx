import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Wrench,
  Bug,
  Scissors,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "@/context/BookingContext";

import cara1 from "@/assets/banner/cara1.png";
import cara2 from "@/assets/banner/cara2.png";
import cara3 from "@/assets/banner/cara3.png";

const slides = [
  {
    id: 1,
    image: cara1,
    subtitle: "Premium Home Cleaning",
    titleParts: ["Spotless Homes,", "Zero Hassle."],
    description: "Experience the pinnacle of cleanliness with our background-verified professionals across Ghaziabad.",
  },
  {
    id: 2,
    image: cara2,
    subtitle: "Appliance Repair Experts",
    titleParts: ["Fast Repairs,", "Trusted Pros."],
    description: "AC, Refrigerator, or Washing Machine acting up? Get same-day doorstep repair services.",
  },
  {
    id: 3,
    image: cara3,
    subtitle: "Salon at Home",
    titleParts: ["Salon-grade Beauty,", "Inside Your Home."],
    description: "Certified beauticians, single-use kits, and zero waiting. Book a slot in under a minute.",
  },
];

const tripTabs = [
  { label: "Appliance", icon: Wrench, cardTitle: "Book Appliance Repair" },
  { label: "Cleaning", icon: Sparkles, cardTitle: "Book Deep Cleaning" },
  { label: "Pest Control", icon: Bug, cardTitle: "Book Pest Control" },
  { label: "Beauty", icon: Scissors, cardTitle: "Book Salon at Home" },
];

const LOCATIONS = ["Indirapuram", "Vaishali", "Vasundhara", "Crossings Republik", "Raj Nagar Extension"];
const SERVICE_TYPES = ["AC Repair", "Washing Machine", "Refrigerator", "Deep Cleaning", "Sofa Cleaning"];
const TIME_SLOTS = ["09:00 AM - 11:00 AM", "11:00 AM - 01:00 PM", "02:00 PM - 04:00 PM", "04:00 PM - 06:00 PM"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const fieldShell =
  "w-full text-left border border-white/20 rounded-lg px-3 py-2 hover:border-white/40 transition bg-white/10 backdrop-blur-sm";

function formatDate(d: Date) {
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
}

const SLIDE_INTERVAL = 5000;
const BAR_COUNT = 6;

const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } },
};

const wordVariants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any },
  },
};

export function HeroCarousel() {
  const { openDrawer } = useBooking();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative bg-ink text-white overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Background image — instant swap, continuous ken-burns zoom */}
      <div className="absolute inset-0">
        <motion.div
          key={slide.id}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1.16 }}
          transition={{ duration: SLIDE_INTERVAL / 1000 + 1.2, ease: "linear" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-black/25 z-10" />

      {/* Shutter reveal — alternating blinds open on every slide change */}
      <div className="absolute inset-0 z-30 flex pointer-events-none">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <motion.div
            key={`${slide.id}-bar-${i}`}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.8, delay: i * 0.07, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: i % 2 === 0 ? "top" : "bottom" }}
            className="flex-1 bg-ink"
          />
        ))}
      </div>

      {/* Vertical slide rail with fill progress */}
      <div className="hidden lg:flex flex-col items-end gap-4 absolute right-8 top-8 z-20">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            className="group flex items-center gap-2"
            aria-label={`Show slide ${i + 1}`}
          >
            <span className={`text-[10px] font-mono tracking-widest transition-colors duration-300 ${i === current ? "text-primary" : "text-white/40"}`}>
              0{i + 1}
            </span>
            <span className="relative block h-9 w-[2px] rounded-full bg-white/20 overflow-hidden">
              {i === current && (
                <motion.span
                  key={`${slide.id}-progress`}
                  initial={{ height: "0%" }}
                  animate={{ height: "100%" }}
                  transition={{ duration: SLIDE_INTERVAL / 1000, ease: "linear" }}
                  className="absolute bottom-0 left-0 w-full bg-primary"
                />
              )}
            </span>
          </button>
        ))}
      </div>

      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 py-12 md:py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 md:gap-10">
          {/* Left: headline & copy */}
          <div className="flex-1 min-h-[260px] lg:-mt-6">
            <div key={slide.id}>
              {/* Subtitle badge — reveal via clip mask */}
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.6, delay: 0.55, ease: [0.65, 0, 0.35, 1] }}
                className="inline-block mb-6"
              >
                <div className="bg-[#4D4D4D] text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-white/10 whitespace-nowrap">
                  {slide.subtitle}
                </div>
              </motion.div>

              {/* Title — per-word slide-up reveal, masked per line */}
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-semibold mb-6 leading-[1.1] tracking-tight text-white">
                {slide.titleParts.map((line, li) => (
                  <motion.span
                    key={li}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
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
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85, ease: "easeOut" }}
                className="text-sm md:text-[15px] font-normal mb-8 max-w-lg text-white/85 leading-relaxed tracking-wide"
              >
                {slide.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-2"
              >
                <button onClick={() => openDrawer()} className="group relative overflow-hidden rounded-md px-4 py-2 bg-primary text-primary-foreground transition-all duration-500 uppercase tracking-[0.15em] text-[10px] font-bold border-2 border-primary hover:bg-white hover:text-primary">
                  <span className="relative z-10 flex items-center gap-1.5">
                    Explore Services
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>

                <a href="#services" className="group relative overflow-hidden rounded-md px-4 py-2 border-2 border-white/40 text-white hover:border-white transition-all duration-500 uppercase tracking-[0.15em] text-[10px] font-bold bg-white/5 backdrop-blur-sm hover:bg-white hover:text-primary text-center">
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                    View All
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}