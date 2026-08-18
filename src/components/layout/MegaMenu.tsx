import { Link } from "react-router-dom";
import {
  ArrowRight,
  Flame,
  Snowflake,
  Sparkles,
  Tv,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

interface ServiceItem {
  slug: string;
  name: string;
}

interface ServiceCategory {
  id: string;
  label: string;
  services: ServiceItem[];
}

interface MegaMenuProps {
  category: ServiceCategory;
  onNavigate: () => void;
}

function getServiceIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("refrigerator") || n.includes("fridge")) return Snowflake;
  if (n.includes("ac") || n.includes("air")) return Wind;
  if (n.includes("washing")) return Zap;
  if (n.includes("tv") || n.includes("television")) return Tv;
  if (n.includes("microwave") || n.includes("oven")) return Flame;
  if (n.includes("geyser")) return Flame;
  if (n.includes("chimney")) return Sparkles;
  return Wrench;
}

const panelVariants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as any },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.1 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as any },
  },
};

export function MegaMenu({ category, onNavigate }: MegaMenuProps) {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 4, transition: { duration: 0.12 } }}
      className="absolute left-0 top-full pt-3 z-50"
    >
      <div className="w-[270px] rounded-xl border border-black/[0.06] dark:border-white/10 bg-white dark:bg-[#121827] shadow-[0_18px_44px_-12px_rgba(0,0,0,0.24)] overflow-hidden">
        <motion.div variants={listVariants} initial="hidden" animate="visible" className="py-1.5">
          {category.services.map((s, i) => {
            const Icon = getServiceIcon(s.name);
            const isLast = i === category.services.length - 1;
            return (
              <motion.div key={s.slug} variants={rowVariants}>
                <Link
                  to={`/services/${s.slug}`}
                  onClick={onNavigate}
                  className={`group flex items-center gap-2.5 px-3.5 py-2 hover:bg-primary/[0.08] dark:hover:bg-primary/20 transition-colors duration-150 ${
                    !isLast ? "border-b border-black/[0.05] dark:border-white/5" : ""
                  }`}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-black/[0.04] dark:bg-white/10 text-slate-700 dark:text-slate-200 transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-[-6deg]">
                    <Icon size={12.5} strokeWidth={2} />
                  </span>
                  <span className="text-[13px] font-medium text-slate-800 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-150 whitespace-nowrap">
                    {s.name}
                  </span>
                  <ArrowRight
                    size={12}
                    className="ml-auto shrink-0 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.1 + category.services.length * 0.045 + 0.05, duration: 0.3 } }}
        >
          <Link
            to="/services"
            onClick={onNavigate}
            className="flex items-center justify-center gap-1.5 border-t border-black/[0.05] dark:border-white/10 bg-black/[0.02] dark:bg-white/5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors duration-150"
          >
            View all services
            <ArrowRight size={11} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}