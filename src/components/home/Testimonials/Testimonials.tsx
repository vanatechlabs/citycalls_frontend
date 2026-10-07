"use client";

import React, { useEffect, useState } from "react";
import { Star, Quote, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchCityCallsTestimonials,
  type PublicTestimonial,
  type PublicTestimonialsSection,
} from "@/lib/api/cityCallsHome";

// Shown until Admin → Pages Section → Testimonials loads (or if it can't).
const fallbackSection: PublicTestimonialsSection = {
  eyebrow: "What customers say",
  heading: "Loved by thousands of happy families.",
  highlight: "happy families.",
  minRating: 1,
};

const fallbackTestimonials: PublicTestimonial[] = [
  { _id: "f1", name: "Anjali M.", role: "AC Service customer", location: "Indirapuram", rating: 5, color: "#3e8914", sortOrder: 1, message: "The AC service was so fast — booked at 10 AM, done by 12:30 PM. Technician was polite, wore shoe-covers, cleaned up after. My AC is cooling perfectly now just like it did when I first bought it. Highly recommend their prompt and professional service!" },
  { _id: "f2", name: "Vikram S.", role: "Refrigerator Repair customer", location: "Vaishali", rating: 5, color: "#0284c7", sortOrder: 2, message: "Called for a fridge issue at 8 PM. They came next morning, gas refill done, saved me buying a new fridge. Prices are honest. The repairman even gave me some great maintenance tips to avoid ice buildup in the future. Will definitely use CityCalls again." },
  { _id: "f3", name: "Priya R.", role: "Bridal Makeup customer", location: "Kaushambi", rating: 5, color: "#be185d", sortOrder: 3, message: "Bridal makeup at home was flawless. HD products, trial included, the MUA gave 100%. Will 100% call for the next family wedding. She arrived exactly on time, was extremely patient with my requests, and made me feel so special on my big day." },
  { _id: "f4", name: "Rohit K.", role: "Home Deep Cleaning customer", location: "Raj Nagar", rating: 4, color: "#d97706", sortOrder: 4, message: "Deep cleaning of my 3BHK — team of 3, took 5 hours. My place looked new after. The kitchen chimney alone was worth the money. They brought all their own equipment and chemicals, and left literally no corner untouched. Extremely satisfied with the results." },
  { _id: "f5", name: "Sneha D.", role: "Pest Control customer", location: "Crossings Republik", rating: 5, color: "#7c3aed", sortOrder: 5, message: "Pest control team was so professional. Odourless chemicals, explained everything. Cockroach problem — gone in 48 hours. I appreciate that they were very careful around my pets and kids. It's been two months and I haven't seen a single bug since!" },
];

// No photos: first letter of the first and last word ("Anjali Mehra" → AM),
// skipping titles like Dr. / Mr.; a single word gives its first two letters.
function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  const clean = words.filter((w) => !["dr.", "dr", "mr.", "mr", "mrs.", "mrs", "ms.", "ms", "prof.", "prof"].includes(w.toLowerCase()));
  const target = clean.length >= 2 ? clean : words;
  return (target[0][0] + target[target.length - 1][0]).toUpperCase();
}

function InitialsBadge({ item, className, textClass }: { item: PublicTestimonial; className: string; textClass: string }) {
  return (
    <div className={`flex items-center justify-center rounded-full text-white ${className}`} style={{ backgroundColor: item.color || "#3e8914" }}>
      <span className={`font-bold ${textClass}`}>{getInitials(item.name)}</span>
    </div>
  );
}

const TestimonialCard = ({ item, expandedCardId, setExpandedCardId }: { item: PublicTestimonial; expandedCardId: string | null; setExpandedCardId: (id: string | null) => void }) => {
  const isExpanded = expandedCardId === item._id;
  const setIsExpanded = (val: boolean) => {
    setExpandedCardId(val ? item._id : null);
  };
  const CHAR_LIMIT = 145;
  const quoteText = item.message || "";
  const isLong = quoteText.length > CHAR_LIMIT;
  const subline = [item.role, item.location].filter(Boolean).join(" · ");

  return (
    <div
      className="relative flex flex-col w-[250px] md:w-[280px] flex-shrink-0 mx-3"
      style={{ paddingTop: '32px' }}
    >
      {/* ── Floating initials circle (overlaps top of card) ── */}
      <div
        className="absolute top-0 left-1/2 z-20 flex items-center justify-center"
        style={{ transform: 'translateX(-50%)' }}
      >
        <div
          className="w-16 h-16 rounded-full border-[3px] border-white overflow-hidden shadow-md"
          style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.15), 0 0 0 2px #e2e8f0" }}
        >
          <InitialsBadge item={item} className="h-full w-full" textClass="text-xl tracking-wide" />
        </div>
      </div>

      {/* ── Card Body ── */}
      <div
        className="relative bg-card rounded-[22px] border border-border flex flex-col overflow-hidden group hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] transition-all duration-500"
        style={{
          boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
          height: '296px',
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
                  {item.message}
                </p>
              </div>

              {/* Reviewer footer */}
              <div
                className="flex items-center gap-2.5 px-4 py-3 border-t border-border flex-shrink-0 bg-background"
              >
                <InitialsBadge item={item} className="w-8 h-8 flex-shrink-0" textClass="text-[11px]" />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-[10px] leading-tight text-primary-dark">
                    {item.name}
                  </div>
                  {subline && <div className="truncate text-[9px] text-muted-foreground">{subline}</div>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Top: reviewer info (below floating badge) ── */}
        <div className="pt-[44px] px-4 pb-0 text-center flex-shrink-0">
          <div className="font-bold text-[13px] leading-tight px-1 flex items-center justify-center text-primary-dark">
            <span className="truncate max-w-[220px]">{item.name}</span>
          </div>
          {item.location && (
            <div className="mt-1 flex items-center justify-center gap-1 text-[10.5px] font-medium text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0 text-primary" />
              <span className="truncate max-w-[200px]">{item.location}</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-1 text-amber-400 mt-1.5">
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

// Splits the heading so the admin-chosen highlight shows in green.
function HighlightedHeading({ heading, highlight }: { heading: string; highlight: string }) {
  const index = highlight ? heading.indexOf(highlight) : -1;
  if (index === -1) return <>{heading}</>;
  return (
    <>
      {heading.slice(0, index)}
      <span className="text-primary">{highlight}</span>
      {heading.slice(index + highlight.length)}
    </>
  );
}

export function Testimonials() {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [section, setSection] = useState<PublicTestimonialsSection>(fallbackSection);
  const [stories, setStories] = useState<PublicTestimonial[]>(fallbackTestimonials);

  useEffect(() => {
    const controller = new AbortController();
    fetchCityCallsTestimonials(controller.signal)
      .then((data) => {
        if (data?.section) setSection({ ...fallbackSection, ...data.section });
        if (Array.isArray(data?.testimonials)) setStories(data.testimonials);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.warn("Using bundled testimonials because the CMS testimonials could not be loaded.");
      });
    return () => controller.abort();
  }, []);

  // Nothing published in admin → hide the whole section.
  if (stories.length === 0) return null;

  // Repeat the cards so the marquee loops seamlessly (at least ~16 cards).
  // Even count: the loop slides by half the strip, so both halves must match.
  const copies = Math.max(4, Math.ceil(16 / stories.length / 2) * 2);
  const marqueeStories = Array.from({ length: copies }, () => stories).flat();

  return (
    <section id="testimonials" className="pt-8 pb-8 bg-gradient-to-b from-background to-card relative overflow-hidden border-t border-border">
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
          {section.eyebrow && (
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary-dark" />
              <span className="uppercase tracking-[0.2em] text-primary-dark font-bold text-[11px]">
                {section.eyebrow}
              </span>
              <div className="h-px w-8 bg-primary-dark" />
            </div>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-serif text-ink leading-tight font-bold">
            <HighlightedHeading heading={section.heading} highlight={section.highlight} />
          </h2>
        </div>

        {/* Marquee Section */}
        <div className="w-full overflow-hidden relative pt-2 pb-2">
           <div className="marquee-wrapper-cards gap-2">
             {marqueeStories.map((s, idx) => (
                <TestimonialCard
                  key={`${s._id}-${idx}`}
                  item={{ ...s, _id: `${s._id}-${idx}` }}
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
