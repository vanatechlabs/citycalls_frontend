"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";

export function AboutEndBanner() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-x max-w-4xl text-center mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-serif leading-[1.15] mb-6 text-ink">
            Experience the New Standard <br className="hidden sm:block" /> of Home Services
          </h2>
          <p className="text-muted-foreground text-[15px] md:text-base leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether it's a leaking tap, a broken AC, or a full home deep cleaning session, our verified experts are just a click away. Get quality service at honest prices today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-[#3e8914] hover:bg-[#327310] text-white px-8 py-4 rounded-full text-[15px] font-bold transition-all shadow-[0_4px_20px_rgba(62,137,20,0.2)] hover:shadow-[0_8px_25px_rgba(62,137,20,0.3)] hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              Book a Service
              <div className="bg-white/20 rounded-full p-1 ml-2">
                <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
            </Link>
            
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-ink border-2 border-gray-200 hover:border-gray-300 px-8 py-4 rounded-full text-[15px] font-bold transition-all w-full sm:w-auto justify-center"
            >
              <Phone className="w-4 h-4 text-[#3e8914]" strokeWidth={2.5} />
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
