"use client";

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fetchPageParallax, type PublicPageParallax } from '@/lib/api/pageParallax';

interface ParallaxBannerProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  image?: string;
}

// The props are the page's own banner. Admin → Background Section → Add
// Parallax Image can set a different image and text for this page — when it
// has, that replaces them.
export function ParallaxBanner(props: ParallaxBannerProps = {}) {
  const pathname = usePathname() ?? '';
  const [managed, setManaged] = useState<{ path: string; data: PublicPageParallax } | null>(null);

  useEffect(() => {
    if (!pathname) return;
    const controller = new AbortController();
    void fetchPageParallax(pathname, controller.signal).then((data) => {
      if (data) setManaged({ path: pathname, data });
    });
    return () => controller.abort();
  }, [pathname]);

  const entry = managed?.path === pathname ? managed.data : null;
  if (!entry) return <ParallaxBannerView {...props} />;
  return (
    <ParallaxBannerView
      eyebrow={entry.subheading ?? ''}
      title={entry.heading}
      highlight={entry.highlight ?? ''}
      description={entry.description ?? ''}
      image={entry.image || props.image}
      imageAlt={entry.imageAlt}
    />
  );
}

function ParallaxBannerView({
  eyebrow = "Appliance Repair",
  title = "Expert Repair at Your Doorstep",
  highlight = "Your Doorstep",
  description = "Experience world-class appliance service. We bring your appliances back to life with 100% genuine parts, verified professionals, and guaranteed satisfaction.",
  image = "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2000&auto=format&fit=crop",
  imageAlt,
}: ParallaxBannerProps & { imageAlt?: string }) {
  // Heading with the highlighted part in green (whole heading when there's no highlight).
  const at = highlight ? title.indexOf(highlight) : -1;
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
      className="relative h-[250px] md:h-[350px] overflow-hidden bg-gray-900 mt-12 mb-12 z-0"
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/50 to-black/40 pointer-events-none" />

      {/* Main Parallax Image Layer with Enhanced Movement */}
      <motion.div 
        style={{ 
          y: y1, 
          scale, 
          opacity,
          rotate
        }}
        className="absolute inset-0 w-full h-[150%] -top-[25%] z-0"
      >
        <motion.img loading="lazy" decoding="async"
          src={image}
          alt={imageAlt || eyebrow || title}
          className="w-full h-full object-cover object-center brightness-105 contrast-110"
          style={{
            x: useTransform(scrollYProgress, [0, 1], ["-3%", "3%"])
          }}
        />
      </motion.div>

      {/* Secondary Parallax Layer for Depth */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 w-full h-[180%] -top-[40%] z-[5] opacity-25 pointer-events-none"
      >
        <div className="w-full h-full bg-gradient-to-r from-[#3e8914]/30 via-transparent to-[#134698]/30" />
      </motion.div>

      {/* Floating Elements with Different Parallax Speeds */}
      <motion.div
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]),
          x: useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])
        }}
        className="absolute top-1/4 left-10 w-20 h-20 border border-white/10 rounded-full hidden lg:block z-10 pointer-events-none"
      />
      <motion.div
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]),
          x: useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])
        }}
        className="absolute bottom-1/4 right-12 w-16 h-16 border border-[#3e8914]/20 rounded-full hidden lg:block z-10 pointer-events-none"
      />
      <motion.div
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 360])
        }}
        className="absolute top-1/3 right-1/4 w-12 h-12 border border-white/5 rounded-full hidden lg:block z-10 pointer-events-none"
      />
      
      {/* Parallax Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="text-center px-4 max-w-[1000px] mx-auto pointer-events-auto">
          {eyebrow && <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#88be1e]">{eyebrow}</div>}
          <h2 className="text-2xl md:text-4xl font-sans font-black text-white uppercase tracking-tight leading-tight mb-3 drop-shadow-md md:whitespace-nowrap">
            {at < 0 ? title : <>{title.slice(0, at)}<span className="text-[#3e8914]">{highlight}</span>{title.slice(at + highlight.length)}</>}
          </h2>
          {description && (
            <p className="text-white/90 text-[14px] md:text-[18px] font-medium leading-relaxed drop-shadow-sm">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
