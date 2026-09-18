import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Star, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "@/context/BookingContext";

// Import images
import a1 from "../../../assets/Images/a1.webp";
import a2 from "../../../assets/Images/a2.webp";
import a3 from "../../../assets/Images/a3.webp";
import a4 from "../../../assets/Images/a4.webp";
import a5 from "../../../assets/Images/a5.webp";
import a6 from "../../../assets/Images/a6.webp";
import ac1 from "../../../assets/Images/ac1.png";
import ac2 from "../../../assets/Images/ac2.png";

const ITEMS_PER_VIEW = 4;
const AUTO_SLIDE_DELAY = 4500;

const servicePackages = [
  {
    id: 101,
    name: "Split AC Servicing",
    duration: "1 hr",
    price: 499,
    image: ac1,
    featured: true,
  },
  {
    id: 102,
    name: "Window AC Servicing",
    duration: "1 hr",
    price: 449,
    image: ac2,
    featured: true,
  },
  {
    id: 1,
    name: "Complete Pest Control",
    duration: "2-3 hrs",
    price: 1299,
    image: a1,
    featured: true,
  },
  {
    id: 2,
    name: "Geyser Service & Repair",
    duration: "45 mins",
    price: 299,
    image: a2,
    featured: true,
  },
  {
    id: 3,
    name: "Chimney Deep Cleaning",
    duration: "1.5 hrs",
    price: 899,
    image: a3,
    featured: false,
  },
  {
    id: 4,
    name: "Premium Sofa Cleaning",
    duration: "2 hrs",
    price: 899,
    image: a4,
    featured: true,
  },
  {
    id: 5,
    name: "RO Water Purifier Service",
    duration: "1 hr",
    price: 399,
    image: a5,
    featured: false,
  },
  {
    id: 6,
    name: "Full Home Deep Cleaning",
    duration: "5-6 hrs",
    price: 3499,
    image: a6,
    featured: true,
  }
];

export const PopularPackages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (servicePackages.length <= ITEMS_PER_VIEW) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_DELAY);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % servicePackages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + servicePackages.length) % servicePackages.length);
  };

  const visiblePackages = Array.from({ length: Math.min(ITEMS_PER_VIEW, servicePackages.length) }).map(
    (_, i) => servicePackages[(currentIndex + i) % servicePackages.length]
  );

  return (
    <section className="pt-6 md:pt-10 pb-12 bg-gray-50/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-primary" />
              <span className="uppercase tracking-[0.2em] text-primary font-bold text-[11px]">
                Top Choices
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-[32px] font-display text-slate-900 leading-tight font-extrabold whitespace-nowrap">
              EXPLORE OUR <span className="text-primary">POPULAR PACKAGES</span>
            </h2>
            <p className="text-gray-500 mt-4 text-[14px] leading-relaxed max-w-xl">
              Discover the most frequently booked home service packages by our customers in Ghaziabad. Enjoy transparent pricing and guaranteed professional service.
            </p>
          </div>
          
          <Link
            to="/services"
            className="group flex items-center gap-1.5 px-5 py-2.5 border-2 border-primary rounded-full text-primary text-[12px] font-bold uppercase tracking-wide hover:bg-primary hover:text-white transition-all w-fit shrink-0 shadow-sm"
          >
            Explore All Services
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel Grid */}
        <div className="relative">
          {servicePackages.length > ITEMS_PER_VIEW && (
            <>
              {/* NAV BUTTONS */}
              <button
                onClick={prevSlide}
                className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-2.5 hover:scale-110 transition border border-gray-100 hidden md:block text-gray-700 hover:text-primary"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-2.5 hover:scale-110 transition border border-gray-100 hidden md:block text-gray-700 hover:text-primary"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {visiblePackages.map((d, idx) => (
                <PackageCard key={`${d.id}-${currentIndex}-${idx}`} d={d} idx={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export function PackageCard({ d, idx }: { d: (typeof servicePackages)[number]; idx: number }) {
  const { data, addToCart, openDrawer } = useBooking();
  const cart = data.cart || [];
  const itemId = String(d.id);
  const isInCart = cart.some(item => item.id === itemId);

  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInCart) {
      addToCart({
        id: itemId,
        name: d.name,
        duration: d.duration,
        price: d.price,
        image: d.image
      });
    }
    openDrawer();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      className="h-full"
    >
      <div
        className="group flex flex-col bg-white rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-primary/30 transition-all duration-500 h-full border border-transparent cursor-pointer"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
        }}
        onClick={handleBook}
      >
        <div className="relative h-[150px] overflow-hidden shrink-0">
          {/* Image */}
          <img
            src={d.image}
            alt={d.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
          
          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {d.featured && (
              <span className="bg-white/95 backdrop-blur-sm text-primary text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Star className="w-2.5 h-2.5 fill-primary" /> Popular
              </span>
            )}
          </div>
          
          {/* Package Title overlaid on image */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white text-lg font-semibold tracking-wide drop-shadow-md group-hover:text-primary transition-colors duration-300">
              {d.name}
            </h3>
            <div className="flex items-center gap-1.5 text-white/90 text-[12px] mt-1.5 font-medium">
              <Clock className="w-3 h-3 text-primary" />
              {d.duration}
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-3 flex flex-col flex-grow">
          <div className="flex items-end justify-between mb-3 flex-grow">
            <div>
              <div className="text-[11px] text-gray-700 font-bold uppercase tracking-wider mb-0.5">
                Starting from
              </div>
              <div className="text-lg font-medium text-primary flex items-baseline gap-1">
                ₹{d.price.toLocaleString()}
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-normal">/service</span>
              </div>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shrink-0">
              <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
          
          <button
            onClick={handleBook}
            className={`w-full py-2 mt-auto text-center text-[12px] font-bold border-2 rounded-lg transition-colors duration-300 uppercase tracking-wide flex items-center justify-center gap-2 ${
              isInCart
                ? "border-green-500 bg-green-500 text-white"
                : "border-primary text-primary group-hover:bg-primary group-hover:text-white"
            }`}
          >
            {isInCart ? <><Check size={14} strokeWidth={3} /> Added</> : "Book Package"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default PopularPackages;
