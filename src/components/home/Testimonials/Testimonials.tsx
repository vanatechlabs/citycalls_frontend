import React, { useState } from "react";
import { Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialCard = ({ item, expandedCardId, setExpandedCardId }: { item: any; expandedCardId: string | null; setExpandedCardId: (id: string | null) => void }) => {
  const isExpanded = expandedCardId === item.name;
  const setIsExpanded = (val: boolean) => {
    setExpandedCardId(val ? item.name : null);
  };
  const CHAR_LIMIT = 145;
  const quoteText = item.text || "";
  const isLong = quoteText.length > CHAR_LIMIT;

  return (
    <div
      className="relative flex flex-col w-[250px] md:w-[280px] flex-shrink-0 mx-3"
      style={{ paddingTop: '32px' }}
    >
      {/* ── Floating Logo Circle (overlaps top of card) ── */}
      <div
        className="absolute top-0 left-1/2 z-20 flex items-center justify-center"
        style={{ transform: 'translateX(-50%)' }}
      >
        <div
          className="w-16 h-16 rounded-full border-[3px] border-white flex items-center justify-center overflow-hidden bg-primary text-primary-foreground shadow-md"
          style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.15), 0 0 0 2px #e2e8f0" }}
        >
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-bold text-2xl">{item.name[0]}</span>
          )}
        </div>
      </div>

      {/* ── Card Body ── */}
      <div
        className="relative bg-card rounded-[22px] border border-border flex flex-col overflow-hidden group hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] transition-all duration-500"
        style={{
          boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
          height: '280px',
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
              className="absolute inset-0 bg-card z-[60] flex flex-col rounded-[22px]"
              style={{ boxShadow: "inset 0 0 0 2px #e2e8f0" }}
            >
              {/* Expanded Header */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0"
              >
                <div className="flex items-center gap-1.5">
                  <Quote className="w-4 h-4 text-primary transform -scale-x-100" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Full Review</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                  className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full transition-all duration-200 bg-primary/10 text-primary border border-primary/20"
                >
                  ✕ Close
                </button>
              </div>

              {/* Expanded Content */}
              <div className="flex-1 overflow-y-auto px-4 py-3">
                <p className="text-ink text-[11.5px] font-medium leading-relaxed">
                  {item.text}
                </p>
              </div>

              {/* Company info footer */}
              <div
                className="flex items-center gap-2.5 px-4 py-3 border-t border-border flex-shrink-0 bg-background"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    item.name[0]
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-[10px] leading-tight text-primary-dark">
                    {item.name}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Top: Company Info (below floating logo) ── */}
        <div className="pt-[52px] px-4 pb-0 text-center flex-shrink-0 min-h-[50px]">
          <div className="h-[16px] mb-0.5">
            <div className="font-bold text-[13px] leading-tight px-1 flex items-center justify-center text-primary-dark">
              <span className={item.name.length > 25 ? "truncate max-w-[190px]" : ""}>{item.name}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-1 text-amber-400 mt-2">
             {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
             ))}
          </div>
        </div>

        {/* ── Gradient Divider ── */}
        <div
          className="h-[1.5px] mx-4 mt-3 rounded-full flex-shrink-0 bg-gradient-to-r from-primary to-amber-400"
        />

        {/* ── Quote Section ── */}
        <div className="flex flex-col flex-1 px-4 pt-3 pb-3 relative min-h-0">
          <Quote className="w-5 h-5 text-primary transform -scale-x-100 opacity-70 mb-1.5 flex-shrink-0" />

          <div className="flex-1 overflow-hidden">
            <p className="text-ink text-[12px] font-medium leading-relaxed">
              {isLong
                ? `${quoteText.substring(0, CHAR_LIMIT).trim()}…`
                : quoteText
              }
            </p>
          </div>

          {/* ── "Read More" Button ── */}
          <div className="mt-auto pt-2 flex-shrink-0">
            {isLong && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
                className="flex items-center gap-0.5 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full transition-all duration-200 hover:gap-1 border border-primary/20 text-primary bg-primary/5 hover:bg-primary/10"
              >
                Read more
                <span style={{ fontSize: '8px' }}>→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export function Testimonials() {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const stories = [
    { name: "Anjali M.", rating: 5, text: "The AC service was so fast — booked at 10 AM, done by 12:30 PM. Technician was polite, wore shoe-covers, cleaned up after. My AC is cooling perfectly now just like it did when I first bought it. Highly recommend their prompt and professional service!", area: "Indirapuram" },
    { name: "Vikram S.", rating: 5, text: "Called for a fridge issue at 8 PM. They came next morning, gas refill done, saved me buying a new fridge. Prices are honest. The repairman even gave me some great maintenance tips to avoid ice buildup in the future. Will definitely use CityCalls again.", area: "Vaishali" },
    { name: "Priya R.", rating: 5, text: "Bridal makeup at home was flawless. HD products, trial included, the MUA gave 100%. Will 100% call for the next family wedding. She arrived exactly on time, was extremely patient with my requests, and made me feel so special on my big day.", area: "Kaushambi" },
    { name: "Rohit K.", rating: 4, text: "Deep cleaning of my 3BHK — team of 3, took 5 hours. My place looked new after. The kitchen chimney alone was worth the money. They brought all their own equipment and chemicals, and left literally no corner untouched. Extremely satisfied with the results.", area: "Raj Nagar" },
    { name: "Sneha D.", rating: 5, text: "Pest control team was so professional. Odourless chemicals, explained everything. Cockroach problem — gone in 48 hours. I appreciate that they were very careful around my pets and kids. It's been two months and I haven't seen a single bug since!", area: "Crossings Republik" },
  ];

  // duplicate stories to make marquee loop seamlessly
  const marqueeStories = [...stories, ...stories, ...stories, ...stories];

  return (
    <section className="pt-8 pb-8 bg-gradient-to-b from-background to-card relative overflow-hidden border-t border-border">
      <style>{`
        @keyframes marqueeScrollRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .marquee-wrapper-cards {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marqueeScrollRight 50s linear infinite;
        }
        .marquee-wrapper-cards:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-x mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary-dark" />
            <span className="uppercase tracking-[0.2em] text-primary-dark font-bold text-[11px]">
              What customers say
            </span>
            <div className="h-px w-8 bg-primary-dark" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-serif text-ink leading-tight font-bold">
            Loved by thousands of <span className="text-primary">happy families.</span>
          </h2>
        </div>

        {/* Marquee Section */}
        <div className="w-full overflow-hidden relative pt-2 pb-2">
           <div className="marquee-wrapper-cards gap-2">
             {marqueeStories.map((s, idx) => (
                <TestimonialCard 
                  key={idx} 
                  item={s} 
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
