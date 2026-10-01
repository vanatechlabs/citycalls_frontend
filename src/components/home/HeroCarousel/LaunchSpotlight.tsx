"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown, ChevronUp, Sparkles, X } from "lucide-react";
import { fetchCityCallsLaunchSpotlight, resolveWebsiteImageUrl } from "@/lib/api/cityCallsHome";

const cara5 = "/assets/Banner/cara8.png";
const h2 = "/assets/Banner/h2.png";

/* ============================================================================
   LAUNCH SPOTLIGHT — floating bottom-left card (mirrors the Call & WhatsApp
   floats on the right). Slides come from Admin → Pages → Launch Spotlight.

   Cinematic slide change: the new image wipes in from the right while coming
   into focus, the old one drifts left and blurs out, a light sweep crosses
   the card and the title rises in word by word. Story-style progress bars
   show the time left; hovering the card pauses it.
============================================================================ */

interface SpotlightTheme {
  accent: string;      // solid hex used for tags/text/progress
  accentSoft: string;  // rgba used for glow
  accentMid: string;   // rgba used for glow (mid stop)
}

interface SpotlightItem {
  id: string;
  image: string;
  altText: string;
  badgeText: string;
  serviceName: string; // Overlay title on image
  category: string;    // Small line above the title
  link: string;        // Service page route / url
  theme: SpotlightTheme;
  // Admin overlay darkness 0–100 %; null/undefined = default gradient.
  overlayOpacity?: number | null;
}

// Default card overlay is from-black/95 via-black/40 to-black/30; an admin
// setting scales it so its darkest (bottom) edge is `opacity` %.
function overlayGradient(opacity: number) {
  const alpha = (value: number) => ((opacity * value) / 95 / 100).toFixed(3);
  return `linear-gradient(to top, rgba(0,0,0,${alpha(95)}), rgba(0,0,0,${alpha(40)}), rgba(0,0,0,${alpha(30)}))`;
}

// Thin outline around the card.
const CARD_SHADOW = "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset";

const fallbackSpotlightItems: SpotlightItem[] = [
  {
    id: "help-now",
    image: h2,
    altText: "HelpNow home services professional",
    badgeText: "NEW LAUNCH",
    serviceName: "HelpNow",
    category: "Service Under 60 Mins",
    link: "https://helpnow.citycalls.in/",
    theme: {
      accent: "#f5a623", // mustard
      accentSoft: "rgba(245, 166, 35, 0.8)",
      accentMid: "rgba(245, 166, 35, 0.35)",
    },
  },
  {
    id: "beauty-salon",
    image: cara5,
    altText: "Beauty and salon service at home",
    badgeText: "NEW LAUNCH",
    serviceName: "Beauty & Salon",
    category: "Luxury Salon at Home",
    link: "https://salon.citycalls.in/",
    theme: {
      accent: "#d4af37", // gold
      accentSoft: "rgba(212, 175, 55, 0.85)",
      accentMid: "rgba(212, 175, 55, 0.35)",
    },
  },
];

const SPOTLIGHT_INTERVAL = 5000;
const EASE = [0.22, 1, 0.36, 1] as const;

function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(value)) return `rgba(124, 179, 66, ${alpha})`;
  const number = Number.parseInt(value, 16);
  const red = (number >> 16) & 255;
  const green = (number >> 8) & 255;
  const blue = number & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

// Title words rise out of a mask while coming into focus.
const titleVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};
const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0, filter: "blur(6px)" },
  visible: { y: "0%", opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};

export function LaunchSpotlight() {
  const reduceMotion = useReducedMotion();
  // Empty until the API answers, so a slide switched off in admin never
  // flashes up; the bundled cards are only used if the API can't be reached.
  const [spotlightItems, setSpotlightItems] = useState<SpotlightItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  // Hovering the card pauses the slideshow (and its progress bar).
  const [isPaused, setIsPaused] = useState(false);

  const item = spotlightItems[idx] ?? spotlightItems[0];
  const theme = item?.theme ?? fallbackSpotlightItems[0].theme;
  // Parts left empty in admin are not drawn (no icon-only badge or lone arrow).
  const showBadge = !!item?.badgeText;
  const hasMany = spotlightItems.length > 1;

  useEffect(() => {
    const controller = new AbortController();

    fetchCityCallsLaunchSpotlight(controller.signal)
      .then((slides) => {
        setSpotlightItems(slides.map((slide) => ({
          id: slide.id,
          image: resolveWebsiteImageUrl(slide.image),
          altText: slide.altText,
          badgeText: slide.badgeText,
          serviceName: slide.heading,
          category: slide.subheading,
          link: slide.link,
          overlayOpacity: slide.overlayOpacity,
          theme: {
            accent: slide.accentColor,
            accentSoft: hexToRgba(slide.accentColor, 0.82),
            accentMid: hexToRgba(slide.accentColor, 0.35),
          },
        })));
        setIdx(0);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        // Show the bundled cards when the CMS API is unavailable.
        setSpotlightItems(fallbackSpotlightItems);
      });

    return () => controller.abort();
  }, []);

  if (isClosed || !item) return null;

  const goNext = () => setIdx((current) => (current + 1) % spotlightItems.length);

  const handleCardClick = () => {
    // A slide saved without a link isn't clickable.
    if (!item.link) return;
    if (/^https?:\/\//i.test(item.link)) {
      window.open(item.link, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = item.link;
    }
  };

  const themeVars = { "--spot-interval": `${SPOTLIGHT_INTERVAL}ms` } as CSSProperties;

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[90] select-none"
      style={themeVars}
    >
      <style>{`
        @keyframes spot-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes spot-shine { 0%, 60% { transform: translateX(-160%) skewX(-20deg); } 100% { transform: translateX(260%) skewX(-20deg); } }
        .spot-progress-fill { transform-origin: left; animation: spot-progress var(--spot-interval) linear forwards; }
        .spot-paused .spot-progress-fill { animation-play-state: paused; }
        .spot-badge-shine { animation: spot-shine 3.4s ease-in-out infinite; }
        /* Bell-like shake on the text tags: still most of the time, then a quick wiggle */
        @keyframes spot-shake {
          0%, 76%, 100% { transform: rotate(0deg) translateX(0); }
          79% { transform: rotate(-8deg) translateX(-1px); }
          82% { transform: rotate(7deg) translateX(1px); }
          85% { transform: rotate(-6deg); }
          88% { transform: rotate(4deg); }
          91% { transform: rotate(-2deg); }
          94% { transform: rotate(1deg); }
        }
        .spot-shake { animation: spot-shake 3.2s ease-in-out infinite; transform-origin: 50% 50%; }
        .spot-shake-late { animation-delay: 1.6s; }
        @media (prefers-reduced-motion: reduce) {
          .spot-badge-shine, .spot-shake { animation: none; }
        }
      `}</style>

      <AnimatePresence mode="wait" initial={false}>
        {isMinimized ? (
          /* Minimised: a glass pill that re-opens the card */
          <motion.button
            key="pill"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={() => setIsMinimized(false)}
            className="group relative flex items-center gap-2 rounded-full border bg-[#090f09]/80 px-3.5 py-2 text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-transform hover:scale-105"
            style={{ borderColor: hexToRgba(theme.accent, 0.55) }}
            aria-label="Expand New Launch Spotlight"
          >
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: theme.accent }} />
              <span className="relative inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: theme.accent }} />
            </span>
            <Sparkles size={13} style={{ color: theme.accent }} />
            <span className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: theme.accent }}>
              {item.serviceName || item.badgeText || "New Launch"}
            </span>
            <ChevronUp size={14} className="text-white/70 transition-colors group-hover:text-white" />
          </motion.button>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.35, ease: EASE }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={`relative w-[215px] sm:w-[275px] ${isPaused ? "spot-paused" : ""}`}
          >
            {/* Attention nudge — a small hop every few seconds (stops while hovered) */}
            <motion.div
              animate={reduceMotion || isPaused ? { y: 0 } : { y: [0, -8, 0, -3, 0] }}
              transition={reduceMotion || isPaused ? { duration: 0.2 } : { duration: 0.9, repeat: Infinity, repeatDelay: 5, ease: "easeOut" }}
              className="relative"
            >
            {/* Radar rings in the slide's accent colour, rippling out of the frame */}
            {!reduceMotion &&
              [0, 1].map((ring) => (
                <motion.span
                  key={ring}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl border-2"
                  style={{ borderColor: theme.accent }}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: [0.7, 0], scale: [1, 1.14] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: 1.6 + ring * 1.1, ease: "easeOut" }}
                />
              ))}

            {/* "Just launched" callout floating above the card */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -4, 0] }}
              transition={{
                opacity: { delay: 1.8, duration: 0.4 },
                y: reduceMotion ? { delay: 1.8, duration: 0.4 } : { delay: 1.8, duration: 1.6, repeat: Infinity, ease: "easeInOut" },
              }}
              className="pointer-events-none absolute -top-10 right-1 z-40"
            >
              <span
                className="spot-shake flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/50 px-2.5 py-1 text-[10px] font-bold text-black shadow-[0_8px_20px_-6px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.6)]"
                style={{ backgroundImage: `linear-gradient(135deg, ${theme.accent}, ${hexToRgba(theme.accent, 0.8)})` }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-black" />
                </span>
                {item.link ? "Just launched · Tap to explore" : "Just launched"}
              </span>
              {/* little pointer down to the card */}
              <span
                className="absolute -bottom-1 right-5 h-2 w-2 rotate-45 border-b border-r border-white/50"
                style={{ backgroundColor: hexToRgba(theme.accent, 0.85) }}
              />
            </motion.div>
            {/* Soft accent glow under the card */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl opacity-60 blur-2xl transition-colors duration-700"
              style={{ background: `radial-gradient(ellipse at 50% 70%, ${theme.accentMid}, transparent 70%)` }}
            />

            {showBadge && (
              <>
                {/* Corner ping */}
                <span className="absolute -right-1.5 -top-1.5 z-30 flex h-3.5 w-3.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: theme.accent }} />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[#070b07]" style={{ backgroundColor: theme.accent }} />
                </span>

                {/* "NEW LAUNCH" glass tag floating over the top edge */}
                <motion.div
                  key={`${item.id}-badge`}
                  initial={reduceMotion ? false : { opacity: 0, y: -6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.15, ease: EASE }}
                  className="absolute -top-3 left-3 z-40"
                >
                  <div
                    className="spot-shake spot-shake-late relative flex items-center gap-1.5 overflow-hidden rounded-full border border-white/40 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-black shadow-[0_6px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.6)] sm:text-[10px]"
                    style={{ backgroundImage: `linear-gradient(135deg, ${hexToRgba(theme.accent, 1)}, ${hexToRgba(theme.accent, 0.75)})` }}
                  >
                    <Sparkles size={11} className="fill-black" />
                    <span className="relative z-10">{item.badgeText}</span>
                    <span aria-hidden className="spot-badge-shine absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                  </div>
                </motion.div>
              </>
            )}

            {/* Glass frame — frosted border around the picture, like a mounted photo */}
            <div
              className="relative rounded-2xl border border-white/45 bg-gradient-to-br from-white/30 via-white/10 to-white/20 p-1.5 backdrop-blur-xl backdrop-saturate-150"
              style={{
                boxShadow: `${CARD_SHADOW}, inset 0 1px 0 rgba(255,255,255,0.6), 0 18px 40px -16px rgba(0,0,0,0.75)`,
              }}
            >
              <div
                onClick={handleCardClick}
                className={`group relative overflow-hidden rounded-xl bg-[#070b07] ring-1 ring-black/20 ${item.link ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className="relative h-[100px] w-full overflow-hidden bg-black sm:h-[120px]">
                  {/* Image wipe: new slide slides in from the right and comes into focus */}
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={item.id}
                      initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 0 100%)", filter: "blur(6px) brightness(1.35)", scale: 1.12 }}
                      animate={reduceMotion ? { opacity: 1, zIndex: 1 } : { clipPath: "inset(0 0 0 0%)", filter: "blur(0px) brightness(1)", scale: 1, zIndex: 1 }}
                      exit={reduceMotion ? { opacity: 0, zIndex: 0 } : { x: "-12%", filter: "blur(4px) brightness(0.7)", opacity: 0.4, zIndex: 0 }}
                      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                      className="absolute inset-0"
                    >
                      {/* slow camera push-in while the slide is on screen */}
                      <motion.img
                        src={item.image}
                        alt={item.altText}
                        initial={{ scale: 1 }}
                        animate={reduceMotion ? undefined : { scale: 1.1 }}
                        transition={{ duration: SPOTLIGHT_INTERVAL / 1000 + 1, ease: "linear" }}
                        className="h-full w-full object-cover"
                      />
                      {typeof item.overlayOpacity === "number" ? (
                        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: overlayGradient(item.overlayOpacity) }} />
                      ) : (
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30" />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Light sweep on every change */}
                  {!reduceMotion && (
                    <motion.div
                      key={`${item.id}-sweep`}
                      aria-hidden
                      initial={{ x: "-120%", opacity: 0 }}
                      animate={{ x: "220%", opacity: [0, 1, 0] }}
                      transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
                      className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    />
                  )}

                  {/* Glass controls */}
                  <div className="absolute right-2 top-2 z-20 flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMinimized(true);
                        setIsPaused(false);
                      }}
                      className="rounded-full border border-white/20 bg-black/40 p-1 text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md transition-colors hover:bg-black/70 hover:text-white"
                      title="Minimize"
                      aria-label="Minimize"
                    >
                      <ChevronDown size={12} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsClosed(true);
                      }}
                      className="rounded-full border border-white/20 bg-black/40 p-1 text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md transition-colors hover:bg-black/70 hover:text-white"
                      title="Close"
                      aria-label="Close"
                    >
                      <X size={12} />
                    </button>
                  </div>

                  {/* Title block over the image */}
                  <div className="absolute inset-x-2.5 bottom-3 z-20">
                    {item.category && (
                      <motion.span
                        key={`${item.id}-category`}
                        initial={reduceMotion ? false : { opacity: 0, letterSpacing: "0.35em" }}
                        animate={{ opacity: 0.85, letterSpacing: "0.12em" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                        className="mb-1 block text-[8px] font-semibold uppercase text-white sm:text-[9px]"
                      >
                        {item.category}
                      </motion.span>
                    )}
                    {item.serviceName && (
                      <motion.h3
                        key={`${item.id}-title`}
                        variants={titleVariants}
                        initial={reduceMotion ? false : "hidden"}
                        animate="visible"
                        className="flex flex-wrap items-center text-[14px] font-extrabold leading-none tracking-tight text-white drop-shadow-md sm:text-[16px]"
                      >
                        {item.serviceName.split(" ").map((word, i) => (
                          <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-0.5">
                            <motion.span variants={wordVariants} className="inline-block">
                              {word}
                            </motion.span>
                          </span>
                        ))}
                        {item.link && (
                          <span className="text-xs transition-transform duration-300 group-hover:translate-x-1" style={{ color: theme.accent }}>
                            &rarr;
                          </span>
                        )}
                      </motion.h3>
                    )}
                  </div>

                  {/* Story-style progress — the active bar fills, then the next slide comes */}
                  {hasMany && (
                    <div className="absolute inset-x-2.5 bottom-1.5 z-20 flex gap-1">
                      {spotlightItems.map((s, i) => (
                        <button
                          key={s.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIdx(i);
                          }}
                          className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25"
                          aria-label={`Slide ${i + 1}`}
                        >
                          {i < idx && <span className="block h-full w-full" style={{ backgroundColor: theme.accent }} />}
                          {i === idx && (
                            <span
                              key={`${s.id}-${idx}`}
                              className="spot-progress-fill block h-full w-full"
                              style={{ backgroundColor: theme.accent }}
                              onAnimationEnd={goNext}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default LaunchSpotlight;
