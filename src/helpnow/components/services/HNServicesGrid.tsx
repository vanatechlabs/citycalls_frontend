import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Utensils,
  ChefHat,
  Fan,
  AppWindow,
  Shirt,
  SprayCan,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Eye,
  Heart,
  Sparkles,
} from "lucide-react";
import { BookingModal } from "@/helpnow/components/booking/HNBookingModal";
import h1 from "@/assets/Images/h1.png";
import h2 from "@/assets/Images/h2.png";
import h3 from "@/assets/Images/h3.png";
import h4 from "@/assets/Images/h4.png";
import h5 from "@/assets/Images/h5.png";

const services = [
  {
    id: 1,
    slug: "kitchen-cleaning",
    icon: Utensils,
    name: "Dish Washing",
    short: "Sparkling clean utensils with thorough hygiene and grease removal.",
    price: "₹159/hr",
    image: h1,
    hoverImage: h2,
  },
  {
    id: 2,
    slug: "kitchen-cleaning",
    icon: ChefHat,
    name: "Kitchen Cleaning",
    short: "Deep clean of kitchen surfaces, counters, stovetops & sink area.",
    price: "₹199/hr",
    popular: true,
    image: h2,
    hoverImage: h3,
  },
  {
    id: 3,
    slug: "kitchen-cleaning",
    icon: Fan,
    name: "Fan Cleaning",
    short: "Remove fan dust, dirt & grime thoroughly from high ceilings.",
    price: "₹149/hr",
    image: h3,
    hoverImage: h4,
  },
  {
    id: 4,
    slug: "kitchen-cleaning",
    icon: AppWindow,
    name: "Window Cleaning",
    short: "Crystal clear window glass, mesh wiping & frame cleaning.",
    price: "₹179/hr",
    image: h4,
    hoverImage: h5,
  },
  {
    id: 5,
    slug: "kitchen-cleaning",
    icon: Shirt,
    name: "Laundry & Ironing",
    short: "Wash, dry & steam iron clothes to perfection for daily wear.",
    price: "₹199/hr",
    image: h5,
    hoverImage: h1,
  },
  {
    id: 6,
    slug: "kitchen-cleaning",
    icon: SprayCan,
    name: "Floor Mopping",
    short: "Gleaming & sanitized floors with premium fragrant floor cleaners.",
    price: "₹149/hr",
    image: h1,
    hoverImage: h2,
  },
];

const headingWords = ["Choose", "Your", "Cleaning", "Service"];
const highlightWords = ["—", "one", "tap", "away."];

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

export function HNServicesGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState("kitchen-cleaning");

  const sectionRef = useRef(null);

  // Triple services array for seamless infinite marquee loop
  const infiniteServices = [...services, ...services, ...services];

  // Infinite smooth scroll animation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const cardWidth = 320; // card width + gap
        const totalWidth = cardWidth * services.length;
        const newPosition = prev + 1;

        if (newPosition >= totalWidth) {
          return 0;
        }
        return newPosition;
      });
    }, 28);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrevious = () => {
    setScrollPosition((prev) => Math.max(0, prev - 320));
  };

  const handleNext = () => {
    setScrollPosition((prev) => prev + 320);
  };

  const handleOpenBooking = (slug: string) => {
    setSelectedSlug(slug);
    setModalOpen(true);
  };

  return (
    <>
      <section ref={sectionRef} id="services" className="pt-12 pb-14 bg-slate-50 overflow-hidden font-sans">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-2"
              >
                <div className="h-px w-8 bg-[#f5a623]" />
                <span className="uppercase tracking-[0.3em] text-[#b5730f] font-bold text-[12px]">
                  Our Popular Services
                </span>
                <div className="h-px w-8 bg-[#f5a623]" />
              </motion.div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-900 leading-tight relative inline-block">
                <span className="inline overflow-hidden">
                  <motion.span
                    variants={lineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="inline"
                  >
                    {headingWords.map((word, i) => (
                      <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
                        <motion.span variants={wordVariants} className="inline-block">
                          {word}
                        </motion.span>
                      </span>
                    ))}
                  </motion.span>
                </span>{" "}
                <span className="text-[#f5a623] relative inline-block">
                  <span className="inline overflow-hidden">
                    <motion.span
                      variants={lineVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delayChildren: 0.35 }}
                      className="inline"
                    >
                      {highlightWords.map((word, i) => (
                        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
                          <motion.span variants={wordVariants} className="inline-block">
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
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.75 }}
                  >
                    <path
                      d="M2 8 Q 50 14, 100 8 T 198 8"
                      fill="none"
                      stroke="#f5a623"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
              </h2>

              <p className="text-slate-500 text-[14px] leading-relaxed max-w-2xl mt-2 font-medium">
                Verified maids, transparent pricing, and flexible booking for every home cleaning need.
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrevious}
                className="p-2.5 rounded-full border-2 border-slate-200 hover:border-[#f5a623] hover:bg-[#fff6e8] text-slate-800 transition-colors shadow-sm cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full border-2 border-slate-200 hover:border-[#f5a623] hover:bg-[#fff6e8] text-slate-800 transition-colors shadow-sm cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-full border-2 border-slate-200 hover:border-[#f5a623] hover:bg-[#fff6e8] text-slate-800 transition-colors shadow-sm cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
            </div>
          </div>

          {/* Infinite Marquee Track */}
          <div className="relative overflow-hidden pt-2 pb-6">
            <div
              className="flex gap-6 transition-transform"
              style={{
                transform: `translateX(-${scrollPosition}px)`,
                willChange: "transform",
              }}
            >
              {infiniteServices.map((service, index) => (
                <div
                  key={`${service.id}-${index}`}
                  className="flex-shrink-0 w-[295px]"
                  onMouseEnter={() => setHoveredId(index)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div
                    className="bg-white rounded-xl overflow-hidden border border-slate-200/90 transition-all duration-300 group hover:shadow-xl hover:border-[#f5a623]"
                    style={{
                      boxShadow:
                        "rgba(60, 64, 67, 0.12) 0px 1px 3px 0px, rgba(60, 64, 67, 0.08) 0px 1px 2px 0px",
                    }}
                  >
                    {/* Image with Hover Change & Overlay */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 cursor-pointer">
                      {service.name === "Dish Washing" ? (
                        <Link to="/help-now/dish-washing" className="absolute inset-0 z-0">
                          {/* Default Image */}
                          <img
                            src={service.image}
                            alt={service.name}
                            className={`w-full h-full object-cover absolute inset-0 transition-all duration-700 ${
                              hoveredId === index ? "opacity-0 scale-110" : "opacity-100 scale-100"
                            }`}
                          />

                          {/* Hover Image */}
                          <img
                            src={service.hoverImage}
                            alt={`${service.name} preview`}
                            className={`w-full h-full object-cover absolute inset-0 transition-all duration-700 ${
                              hoveredId === index ? "opacity-100 scale-100" : "opacity-0 scale-110"
                            }`}
                          />
                        </Link>
                      ) : (
                        <>
                          {/* Default Image */}
                          <img
                            src={service.image}
                            alt={service.name}
                            className={`w-full h-full object-cover absolute inset-0 transition-all duration-700 ${
                              hoveredId === index ? "opacity-0 scale-110" : "opacity-100 scale-100"
                            }`}
                          />

                          {/* Hover Image */}
                          <img
                            src={service.hoverImage}
                            alt={`${service.name} preview`}
                            className={`w-full h-full object-cover absolute inset-0 transition-all duration-700 ${
                              hoveredId === index ? "opacity-100 scale-100" : "opacity-0 scale-110"
                            }`}
                          />
                        </>
                      )}

                      {/* Most Booked Badge */}
                      {service.popular && (
                        <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-[#f5a623] to-[#e07a1f] text-white px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm z-10 flex items-center gap-1 pointer-events-none">
                          <Sparkles size={10} /> Most Booked
                        </div>
                      )}

                      {/* Hover Overlay with Icons */}
                      <div
                        className={`absolute top-2.5 right-2.5 flex gap-1.5 transition-opacity duration-300 z-20 ${
                          hoveredId === index && !service.popular ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <button className="p-1.5 bg-white/95 rounded-full hover:bg-white text-slate-800 transition-colors shadow-md cursor-pointer">
                          <Heart size={13} className="hover:text-red-500" />
                        </button>
                        {service.name === "Dish Washing" ? (
                          <Link
                            to="/help-now/dish-washing"
                            className="p-1.5 bg-white/95 rounded-full hover:bg-[#f5a623] hover:text-white text-slate-800 transition-colors shadow-md cursor-pointer flex items-center justify-center"
                          >
                            <Eye size={13} />
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleOpenBooking(service.slug)}
                            className="p-1.5 bg-white/95 rounded-full hover:bg-[#f5a623] hover:text-white text-slate-800 transition-colors shadow-md cursor-pointer"
                          >
                            <Eye size={13} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 pt-3.5">
                      <div className="flex items-center justify-between mb-1">
                        {service.name === "Dish Washing" ? (
                          <Link to="/help-now/dish-washing" className="block">
                            <h3 className="text-[16px] font-bold text-slate-900 group-hover:text-[#b5730f] uppercase tracking-wider transition-colors duration-300">
                              {service.name}
                            </h3>
                          </Link>
                        ) : (
                          <h3 className="text-[16px] font-bold text-slate-900 group-hover:text-[#b5730f] uppercase tracking-wider transition-colors duration-300">
                            {service.name}
                          </h3>
                        )}
                      </div>

                      <p className="text-slate-500 text-[12.5px] leading-relaxed mb-3 line-clamp-2 min-h-[38px]">
                        {service.short}
                      </p>

                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-red-500 font-semibold uppercase tracking-wider">
                            Starting from
                          </span>
                          <span className="text-[14px] font-semibold text-emerald-600">
                            {service.price}
                          </span>
                        </div>

                        {service.name === "Dish Washing" ? (
                          <Link
                            to="/help-now/dish-washing"
                            className="inline-flex items-center gap-1.5 text-[#b5730f] text-[11px] font-bold uppercase tracking-widest hover:text-slate-900 transition-colors duration-300 cursor-pointer"
                          >
                            Book Service
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleOpenBooking(service.slug)}
                            className="inline-flex items-center gap-1.5 text-[#b5730f] text-[11px] font-bold uppercase tracking-widest hover:text-slate-900 transition-colors duration-300 cursor-pointer"
                          >
                            Book Service
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Drawer / Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceSlug={selectedSlug}
      />
    </>
  );
}

export const HNServicesSection = HNServicesGrid;
