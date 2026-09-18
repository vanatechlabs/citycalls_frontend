import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dishBg from "@/assets/banner/dish.png";

export function ParallaxBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section 
      ref={ref} 
      className="relative h-[260px] md:h-[340px] overflow-hidden bg-slate-950 my-10 z-0"
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/80 pointer-events-none" />

      {/* Main Parallax Image Layer */}
      <motion.div 
        style={{ 
          y: y1, 
          scale, 
          opacity
        }}
        className="absolute inset-0 w-full h-[150%] -top-[25%] z-0"
      >
        <motion.img
          src={dishBg}
          alt="Dish Washing by HelpNow"
          className="w-full h-full object-cover object-center brightness-105 contrast-105"
        />
      </motion.div>

      {/* Parallax Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="text-center px-4 max-w-[900px] mx-auto pointer-events-auto">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f5a623] bg-[#f5a623]/20 px-3.5 py-1 rounded-full border border-[#f5a623]/40 inline-block mb-3">
            Pure Hygiene Standard
          </span>
          <h2 className="text-2xl md:text-4xl font-sans font-black text-white uppercase tracking-tight leading-tight mb-3 drop-shadow-md">
            Spotless Clean Utensils at <span className="text-[#f5a623]">Your Doorstep</span>
          </h2>
          <p className="text-white/90 text-[13px] md:text-[16px] font-medium leading-relaxed drop-shadow-sm max-w-2xl mx-auto">
            Experience world-class kitchen hygiene. We bring background-verified, trained maids with sanitized supplies to leave your sink and utensils gleaming.
          </p>
        </div>
      </div>
    </section>
  );
}
