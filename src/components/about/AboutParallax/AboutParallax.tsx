"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { aboutParallaxDefaults, type AboutParallaxData } from "@/lib/api/aboutPage";

// Admin → About Page → Parallax Image.
export function AboutParallax({ content = aboutParallaxDefaults }: { content?: AboutParallaxData }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax layers
  const y1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  if (content.status === "INACTIVE" || !content.image) return null;

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
          src={content.image}
          alt={content.imageAlt || "Professional Services"}
          className="w-full h-full object-cover object-center brightness-[0.85] contrast-[1.05]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
    </section>
  );
}
