import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, PhoneCall, ChevronDown } from "lucide-react";
import { allServices } from "@/data/services";
import { useRef, useState } from "react";
import { BookingModal } from "@/components/booking/BookingModal";

const headingWords = ["Everything", "your", "home", "needs", "—"];
const highlightWords = ["one", "tap", "away."];

const lineVariants = {
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

// --- Cool "rise + blur + shine sweep" card animation (no layout, no stretch) ---
const cardVariants: any = {
  hidden: { opacity: 0, y: 45, scale: 0.9, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: 0.5 + (i % 4) * 0.09,
      type: "spring",
      stiffness: 140,
      damping: 16,
      mass: 0.7,
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.94,
    filter: "blur(4px)",
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
};

// Diagonal light-sweep that plays once as each card enters
const shineVariants: any = {
  hidden: { x: "-130%", opacity: 0 },
  visible: (i: number) => ({
    x: "130%",
    opacity: [0, 1, 0],
    transition: {
      delay: 0.5 + (i % 4) * 0.09 + 0.25,
      duration: 0.75,
      ease: "easeInOut",
    },
  }),
};

const dividerVariants: any = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: { delay: 0.5 + (i % 4) * 0.09 + 0.4, duration: 0.4, ease: "easeOut" },
  }),
};

const CARDS_PER_ROW = 4;

export function ServicesGrid() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState("");
  const [visibleRows, setVisibleRows] = useState(1);

  const openModal = (slug: string) => {
    setActiveSlug(slug);
    setModalOpen(true);
  };

  const slugs = [
    "refrigerator-service",
    "ac-service",
    "washing-machine-services",
    "television-repair-services",
    "microwave-oven-services",
    "geyser-repair-services",
    "chimney-repair-services",
    "general-pest-control",
    "termite-control",
    "sofa-shampooing",
    "kitchen-cleaning",
    "beauty-salon-services",
  ];

  const totalRows = Math.ceil(slugs.length / CARDS_PER_ROW);
  const visibleSlugs = slugs.slice(0, visibleRows * CARDS_PER_ROW);
  const isFullyExpanded = visibleRows >= totalRows;

  const handleToggle = () => {
    setVisibleRows((prev) => (prev >= totalRows ? 1 : prev + 1));
  };

  return (
    <section ref={sectionRef} id="services" className="pt-8 pb-8 bg-gray-50 overflow-hidden">
      <div className="container-x mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
              className="h-px w-8 bg-primary-dark"
            />
            <span className="uppercase tracking-[0.3em] text-primary-dark font-bold text-[12px]">
              Our services
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              style={{ transformOrigin: "left" }}
              className="h-px w-8 bg-primary-dark"
            />
          </motion.div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-ink leading-tight relative inline-block">
            <span className="inline overflow-hidden">
              <motion.span
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline"
              >
                {headingWords.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
                    <motion.span variants={wordVariants} className="inline-block will-change-transform">
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </span>{" "}
            <span className="text-primary relative inline-block">
              <span className="inline overflow-hidden">
                <motion.span
                  variants={lineVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delayChildren: 0.35 }}
                  className="inline"
                >
                  {highlightWords.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
                      <motion.span variants={wordVariants} className="inline-block will-change-transform">
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </motion.span>
              </span>
              <motion.svg
                viewBox="0 0 200 16"
                preserveAspectRatio="none"
                className="absolute left-0 -bottom-2 w-full h-3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.75 }}
              >
                <path
                  d="M2 8 Q 50 14, 100 8 T 198 8"
                  fill="none"
                  stroke="currentColor"
                  className="stroke-primary"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </h2>

          {/* Paragraph + Show More/Less inline row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <p className="text-muted-foreground max-w-2xl">
              Handpicked, background-verified professionals across appliance repair, cleaning, pest
              control, beauty and more.
            </p>

            {totalRows > 1 && (
              <button
                onClick={handleToggle}
                className="group inline-flex items-center gap-2 border-2 border-border hover:border-primary-dark bg-card px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest text-ink hover:text-primary-dark transition-colors duration-300 shadow-sm hover:shadow-md shrink-0 w-fit"
              >
                {isFullyExpanded ? "Show Less" : "Show More"}
                <motion.span
                  animate={{ rotate: isFullyExpanded ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>
            )}
          </motion.div>
        </div>

        {/*
          Grid — NO `layout` prop. New rows only ever get appended below the
          existing ones, so already-visible cards never reposition. That's
          what keeps this glitch/stretch-free.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleSlugs.map((slug, idx) => {
              const service = allServices.find((s) => s.slug === slug);
              if (!service) return null;
              return (
                <motion.div
                  key={service.slug}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  exit="exit"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative bg-card border-2 border-border overflow-hidden rounded-md hover:shadow-2xl hover:border-primary-dark transition-shadow duration-300 flex flex-col"
                >
                  <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-500 absolute top-0 left-0 z-20" />

                  {/* Shine sweep on entrance */}
                  <motion.div
                    custom={idx}
                    variants={shineVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="pointer-events-none absolute inset-0 z-30 w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  />

                  <Link to={`/services/${service.slug}`} className="block relative h-40 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-2.5 left-2.5 rounded-full bg-background/90 backdrop-blur px-2 py-0.5 text-[10px] font-bold text-ink shadow-sm tracking-wide">
                      {service.price}
                    </div>
                  </Link>

                  <div
                    className="relative z-10 -mt-5 ml-4 cursor-pointer"
                    onClick={() => openModal(service.slug)}
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-card border-2 border-border rounded-md group-hover:bg-primary-dark group-hover:border-primary-dark transition-all duration-300 shadow-md">
                      <PhoneCall
                        className="w-4 h-4 text-primary-dark group-hover:text-card transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <div className="relative z-10 px-4 pt-2 pb-4 flex flex-col flex-1">
                    <div className="absolute -top-4 right-2 text-5xl font-black text-muted-foreground/10 group-hover:text-primary/20 transition-colors duration-500 leading-none select-none pointer-events-none">
                      {(idx + 1).toString().padStart(2, "0")}
                    </div>

                    <Link to={`/services/${service.slug}`} className="block">
                      <h3 className="text-[15px] font-bold text-ink group-hover:text-primary mb-1.5 uppercase tracking-wider transition-colors duration-300">
                        {service.name}
                      </h3>
                    </Link>

                    <motion.div
                      custom={idx}
                      variants={dividerVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      style={{ transformOrigin: "left" }}
                      className="w-8 h-0.5 bg-border group-hover:w-14 group-hover:bg-primary transition-all duration-500 mb-2.5"
                    />

                    <p className="text-muted-foreground text-[13px] leading-relaxed mb-4 flex-1 line-clamp-3">
                      {service.short}
                    </p>

                    <button
                      onClick={() => openModal(service.slug)}
                      className="inline-flex items-center gap-2 text-primary text-[11px] font-bold uppercase tracking-widest hover:text-primary-dark transition-colors duration-300 w-fit mt-auto cursor-pointer"
                    >
                      Book Service
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>

                  <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[36px] border-l-transparent border-b-[36px] border-b-primary/30 group-hover:border-b-primary/60 transition-colors duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-6 text-center"
        >
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2.5 bg-primary-dark hover:bg-primary text-primary-foreground px-8 py-3 font-bold uppercase tracking-widest text-[11px] shadow-lg transition-all duration-300 group rounded-md"
          >
            Explore All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
          <p className="mt-3 text-muted-foreground text-[10px] font-semibold uppercase tracking-widest">
            Your trusted home service partner
          </p>
        </motion.div>
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceSlug={activeSlug}
      />
    </section>
  );
}