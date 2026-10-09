"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, IndianRupee, HeadphonesIcon, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";
import { aboutHeroDefaults, type AboutHeroData } from "@/lib/api/aboutPage";

// Icons for the key points, in order (Admin → About Page → About Hero).
const pointIcons = [ShieldCheck, Clock, IndianRupee, HeadphonesIcon, BadgeCheck, Star];

const TypewriterText = ({ text, className = "" }: { text: string; className?: string }) => (
  <span className={className}>
    {text.split("").map((char, index) => (
      <motion.span 
        key={index} 
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

// One heading line, with the highlighted word(s) in green.
const HeadingLine = ({ text, highlight }: { text: string; highlight: string }) => {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (at < 0) return <TypewriterText text={text} />;
  const after = text.slice(at + highlight.length);
  return (
    <>
      {at > 0 && <TypewriterText text={text.slice(0, at)} />}
      <TypewriterText text={highlight} className="text-[#3e8914]" />
      {after && <TypewriterText text={after} />}
    </>
  );
};

export function AboutHero({ content = aboutHeroDefaults }: { content?: AboutHeroData }) {
  return (
    <section className="relative bg-[#f8fbfa] pt-12 pb-16 overflow-visible font-sans">
      <div className="container-x relative z-10 max-w-7xl">
        


        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="max-w-xl">


            {/* Title */}
            <motion.h1 
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="text-4xl md:text-5xl lg:text-[56px] font-bold font-serif text-ink leading-[1.15] mb-6"
            >
              <HeadingLine text={content.headingLine1} highlight={content.highlight} />
              {content.headingLine2 && (
                <>
                  <br />
                  <HeadingLine text={content.headingLine2} highlight={content.highlight} />
                </>
              )}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-1 bg-[#3e8914] rounded-full mb-6"
            />

            {/* Description */}
            {content.description && <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-600 text-[15px] md:text-base leading-relaxed mb-8 pr-4"
            >
              {content.description}
            </motion.p>}

            {/* Features */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 gap-y-5 gap-x-4 mb-10"
            >
              {content.points.map((text, idx) => ({ icon: pointIcons[idx % pointIcons.length], text })).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <feature.icon className="w-5 h-5 text-[#3e8914]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[13px] font-bold text-ink leading-tight pr-2">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              {content.primaryButtonText && (
                <Link href={content.primaryButtonLink || "/"} className="inline-flex items-center gap-2 bg-[#3e8914] hover:bg-[#327310] text-white px-7 py-3.5 rounded-full text-sm font-bold transition-all shadow-[0_4px_20px_rgba(62,137,20,0.3)]">
                  {content.primaryButtonText}
                  <div className="bg-white rounded-full p-1">
                    <ArrowRight className="w-3.5 h-3.5 text-[#3e8914]" strokeWidth={3} />
                  </div>
                </Link>
              )}
              {content.secondaryButtonText && (
                <Link href={content.secondaryButtonLink || "/contact"} className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-ink border border-gray-200 px-7 py-3.5 rounded-full text-sm font-bold transition-all shadow-sm">
                  {content.secondaryButtonText}
                </Link>
              )}
            </motion.div>
          </div>

          {/* Right Image area */}
          <motion.img 
            initial={{ opacity: 0, x: 100, scale: 0.9 }} 
            whileInView={{ opacity: 1, x: 0, scale: 1 }} 
            viewport={{ once: false }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.2 }}
            src={content.image || aboutHeroDefaults.image}
            alt={content.imageAlt || "About CityCalls"}
            className="w-full max-w-lg mx-auto object-contain lg:ml-auto"
          />
        </div>
      </div>

    </section>
  );
}
