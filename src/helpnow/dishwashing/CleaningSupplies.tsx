import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

const supplies = [
  { name: "Vim Dish Gel", category: "Grease Removal", icon: "🍋" },
  { name: "Pril Lime Active", category: "Degreaser", icon: "✨" },
  { name: "Scotch-Brite", category: "Non-Scratch Pads", icon: "🧽" },
  { name: "Sanitised Gloves", category: "Hygiene Standard", icon: "🧤" },
  { name: "Microfiber Wipes", category: "Glass & Crockery", icon: "🪞" },
  { name: "Eco Dishwash", category: "Chemical-Free", icon: "🌿" },
  { name: "Heavy Kadhai Scrub", category: "Tough Stains", icon: "🍳" },
  { name: "Sink Sanitizer", category: "Drain Hygiene", icon: "💧" }
];

export function CleaningSupplies() {
  return (
    <div className="w-full overflow-hidden bg-white pt-8 pb-12 border-t border-slate-100">
      <div className="container-x mx-auto px-4 max-w-7xl mb-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#f5a623] bg-[#fff6e8] px-3 py-1 rounded-full border border-[#f5a623]/30 inline-block mb-3">
            Pure Hygiene & Care
          </span>
          <h2 className="text-[24px] md:text-[28px] font-sans font-black uppercase tracking-tight text-slate-900 leading-tight">
            Supplies & Standards{" "}
            <span className="text-[#f5a623] relative inline-block">
              We Trust
              <motion.svg
                className="absolute -bottom-1 left-0 w-full h-2.5"
                viewBox="0 0 150 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <motion.path
                  d="M0 8 L 150 8"
                  stroke="#f5a623"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </h2>
          <p className="text-slate-500 text-[12px] md:text-[13px] mt-2 font-medium">
            Trained helpers equipped with single-use kits, food-grade degreasers, and anti-scratch sponges.
          </p>
        </div>
      </div>

      {/* Marquee Row */}
      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
        <motion.div 
          className="flex gap-4 shrink-0 py-2"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {[...supplies, ...supplies, ...supplies].map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 border border-slate-200/90 rounded-xl px-5 py-3 flex items-center gap-3 shrink-0 hover:border-[#f5a623] hover:bg-[#fff6e8]/40 transition-all shadow-sm"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h4 className="text-[13px] font-bold text-slate-900 leading-tight">{item.name}</h4>
                <p className="text-[10px] font-semibold text-slate-500">{item.category}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
