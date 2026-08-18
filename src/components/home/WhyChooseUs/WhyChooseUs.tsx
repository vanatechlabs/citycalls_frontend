import { motion } from "framer-motion";
import { BadgeCheck, HandCoins, HomeIcon, ShieldCheck, Timer, Wrench } from "lucide-react";

const features = [
  { icon: BadgeCheck, title: "Verified technicians", description: "Background-checked, trained, rated." },
  { icon: HandCoins, title: "Transparent pricing", description: "Flat rates. No surprises at the end." },
  { icon: Timer, title: "On-time guarantee", description: "We arrive within your slot or refund." },
  { icon: HomeIcon, title: "Doorstep service", description: "Zero commute. Zero waiting rooms." },
  { icon: Wrench, title: "Genuine spare parts", description: "Only OEM-grade parts, ever." },
  { icon: ShieldCheck, title: "30-day warranty", description: "Every job covered post-service." },
];

export function WhyChooseUs() {
  return (
    <section className="py-8 bg-ink overflow-hidden border-t border-white/5">
      <div className="container-x mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="flex flex-col items-center justify-center mb-8 text-center"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} 
            className="flex items-center gap-3 mb-6"
          >
            <motion.div 
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.5 } } }} 
              style={{ transformOrigin: "right" }}
              className="h-px w-8 bg-primary" 
            />
            <span className="uppercase tracking-[0.3em] text-primary font-bold text-[12px]">
              Why choose us
            </span>
            <motion.div 
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.5 } } }} 
              style={{ transformOrigin: "left" }}
              className="h-px w-8 bg-primary" 
            />
          </motion.div>
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} 
            className="text-3xl md:text-4xl lg:text-[40px] font-serif text-white leading-tight font-bold"
          >
            Six reasons CityCalls is <br className="hidden md:block" />
            <span className="text-primary">Ghaziabad's default.</span>
          </motion.h2>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} 
            className="text-white/50 mt-6 max-w-2xl mx-auto text-[14px] leading-relaxed"
          >
            We don't just fix appliances — we build trust and long-lasting partnerships through transparency, quality, and exceptional doorstep service.
          </motion.p>
        </motion.div>

        {/* List Layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.6, type: "spring", bounce: 0.4 }}
              className="flex gap-5 group"
            >
              <div className="w-14 h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-sm">
                <feature.icon size={22} className="text-primary group-hover:text-white transition-colors" strokeWidth={1.75} />
              </div>
              <div className="pt-1">
                <h3 className="text-[15px] font-bold text-white mb-2 uppercase tracking-wide group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-[200px]">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
