"use client";

import type { CSSProperties } from "react";
import { Gift, ArrowRight } from "lucide-react";
import Link from "next/link";

// ─── Static offer strip data (CityCalls theme) ───────────────────────────────
// Edit these values to change the home page offer strip. No backend call.
const data = {
  // Background: a single colour, a 2/3-colour gradient, a Tailwind
  // "bg-gradient-..." class, or a full "linear-gradient(...)" string.
  bgGradientFrom: "bg-gradient-to-r from-slate-950 via-[#0d131f] to-slate-950",
  bgGradientVia: "",
  bgGradientTo: "",

  textLeft: "Special Home Services Discount —",
  discountText: "FLAT 15% OFF",
  discountBg: "#7cb342",
  discountTextColor: "#020617",

  textRight: "on your first booking. Use code",
  couponCode: "CITY15",
  couponBg: "rgba(251, 191, 36, 0.12)",
  couponTextColor: "#fcd34d",

  buttonText: "Claim Offer",
  buttonLink: "/services",
};

// ⭐ UNIVERSAL BACKGROUND HANDLER
function getBackgroundStyle(): { className: string; style: CSSProperties } {
  const from = data.bgGradientFrom?.trim();
  const via = data.bgGradientVia?.trim();
  const to = data.bgGradientTo?.trim();

  // 1) A full linear-gradient(...) string
  if (from?.startsWith("linear-gradient") || via?.startsWith("linear-gradient") || to?.startsWith("linear-gradient")) {
    return { className: "", style: { backgroundImage: from || via || to } };
  }

  // 2) A Tailwind gradient class
  if (from?.includes("bg-gradient") || via?.includes("bg-gradient") || to?.includes("bg-gradient")) {
    return { className: from || via || to, style: {} };
  }

  // 3) Solid single colour
  if (from && !via && !to) return { className: "", style: { backgroundColor: from } };

  // 4) Two-colour gradient
  if (from && via && !to) return { className: "", style: { backgroundImage: `linear-gradient(to right, ${from}, ${via})` } };

  // 5) Three-colour gradient
  if (from && via && to) {
    return { className: "", style: { backgroundImage: `linear-gradient(to right, ${from}, ${via}, ${to})` } };
  }

  // 6) Fallback — CityCalls dark strip
  return { className: "", style: { backgroundImage: "linear-gradient(to right, #020617, #0d131f, #020617)" } };
}

export function OfferStrip() {
  const bg = getBackgroundStyle();

  return (
    <div
      className={`w-full py-2.5 shadow-lg border-y border-primary/20 relative z-30 ${bg.className}`}
      style={bg.style}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          {/* Icon */}
          <div className="flex items-center gap-1.5">
            <div className="bg-primary/15 border border-primary/30 backdrop-blur-sm p-1.5 rounded">
              <Gift className="w-4 h-4 text-primary animate-pulse" />
            </div>
          </div>

          {/* Offer text */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-white/90">
            <span className="text-sm sm:text-base font-semibold">{data.textLeft}</span>

            <span
              className="px-2.5 py-0.5 rounded font-black text-sm sm:text-base uppercase tracking-wider shadow-md"
              style={{ background: data.discountBg, color: data.discountTextColor }}
            >
              {data.discountText}
            </span>

            <span className="text-sm sm:text-base font-medium">{data.textRight}</span>

            <span
              className="px-2.5 py-0.5 rounded font-bold border border-amber-400/30 text-sm tracking-wide"
              style={{ background: data.couponBg, color: data.couponTextColor }}
            >
              {data.couponCode}
            </span>
          </div>

          {/* Button */}
          <Link
            href={data.buttonLink}
            className="bg-primary text-slate-950 hover:bg-primary-dark hover:text-white px-4 py-1.5 rounded font-bold text-sm transition-all duration-200 flex items-center gap-1.5 group shadow-md"
          >
            {data.buttonText}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
