import { Award, Heart, ShieldCheck, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  { icon: ShieldCheck, title: "Trust first", desc: "Every pro is verified before their first job — and re-verified every year." },
  { icon: Heart, title: "Customer-obsessed", desc: "We track every rating, every complaint, every callback. And we act." },
  { icon: Users, title: "Fair to our pros", desc: "We take a smaller cut than any competitor, so our pros earn more per job." },
  { icon: Award, title: "Quality without compromise", desc: "We'd rather turn down a job than send an untrained person to your home." },
];

export function AboutValues() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section ref={sectionRef} className="bg-muted/40 py-12">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="uppercase tracking-[0.2em] text-primary-dark font-bold text-xs">
              What we stand for
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif leading-[1.15]">Four values, non-negotiable.</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 32, scale: 0.94, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl hover:border-[#4D4D4D] transition-all duration-300"
            >
              <div className="absolute top-2 right-3 text-[56px] font-black text-[#94d052]/15 group-hover:text-[#94d052]/30 leading-none select-none transition-colors duration-300 pointer-events-none">
                0{idx + 1}
              </div>

              <div className="relative z-10 p-5 flex flex-col items-start text-left h-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.15 + 0.2, duration: 0.4, ease: "backOut" }}
                  className="w-12 h-12 flex items-center justify-center mb-3 bg-[#4D4D4D]/5 border-2 border-[#4D4D4D]/10 group-hover:bg-[#4D4D4D] group-hover:border-[#4D4D4D] transition-all duration-300 rounded-lg"
                >
                  <v.icon
                    className="w-6 h-6 text-[#4D4D4D] group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </motion.div>

                <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-1">
                  Value 0{idx + 1}
                </span>

                <h3 className="text-lg font-bold text-[#4D4D4D] group-hover:text-primary mb-2 uppercase tracking-wider transition-colors duration-300">
                  {v.title}
                </h3>

                <div className="w-6 h-0.5 bg-gray-200 group-hover:w-10 group-hover:bg-primary transition-all duration-500 mb-3" />

                <p className="text-slate-500 text-[13px] leading-relaxed flex-grow">
                  {v.desc}
                </p>
              </div>

              <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[36px] border-l-transparent border-b-[36px] border-b-[#4D4D4D]/10 group-hover:border-b-primary/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
