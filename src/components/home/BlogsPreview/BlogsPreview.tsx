"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { blogs } from "@/data/blogs";
import { useRef } from "react";

const lineVariants: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const wordVariants: any = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export function BlogsPreview() {
  const recentBlogs = blogs.slice(0, 4);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section ref={sectionRef} className="pt-10 pb-6 bg-gray-50 border-t border-border overflow-hidden">
      <div className="container-x mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-3"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
              className="h-px w-8 bg-primary-dark"
            />
            <span className="uppercase tracking-[0.3em] text-primary-dark font-bold text-[12px]">
              From the journal
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              style={{ transformOrigin: "left" }}
              className="h-px w-8 bg-primary-dark"
            />
          </motion.div>

          <motion.h2 
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-2xl md:text-3xl lg:text-[34px] font-extrabold text-slate-900 leading-tight font-display"
          >
            <span className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span variants={wordVariants} className="inline-block will-change-transform">
                Guides, tips and stories&nbsp;
              </motion.span>
            </span>
            <span className="relative inline-block text-primary whitespace-nowrap align-bottom mt-1 md:mt-0">
              <span className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span className="inline-block">
                  {["from", "our", "pros."].map((word, i) => (
                    <motion.span
                      key={i}
                      variants={wordVariants}
                      className="inline-block will-change-transform mr-[0.25em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
              </span>
              <motion.svg
                viewBox="0 0 220 20"
                className="absolute left-0 -bottom-1 w-full h-3 md:h-4"
                preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
              >
                <path
                  d="M2 12 Q 55 2, 110 11 T 218 10"
                  fill="none"
                  stroke="currentColor"
                  className="stroke-primary"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentBlogs.map((blog, idx) => (
            <motion.article
              key={blog.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-card border-2 border-border overflow-hidden hover:shadow-2xl hover:border-primary-dark transition-all duration-300 rounded-md flex flex-col h-full"
            >
              <Link href={`/blogs/${blog.slug}`} className="flex flex-col h-full relative z-10">
                
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="inline-block px-3 py-1 bg-background/90 backdrop-blur-sm text-ink text-[10px] font-bold uppercase tracking-wide shadow-sm rounded-md">
                      {blog.category}
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
                      {blog.date}
                    </span>
                  </div>

                  <h3 className="text-[15px] font-bold text-ink mb-2 leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2 relative z-10">
                    {blog.title}
                  </h3>

                  <p className="text-muted-foreground text-[13px] leading-relaxed mb-5 line-clamp-3 flex-1 relative z-10">
                    {blog.excerpt}
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <Link 
            href="/blogs" 
            className="inline-flex items-center justify-center gap-2.5 bg-primary-dark hover:bg-primary text-primary-foreground px-8 py-3 font-bold uppercase tracking-widest text-[11px] shadow-lg transition-all duration-300 group rounded-md"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
