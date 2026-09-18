import React, { useState } from "react";
import { Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

interface ReviewItem {
  name: string;
  service: string;
  rating: number;
  text: string;
  area?: string;
}

const reviewsData: ReviewItem[] = [
  {
    name: "Neha Verma",
    service: "Kitchen Cleaning",
    rating: 5,
    text: "The maid was extremely professional and thorough. My kitchen has never looked so clean. Did a fantastic job! She arrived on time, cleaned every inch of the countertop, grease stains, and sink area with complete care.",
    area: "Noida Sector 62",
  },
  {
    name: "Amit Sharma",
    service: "Window Cleaning",
    rating: 5,
    text: "Very professional service. Everything was as described and the maid answered all my questions perfectly. The window panes and sliding tracks are crystal clear and dust-free. Impressive work!",
    area: "Indirapuram",
  },
  {
    name: "Pooja Singh",
    service: "Window Cleaning",
    rating: 5,
    text: "The maid service was superb. My windows are shining bright. Strongly recommended to everyone! The transparent hourly booking and verified helpers gave our family total peace of mind.",
    area: "Vaishali",
  },
  {
    name: "Sunita Roy",
    service: "Dish Washing",
    rating: 5,
    text: "Booked dish washing after a big family party. The maid was polite, wore gloves, and cleaned stacks of oily utensils in just an hour. Everything was stacked neatly and sparkling!",
    area: "Crossing Republik",
  },
  {
    name: "Rajesh Malhotra",
    service: "Fan Cleaning",
    rating: 5,
    text: "Great experience with HelpNow! The maid safely cleaned 4 ceiling fans and the kitchen exhaust without letting a single speck of dust fall on the beds or sofa. Super clean work!",
    area: "Raj Nagar Ext.",
  },
  {
    name: "Kavita Nair",
    service: "Laundry & Folding",
    rating: 5,
    text: "Reliable and gentle laundry service. Clothes were washed, dried, neatly folded, and organized properly. Saved me so much weekend time and effort. Booking again next week!",
    area: "Vasundhara",
  },
];

const ReviewCard = ({
  item,
  expandedCardId,
  setExpandedCardId,
}: {
  item: ReviewItem;
  expandedCardId: string | null;
  setExpandedCardId: (id: string | null) => void;
}) => {
  const isExpanded = expandedCardId === item.name;
  const setIsExpanded = (val: boolean) => {
    setExpandedCardId(val ? item.name : null);
  };
  const CHAR_LIMIT = 115;
  const quoteText = item.text || "";
  const isLong = quoteText.length > CHAR_LIMIT;

  return (
    <div
      className="relative flex flex-col w-[260px] md:w-[285px] flex-shrink-0 mx-3.5"
      style={{ paddingTop: "32px", fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
    >
      {/* ── Floating Avatar Circle (overlaps top of card) ── */}
      <div
        className="absolute top-0 left-1/2 z-20 flex items-center justify-center"
        style={{ transform: "translateX(-50%)" }}
      >
        <div
          className="w-16 h-16 rounded-full border-[3px] border-white flex items-center justify-center shadow-md select-none"
          style={{
            background: "linear-gradient(135deg, #f5a623 0%, #d97706 100%)",
            boxShadow: "0 6px 20px rgba(245, 166, 35, 0.35), 0 0 0 2px rgba(245, 166, 35, 0.2)",
          }}
        >
          <span
            className="font-extrabold text-[20px] text-white tracking-wider"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {getInitials(item.name)}
          </span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div
        className="relative bg-white rounded-[22px] border flex flex-col overflow-hidden group transition-all duration-500"
        style={{
          borderColor: "rgba(245, 166, 35, 0.2)",
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(0, 0, 0, 0.04)",
          height: "285px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 16px 36px rgba(245, 166, 35, 0.16), 0 4px 12px rgba(0,0,0,0.06)";
          e.currentTarget.style.borderColor = "rgba(245, 166, 35, 0.45)";
          e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(0, 0, 0, 0.04)";
          e.currentTarget.style.borderColor = "rgba(245, 166, 35, 0.2)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* ── Expanded Full-Text Overlay ── */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 bg-white z-[60] flex flex-col rounded-[22px]"
              style={{ boxShadow: "inset 0 0 0 2px rgba(245, 166, 35, 0.35)" }}
            >
              {/* Expanded Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-amber-100 flex-shrink-0 bg-[#fffdfa]">
                <div className="flex items-center gap-1.5">
                  <Quote className="w-4 h-4 text-[#f5a623] transform -scale-x-100" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Full Review
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full transition-all duration-200 bg-[#f5a623]/15 text-[#d97706] hover:bg-[#f5a623]/25 border border-[#f5a623]/30 cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              {/* Expanded Content */}
              <div className="flex-1 overflow-y-auto px-4 py-3">
                <p className="text-slate-700 text-[12px] font-medium leading-relaxed">
                  {item.text}
                </p>
              </div>

              {/* Reviewer info footer */}
              <div className="flex items-center gap-2.5 px-4 py-3 border-t border-amber-100 flex-shrink-0 bg-[#fffdfa]">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-extrabold flex-shrink-0 text-white select-none text-[11px] tracking-wider"
                  style={{
                    background: "linear-gradient(135deg, #f5a623, #d97706)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {getInitials(item.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-[11px] leading-tight text-slate-900">
                    {item.name}
                  </div>
                  <div className="text-[9.5px] font-semibold text-[#d97706]">
                    {item.service}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Top: Reviewer Name & Service (below floating logo) ── */}
        <div className="pt-[46px] px-4 pb-0 text-center flex-shrink-0">
          <div className="font-bold text-[14px] leading-tight text-slate-900 tracking-tight">
            {item.name}
          </div>
          <div className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider mt-0.5">
            {item.service}
          </div>

          <div className="flex items-center justify-center gap-1 text-[#f5a623] mt-2">
            {Array.from({ length: item.rating }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#f5a623] text-[#f5a623]" />
            ))}
          </div>
        </div>

        {/* ── Gold Gradient Divider ── */}
        <div
          className="h-[1.5px] mx-5 mt-2.5 rounded-full flex-shrink-0"
          style={{
            background: "linear-gradient(90deg, #f5a623 0%, #fbbf24 50%, rgba(245, 166, 35, 0.2) 100%)",
          }}
        />

        {/* ── Quote Section ── */}
        <div className="flex flex-col flex-1 px-4 pt-2.5 pb-3 relative min-h-0">
          <Quote className="w-4 h-4 text-[#f5a623] transform -scale-x-100 opacity-80 mb-1 flex-shrink-0" />

          <div className="flex-1 overflow-hidden">
            <p className="text-slate-600 text-[11.5px] font-medium leading-relaxed">
              {isLong ? `${quoteText.substring(0, CHAR_LIMIT).trim()}…` : quoteText}
            </p>
          </div>

          {/* ── "Read More" Button ── */}
          <div className="mt-auto pt-1.5 flex-shrink-0">
            {isLong && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
                className="flex items-center gap-0.5 text-[8.5px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full transition-all duration-200 hover:gap-1 border border-[#f5a623]/30 text-[#d97706] bg-[#f5a623]/10 hover:bg-[#f5a623]/20 cursor-pointer"
              >
                Read more
                <span style={{ fontSize: "9px" }}>→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export function HNReviews() {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Duplicate reviews to make marquee loop seamlessly
  const marqueeReviews = [
    ...reviewsData,
    ...reviewsData,
    ...reviewsData,
  ];

  return (
    <section
      className="py-14 relative overflow-hidden"
      id="reviews"
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        background: "linear-gradient(180deg, #ffffff 0%, #fffdfa 50%, #ffffff 100%)",
        borderTop: "1px solid rgba(245, 166, 35, 0.12)",
      }}
    >
      <style>{`
        @keyframes hnMarqueeScrollRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .hn-marquee-wrapper-cards {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: hnMarqueeScrollRight 45s linear infinite;
        }
        .hn-marquee-wrapper-cards:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background Soft Glow Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(245, 166, 35, 0.07)" }}
        />
        <div
          className="absolute bottom-0 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(224, 149, 0, 0.05)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-9">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8" style={{ background: "#f5a623" }} />
            <span
              className="uppercase font-extrabold text-[11px]"
              style={{
                color: "#d97706",
                letterSpacing: "0.22em",
              }}
            >
              Happy Customers
            </span>
            <div className="h-px w-8" style={{ background: "#f5a623" }} />
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-[38px] font-extrabold text-slate-900 leading-tight tracking-tight"
          >
            Real Reviews from <span style={{ color: "#f5a623" }}>Happy Homes</span>
          </h2>

          <p className="text-slate-500 text-[14px] text-center max-w-xl mx-auto mt-2 font-medium">
            Hear from verified customers who experience hassle-free home cleanliness and trusted maid services every single day.
          </p>
        </div>

        {/* Marquee Cards Track */}
        <div className="w-full overflow-hidden relative pt-2 pb-4">
          <div className="hn-marquee-wrapper-cards">
            {marqueeReviews.map((item, idx) => (
              <ReviewCard
                key={`${item.name}-${idx}`}
                item={item}
                expandedCardId={expandedCardId}
                setExpandedCardId={setExpandedCardId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
