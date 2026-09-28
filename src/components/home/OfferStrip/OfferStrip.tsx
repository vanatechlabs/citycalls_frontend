"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Gift, ArrowRight } from "lucide-react";
import Link from "next/link";
import { fetchCityCallsOfferStrip, type PublicOfferStrip } from "@/lib/api/cityCallsHome";

// ─── Bundled offer strip (CityCalls theme) ───────────────────────────────────
// Shown until the admin panel's saved strip loads, and kept if the API is
// unreachable. Same values as the backend's OFFER_STRIP_DEFAULTS.
const fallbackStrip: PublicOfferStrip = {
  bgGradientFrom: "#020617",
  bgGradientVia: "#0d131f",
  bgGradientTo: "#020617",

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
  status: "ACTIVE",
};

// ⭐ UNIVERSAL BACKGROUND HANDLER
// Background: a single colour, a 2/3-colour gradient, or a full
// "linear-gradient(...)" string.
function getBackgroundStyle(data: PublicOfferStrip): CSSProperties {
  const from = data.bgGradientFrom?.trim();
  const via = data.bgGradientVia?.trim();
  const to = data.bgGradientTo?.trim();

  // 1) A full linear-gradient(...) string
  const gradient = [from, via, to].find((v) => v?.startsWith("linear-gradient"));
  if (gradient) return { backgroundImage: gradient };

  // 2) Solid single colour
  if (from && !via && !to) return { backgroundColor: from };

  // 3) Two-colour gradient
  if (from && via && !to) return { backgroundImage: `linear-gradient(to right, ${from}, ${via})` };

  // 4) Three-colour gradient
  if (from && via && to) return { backgroundImage: `linear-gradient(to right, ${from}, ${via}, ${to})` };

  // 5) Fallback — CityCalls dark strip
  return { backgroundImage: "linear-gradient(to right, #020617, #0d131f, #020617)" };
}

export function OfferStrip() {
  const [data, setData] = useState<PublicOfferStrip>(fallbackStrip);

  useEffect(() => {
    const controller = new AbortController();

    fetchCityCallsOfferStrip(controller.signal)
      .then((strip) => {
        if (strip) setData({ ...fallbackStrip, ...strip });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.warn("Using bundled offer strip because the CMS strip could not be loaded.");
      });

    return () => controller.abort();
  }, []);

  if (data.status === "INACTIVE") return null;

  return (
    <div
      className="w-full py-2.5 shadow-lg border-y border-primary/20 relative z-30"
      style={getBackgroundStyle(data)}
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
            {data.textLeft && <span className="text-sm sm:text-base font-semibold">{data.textLeft}</span>}

            {data.discountText && (
              <span
                className="px-2.5 py-0.5 rounded font-black text-sm sm:text-base uppercase tracking-wider shadow-md"
                style={{ background: data.discountBg, color: data.discountTextColor }}
              >
                {data.discountText}
              </span>
            )}

            {data.textRight && <span className="text-sm sm:text-base font-medium">{data.textRight}</span>}

            {data.couponCode && (
              <span
                className="px-2.5 py-0.5 rounded font-bold border border-amber-400/30 text-sm tracking-wide"
                style={{ background: data.couponBg, color: data.couponTextColor }}
              >
                {data.couponCode}
              </span>
            )}
          </div>

          {/* Button */}
          {data.buttonText && (
            <Link
              href={data.buttonLink || "/services"}
              className="bg-primary text-slate-950 hover:bg-primary-dark hover:text-white px-4 py-1.5 rounded font-bold text-sm transition-all duration-200 flex items-center gap-1.5 group shadow-md"
            >
              {data.buttonText}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
