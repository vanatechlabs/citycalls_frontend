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
import gsap from "gsap";
import { useBooking } from "@/context/BookingContext";

import cara1 from "@/assets/Banner/cara4.png";
import cara2 from "@/assets/Banner/cara5.png";
import cara3 from "@/assets/Banner/cara6.png";
import cara4 from "@/assets/Banner/cara7.png";
import cara5 from "@/assets/Banner/cara8.png";
import h11 from "@/assets/Banner/h11.png";

import { LaunchSpotlight } from "./LaunchSpotlight";

interface Slide {
  id: number;
  image: string;
  hasText?: boolean;
  subtitle?: string;
  titleParts?: string[];
  description?: string;
  hideButtons?: boolean;
}

const slides: Slide[] = [
  {
    id: 1,
    image: h11,
  },
  {
    id: 2,
    image: cara1,
    hasText: true,
    subtitle: "Premium Home Cleaning",
    titleParts: ["Spotless Homes,", "Zero Hassle."],
    description:
      "Experience the pinnacle of cleanliness with our background-verified professionals across Ghaziabad.",
  },
  {
    id: 3,
    image: cara2,
    hasText: true,
    subtitle: "Appliance Repair Experts",
    titleParts: ["Fast Repairs,", "Trusted Pros."],
    description:
      "AC, Refrigerator, or Washing Machine acting up? Get same-day doorstep repair services.",
  },
  {
    id: 4,
    image: cara3,
    hasText: true,
    subtitle: "Salon at Home",
    titleParts: ["Salon-grade Beauty,", "Inside Your Home."],
    description:
      "Certified beauticians, single-use kits, and zero waiting. Book a slot in under a minute.",
  },
  {
    id: 5,
    image: cara4,
    hasText: true,
    subtitle: "Certified Pest Control",
    titleParts: ["Pest-Free Living,", "100% Safe Homes."],
    description:
      "Safe, odourless treatments to eliminate termites, cockroaches, bedbugs, and rodents with guaranteed protection.",
  },
  {
    id: 6,
    image: cara5,
    hasText: true,
    subtitle: "Luxury Hair Spa & Salon",
    titleParts: ["Luxury Hair Spa,", "Pamper Yourself."],
    description:
      "Indulge in salon-grade hair spa, nourishing treatments, and expert styling in the comfort of your home.",
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

      <div className={`absolute inset-0 z-10 transition-opacity duration-700 ${slide.hasText ? (slide.id === 1 ? "bg-transparent" : "bg-gradient-to-t from-black/45 via-black/25 to-black/10") : "bg-black/5"}`} />

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

      {/* Floating "New Launched" mini spotlight widget (Fixed bottom-left) */}
      <LaunchSpotlight />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 py-16 md:py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 md:gap-10">
          {/* Left: headline & copy */}
          <div className="flex-1 min-h-[260px] lg:-mt-6 md:-translate-x-4 lg:-translate-x-8 xl:-translate-x-12">
            {slide.hasText && slide.titleParts ? (
              <div key={slide.id}>
                {/* Subtitle badge — reveal via clip mask */}
                {slide.subtitle && (
                  <motion.div
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{ duration: 0.6, delay: 0.55, ease: [0.65, 0, 0.35, 1] }}
                    className="inline-block mb-6"
                  >
                    {slide.id === 1 ? (
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ width: "36px", height: "2px", background: "#e09500", display: "inline-block" }} />
                        <span style={{ fontSize: "12px", fontWeight: 800, color: "#d97706", letterSpacing: "0.25em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "5px" }}>
                          <Sparkles size={14} />
                          {slide.subtitle}
                        </span>
                      </div>
                    ) : (
                      <div className="bg-[#4D4D4D] text-white text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-white/10 whitespace-nowrap">
                        {slide.subtitle}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Title — per-word slide-up reveal, masked per line */}
                <h1
                  className={`mb-4 leading-[1.12] tracking-tight ${slide.id === 1 ? "" : "text-4xl sm:text-[44px] md:text-[52px] lg:text-[62px] font-semibold text-white"}`}
                  style={slide.id === 1 ? { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.02em" } : {}}
                >
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
                            slide.id === 1
                              ? li === 0 ? "text-[#0f172a]" : "text-[#d97706]"
                              : li === 1 ? "text-primary" : "text-white"
                          }`}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.span>
                  ))}
                </h1>

                {slide.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.85, ease: "easeOut" }}
                    style={slide.id === 1 ? { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(15px, 1.6vw, 17px)", color: "#334155", lineHeight: 1.65, fontWeight: 600 } : {}}
                    className={`mb-8 max-w-xl leading-relaxed ${slide.id === 1 ? "" : "text-[15px] md:text-base lg:text-[17px] font-normal text-white/85 tracking-wide"}`}
                  >
                    {slide.description}
                  </motion.p>
                )}

                {!slide.hideButtons && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-3 mt-2"
                  >
                    {slide.id === 1 ? (
                      <>
                        <a
                          href="/help-now#services"
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            padding: "12px 28px",
                            background: "#f5a623",
                            color: "#000000",
                            fontSize: "10.5px",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            border: "1px solid #f5a623",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "7px",
                            boxShadow: "0 4px 14px rgba(245,166,35,0.4)",
                            transition: "all 0.4s ease",
                          }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#fff"; el.style.background = "#0f172a"; el.style.borderColor = "#0f172a"; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#000"; el.style.background = "#f5a623"; el.style.borderColor = "#f5a623"; }}
                        >
                          <span>Book Service Now</span>
                          <ChevronRight size={15} />
                        </a>
                        <a
                          href="/help-now#how-it-works"
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            padding: "12px 28px",
                            background: "rgba(255,255,255,0.85)",
                            color: "#0f172a",
                            fontSize: "10.5px",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            border: "1px solid #0f172a",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "7px",
                            backdropFilter: "blur(8px)",
                            transition: "all 0.4s ease",
                          }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#0f172a"; el.style.color = "#fff"; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.85)"; el.style.color = "#0f172a"; }}
                        >
                          <span>Explore Process</span>
                          <Sparkles size={14} />
                        </a>
                      </>
                    ) : (
                      <>
                        <button onClick={() => openDrawer()} className="group relative overflow-hidden rounded-md px-5 py-2.5 bg-primary text-primary-foreground transition-all duration-500 uppercase tracking-[0.15em] text-[11px] font-bold border-2 border-primary hover:bg-white hover:text-primary">
                          <span className="relative z-10 flex items-center gap-1.5">
                            Explore Services
                            <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </button>

                        <a href="#services" className="group relative overflow-hidden rounded-md px-5 py-2.5 border-2 border-white/40 text-white hover:border-white transition-all duration-500 uppercase tracking-[0.15em] text-[11px] font-bold bg-white/5 backdrop-blur-sm hover:bg-white hover:text-primary text-center">
                          <span className="relative z-10 flex items-center justify-center gap-1.5">
                            View All
                          </span>
                        </a>
                      </>
                    )}
                  </motion.div>
                )}
              </div>
            ) : (
              /* Invisible placeholder ensuring hero banner height is identical and never shifts or increases */
              <div className="invisible select-none pointer-events-none" aria-hidden="true">
                <div className="inline-block mb-6">
                  <div className="text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">placeholder</div>
                </div>
                <h1 className="text-4xl sm:text-[44px] md:text-[52px] lg:text-[62px] font-semibold mb-6 leading-[1.08]">
                  <span className="block pb-1">placeholder line</span>
                  <span className="block pb-1">placeholder line</span>
                </h1>
                <p className="text-[15px] mb-8 max-w-xl">placeholder description text here for height matching</p>
                <div className="flex gap-2.5">
                  <span className="px-5 py-2.5 text-[11px]">placeholder</span>
                  <span className="px-5 py-2.5 text-[11px]">placeholder</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
