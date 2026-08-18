import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Enhanced parallax layers with more dramatic movement
  const y1 = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-40%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-1, 1]);

  return (
    <section 
      ref={ref} 
      className="relative h-[250px] md:h-[350px] overflow-hidden bg-gray-900 mt-12 mb-12"
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/40 via-black/50 to-black/40" />

      {/* Main Parallax Image Layer with Enhanced Movement */}
      <motion.div 
        style={{ 
          y: y1, 
          scale, 
          opacity,
          rotate
        }}
        className="absolute inset-0 w-full h-[150%] -top-[25%]"
      >
        <motion.img
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2000&auto=format&fit=crop"
          alt="Appliance Repair"
          className="w-full h-full object-cover object-center brightness-105 contrast-110"
          style={{
            x: useTransform(scrollYProgress, [0, 1], ["-3%", "3%"])
          }}
        />
      </motion.div>

      {/* Secondary Parallax Layer for Depth */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 w-full h-[180%] -top-[40%] z-10 opacity-25"
      >
        <div className="w-full h-full bg-gradient-to-r from-[#3e8914]/30 via-transparent to-[#134698]/30" />
      </motion.div>

      {/* Floating Elements with Different Parallax Speeds */}
      <motion.div
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]),
          x: useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])
        }}
        className="absolute top-1/4 left-10 w-20 h-20 border border-white/10 rounded-full hidden lg:block z-30"
      />
      <motion.div
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]),
          x: useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])
        }}
        className="absolute bottom-1/4 right-12 w-16 h-16 border border-[#3e8914]/20 rounded-full hidden lg:block z-30"
      />
      <motion.div
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 360])
        }}
        className="absolute top-1/3 right-1/4 w-12 h-12 border border-white/5 rounded-full hidden lg:block z-30"
      />
      
      {/* Parallax Content (Original Text) */}
      <div className="absolute inset-0 z-40 flex items-center justify-center">
        <div className="text-center px-4 max-w-[1000px] mx-auto">
          <h2 className="text-2xl md:text-4xl font-sans font-black text-white uppercase tracking-tight leading-tight mb-3 drop-shadow-md md:whitespace-nowrap">
            Expert Repair at <span className="text-[#3e8914]">Your Doorstep</span>
          </h2>
          <p className="text-white/90 text-[14px] md:text-[18px] font-medium leading-relaxed drop-shadow-sm">
            Experience world-class appliance service. We bring your appliances back to life with 100% genuine parts, verified professionals, and guaranteed satisfaction.
          </p>
        </div>
      </div>
    </section>
  );
}
