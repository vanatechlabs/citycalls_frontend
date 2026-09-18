import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles, X, ChevronUp, ChevronDown } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

import cara5 from "@/assets/Banner/cara8.png";
import h2 from "@/assets/Banner/h2.png";

/* ============================================================================
   LAUNCH SPOTLIGHT — Fixed Bottom-Left Floating Overlay Card
   - Fixed at bottom-left (mirroring Call & WhatsApp float at bottom-right)
   - 100% of text and tags overlaid directly on top of the image (No bottom text strip)
   - Slide 1: HelpNow (Mustard Theme) -> links to /help-now
   - Slide 2: Beauty & Salon (Royal Gold Theme) -> links to http://localhost:3000
   - Modern rounded corners (rounded-xl) with compact landscape aspect ratio
============================================================================ */

interface SpotlightTheme {
  accent: string;      // solid hex used for tags/text/progress
  accentSoft: string;  // rgba used for glow
  accentMid: string;   // rgba used for glow (mid stop)
}

interface SpotlightItem {
  id: string;
  image: string;
  serviceName: string; // Overlay title on image
  category: string;    // Category badge over image
  link: string;        // Service page route / url
  isExternal: boolean;
  theme: SpotlightTheme;
}

const spotlightItems: SpotlightItem[] = [
  {
    id: "help-now",
    image: h2,
    serviceName: "HelpNow",
    category: "Service Under 60 Mins",
    link: "https://helpnow.citycalls.in/",
    isExternal: false,
    theme: {
      accent: "#f5a623", // mustard
      accentSoft: "rgba(245, 166, 35, 0.8)",
      accentMid: "rgba(245, 166, 35, 0.35)",
    },
  },
  {
    id: "beauty-salon",
    image: cara5,
    serviceName: "Beauty & Salon",
    category: "Luxury Salon at Home",
    link: "https://salon.citycalls.in/",
    isExternal: true,
    theme: {
      accent: "#d4af37", // gold
      accentSoft: "rgba(212, 175, 55, 0.85)",
      accentMid: "rgba(212, 175, 55, 0.35)",
    },
  },
];

const SPOTLIGHT_INTERVAL = 4000;

export function LaunchSpotlight() {
  const { openDrawer } = useBooking();
  const [idx, setIdx] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const imgTrackRef = useRef<HTMLDivElement>(null);
  const ribbonShineRef = useRef<HTMLSpanElement>(null);
  const captionRef = useRef<HTMLHeadingElement>(null);
  const categoryRef = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<HTMLDivElement>(null);

  const item = spotlightItems[idx];
  const theme = item.theme;

  // Entrance animation: slides up from bottom-left
  useEffect(() => {
    if (!wrapRef.current) return;
    gsap.fromTo(
      wrapRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 1.2 }
    );
  }, []);

  // Ambient pulsating glow — recolors per active item's theme
  useEffect(() => {
    if (!glowRef.current) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(glowRef.current, {
      opacity: 0.85,
      boxShadow: `0 0 22px ${theme.accentMid}, 0 0 2px ${theme.accentSoft}`,
      duration: 1.8,
      ease: "sine.inOut",
    });
    return () => { tl.kill(); };
  }, [theme.accentMid, theme.accentSoft]);

  // Ribbon shine sweep loop
  useEffect(() => {
    if (!ribbonShineRef.current) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.2 });
    tl.fromTo(
      ribbonShineRef.current,
      { xPercent: -180 },
      { xPercent: 180, duration: 1.1, ease: "power2.inOut" }
    );
    return () => { tl.kill(); };
  }, []);

  // "NEW LAUNCH" tag wiggle animation
  useEffect(() => {
    if (!tagRef.current) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
    tl.to(tagRef.current, { rotate: -4, scale: 1.06, duration: 0.12, ease: "power1.out" })
      .to(tagRef.current, { rotate: 3, duration: 0.12, ease: "power1.inOut" })
      .to(tagRef.current, { rotate: -2, duration: 0.1, ease: "power1.inOut" })
      .to(tagRef.current, { rotate: 0, scale: 1, duration: 0.15, ease: "back.out(3)" });
    return () => { tl.kill(); };
  }, []);

  // Sparkle icon spin + pulse
  useEffect(() => {
    if (!sparkleRef.current) return;
    const spin = gsap.to(sparkleRef.current, {
      rotate: 360,
      duration: 3.2,
      repeat: -1,
      ease: "none",
    });
    const pulse = gsap.to(sparkleRef.current, {
      scale: 1.25,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => { spin.kill(); pulse.kill(); };
  }, []);

  // Auto-cycle items
  useEffect(() => {
    if (isClosed || isMinimized) return;
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % spotlightItems.length);
    }, SPOTLIGHT_INTERVAL);
    return () => clearInterval(t);
  }, [isClosed, isMinimized]);

  // Image & text change transition
  useEffect(() => {
    if (!imgTrackRef.current) return;
    gsap.fromTo(
      imgTrackRef.current,
      { opacity: 0.25, scale: 1.08 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
    );
    if (captionRef.current) {
      gsap.fromTo(
        captionRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", delay: 0.05 }
      );
    }
    if (categoryRef.current) {
      gsap.fromTo(
        categoryRef.current,
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [idx]);

  if (isClosed) return null;

  // Handle card click
  const handleCardClick = () => {
    if (item.isExternal) {
      window.open(item.link, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = item.link;
    }
  };

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[90] select-none"
    >
      {/* Minimized Pill View */}
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="relative flex items-center gap-2 bg-[#090f09]/95 text-white border px-3.5 py-2 rounded-full shadow-2xl transition-all cursor-pointer backdrop-blur-md group hover:scale-105"
          style={{ borderColor: `${theme.accent}90` }}
          aria-label="Expand New Launch Spotlight"
        >
          {/* Ping badge */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: theme.accent }}
            />
            <span
              className="relative inline-flex rounded-full h-3 w-3"
              style={{ backgroundColor: theme.accent }}
            />
          </span>

          <span
            className="h-2 w-2 rounded-full animate-pulse"
            style={{ backgroundColor: theme.accent }}
          />
          <span
            className="text-[11px] font-extrabold uppercase tracking-widest"
            style={{ color: theme.accent }}
          >
            {item.serviceName}
          </span>
          <ChevronUp size={14} className="text-white/70 group-hover:text-white transition-colors" />
        </button>
      ) : (
        /* Expanded Overlay Card (All content directly over image) */
        <div className="relative w-[210px] sm:w-[240px] md:w-[260px]">
          {/* Ambient Themed Border Glow */}
          <div
            ref={glowRef}
            className="absolute -inset-[1.5px] pointer-events-none opacity-40 rounded-lg transition-all duration-700"
            style={{
              background: `linear-gradient(135deg, ${theme.accentSoft}, rgba(255,255,255,0.2), ${theme.accentMid})`,
            }}
          />

          {/* Corner ping badge */}
          <span className="absolute -top-1.5 -right-1.5 z-30 flex h-3.5 w-3.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: theme.accent }}
            />
            <span
              className="relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-[#070b07]"
              style={{ backgroundColor: theme.accent }}
            />
          </span>

          {/* Top-left Protruding "NEW LAUNCH" Tag (Floating Above the Image) */}
          <div className="absolute -top-2.5 left-3 z-40">
            {/* Soft pulsing ring behind the tag */}
            <span
              className="absolute -inset-0.5 rounded-full animate-ping opacity-30 pointer-events-none"
              style={{ backgroundColor: theme.accent }}
            />
            <div
              ref={tagRef}
              className="relative overflow-hidden text-black text-[9px] sm:text-[10px] font-semibold px-2.5 py-0.5 uppercase tracking-wider flex items-center gap-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.4)] border border-white/30"
              style={{ backgroundColor: theme.accent, transformOrigin: "left center" }}
            >
              <div ref={sparkleRef} className="flex items-center justify-center">
                <Sparkles size={11} className="text-black fill-black" />
              </div>
              <span className="relative z-10">NEW LAUNCH</span>
              <span
                ref={ribbonShineRef}
                className="absolute inset-0 z-0"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.95) 50%, transparent 70%)",
                }}
              />
            </div>
          </div>

          {/* Main Card Shell — 100% Integrated Overlay Card */}
          <div
            ref={cardRef}
            onClick={handleCardClick}
            className="relative bg-[#070b07] border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.9)] overflow-hidden rounded-lg cursor-pointer group"
          >
            {/* Image Container with compact height */}
            <div className="relative h-[110px] sm:h-[120px] md:h-[128px] w-full overflow-hidden bg-black">
              <div ref={imgTrackRef} className="h-full w-full">
                <img
                  src={item.image}
                  alt={item.serviceName}
                  className="h-full w-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Multi-layered cinematic gradient overlays for high text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 pointer-events-none" />

              {/* Top Bar (Floating over image) - Minimize & Close Buttons */}
              <div className="absolute top-2 right-2 z-20 flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(true);
                  }}
                  className="p-1 bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full text-white/75 hover:text-white transition-colors cursor-pointer border border-white/15"
                  title="Minimize"
                >
                  <ChevronDown size={12} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsClosed(true);
                  }}
                  className="p-1 bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full text-white/75 hover:text-white transition-colors cursor-pointer border border-white/15"
                  title="Close"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Bottom Info Overlay (Directly on the Image) */}
              <div className="absolute bottom-2 left-2.5 right-2.5 z-20 flex items-end justify-between">
                {/* Service Name & Category */}
                <div className="flex flex-col gap-0.5">
                  <span
                    ref={categoryRef}
                    className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-white/80"
                  >
                    {item.category}
                  </span>
                  <h3
                    ref={captionRef}
                    className="text-white text-[13px] sm:text-[14px] font-extrabold tracking-tight leading-none drop-shadow-md flex items-center gap-1 group-hover:text-[var(--hover-color)] transition-colors"
                    style={{ "--hover-color": theme.accent } as React.CSSProperties}
                  >
                    {item.serviceName}
                    <span className="text-xs transition-transform duration-300 group-hover:translate-x-1" style={{ color: theme.accent }}>
                      &rarr;
                    </span>
                  </h3>
                </div>

                {/* Progress Indicators (Overlaid at bottom right) */}
                <div className="flex gap-1 items-center mb-0.5">
                  {spotlightItems.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIdx(i);
                      }}
                      className={`h-[3px] rounded-full transition-all duration-300 cursor-pointer ${
                        i === idx ? "w-4" : "w-1.5 bg-white/30 hover:bg-white/60"
                      }`}
                      style={i === idx ? { backgroundColor: theme.accent } : undefined}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LaunchSpotlight;
