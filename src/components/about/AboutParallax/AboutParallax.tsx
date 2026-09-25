"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
const cara2 = "/assets/Banner/cara2.png";

export function AboutParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax layers
  const y1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section 
      ref={ref} 
      className="relative h-[200px] md:h-[300px] overflow-hidden w-full bg-black"
    >
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
      >
        <img
          src={cara2}
          alt="Professional Services"
          className="w-full h-full object-cover object-center brightness-[0.85] contrast-[1.05]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
    </section>
  );
}
