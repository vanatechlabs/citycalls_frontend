"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Fan,
  Flame,
  Sparkles,
  Zap,
  Droplets,
  ShieldCheck,
  CheckCircle,
  Tag,
  Percent,
  ChevronLeft,
  ChevronRight,
  Gift,
  Wrench,
  Bug,
  Scissors,
  type LucideIcon,
} from "lucide-react";
import { fetchCityCallsOffers } from "@/lib/api/cityCallsHome";

// Keep in sync with the backend's OFFER_ICONS (offers/offer.model.ts).
const ICONS: Record<string, LucideIcon> = {
  Fan,
  Sparkles,
  Zap,
  Droplets,
  ShieldCheck,
  Gift,
  Wrench,
  Bug,
  Scissors,
  Tag,
};

const ITEMS_PER_VIEW = 4;
const AUTO_SLIDE_DELAY = 4000;

interface OfferCard {
  icon: string;
  title: string;
  desc?: string;
  couponCode?: string;
  // Title, icon and coupon text colour.
  accentColor: string;
  // Icon tile fill and the corner the card background fades into.
  tintColor: string;
}

// Bundled deals — shown until the admin panel's offers load, and kept if the
// API is unreachable or no offer is active.
const FALLBACK_OFFERS: OfferCard[] = [
  {
    icon: "Fan",
    title: "AC Servicing",
    desc: "Get 20% off on complete AC servicing and chemical washing.",
    couponCode: "COOL20",
    accentColor: "#0369a1",
    tintColor: "#e0f2fe",
  },
  {
    icon: "Sparkles",
    title: "Deep Cleaning",
    desc: "Book full home deep cleaning and get a complimentary sofa wash.",
    couponCode: "CLEAN15",
    accentColor: "#047857",
    tintColor: "#d1fae5",
  },
  {
    icon: "Zap",
    title: "Electrical Fixes",
    desc: "Flat ₹200 off on all electrical wiring and appliance installations.",
    couponCode: "ZAP200",
    accentColor: "#b45309",
    tintColor: "#fef3c7",
  },
  {
    icon: "Droplets",
    title: "Plumbing Services",
    desc: "10% discount on bathroom fittings and major pipe leak repairs.",
    couponCode: "PLUMB10",
    accentColor: "#4338ca",
    tintColor: "#e0e7ff",
  },
  {
    icon: "ShieldCheck",
    title: "Annual Maintenance",
    desc: "Save big! Get 15% off on our 1-year comprehensive AMC packages.",
    couponCode: "AMC15",
    accentColor: "#be123c",
    tintColor: "#ffe4e6",
  },
];

export function SpotlightCarousel() {
  const [offers, setOffers] = useState<OfferCard[]>(FALLBACK_OFFERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [alert, setAlert] = useState({ show: false, text: "" });

  useEffect(() => {
    const controller = new AbortController();

    fetchCityCallsOffers(controller.signal)
      .then((items) => {
        if (items.length === 0) return;
        setOffers(items.map((item) => ({
          icon: item.icon,
          title: item.title,
          desc: item.description,
          couponCode: item.couponCode,
          accentColor: item.accentColor,
          tintColor: item.tintColor,
        })));
        setCurrentIndex(0);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.warn("Using bundled offers because CMS offers could not be loaded.");
      });

    return () => controller.abort();
  }, []);

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setAlert({ show: true, text: `Coupon "${code}" copied successfully!` });
    setTimeout(() => setAlert({ show: false, text: "" }), 2000);
  };

  useEffect(() => {
    if (offers.length <= ITEMS_PER_VIEW) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, AUTO_SLIDE_DELAY);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [offers.length, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  // With 4 or fewer offers show each once instead of wrapping into repeats.
  const visibleOffers = Array.from({ length: Math.min(ITEMS_PER_VIEW, offers.length) }).map(
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
          {/* Ticket-style chip: light coupon with a rotating green/gold rim,
              a flame and a perforated divider */}
          <div className="mb-4 inline-block rounded-full p-[1.5px] offer-ticket-rim shadow-[0_12px_30px_-12px_rgba(62,137,20,0.6)]">
            <div className="relative flex items-center overflow-hidden rounded-full bg-gradient-to-r from-white via-[#f6faee] to-white py-1.5 pl-1.5 pr-4">
              <span aria-hidden className="offer-ticket-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

              {/* flame */}
              <span className="offer-ticket-flame relative grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 shadow-[0_0_14px_rgba(251,146,60,0.6)]">
                <Flame className="h-4 w-4 fill-white/30 text-white" />
              </span>

              {/* perforation */}
              <span aria-hidden className="mx-2.5 h-5 border-l-2 border-dashed border-primary/30" />

              <span className="offer-ticket-text relative whitespace-nowrap text-[11px] font-extrabold tracking-[0.22em] sm:text-xs">
                LIMITED TIME OFFERS
              </span>

            </div>
            <style>{`
              @property --offer-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
              @keyframes offer-ticket-spin { to { --offer-angle: 360deg; } }
              @keyframes offer-ticket-shine { 0%, 60% { transform: translateX(-150%) skewX(-20deg); } 100% { transform: translateX(500%) skewX(-20deg); } }
              @keyframes offer-ticket-text { to { background-position: 200% 0; } }
              @keyframes offer-ticket-flame { 0%, 100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.12) rotate(-6deg); } }
              .offer-ticket-rim {
                background: conic-gradient(from var(--offer-angle), #7cb342, #fcd34d, #e7f3d6 35%, #7cb342 55%, #fcd34d, #7cb342);
                animation: offer-ticket-spin 4s linear infinite;
              }
              .offer-ticket-shine { animation: offer-ticket-shine 3.6s ease-in-out infinite; }
              .offer-ticket-text {
                background: linear-gradient(90deg, #3e8914, #5d9e1f, #b7791f, #5d9e1f, #3e8914);
                background-size: 200% 100%;
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                animation: offer-ticket-text 4s linear infinite;
              }
              .offer-ticket-flame { animation: offer-ticket-flame 1.4s ease-in-out infinite; }
              @media (prefers-reduced-motion: reduce) {
                .offer-ticket-rim, .offer-ticket-shine, .offer-ticket-text, .offer-ticket-flame { animation: none; }
              }
            `}</style>
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
                    className="relative p-5 rounded-2xl shadow-xl border-2 border-gray-200"
                    style={{ backgroundImage: `linear-gradient(to bottom right, #f8fafc 50%, ${item.tintColor})` }}
                  >
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                      <Percent className="w-2.5 h-2.5" /> OFFER
                    </div>

                    <div className="mb-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow border" style={{ background: item.tintColor }}>
                        <Icon className="w-5 h-5" style={{ color: item.accentColor }} />
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold mb-1.5" style={{ color: item.accentColor }}>
                      {item.title}
                    </h3>

                    <p className="text-xs mb-3 leading-snug text-gray-700">
                      {item.desc}
                    </p>

                    {item.couponCode && (
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex-1 text-xs font-bold px-3 py-2 bg-white/70 rounded-lg border tracking-wider" style={{ color: item.accentColor }}>
                          {item.couponCode}
                        </div>
                        <button
                          onClick={() => copyCoupon(item.couponCode!)}
                          className="px-3 py-2 bg-white rounded-lg text-xs font-bold border hover:bg-gray-50 transition"
                          style={{ color: item.accentColor }}
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
