"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { CalendarCheck, UserCheck, Wrench, ThumbsUp, ArrowRight, Check, ChevronDown } from 'lucide-react';

const steps = [
  {
    icon: CalendarCheck,
    title: "Book a Service",
    description: "Select your preferred date & time, and instantly book our service online.",
    badge: "Step 01"
  },
  {
    icon: UserCheck,
    title: "Expert Assigned",
    description: "A background-verified and highly trained technician is assigned to your booking.",
    badge: "Step 02"
  },
  {
    icon: Wrench,
    title: "Doorstep Repair",
    description: "Our expert visits your home, diagnoses the issue, and fixes it using genuine parts.",
    badge: "Step 03"
  },
  {
    icon: ThumbsUp,
    title: "Relax & Enjoy",
    description: "Experience a hassle-free repair with our 30-day post-service warranty.",
    badge: "Step 04"
  }
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001
  });

  // Track scroll progress and update active step index
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.25) setActiveStep(0);
    else if (latest < 0.50) setActiveStep(1);
    else if (latest < 0.75) setActiveStep(2);
    else setActiveStep(3);
  });

  // Desktop horizontal line & arrow position
  const desktopLineWidth = useTransform(smoothProgress, [0, 0.95], ["0%", "100%"]);
  const desktopArrowLeft = useTransform(smoothProgress, [0, 0.95], ["0%", "100%"]);

  // Mobile vertical line & arrow position
  const mobileLineHeight = useTransform(smoothProgress, [0, 0.95], ["0%", "100%"]);
  const mobileArrowTop = useTransform(smoothProgress, [0, 0.95], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative h-[220vh] w-full bg-[#3e8914]/[0.02] border-t border-black/5">
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center py-6 px-4 md:px-8 overflow-hidden">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-x max-w-7xl relative z-10 w-full flex flex-col items-center">
          
          {/* Header */}
          <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3e8914]/10 text-[#3e8914] text-[11px] font-bold uppercase tracking-wider mb-3">
              <span>Interactive Walkthrough</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3e8914] animate-ping" />
            </div>
            
            <h2 className="text-2xl md:text-4xl font-display font-black uppercase tracking-tight text-ink leading-tight">
              How It{" "}
              <span className="text-[#3e8914] relative inline-block">
                Works
                <motion.svg
                  className="absolute -bottom-1.5 left-0 w-full h-3"
                  viewBox="0 0 150 10"
                  fill="none"
                >
                  <path
                    d="M0 8 L 150 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="stroke-[#3e8914]"
                  />
                </motion.svg>
              </span>
            </h2>
            <p className="text-ink/70 text-xs md:text-sm mt-3 font-medium max-w-md mx-auto leading-relaxed">
              Your appliance repair is just a few clicks away. We make it simple, transparent, and absolutely hassle-free.
            </p>

          </div>

          {/* DESKTOP LAYOUT (Horizontal Progress) */}
          <div className="hidden lg:block w-full relative mt-4 mb-6">
            
            {/* Base Gray Line */}
            <div className="absolute top-[40px] left-[10%] right-[10%] h-[4px] bg-black/10 rounded-full z-0 overflow-hidden">
              {/* Dynamic Animated Green Progress Line */}
              <motion.div
                style={{ width: desktopLineWidth }}
                className="h-full bg-gradient-to-r from-primary via-[#3e8914] to-emerald-400 rounded-full shadow-[0_0_12px_rgba(62,137,20,0.8)]"
              />
            </div>

            {/* Floating Traveling Arrow Head — stays on the progress line, not over cards */}
            <div className="absolute top-[40px] left-[10%] right-[10%] h-0 z-0 pointer-events-none">
              <motion.div
                style={{ left: desktopArrowLeft }}
                className="absolute top-1/2 -translate-y-1/2 -ml-3.5 w-7 h-7 rounded-full bg-[#3e8914] text-white flex items-center justify-center shadow-md border-2 border-white"
              >
                <ArrowRight size={14} className="animate-pulse" />
              </motion.div>
            </div>

            {/* 4 Step Cards */}
            <div className="grid grid-cols-4 gap-6 relative z-10">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isPassed = activeStep >= idx;
                const isActive = activeStep === idx;

                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center text-center p-5 rounded-2xl transition-all duration-500 border ${
                      isActive
                        ? "bg-white border-[#3e8914] shadow-xl scale-105 ring-2 ring-[#3e8914]/20"
                        : isPassed
                        ? "bg-white/90 border-[#3e8914]/40 shadow-md"
                        : "bg-white/40 border-black/5 opacity-60"
                    }`}
                  >
                    {/* Icon Circle */}
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 relative transition-all duration-500 border-2 ${
                        isActive
                          ? "bg-[#3e8914] text-white border-[#3e8914] shadow-lg shadow-[#3e8914]/30 scale-110"
                          : isPassed
                          ? "bg-[#3e8914]/15 text-[#3e8914] border-[#3e8914]"
                          : "bg-gray-100 text-gray-400 border-gray-200"
                      }`}
                    >
                      {/* Step Number Badge / Checkmark */}
                      <div
                        className={`absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white transition-colors duration-300 ${
                          isPassed ? "bg-[#3e8914] text-white" : "bg-gray-300 text-gray-700"
                        }`}
                      >
                        {isPassed && !isActive ? <Check size={14} strokeWidth={3} /> : idx + 1}
                      </div>

                      <Icon className="w-9 h-9 transition-transform duration-300" strokeWidth={1.75} />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#3e8914] mb-1">
                      {step.badge}
                    </span>

                    <h3 className={`text-base font-bold mb-2 transition-colors ${isActive ? "text-[#3e8914]" : "text-ink"}`}>
                      {step.title}
                    </h3>
                    
                    <p className="text-xs text-ink/70 font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOBILE LAYOUT (Vertical Progress) */}
          <div className="block lg:hidden w-full relative my-2 px-2 max-h-[60vh] overflow-y-auto">
            <div className="relative pl-8 space-y-6">
              
              {/* Base Vertical Line */}
              <div className="absolute top-4 bottom-4 left-3 w-[4px] bg-black/10 rounded-full overflow-hidden">
                <motion.div
                  style={{ height: mobileLineHeight }}
                  className="w-full bg-gradient-to-b from-primary via-[#3e8914] to-emerald-400 rounded-full"
                />
              </div>

              {/* Mobile Arrow Head — stays on the vertical line */}
              <div className="absolute top-4 bottom-4 left-3 w-0 pointer-events-none" style={{ zIndex: 0 }}>
                <motion.div
                  style={{ top: mobileArrowTop }}
                  className="absolute left-1/2 -translate-x-1/2 -mt-3.5 w-6 h-6 rounded-full bg-[#3e8914] text-white flex items-center justify-center shadow-md border-2 border-white"
                >
                  <ArrowRight size={12} className="rotate-90" />
                </motion.div>
              </div>

              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isPassed = activeStep >= idx;
                const isActive = activeStep === idx;

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 border ${
                      isActive
                        ? "bg-white border-[#3e8914] shadow-md ring-2 ring-[#3e8914]/20"
                        : isPassed
                        ? "bg-white/80 border-[#3e8914]/30"
                        : "bg-white/40 border-black/5 opacity-60"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center relative border-2 ${
                        isActive
                          ? "bg-[#3e8914] text-white border-[#3e8914]"
                          : isPassed
                          ? "bg-[#3e8914]/15 text-[#3e8914] border-[#3e8914]"
                          : "bg-gray-100 text-gray-400 border-gray-200"
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className={`text-sm font-bold ${isActive ? "text-[#3e8914]" : "text-ink"}`}>
                          {step.title}
                        </h3>
                        <span className="text-[10px] font-bold text-[#3e8914] bg-[#3e8914]/10 px-2 py-0.5 rounded-full">
                          Step {idx + 1}
                        </span>
                      </div>
                      <p className="text-[11px] text-ink/70 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
