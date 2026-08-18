import { ShieldCheck, Clock, IndianRupee } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import refBg from "@/assets/banner/refbg.png";

interface HeroProps {
  service: any; // We'll type this properly later if needed
}

export function HeroSection({ service }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 3D Parallax transforms based on scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={containerRef} className="relative text-white overflow-hidden bg-ink" style={{ perspective: "1000px" }}>
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${service.slug === 'refrigerator-service' ? refBg : service.image})`,
          y: bgY
        }}
      />
      {/* Dark gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
      
      <div className="container-x relative py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* Left Side Content with 3D Parallax */}
        <motion.div 
          className="max-w-2xl transform-gpu"
          style={{ y, opacity, rotateX, scale, transformOrigin: "top center" }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[10px] font-bold tracking-widest text-[#88be1e] uppercase mb-3"
          >
            Professional & Reliable
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans leading-[1.15] mb-4"
          >
            {service.name} in <br/>
            <span className="text-[#88be1e]">Ghaziabad</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base text-white/90 max-w-xl font-medium mb-6"
          >
            {service.short || "Cooling issues, gas refill, ice buildup — sorted at your doorstep."}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-5 md:gap-8 text-xs font-semibold"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-[#88be1e]" />
              </div>
              <span>Expert<br/>Technicians</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Clock size={20} className="text-[#88be1e]" />
              </div>
              <span>Same Day<br/>Service</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <IndianRupee size={20} className="text-[#88be1e]" />
              </div>
              <span>Transparent<br/>Pricing</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-[#88be1e]" />
              </div>
              <span>30-Day<br/>Warranty</span>
            </div>
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
