"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, type Variants } from "framer-motion";
import { ShieldCheck, Star, Timer, Users, type LucideIcon } from "lucide-react";
const s1 = "/assets/Services/s1.png";
const s2 = "/assets/Services/s2.png";
const s3 = "/assets/Services/s3.png";
const s4 = "/assets/Services/s4.png";

const countersData: { value: number; suffix: string; label: string; image: string; icon: LucideIcon }[] = [
  { value: 10000, suffix: "+", label: "Happy Customers", image: s1, icon: Users },
  { value: 100, suffix: "%", label: "Verified Professionals", image: s2, icon: ShieldCheck },
  { value: 60, suffix: " min", label: "Average Response Time", image: s3, icon: Timer },
  { value: 4.8, suffix: "★", label: "Average Rating", image: s4, icon: Star },
];

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function TrustStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });
  const [counts, setCounts] = useState(countersData.map(() => 0));

  useEffect(() => {
    if (isInView) {
      countersData.forEach((c, i) => {
        animate(0, c.value, {
          duration: 2.5,
          ease: "easeOut",
          onUpdate: (latest) => {
            setCounts((prev) => {
              const next = [...prev];
              next[i] = c.value % 1 !== 0 ? Number(latest.toFixed(1)) : Math.round(latest);
              return next;
            });
          },
        });
      });
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="py-8 bg-background overflow-hidden border-b border-border"
    >
      <div className="container-x mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5"
        >
          {countersData.map((c, i) => {
            const Icon = c.icon;
            const number = c.value % 1 !== 0 ? counts[i].toFixed(1) : counts[i].toLocaleString("en-IN");
            return (
              <motion.div
                key={c.label}
                variants={cardVariants}
                className="group relative h-40 overflow-hidden rounded-2xl shadow-[0_16px_36px_-18px_rgba(15,23,42,0.6)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-18px_rgba(15,23,42,0.75)] sm:h-44"
              >
                {/* Photo — seen through the glass */}
                <img
                  src={c.image}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-black/30 to-black/55" />

                {/* Whole card is one frosted glass pane; it clears a little on hover */}
                <div className="absolute inset-0 rounded-2xl border border-white/25 bg-gradient-to-br from-white/[0.22] via-white/[0.07] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(255,255,255,0.08),inset_0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-[1.5px] backdrop-saturate-150 transition-[backdrop-filter,border-color] duration-500 group-hover:border-white/40 group-hover:backdrop-blur-0" />
                {/* glossy top + corner glow */}
                <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/[0.16] to-transparent" />
                <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/30 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
                {/* light sweep on hover */}
                <span aria-hidden className="pointer-events-none absolute -inset-y-6 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[130%] group-hover:opacity-100" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/30 bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_6px_16px_-6px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors duration-500 group-hover:border-primary/60 group-hover:bg-primary/80">
                      <span aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
                      <Icon size={19} className={`relative ${c.icon === Star ? "fill-white" : ""}`} />
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(124,179,66,1)]" />
                  </div>

                  <div>
                    <div className="flex items-baseline gap-0.5 text-[30px] font-semibold leading-none tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)] sm:text-[36px]">
                      {number}
                      <span className="text-[18px] font-semibold text-primary sm:text-[22px]">{c.suffix}</span>
                    </div>
                    <div className="mt-2.5 flex items-center gap-2">
                      <span className="h-0.5 w-6 rounded-full bg-primary shadow-[0_0_8px_rgba(124,179,66,0.9)] transition-all duration-500 group-hover:w-10" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)] sm:text-[11px]">
                        {c.label}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
