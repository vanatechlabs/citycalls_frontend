"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Fan,
  Sparkles,
  Zap,
  Droplets,
  ShieldCheck,
  CheckCircle,
  Tag,
  Percent,
  ChevronLeft,
  ChevronRight,
  Gift
} from "lucide-react";

const ICONS: Record<string, any> = {
  Fan,
  Sparkles,
  Zap,
  Droplets,
  ShieldCheck,
  Gift,
};

const ITEMS_PER_VIEW = 4;
const AUTO_SLIDE_DELAY = 4000;

const MOCK_OFFERS = [
  {
    icon: "Fan",
    title: "AC Servicing",
    desc: "Get 20% off on complete AC servicing and chemical washing.",
    couponCode: "COOL20",
    gradient: "from-slate-50 from-50% to-sky-100",
    textColor: "text-sky-700",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-100",
  },
  {
    icon: "Sparkles",
    title: "Deep Cleaning",
    desc: "Book full home deep cleaning and get a complimentary sofa wash.",
    couponCode: "CLEAN15",
    gradient: "from-slate-50 from-50% to-emerald-100",
    textColor: "text-emerald-700",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    icon: "Zap",
    title: "Electrical Fixes",
    desc: "Flat ₹200 off on all electrical wiring and appliance installations.",
    couponCode: "ZAP200",
    gradient: "from-slate-50 from-50% to-amber-100",
    textColor: "text-amber-700",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
  },
  {
    icon: "Droplets",
    title: "Plumbing Services",
    desc: "10% discount on bathroom fittings and major pipe leak repairs.",
    couponCode: "PLUMB10",
    gradient: "from-slate-50 from-50% to-indigo-100",
    textColor: "text-indigo-700",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
  },
  {
    icon: "ShieldCheck",
    title: "Annual Maintenance",
    desc: "Save big! Get 15% off on our 1-year comprehensive AMC packages.",
    couponCode: "AMC15",
    gradient: "from-slate-50 from-50% to-rose-100",
    textColor: "text-rose-700",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-100",
  },
];

export function SpotlightCarousel() {
  const [offers] = useState(MOCK_OFFERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [alert, setAlert] = useState({ show: false, text: "" });

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setAlert({ show: true, text: `Coupon "${code}" copied successfully!` });
    setTimeout(() => setAlert({ show: false, text: "" }), 2000);
  };

  useEffect(() => {
    if (offers.length <= ITEMS_PER_VIEW) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_DELAY);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [offers, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const visibleOffers = Array.from({ length: ITEMS_PER_VIEW }).map(
    (_, i) => offers[(currentIndex + i) % offers.length]
  );

  return (
    <section className="relative pt-12 md:pt-16 pb-12 overflow-hidden bg-white">
      {/* COPY ALERT */}
      {alert.show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-24 right-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-[999]"
        >
          <CheckCircle size={20} />
          <span className="text-sm font-bold">{alert.text}</span>
        </motion.div>
      )}

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white border-2 border-primary/20 rounded-full mb-4 shadow">
            <Tag className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold tracking-widest text-primary">
              LIMITED TIME OFFERS
            </span>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold font-display">
            <span className="text-gray-900">Exclusive </span>
            <span className="text-primary">Deals</span>
          </h2>
        </div>

        {/* CAROUSEL */}
        <div className="relative">
          {offers.length > ITEMS_PER_VIEW && (
            <>
              {/* NAV BUTTONS */}
              <button
                onClick={prevSlide}
                className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 hover:scale-110 transition border border-gray-100"
              >
                <ChevronLeft className="text-gray-600 hover:text-primary" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 hover:scale-110 transition border border-gray-100"
              >
                <ChevronRight className="text-gray-600 hover:text-primary" />
              </button>
            </>
          )}

          {/* SLIDES */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {visibleOffers.map((item, i) => {
                const Icon = ICONS[item.icon] || Gift;

                return (
                  <div
                    key={i}
                    className={`relative p-5 rounded-2xl shadow-xl border-2 border-gray-200 bg-gradient-to-br ${item.gradient}`}
                  >
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                      <Percent className="w-2.5 h-2.5" /> OFFER
                    </div>

                    <div className="mb-3">
                      <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center shadow border`}>
                        <Icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                    </div>

                    <h3 className={`text-base font-extrabold mb-1.5 ${item.textColor}`}>
                      {item.title}
                    </h3>

                    <p className="text-xs mb-3 leading-snug text-gray-700">
                      {item.desc}
                    </p>

                    {item.couponCode && (
                      <div className="flex items-center gap-2 mt-3">
                        <div className={`flex-1 text-xs font-bold px-3 py-2 bg-white/70 rounded-lg border tracking-wider ${item.textColor}`}>
                          {item.couponCode}
                        </div>
                        <button
                          onClick={() => copyCoupon(item.couponCode)}
                          className={`px-3 py-2 bg-white rounded-lg text-xs font-bold border hover:bg-gray-50 transition ${item.textColor}`}
                        >
                          Copy →
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
