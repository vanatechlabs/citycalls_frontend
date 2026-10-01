"use client";

import Link from "next/link";
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
import { motion, AnimatePresence, useMotionValue, useReducedMotion, useSpring, type Variants } from "framer-motion";
import gsap from "gsap";
import { useBooking } from "@/context/BookingContext";
import { fetchCityCallsHeroSlides, resolveWebsiteImageUrl } from "@/lib/api/cityCallsHome";

const cara1 = "/assets/Banner/cara4.png";
const cara2 = "/assets/Banner/cara5.png";
const cara3 = "/assets/Banner/cara6.png";
const cara4 = "/assets/Banner/cara7.png";
const cara5 = "/assets/Banner/cara8.png";
const h11 = "/assets/Banner/h11.png";

import { LaunchSpotlight } from "./LaunchSpotlight";

interface Slide {
  id: number | string;
  image: string;
  altText?: string;
  hasText?: boolean;
  subtitle?: string;
  titleParts?: string[];
  description?: string;
  hideButtons?: boolean;
  overlayOpacity?: number | null;
}

// The default overlay below is from-black/55 via-black/35 to-black/18; a
// slide's admin setting scales it so its darkest (bottom) edge is `opacity` %.
function overlayGradient(opacity: number) {
  const alpha = (value: number) => ((opacity * value) / 55 / 100).toFixed(3);
  return `linear-gradient(to top, rgba(0,0,0,${alpha(55)}), rgba(0,0,0,${alpha(35)}), rgba(0,0,0,${alpha(18)}))`;
}

const fallbackSlides: Slide[] = [
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

const SLIDE_INTERVAL = 6500;
// Length of the cross-dissolve between two slide images.
const TRANSITION_SECONDS = 1.4;
const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;
const HERO_TEXT_SHADOW = "1px 1px 2px rgba(0,0,0,0.4)";
// Camera moves for the slow zoom on each slide, used in turn. Every frame
// stays scaled enough to cover its own pan, so no image edge ever shows.
const CAMERA_MOVES = [
  // push-in toward the subject with a slight roll
  { from: { scale: 1, x: "0%", y: "0%", rotate: 0 }, to: { scale: 1.15, x: "-2.5%", y: "-1.5%", rotate: 0.6 }, origin: "62% 40%" },
  // pull-out from a close start
  { from: { scale: 1.18, x: "2%", y: "1%", rotate: 0 }, to: { scale: 1.04, x: "-1%", y: "0%", rotate: 0 }, origin: "45% 50%" },
  // lateral tracking shot
  { from: { scale: 1.09, x: "-3%", y: "0%", rotate: 0 }, to: { scale: 1.13, x: "3%", y: "-1%", rotate: 0 }, origin: "50% 50%" },
  // crane up while pushing in
  { from: { scale: 1.05, x: "0%", y: "2%", rotate: 0 }, to: { scale: 1.16, x: "1%", y: "-2%", rotate: -0.4 }, origin: "50% 32%" },
];
// Starts gently, glides, then settles — like a camera dolly, not a linear zoom.
const CAMERA_EASE = [0.33, 0, 0.2, 1] as const;

// How far (px) the background drifts against the cursor for depth.
const PARALLAX_X = 18;
const PARALLAX_Y = 12;
// Tiny tiling noise texture for the film-grain layer.
const FILM_GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")";

const lineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

// Each word rises out of its line mask while coming into focus.
const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0, filter: "blur(8px)" },
  visible: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HeroCarousel() {
  const { openDrawer } = useBooking();
  const reduceMotion = useReducedMotion();
  // Mouse parallax — the background drifts slightly against the cursor.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { stiffness: 60, damping: 20, mass: 0.6 });
  const parallaxY = useSpring(pointerY, { stiffness: 60, damping: 20, mass: 0.6 });

  function handlePointerMove(event: React.MouseEvent<HTMLElement>) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * -2 * PARALLAX_X);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * -2 * PARALLAX_Y);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }
  const [slides, setSlides] = useState<Slide[]>(fallbackSlides);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchCityCallsHeroSlides(controller.signal)
      .then((heroSlides) => {
        if (heroSlides.length === 0) return;

        setSlides(heroSlides.map((item) => ({
          id: item._id,
          image: resolveWebsiteImageUrl(item.image),
          altText: item.altText,
          hasText: true,
          subtitle: item.subtitle,
          titleParts: [item.titleLine1, item.titleLine2],
          description: item.description,
          overlayOpacity: item.overlayOpacity,
        })));
        setCurrent(0);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        // The bundled slides intentionally remain visible if the CMS API is
        // unavailable, so a backend outage never leaves the hero blank.
        console.warn('Using bundled hero slides because CMS slides could not be loaded.');
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current];
  const cameraMove = CAMERA_MOVES[current % CAMERA_MOVES.length];

  return (
    // Fixed height so the banner (and the page below it) never jumps when a
    // slide with longer/shorter copy comes in; content is centred inside it.
    <section
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative h-[520px] lg:h-[560px] bg-ink text-white overflow-hidden"
      style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
    >
      {/* Background — cinematic cross-dissolve: the new image comes into focus
          (blur → sharp, slight zoom-out) over the old one, which fades away;
          its overlay travels with it so the shade never jumps. */}
      {/* -inset-6 leaves room for the parallax drift without showing an edge */}
      <motion.div className="absolute -inset-6 overflow-hidden" style={{ x: parallaxX, y: parallaxY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            role="img"
            aria-label={slide.altText || slide.subtitle || 'City Calls service'}
            // Comes into focus slightly over-exposed (a light bloom), then settles.
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.12, filter: "blur(10px) brightness(1.35)" }}
            animate={reduceMotion ? { opacity: 1, zIndex: 1 } : { opacity: 1, scale: 1, filter: "blur(0px) brightness(1)", zIndex: 1 }}
            exit={reduceMotion ? { opacity: 0, zIndex: 0 } : { opacity: 0, scale: 1.04, filter: "blur(4px) brightness(0.8)", zIndex: 0 }}
            transition={{ duration: TRANSITION_SECONDS, ease: CINEMATIC_EASE }}
            className="absolute inset-0 will-change-[transform,opacity,filter]"
          >
            {/* Cinematic camera move (push-in / pull-out / track / crane) */}
            <motion.div
              initial={reduceMotion ? undefined : cameraMove.from}
              animate={reduceMotion ? undefined : cameraMove.to}
              transition={{ duration: SLIDE_INTERVAL / 1000 + TRANSITION_SECONDS + 0.6, ease: CAMERA_EASE }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transformOrigin: cameraMove.origin,
                willChange: "transform",
              }}
            />
            {slide.hasText && typeof slide.overlayOpacity === "number" ? (
              <div className="absolute inset-0" style={{ backgroundImage: overlayGradient(slide.overlayOpacity) }} />
            ) : (
              <div className={`absolute inset-0 ${slide.hasText ? (slide.id === 1 ? "bg-transparent" : "bg-gradient-to-t from-black/55 via-black/35 to-black/18") : "bg-black/5"}`} />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Colour grade — cool shadows, warm highlights, like a film LUT */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-10 mix-blend-soft-light transition-opacity duration-1000 ${slide.hasText ? "opacity-100" : "opacity-0"}`}
        style={{ background: "linear-gradient(115deg, rgba(0,70,90,0.55) 0%, transparent 45%, rgba(255,140,40,0.35) 100%)" }}
      />

      {/* Letterbox shading — soft dark bands top and bottom, like a cinema frame */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/45 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Film grain */}
      {!reduceMotion && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-[0.07] mix-blend-overlay">
          <div className="hero-grain absolute -inset-1/2" style={{ backgroundImage: FILM_GRAIN }} />
          <style>{`
            @keyframes hero-grain {
              0%, 100% { transform: translate(0, 0); }
              20% { transform: translate(-4%, 3%); }
              40% { transform: translate(3%, -5%); }
              60% { transform: translate(-6%, -2%); }
              80% { transform: translate(5%, 4%); }
            }
            .hero-grain { animation: hero-grain 0.9s steps(5) infinite; }
          `}</style>
        </div>
      )}

      {/* Cinematic vignette — darker edges on text slides */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-1000 ${slide.hasText ? "opacity-100" : "opacity-0"}`}
        style={{ background: "radial-gradient(ellipse at 55% 45%, transparent 50%, rgba(0,0,0,0.5) 100%)" }}
      />

      {/* Light sweep across the frame on every slide change */}
      {!reduceMotion && (
        <motion.div
          key={`${slide.id}-sweep`}
          aria-hidden
          initial={{ x: "-130%", opacity: 0 }}
          animate={{ x: "230%", opacity: [0, 1, 0] }}
          transition={{ duration: 1.7, delay: 0.2, ease: CINEMATIC_EASE }}
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.13] to-transparent"
        />
      )}

      {/* Vertical slide rail with fill progress */}
      {/* right-20 keeps it clear of the fixed social sidebar on the right edge */}
      <div className="hidden lg:flex flex-col items-end gap-3 absolute right-20 top-8 z-20">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            className="group flex items-center gap-2"
            aria-label={`Show slide ${i + 1}`}
          >
            <span className={`text-[9px] font-mono tracking-widest transition-colors duration-300 ${i === current ? "text-primary" : "text-white/40"}`}>
              0{i + 1}
            </span>
            <span className="relative block h-7 w-[2px] rounded-full bg-white/20 overflow-hidden">
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

      <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl items-center px-4 py-8 lg:px-8 2xl:px-4">
        <div className="flex w-full flex-col lg:flex-row lg:items-center gap-8 md:gap-10">
          {/* Left: headline & copy */}
          {/* Pulled left only on wide screens — on small laptops the container has
              no side margin, so the shift pushed the headline off-screen. */}
          <div className="flex-1 min-h-[260px] lg:-mt-6 2xl:-translate-x-12">
            <AnimatePresence mode="wait">
            {slide.hasText && slide.titleParts ? (
              <motion.div
                key={slide.id}
                // The outgoing headline drifts up and out of focus first.
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: CINEMATIC_EASE }}
              >
                {/* Subtitle badge — reveal via clip mask */}
                {slide.subtitle && (
                  <motion.div
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    // Drop the clip once revealed — a clip-path left on this
                    // wrapper would stop the glass chip's backdrop blur.
                    animate={{ clipPath: "inset(0 0% 0 0)", transitionEnd: { clipPath: "none" } }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
                    className="inline-block mb-6 lg:mb-[clamp(14px,3vh,24px)]"
                  >
                    {slide.id === 1 ? (
                      <div style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif", display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ width: "36px", height: "2px", background: "#e09500", display: "inline-block" }} />
                        <span style={{ fontSize: "12px", fontWeight: 800, color: "#d97706", letterSpacing: "0.25em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "5px" }}>
                          <Sparkles size={14} />
                          {slide.subtitle}
                        </span>
                      </div>
                    ) : (
                      <div
                        // Frosted glass chip with a lit top edge and a sheen
                        className="relative inline-flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-white/40 bg-gradient-to-br from-white/25 via-white/10 to-white/[0.06] px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_0_rgba(255,255,255,0.1),0_8px_24px_-8px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150"
                        style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
                      >
                        <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                        {/* live dot with a soft pulse */}
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(124,179,66,0.9)]" />
                        </span>
                        <span
                          className="text-[11px] font-bold text-white uppercase tracking-[0.2em]"
                          style={{ textShadow: HERO_TEXT_SHADOW }}
                        >
                          {slide.subtitle}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Title — per-word slide-up reveal, masked per line */}
                <h1
                  className={`mb-4 leading-[1.12] tracking-tight ${slide.id === 1 ? "" : "text-[32px] sm:text-[38px] md:text-[44px] lg:text-[min(52px,3.6vw,7vh)] font-bold text-white"}`}
                  style={
                    slide.id === 1
                      ? { fontFamily: "var(--font-plus-jakarta-sans), sans-serif", fontSize: "clamp(30px, min(5vw, 7.5vh), 56px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.02em" }
                      : {
                          fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
                          letterSpacing: "-0.01em",
                          textShadow: HERO_TEXT_SHADOW,
                        }
                  }
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
                              : li === 1
                                ? "text-[#7BB50B]"
                                : "text-white"
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
                    initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, delay: 0.6, ease: CINEMATIC_EASE }}
                    style={
                      slide.id === 1
                        ? { fontFamily: "var(--font-plus-jakarta-sans), sans-serif", fontSize: "clamp(14px, min(1.6vw, 2.6vh), 17px)", color: "#334155", lineHeight: 1.65, fontWeight: 600 }
                        : { fontFamily: "var(--font-plus-jakarta-sans), sans-serif", textShadow: HERO_TEXT_SHADOW }
                    }
                    className={`mb-8 max-w-xl leading-relaxed line-clamp-3 ${slide.id === 1 ? "" : "text-[14px] md:text-[15px] lg:text-[clamp(14px,2.6vh,16px)] lg:max-w-[min(36rem,44vw)] font-medium text-white/90 tracking-wide"}`}
                  >
                    {slide.description}
                  </motion.p>
                )}

                {!slide.hideButtons && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8, ease: CINEMATIC_EASE }}
                    className="flex flex-col sm:flex-row gap-3 mt-2"
                  >
                    {slide.id === 1 ? (
                      <>
                        <a
                          target="_blank" rel="noopener noreferrer" href="https://helpnow.citycalls.in#services"
                          style={{
                            fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
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
                          target="_blank" rel="noopener noreferrer" href="https://helpnow.citycalls.in#how-it-works"
                          style={{
                            fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
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
                        <button onClick={() => openDrawer()} className="group relative overflow-hidden rounded-none px-5 py-2.5 bg-primary text-primary-foreground transition-all duration-500 uppercase tracking-[0.15em] text-[11px] font-bold border-2 border-primary hover:bg-white hover:text-primary">
                          <span className="relative z-10 flex items-center gap-1.5">
                            Explore Services
                            <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </button>

                        <a href="#services" className="group relative overflow-hidden rounded-none px-5 py-2.5 border-2 border-white/40 text-white hover:border-white transition-all duration-500 uppercase tracking-[0.15em] text-[11px] font-bold bg-white/5 backdrop-blur-sm hover:bg-white hover:text-primary text-center">
                          <span className="relative z-10 flex items-center justify-center gap-1.5">
                            View All
                          </span>
                        </a>
                      </>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ) : (
              /* Invisible placeholder ensuring hero banner height is identical and never shifts or increases */
              <div key="placeholder" className="invisible select-none pointer-events-none" aria-hidden="true">
                <div className="inline-block mb-6">
                  <div className="text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">placeholder</div>
                </div>
                <h1 className="text-[32px] sm:text-[38px] md:text-[44px] lg:text-[min(52px,3.6vw,7vh)] font-semibold mb-6 leading-[1.08]">
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
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
