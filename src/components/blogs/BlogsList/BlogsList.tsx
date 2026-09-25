"use client";

import Link from "next/link";
import { blogs } from "@/data/blogs";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, ArrowRight, BookOpen, Lightbulb, PenTool, CheckCircle } from "lucide-react";
import { useRef } from "react";

export function BlogsList() {
  const categories = ["All", ...new Set(blogs.map((b) => b.category))];
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <>
      <section ref={containerRef} className="relative text-white overflow-hidden bg-ink" style={{ perspective: "1000px" }}>
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop')`,
            y: bgY
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-transparent" />
        
        <div className="container-x relative py-12 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
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
              The journal
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans leading-[1.15] mb-4"
            >
              Guides, tips & stories <br/>
              <span className="text-[#88be1e]">from our pros.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base text-white/90 max-w-xl font-medium mb-8"
            >
              Discover expert advice, maintenance tips, and insightful stories directly from our verified technicians and home service professionals.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-5 md:gap-8 text-xs font-semibold"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Lightbulb size={20} className="text-[#88be1e]" />
                </div>
                <span>Expert<br/>Advice</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <CheckCircle size={20} className="text-[#88be1e]" />
                </div>
                <span>Verified<br/>Tips</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <PenTool size={20} className="text-[#88be1e]" />
                </div>
                <span>DIY<br/>Guides</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <BookOpen size={20} className="text-[#88be1e]" />
                </div>
                <span>Latest<br/>Stories</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className="bg-background">
        <div className="container-x py-14">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} className="rounded-full border border-border bg-card hover:border-primary/50 hover:bg-accent px-4 py-2 text-xs font-semibold transition-colors">
                {c}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {blogs.map((b, idx) => (
              <motion.article
                key={b.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-card border-2 border-border overflow-hidden hover:shadow-2xl hover:border-primary-dark transition-all duration-300 rounded-md flex flex-col h-full"
              >
                <Link href={`/blogs/${b.slug}`} className="flex flex-col h-full relative z-10">
                  
                  {/* Image Container */}
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={b.image}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-block px-3 py-1 bg-background/90 backdrop-blur-sm text-ink text-[10px] font-bold uppercase tracking-wide shadow-sm rounded-md">
                        {b.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 relative">
                    {/* Faint background number */}
                    <div className="absolute -top-4 right-2 text-5xl font-black text-muted-foreground/10 group-hover:text-primary/10 transition-colors duration-500 leading-none select-none pointer-events-none z-0">
                      {(idx + 1).toString().padStart(2, "0")}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-3 font-semibold uppercase tracking-wider relative z-10">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {b.date}
                      </span>
                    </div>

                    <h3 className="text-[15px] font-bold text-ink mb-2 leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2 relative z-10">
                      {b.title}
                    </h3>

                    <p className="text-muted-foreground text-[13px] leading-relaxed mb-5 line-clamp-3 flex-1 relative z-10">
                      {b.excerpt}
                    </p>

                    <div className="flex items-center text-[11px] font-bold text-primary group-hover:text-primary-dark transition-colors duration-300 uppercase tracking-widest mt-auto border-t border-border pt-4 relative z-10">
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
                
                {/* Bottom-right triangle */}
                <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[36px] border-l-transparent border-b-[36px] border-b-primary/30 group-hover:border-b-primary/60 transition-colors duration-300 z-0 pointer-events-none" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

