"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, CalendarCheck, Check, ThumbsUp, UserCheck, Wrench, type LucideIcon } from "lucide-react";

const stepIcons: LucideIcon[] = [CalendarCheck, UserCheck, Wrench, ThumbsUp];

const defaultSteps = [
  {
    title: "Book a Service",
    description: "Select your preferred date & time, and instantly book our service online.",
    badge: "Step 01",
  },
  {
    title: "Expert Assigned",
    description: "A background-verified and highly trained technician is assigned to your booking.",
    badge: "Step 02",
  },
  {
    title: "Doorstep Repair",
    description: "Our expert visits your home, diagnoses the issue, and fixes it using genuine parts.",
    badge: "Step 03",
  },
  {
    title: "Relax & Enjoy",
    description: "Experience a hassle-free repair with our 30-day post-service warranty.",
    badge: "Step 04",
  },
];

type Step = { badge: string; title: string; description: string };

interface HowItWorksProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  steps?: Step[];
}

// Share of the scroll at which the last card has settled; the rest is a short
// rest before the section scrolls away.
const SETTLED_AT = 0.85;
// Share of each step's scroll during which its card just stays in front
// before the next one starts coming in.
const HOLD = 0.4;

// Where a card sits relative to the front card: 0 = front, 1 = one behind,
// -1 = still waiting below the stage.
function cardState(depth: number) {
  if (depth <= -1) return { y: "115%", scale: 1, rotateX: 16, shade: 0 };
  if (depth === 0) return { y: "0%", scale: 1, rotateX: 0, shade: 0 };
  if (depth === 1) return { y: "-7%", scale: 0.94, rotateX: 0, shade: 0.18 };
  if (depth === 2) return { y: "-13%", scale: 0.88, rotateX: 0, shade: 0.32 };
  return { y: "-18%", scale: 0.82, rotateX: 0, shade: 0.45 };
}

const pad = (n: number) => String(n).padStart(2, "0");

// One card of the deck. Its position is a pure function of scroll progress,
// so the motion follows the scroll wheel exactly (no snapping between steps).
function StackCard({
  step,
  index,
  total,
  progress,
  marks,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
  marks: number[];
}) {
  const Icon = stepIcons[index] ?? CalendarCheck;
  // Each step: its card arrives at marks[k] and holds until marks[k] + HOLD
  // of a step, so the deck rests between moves instead of always sliding.
  const segment = marks.length > 1 ? marks[1] - marks[0] : 1;
  const keyframes = marks.flatMap((mark, k) => {
    const state = cardState(k - index);
    return k < marks.length - 1 ? [{ at: mark, state }, { at: mark + segment * HOLD, state }] : [{ at: mark, state }];
  });
  const input = keyframes.length > 1 ? keyframes.map((f) => f.at) : [0, 1];
  const values = <T,>(get: (s: ReturnType<typeof cardState>) => T) =>
    keyframes.length > 1 ? keyframes.map((f) => get(f.state)) : [get(keyframes[0].state), get(keyframes[0].state)];

  const y = useTransform(progress, input, values((s) => s.y));
  const scale = useTransform(progress, input, values((s) => s.scale));
  const rotateX = useTransform(progress, input, values((s) => s.rotateX));
  const shade = useTransform(progress, input, values((s) => s.shade));
  const isLast = index === total - 1;

  return (
    <motion.article
      style={{ y, scale, rotateX, zIndex: index, transformOrigin: "50% 0%" }}
      className="absolute inset-x-0 top-0 h-full overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_30px_60px_-25px_rgba(15,23,42,0.35),0_10px_20px_-12px_rgba(15,23,42,0.15)] will-change-transform"
    >
      {/* decoration: corner glow, dot grid and a large faded icon */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(62,137,20,0.09)_1px,transparent_1px)] bg-[size:18px_18px] [mask-image:linear-gradient(to_left,black,transparent_60%)]" />
      <Icon aria-hidden className="pointer-events-none absolute -bottom-8 -right-6 h-48 w-48 -rotate-12 text-[#3e8914]/[0.06]" strokeWidth={1.25} />

      <div className="relative flex h-full flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#4fa31d] to-[#2f6b0f] text-white shadow-[0_12px_24px_-10px_rgba(62,137,20,0.8)] sm:h-16 sm:w-16">
            <span aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
            <Icon className="relative h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.8} />
          </span>
          <span
            aria-hidden
            className="select-none text-[64px] font-black leading-none tracking-tighter text-transparent sm:text-[84px]"
            style={{ WebkitTextStroke: "1.5px rgba(62,137,20,0.28)" }}
          >
            {pad(index + 1)}
          </span>
        </div>

        <div className="mt-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3e8914]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#3e8914]">
            {step.badge}
            <span className="text-[#3e8914]/50">/ {pad(total)}</span>
          </span>
          <h3 className="mt-3 text-[22px] font-extrabold leading-tight tracking-tight text-ink sm:text-[28px]">{step.title}</h3>
          <p className="mt-2 max-w-md text-[13px] font-medium leading-relaxed text-ink/65 sm:text-[14.5px]">{step.description}</p>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-black/[0.06] pt-4">
            <div className="flex gap-1.5">
              {Array.from({ length: total }, (_, i) => (
                <span key={i} className={`h-1.5 rounded-full ${i <= index ? "w-6 bg-[#3e8914]" : "w-3 bg-black/10"}`} />
              ))}
            </div>
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-ink/45">
              {isLast ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#3e8914]" strokeWidth={3} /> All set
                </>
              ) : (
                <>
                  Keep scrolling <ArrowRight className="h-3.5 w-3.5 rotate-90 text-[#3e8914]" />
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* cards further back dim as the deck grows */}
      <motion.div aria-hidden style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-slate-900" />
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const total = steps.length;
  // Scroll progress at which each card is fully in front.
  const marks = steps.map((_, k) => (total > 1 ? (k / (total - 1)) * SETTLED_AT : 0));

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 26, mass: 0.8, restDelta: 0.0005 });
  const railFill = useTransform(progress, [0, SETTLED_AT], ["0%", "100%"]);

  useMotionValueEvent(progress, "change", (latest) => {
    const position = total > 1 ? (Math.min(latest, SETTLED_AT) / SETTLED_AT) * (total - 1) : 0;
    // Within a step, the hold comes first; the next card is "active" once it's mostly in.
    const step = Math.min(total - 1, Math.floor(position) + (position % 1 > HOLD + (1 - HOLD) * 0.6 ? 1 : 0));
    setActiveStep(step);
  });

  // Clicking a step scrolls the page to the point where that card is in front.
  function goToStep(index: number) {
    const el = containerRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    const segment = total > 1 ? SETTLED_AT / (total - 1) : 0;
    const target = index < total - 1 ? marks[index] + segment * HOLD * 0.5 : marks[index];
    window.scrollTo({ top: top + target * scrollable, behavior: "smooth" });
  }

  const [before, ...after] = title.split(highlight);

  return (
    <div ref={containerRef} className="relative h-[480vh] w-full border-t border-black/5 bg-[#3e8914]/[0.02]">
      {/* Sticky frame — sticks just below the (64px) scrolled navbar */}
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-start overflow-hidden px-4 pb-6 pt-6 md:px-8 md:pt-8 lg:justify-center lg:pt-4">
        {/* ambience */}
        <div aria-hidden className="pointer-events-none absolute left-1/4 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[110px]" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-emerald-200/20 blur-[110px]" />

        <div className="container-x relative z-10 grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left — heading + step navigator */}
          <div className="text-center lg:text-left">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#3e8914]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#3e8914]">
              <span>{eyebrow}</span>
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#3e8914]" />
            </div>
            <h2 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-ink md:text-4xl">
              {before}
              {after.length > 0 && (
                <span className="relative inline-block text-[#3e8914]">
                  {highlight}
                  <svg aria-hidden className="absolute -bottom-1.5 left-0 h-3 w-full" viewBox="0 0 150 10" fill="none" preserveAspectRatio="none">
                    <path d="M0 8 L 150 8" strokeWidth="3" strokeLinecap="round" className="stroke-[#3e8914]" />
                  </svg>
                </span>
              )}
              {after.join(highlight)}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-xs font-medium leading-relaxed text-ink/70 md:text-sm lg:mx-0">{description}</p>

            {/* Step list with a rail that fills as you scroll (desktop) */}
            <div className="relative mt-8 hidden lg:block">
              <div className="absolute bottom-5 left-[19px] top-5 w-[3px] overflow-hidden rounded-full bg-black/[0.07]">
                <motion.div style={{ height: railFill }} className="w-full rounded-full bg-gradient-to-b from-primary to-[#3e8914] shadow-[0_0_10px_rgba(62,137,20,0.6)]" />
              </div>
              <ol className="relative space-y-1.5">
                {steps.map((step, idx) => {
                  const Icon = stepIcons[idx] ?? CalendarCheck;
                  const isActive = activeStep === idx;
                  const isDone = activeStep > idx;
                  return (
                    <li key={idx}>
                      <button
                        type="button"
                        onClick={() => goToStep(idx)}
                        aria-current={isActive ? "step" : undefined}
                        className={`group flex w-full items-center gap-4 rounded-2xl py-2 pl-0 pr-4 text-left transition-all duration-500 ${
                          isActive ? "bg-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.45)] ring-1 ring-black/[0.05]" : "hover:bg-white/60"
                        }`}
                      >
                        <span
                          className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 transition-all duration-500 ${
                            isActive
                              ? "scale-110 border-[#3e8914] bg-[#3e8914] text-white shadow-[0_0_0_5px_rgba(62,137,20,0.15)]"
                              : isDone
                                ? "border-[#3e8914] bg-white text-[#3e8914]"
                                : "border-black/10 bg-white text-ink/35"
                          }`}
                        >
                          {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : <Icon className="h-[18px] w-[18px]" />}
                        </span>
                        <span className="min-w-0">
                          <span className={`block text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${isActive || isDone ? "text-[#3e8914]" : "text-ink/35"}`}>
                            {step.badge}
                          </span>
                          <span className={`block truncate text-[15px] font-bold transition-colors ${isActive ? "text-ink" : "text-ink/55 group-hover:text-ink/80"}`}>
                            {step.title}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Right — the card deck */}
          <div className="relative mx-auto w-full max-w-[560px]">
            {/* Clips the cards waiting below; the top padding leaves room for
                the cards stacked behind to peek out above the front one. */}
            <div className="relative -mx-4 overflow-hidden px-4 pb-8 pt-[72px]">
              <div className="relative h-[300px] sm:h-[330px] lg:h-[360px]" style={{ perspective: "1400px" }}>
                {steps.map((step, idx) => (
                  <StackCard key={idx} step={step} index={idx} total={total} progress={progress} marks={marks} />
                ))}
              </div>
            </div>

            {/* step dots (mobile / tablet) */}
            <div className="mt-1 flex items-center justify-center gap-2 lg:hidden">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToStep(idx)}
                  aria-label={`Go to ${step.title}`}
                  className={`h-2 rounded-full transition-all duration-500 ${activeStep === idx ? "w-8 bg-[#3e8914]" : activeStep > idx ? "w-2 bg-[#3e8914]/50" : "w-2 bg-black/15"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
