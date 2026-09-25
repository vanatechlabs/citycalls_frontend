"use client";

import { motion, Variants } from "framer-motion";
import ContactHero from "@/components/contact/ContactHero/ContactHero";
import ContactForm from "@/components/contact/ContactForm/ContactForm";

const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const leftVariants: Variants = {
  initial: { opacity: 0, y: 60, scale: 0.98, filter: "blur(8px)" },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: "blur(0px)",
    transition: { 
      duration: 1.4, 
      ease: [0.22, 1, 0.36, 1] // Apple-like super smooth easing
    } 
  },
};

const rightVariants: Variants = {
  initial: { opacity: 0, y: 100, scale: 0.96, filter: "blur(12px)" },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: "blur(0px)",
    transition: { 
      duration: 1.6, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

export function ContactView() {
  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-background text-ink font-sans overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Main split section */}
      <div className="grid lg:grid-cols-2 min-h-[80vh]">
        <motion.div variants={leftVariants} className="h-full">
          <ContactHero />
        </motion.div>
        <motion.div variants={rightVariants} className="h-full">
          <ContactForm />
        </motion.div>
      </div>
    </motion.div>
  );
}


