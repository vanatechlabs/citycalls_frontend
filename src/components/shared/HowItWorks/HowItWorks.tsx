"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import {
  BadgeCheck, CalendarCheck, ClipboardCheck, Clock, Home, PhoneCall, ShieldCheck, Sparkles, ThumbsUp, Truck, UserCheck, Wrench,
  type LucideIcon,
} from "lucide-react";

// "How it works" as a horizontal scroll story: the section pins while you
// scroll down, and the landscape step cards slide right-to-left one by one.
// The card in the middle is in focus (full size, photo zooms out), a counter
// and progress bar track the step, and a dotted timeline lights up step by
// step. Scroll distance equals the slide distance, so the speed feels natural.
// Used on the home page and the service pages.

const stepIcons: LucideIcon[] = [CalendarCheck, UserCheck, Wrench, ThumbsUp];
// Icon names chosen in Admin → Website Section → How It Works.
const ICONS: Record<string, LucideIcon> = {
  CalendarCheck, UserCheck, Wrench, ThumbsUp, PhoneCall, ClipboardCheck, Truck, ShieldCheck, BadgeCheck, Home, Clock, Sparkles,
};
// Photo per step (used when a page's steps don't bring their own photo).
const stepImages = [
  "/assets/how-it-works/step-1-book.webp",
  "/assets/how-it-works/step-2-expert.webp",
  "/assets/how-it-works/step-3-repair.webp",
  "/assets/how-it-works/step-4-relax.webp",
];

const defaultSteps = [
  { title: "Book a Service", description: "Select your preferred date & time, and instantly book our service online.", badge: "Step 01" },
  { title: "Expert Assigned", description: "A background-verified and highly trained technician is assigned to your booking.", badge: "Step 02" },
  { title: "Doorstep Repair", description: "Our expert visits your home, diagnoses the issue, and fixes it using genuine parts.", badge: "Step 03" },
  { title: "Relax & Enjoy", description: "Experience a hassle-free repair with our 30-day post-service warranty.", badge: "Step 04" },
];

export type HowItWorksStep = { badge: string; title: string; description: string; image?: string; imageAlt?: string; icon?: string };
type Step = HowItWorksStep;

interface HowItWorksProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  steps?: Step[];
}

const pad = (n: number) => String(n).padStart(2, "0");
const CARD_SHADOW = "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset";

// One landscape card. It is in focus when the scroll reaches its own point
// (index / (total - 1)) and eases back as the next one arrives.
function StepCard({ step, index, total, progress }: { step: Step; index: number; total: number; progress: MotionValue<number> }) {
  const Icon = (step.icon && ICONS[step.icon]) || stepIcons[index % stepIcons.length] || CalendarCheck;
  const center = total > 1 ? index / (total - 1) : 0;
  const span = total > 1 ? 1 / (total - 1) : 1;
  const range = [center - span, center, center + span];

  const scale = useTransform(progress, range, [0.9, 1, 0.9]);
  const opacity = useTransform(progress, range, [0.5, 1, 0.5]);
  const zoom = useTransform(progress, range, [1.22, 1, 1.22]);
  const imageX = useTransform(progress, range, ["6%", "0%", "-6%"]);

  return (
    <motion.article
      style={{ scale, opacity, boxShadow: CARD_SHADOW }}
      className="relative w-[80vw] shrink-0 overflow-hidden rounded-[22px] bg-white p-2.5 sm:w-[62vw] lg:w-[min(52vw,740px)]"
    >
      <div className="grid gap-2.5 md:grid-cols-[1.2fr_1fr]">
        {/* Photo */}
        <figure className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-slate-100 md:aspect-auto md:min-h-[290px]">
          <motion.img
            src={step.image || stepImages[index % stepImages.length]}
            alt={step.imageAlt || step.title}
            loading="lazy"
            draggable={false}
            style={{ scale: zoom, x: imageX }}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          {/* Step number chip */}
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-black tracking-wider text-[#3e8914] shadow-sm backdrop-blur-md">
            {pad(index + 1)}
          </span>
        </figure>

        {/* Text */}
        <div className="relative flex flex-col justify-center px-4 pb-4 pt-2 md:px-5 md:py-6">
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-2 select-none text-[56px] font-black leading-none text-transparent md:text-[72px]"
            style={{ WebkitTextStroke: "1.5px rgba(62,137,20,0.18)" }}
          >
            {pad(index + 1)}
          </span>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#5aa832] to-[#2f6b0f] text-white shadow-[0_10px_22px_-10px_rgba(62,137,20,0.8)]">
            <Icon className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="mt-4 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#3e8914]">
            {step.badge} <span className="text-ink/30">/ {pad(total)}</span>
          </span>
          <h3 className="mt-1.5 text-[20px] font-extrabold leading-tight tracking-tight text-ink md:text-[22px]">{step.title}</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink/60">{step.description}</p>
          <div className="mt-5 flex items-center gap-2">
            <span className="h-[3px] w-10 rounded-full bg-gradient-to-r from-[#3e8914] to-primary" />
            <span className="h-[3px] w-3 rounded-full bg-[#3e8914]/30" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function HowItWorks({
  eyebrow = "Interactive Walkthrough",
  title = "How It Works",
  highlight = "Works",
  description = "Your appliance repair is just a few clicks away. We make it simple, transparent, and absolutely hassle-free.",
  steps = defaultSteps,
}: HowItWorksProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const total = steps.length;
  // How far the track has to slide so the last card ends up centred.
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const measure = () => {
      const cards = track.children;
      if (!cards.length) return;
      const first = cards[0] as HTMLElement;
      const last = cards[cards.length - 1] as HTMLElement;
      // From "first card centred" to "last card centred".
      setDistance(Math.max(0, last.offsetLeft + last.offsetWidth / 2 - (first.offsetLeft + first.offsetWidth / 2)));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [total]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4, restDelta: 0.0005 });
  const x = useTransform(progress, [0, 1], [0, -distance]);
  const bar = useTransform(progress, [0, 1], ["0%", "100%"]);

  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.min(total - 1, Math.max(0, Math.round(v * (total - 1))));
    setActive((prev) => (prev === next ? prev : next));
  });

  const at = highlight ? title.indexOf(highlight) : -1;

  return (
    // Tall enough to scroll exactly the slide distance while the frame is pinned.
    <section ref={sectionRef} className="relative border-t border-black/5 bg-gradient-to-b from-white via-[#3e8914]/[0.03] to-white" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden py-6">
        {/* ambience */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(62,137,20,0.07)_1px,transparent_1px)] bg-[size:22px_22px]" />
        <div aria-hidden className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[110px]" />
        <div aria-hidden className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-[110px]" />

        {/* Heading + counter */}
        <div className="container-x relative mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            {eyebrow && (<span className="inline-flex items-center gap-2 rounded-full border border-[#3e8914]/20 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#3e8914] shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3e8914] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3e8914]" />
              </span>
              {eyebrow}
            </span>)}
            <h2 className="mt-3 text-[26px] font-black uppercase leading-tight tracking-tight text-ink md:text-[34px]">
              {at >= 0 ? (
                <>
                  {title.slice(0, at)}
                  <span className="relative inline-block text-[#3e8914]">
                    {highlight}
                    <svg aria-hidden className="absolute -bottom-1.5 left-0 h-3 w-full" viewBox="0 0 150 10" fill="none" preserveAspectRatio="none">
                      <path d="M2 7 C 40 2, 110 2, 148 7" strokeWidth="3.5" strokeLinecap="round" className="stroke-[#3e8914]" />
                    </svg>
                  </span>
                  {title.slice(at + highlight.length)}
                </>
              ) : (
                title
              )}
            </h2>
            <p className="mt-2 max-w-xl text-[13.5px] font-medium leading-relaxed text-ink/65">{description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3 md:flex-col md:items-end">
            <p className="font-black tabular-nums text-ink">
              <span className="text-[28px] text-[#3e8914] md:text-[34px]">{pad(active + 1)}</span>
              <span className="text-[15px] text-ink/30"> / {pad(total)}</span>
            </p>
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-black/[0.07] md:w-40">
              <motion.div style={{ width: bar }} className="h-full rounded-full bg-gradient-to-r from-[#3e8914] to-primary" />
            </div>
          </div>
        </div>

        {/* Sliding cards */}
        <div ref={viewportRef} className="relative mt-6 w-full md:mt-8">
          <motion.div
            ref={trackRef}
            style={{ x }}
            // Side padding centres the first and last card.
            className="flex w-max items-center gap-5 px-[10vw] will-change-transform sm:px-[19vw] md:gap-8 lg:px-[max(24vw,calc(50vw-370px))]"
          >
            {steps.map((step, idx) => (
              <StepCard key={idx} step={step} index={idx} total={total} progress={progress} />
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="container-x relative mx-auto mt-6 w-full max-w-3xl md:mt-8">
          <div className="relative flex items-center justify-between">
            <div aria-hidden className="absolute inset-x-4 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[repeating-linear-gradient(90deg,rgba(15,23,42,0.12)_0_8px,transparent_8px_14px)]">
              <motion.div style={{ width: bar }} className="h-full rounded-full bg-gradient-to-r from-[#3e8914] to-primary" />
            </div>
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-1.5">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full border-[3px] border-white text-[11px] font-black transition-all duration-500 ${
                    idx <= active ? "bg-[#3e8914] text-white shadow-[0_0_0_4px_rgba(62,137,20,0.15)]" : "bg-slate-200 text-ink/40"
                  } ${idx === active ? "scale-110" : ""}`}
                >
                  {pad(idx + 1)}
                </span>
                <span className={`hidden whitespace-nowrap text-[11px] font-bold transition-colors sm:block ${idx === active ? "text-ink" : "text-ink/40"}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
