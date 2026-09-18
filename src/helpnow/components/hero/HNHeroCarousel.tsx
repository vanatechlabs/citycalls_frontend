import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShieldCheck, Clock, Star, Zap, Sparkles, BookOpen } from "lucide-react";
import h1 from "@/assets/Banner/h1.png";
import h2 from "@/assets/Banner/h2.png";
import h3 from "@/assets/Banner/h3.png";

const slides = [
  {
    id: 1,
    image: h1,
    badge: "PREMIUM MAID SERVICES",
    title: ["Your Home,", "Our Priority."],
    description:
      "Transform your lifestyle with our expert, background-checked maids. Dedicated home care tailored for your daily comfort.",
  },
  {
    id: 2,
    image: h2,
    badge: "SAME-DAY HOURLY BOOKING",
    title: ["Book in Minutes,", "Relax for Hours."],
    description:
      "Flexible hourly booking — choose your preferred time slot, and we handle the rest with perfection.",
  },
  {
    id: 3,
    image: h3,
    badge: "100% SATISFACTION GUARANTEED",
    title: ["Expert Maids,", "Spotless Homes."],
    description:
      "Background-verified professionals arrive on time with complete supplies. Transparent pricing without hidden fees.",
  },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Verified Maids" },
  { icon: Clock, label: "Hourly Service" },
  { icon: Star, label: "Background Checked" },
  { icon: Zap, label: "Safe & Trusted" },
];

const INTERVAL = 6000;

export function HNHeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
      setKey((k) => k + 1);
    }, INTERVAL);
    return () => clearInterval(t);
  }, []);

  const handleSlideChange = (index: number) => {
    setCurrent(index);
    setKey((k) => k + 1);
  };

  const goNext = () => {
    setCurrent((p) => (p + 1) % slides.length);
    setKey((k) => k + 1);
  };

  const goPrev = () => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
    setKey((k) => k + 1);
  };

  const slide = slides[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&display=swap');

        .hn-hero {
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          min-height: 92vh;
          overflow: hidden;
          background: #080808;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 110px;
        }

        /* ccsaloon smooth zoom + blur fade background animation */
        .hn-hero-bg-container {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .hn-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: brightness(1);
          animation: hn-bg-zoom 6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes hn-bg-zoom {
          0% {
            opacity: 0;
            transform: scale(1) blur(6px);
          }
          15% {
            opacity: 1;
            filter: brightness(1) blur(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1.06);
            filter: brightness(1) blur(0px);
          }
        }

        /* Top dark gradient overlay for navbar logo & text contrast */
        .hn-hero-overlay-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 72px;
          background: linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.14) 70%, rgba(0,0,0,0) 100%);
          z-index: 2;
          pointer-events: none;
        }

        /* Content Container */
        .hn-hero-content {
          position: relative;
          z-index: 10;
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 60px 24px 70px;
          color: #0f172a;
        }

        .hn-hero-inner-max {
          max-width: 620px;
        }

        /* Staggered Rise Animations */
        .hn-anim-subtitle {
          animation: hn-rise-blur 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }
        .hn-anim-title {
          animation: hn-rise-blur 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
        }
        .hn-anim-desc {
          animation: hn-rise-blur 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
        }
        .hn-anim-btns {
          animation: hn-rise-blur 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both;
        }

        @keyframes hn-rise-blur {
          0% {
            opacity: 0;
            transform: translateY(35px);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }

        /* Subtitle Bar */
        .hn-subtitle-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .hn-gold-line {
          width: 36px;
          height: 2px;
          background: #e09500;
        }
        .hn-badge-text {
          font-size: 12px;
          font-weight: 800;
          color: #d97706;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* Title - Dark Text */
        .hn-hero-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
          color: #0f172a;
          text-shadow: none;
        }
        .hn-hero-title span {
          color: #d97706;
          display: block;
          text-shadow: none;
        }

        /* Description - Dark Text */
        .hn-hero-desc {
          font-size: clamp(15px, 1.6vw, 17px);
          color: #334155;
          line-height: 1.65;
          font-weight: 600;
          margin-bottom: 28px;
          max-width: 560px;
          text-shadow: none;
        }

        /* Buttons */
        .hn-hero-btns {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .hn-btn-cc-gold {
          position: relative;
          overflow: hidden;
          padding: 12px 28px;
          background: #f5a623;
          color: #000000;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10.5px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          border: 1px solid #f5a623;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          box-shadow: 0 4px 14px rgba(245, 166, 35, 0.4);
          transition: all 0.4s ease;
        }
        .hn-btn-cc-gold:hover {
          color: #ffffff;
          background: #0f172a;
          border-color: #0f172a;
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.3);
        }

        .hn-btn-cc-outline {
          position: relative;
          overflow: hidden;
          padding: 12px 28px;
          background: rgba(255, 255, 255, 0.85);
          color: #0f172a;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10.5px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          border: 1px solid #0f172a;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          backdrop-filter: blur(8px);
          transition: all 0.4s ease;
        }
        .hn-btn-cc-outline:hover {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
        }

        /* Slide Indicator (ccsaloon style) */
        .hn-indicators {
          position: absolute;
          bottom: 32px;
          right: 36px;
          z-index: 20;
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .hn-indicator-btn {
          width: 32px;
          height: 4px;
          background: rgba(0, 0, 0, 0.25);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 2px;
        }
        .hn-indicator-btn.active {
          width: 48px;
          background: #f5a623;
          box-shadow: 0 0 12px rgba(245, 166, 35, 0.6);
        }

        /* Bottom Marquee Strip */
        .hn-strip {
          background: #f5a623;
          padding: 12px 0;
          overflow: hidden;
          position: relative;
          z-index: 10;
          box-shadow: none;
        }
        .hn-strip-track {
          display: flex;
          width: max-content;
          animation: hn-marquee 24s linear infinite;
          align-items: center;
        }
        @keyframes hn-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hn-strip-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 28px;
          font-size: 11.5px;
          font-weight: 600;
          color: #000000;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          white-space: nowrap;
          text-shadow: none;
        }
        .hn-strip-icon {
          color: #ffffff;
          flex-shrink: 0;
          filter: drop-shadow(0 0 1px rgba(0,0,0,0.2));
        }
        .hn-strip-dot { color: #ffffff; font-size: 14px; text-shadow: none; }

        @media (max-width: 768px) {
          .hn-hero { min-height: 90vh; padding-top: 100px; }
          .hn-arrow { display: none; }
          .hn-hero-content { padding: 40px 20px 60px; }
          .hn-hero-title { font-size: 34px; }
        }

        /* ── Tailored Scaling for 15.6" Laptops & Larger Displays ── */
        @media (min-width: 1360px) {
          .hn-hero-inner-max {
            max-width: 680px;
          }
          .hn-badge-text {
            font-size: 13px;
          }
          .hn-gold-line {
            width: 42px;
          }
          .hn-hero-title {
            font-size: 62px;
            margin-bottom: 18px;
          }
          .hn-hero-desc {
            font-size: 18px;
            max-width: 600px;
            line-height: 1.68;
            margin-bottom: 30px;
          }
          .hn-btn-cc-gold,
          .hn-btn-cc-outline {
            font-size: 11.5px;
            padding: 13px 30px;
          }
        }

        @media (min-width: 1600px) {
          .hn-hero-inner-max {
            max-width: 720px;
          }
          .hn-badge-text {
            font-size: 13.5px;
          }
          .hn-hero-title {
            font-size: 68px;
          }
          .hn-hero-desc {
            font-size: 19px;
            max-width: 640px;
          }
          .hn-btn-cc-gold,
          .hn-btn-cc-outline {
            font-size: 12px;
            padding: 14px 32px;
          }
        }
      `}</style>

      <section className="hn-hero">
        {/* Background slide animation */}
        <div className="hn-hero-bg-container" key={`bg-${key}`}>
          <div
            className="hn-hero-bg"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        </div>

        {/* Top Navbar Dark Overlay for Logo & Text Visibility */}
        <div className="hn-hero-overlay-top" />

        {/* Hero Text Content */}
        <div className="hn-hero-content" key={`content-${key}`}>
          <div className="hn-hero-inner-max">
            {/* Subtitle */}
            <div className="hn-subtitle-wrap hn-anim-subtitle">
              <span className="hn-gold-line" />
              <span className="hn-badge-text">
                <Sparkles size={14} />
                {slide.badge}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="hn-hero-title hn-anim-title">
              {slide.title[0]}
              <span>{slide.title[1]}</span>
            </h1>

            {/* Description */}
            <p className="hn-hero-desc hn-anim-desc">
              {slide.description}
            </p>

            {/* Buttons */}
            <div className="hn-hero-btns hn-anim-btns">
              <a href="#services" className="hn-btn-cc-gold">
                <span>Book Service Now</span>
                <ChevronRight size={15} />
              </a>
              <a href="#how-it-works" className="hn-btn-cc-outline">
                <span>Explore Process</span>
                <Sparkles size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="hn-indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hn-indicator-btn${i === current ? " active" : ""}`}
              onClick={() => handleSlideChange(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="hn-strip">
        <div className="hn-strip-track">
          {[
            { Icon: BookOpen, label: "Book trusted maids by the hour" },
            { Icon: Clock, label: "Flexible timings" },
            { Icon: ShieldCheck, label: "Safe & secure" },
            { Icon: Star, label: "100% satisfaction" },
            { Icon: Sparkles, label: "A part of CityCalls" },
            { Icon: BookOpen, label: "Book trusted maids by the hour" },
            { Icon: Clock, label: "Flexible timings" },
            { Icon: ShieldCheck, label: "Safe & secure" },
            { Icon: Star, label: "100% satisfaction" },
            { Icon: Sparkles, label: "A part of CityCalls" },
          ].map((item, i) => (
            <div key={i} className="hn-strip-item">
              <item.Icon size={14} className="hn-strip-icon" />
              <span>{item.label}</span>
              <span className="hn-strip-dot">✦</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
