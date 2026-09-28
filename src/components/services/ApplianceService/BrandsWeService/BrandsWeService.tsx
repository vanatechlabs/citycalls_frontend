"use client";

import { motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface BrandsWeServiceProps {
  // e.g. "Washing Machine Brands" + highlight "We Service".
  title: string;
  highlight?: string;
  brands: string[];
  icon: LucideIcon;
}

// Same brand grid as the AC page — also used for "Pests We Treat".
export function BrandsWeService({ title, highlight = "We Service", brands, icon: Icon }: BrandsWeServiceProps) {
  return (
    <section className="w-full overflow-hidden border-t border-black/5 bg-white pb-10 pt-6">
      <div className="container-x mb-8">
        <h2 className="text-center text-[22px] font-black uppercase leading-tight tracking-tight text-ink">
          {title} <span className="relative inline-block text-[#3e8914]">{highlight}
            <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-current" />
          </span>
        </h2>
      </div>

      <div className="relative mx-auto mt-10 max-w-5xl px-4">
        <div className="grid grid-cols-2 border-l border-t border-black/10 bg-white md:grid-cols-5">
          {brands.map((brand, index) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`relative flex min-h-28 items-center justify-center gap-2 border-b border-r border-black/10 p-5 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <Icon className="h-4 w-4 text-[#3e8914]" />
              <span className="text-center text-sm font-black uppercase tracking-wide text-slate-700">{brand}</span>
              {index < brands.length - 1 && index % 5 !== 4 && <PlusIcon className="absolute -bottom-3 -right-3 z-10 hidden h-6 w-6 bg-white text-gray-300 md:block" strokeWidth={1} />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
