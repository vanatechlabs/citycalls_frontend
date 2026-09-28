"use client";

import { ShieldCheck, Clock, IndianRupee } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { PublicServicePage } from "@/lib/api/servicePages";

const refBg = "/assets/Banner/refbg.png";

interface HeroProps {
  service: { slug: string; name: string; image?: string; short?: string };
  content?: PublicServicePage;
}

function HighlightedTitle({ title, highlight }: { title: string; highlight: string }) {
  const index = highlight ? title.indexOf(highlight) : -1;
  if (index < 0) return <>{title}</>;
  return <>{title.slice(0, index)}<span className="text-[#88be1e]">{highlight}</span>{title.slice(index + highlight.length)}</>;
}

export function HeroSection({ service, content }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const features = content?.heroFeatures ?? [
    { title: "Expert", subtitle: "Technicians" },
    { title: "Same Day", subtitle: "Service" },
    { title: "Transparent", subtitle: "Pricing" },
    { title: "30-Day", subtitle: "Warranty" },
  ];
  const featureIcons = [ShieldCheck, Clock, IndianRupee, ShieldCheck];

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-ink text-white" style={{ perspective: "1000px" }}>
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${content?.heroImage || (service.slug === "refrigerator-service" ? refBg : service.image)})`, y: bgY }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />

      <div className="container-x relative flex flex-col items-center justify-between gap-10 py-12 md:py-16 lg:flex-row">
        <motion.div className="max-w-2xl transform-gpu" style={{ y, opacity, rotateX, scale, transformOrigin: "top center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#88be1e]"
          >
            {content?.heroEyebrow ?? "Professional & Reliable"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-4 whitespace-pre-line font-sans text-3xl font-bold leading-[1.15] md:text-4xl lg:text-5xl"
          >
            {content
              ? <HighlightedTitle title={content.heroTitle} highlight={content.heroHighlight} />
              : <>{service.name} in <br /><span className="text-[#88be1e]">Ghaziabad</span></>}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6 max-w-xl text-base font-medium text-white/90"
          >
            {content?.heroDescription || service.short || "Cooling issues, gas refill, ice buildup — sorted at your doorstep."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-5 text-xs font-semibold md:gap-8"
          >
            {features.slice(0, 4).map((feature, index) => {
              const Icon = featureIcons[index] ?? ShieldCheck;
              return (
                <div key={`${feature.title}-${index}`} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Icon size={20} className="text-[#88be1e]" />
                  </div>
                  <span>{feature.title}<br />{feature.subtitle}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
