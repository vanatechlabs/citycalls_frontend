import { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent, useTransform } from 'framer-motion';
import { CalendarCheck, UserCheck, Utensils, ThumbsUp, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: CalendarCheck,
    title: "Book a Service",
    description: "Select your preferred date & time, and instantly book our dish washing maid online.",
    badge: "Step 01"
  },
  {
    icon: UserCheck,
    title: "Maid Assigned",
    description: "A background-verified and hygiene-trained helper is dispatched to your doorstep.",
    badge: "Step 02"
  },
  {
    icon: Utensils,
    title: "Doorstep Cleaning",
    description: "Our maid washes, degreases, and dries all utensils, cutlery, and leaves the sink spotless.",
    badge: "Step 03"
  },
  {
    icon: ThumbsUp,
    title: "Sparkling & Relaxed",
    description: "Experience 100% sparkling clean dishes with our zero-stress doorstep satisfaction guarantee.",
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

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.25) setActiveStep(0);
    else if (latest < 0.50) setActiveStep(1);
    else if (latest < 0.75) setActiveStep(2);
    else setActiveStep(3);
  });

  const lineWidth = useTransform(smoothProgress, [0, 0.95], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="w-full bg-slate-50/60 py-16 md:py-20 border-t border-slate-200">
      <div className="container-x mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#f5a623] bg-[#fff6e8] px-3.5 py-1.5 rounded-full border border-[#f5a623]/30 inline-block mb-3">
            Easy & Hassle-Free
          </span>
          <h2 className="text-[26px] md:text-[34px] font-sans font-black uppercase tracking-tight text-slate-900 leading-tight">
            How It <span className="text-[#f5a623]">Works</span>
          </h2>
          <p className="text-slate-600 text-[13px] md:text-[14px] mt-2.5 font-medium leading-relaxed">
            Your dish washing service is just a few clicks away. We make hourly domestic help simple, transparent, and absolutely reliable.
          </p>
        </div>

        {/* Steps Grid with Progress Bar */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-slate-200 z-0">
            <motion.div 
              style={{ width: lineWidth }}
              className="h-full bg-[#f5a623]" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = activeStep === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`bg-white rounded-xl p-6 border transition-all duration-300 flex flex-col items-center text-center cursor-pointer ${
                    isCurrent 
                      ? "border-[#f5a623] shadow-lg ring-2 ring-[#f5a623]/20" 
                      : "border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{step.badge}</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${isCurrent ? "bg-[#fff6e8] text-[#b5730f]" : "text-slate-400"}`}>
                      0{idx + 1}
                    </span>
                  </div>

                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
                    isCurrent ? "bg-[#f5a623] text-white shadow-md shadow-[#f5a623]/30" : "bg-slate-100 text-slate-600"
                  }`}>
                    <Icon size={24} strokeWidth={2.2} />
                  </div>

                  <h3 className="text-[15px] font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[12px] text-slate-600 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
