"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Check, Copy, Gift } from "lucide-react";
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

// "Special Home Services Discount —" → "Special Home Services Discount"
const withoutTrailingDash = (text?: string) => text?.replace(/\s*[—-]\s*$/, "") ?? "";

// Coupon-ticket pill: notched sides cut with a radial mask, like a real coupon.
const TICKET_MASK: CSSProperties = {
  WebkitMaskImage:
    "radial-gradient(circle at 0 50%, transparent 5px, #000 5.5px), radial-gradient(circle at 100% 50%, transparent 5px, #000 5.5px)",
  WebkitMaskComposite: "source-in",
  maskImage:
    "radial-gradient(circle at 0 50%, transparent 5px, #000 5.5px), radial-gradient(circle at 100% 50%, transparent 5px, #000 5.5px)",
  maskComposite: "intersect",
};

export function OfferStrip() {
  const [data, setData] = useState<PublicOfferStrip>(fallbackStrip);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    return () => {
      controller.abort();
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  if (data.status === "INACTIVE") return null;

  async function copyCode() {
    if (!data.couponCode) return;
    try {
      await navigator.clipboard.writeText(data.couponCode);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (e.g. insecure context) — the code is still visible to type.
    }
  }

  const headline = withoutTrailingDash(data.textLeft);

  const discountPill = data.discountText && (
    <span
      className="relative inline-flex items-center px-3.5 py-1 text-[12px] font-black uppercase tracking-wider shadow-[0_6px_16px_-6px_rgba(0,0,0,0.5)] sm:px-4 sm:text-[14px]"
      style={{ background: data.discountBg, color: data.discountTextColor, ...TICKET_MASK }}
    >
      {data.discountText}
    </span>
  );

  const couponBox = data.couponCode && (
    <button
      type="button"
      onClick={() => void copyCode()}
      title="Copy code"
      className="group/code inline-flex items-center gap-2 rounded-lg border border-dashed px-2.5 py-1 text-[12px] font-bold tracking-[0.15em] transition-colors sm:text-[13px]"
      style={{ background: data.couponBg, color: data.couponTextColor, borderColor: data.couponTextColor }}
    >
      {data.couponCode}
      <span className="flex items-center gap-1 border-l pl-2 text-[10px] font-semibold tracking-normal opacity-90" style={{ borderColor: data.couponTextColor }}>
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5 transition-transform group-hover/code:scale-110" />}
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );

  const claimButton = data.buttonText && (
    <Link
      href={data.buttonLink || "/services"}
      className="group/btn relative inline-flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full bg-primary px-4 py-2 text-[12px] font-bold text-slate-950 shadow-[0_8px_20px_-8px_rgba(124,179,66,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-8px_rgba(124,179,66,0.9)] sm:px-5 sm:text-[13px]"
    >
      <span aria-hidden className="offer-strip-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      <span className="relative">{data.buttonText}</span>
      <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
    </Link>
  );

  return (
    <div className="relative z-30 w-full overflow-hidden" style={getBackgroundStyle(data)}>
      {/* texture: top sheen, faint dot grid, glowing edge lines and a slow light sweep */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "14px 14px" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div aria-hidden className="offer-strip-sweep pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="container relative mx-auto px-4 py-3 sm:px-6">
        {/* Mobile: headline on top, ticket + code + button below */}
        <div className="flex flex-col gap-2.5 sm:hidden">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/15 ring-1 ring-primary/40 shadow-[0_0_14px_rgba(124,179,66,0.35)]">
              <Gift className="h-4 w-4 text-primary" />
            </span>
            <p className="line-clamp-2 text-[12.5px] font-medium leading-snug text-white/90">
              <span className="font-semibold text-white">{headline}</span> {data.textRight}
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              {discountPill}
              {couponBox}
            </div>
            {claimButton}
          </div>
        </div>

        {/* Tablet / desktop: one line — label · ticket · code · button */}
        <div className="hidden items-center justify-center gap-4 sm:flex lg:gap-5">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/40 shadow-[0_0_16px_rgba(124,179,66,0.35)]">
              <Gift className="offer-strip-gift h-4.5 w-4.5 text-primary" />
            </span>
            <div className="leading-tight">
              <span className="block text-[9.5px] font-bold uppercase tracking-[0.22em] text-primary">Limited Offer</span>
              {headline && <span className="block text-[14px] font-semibold text-white lg:text-[15px]">{headline}</span>}
            </div>
          </div>

          <span aria-hidden className="hidden h-8 w-px bg-white/15 md:block" />

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {discountPill}
            {data.textRight && <span className="text-[13px] font-medium text-white/80 lg:text-[14px]">{data.textRight}</span>}
            {couponBox}
          </div>

          {claimButton}
        </div>
      </div>

      <style>{`
        @keyframes offer-strip-sweep { from { transform: translateX(-120%); } to { transform: translateX(520%); } }
        @keyframes offer-strip-shine { 0%, 60% { transform: translateX(-150%) skewX(-20deg); } 100% { transform: translateX(400%) skewX(-20deg); } }
        @keyframes offer-strip-gift { 0%, 85%, 100% { transform: rotate(0); } 88% { transform: rotate(-12deg); } 91% { transform: rotate(10deg); } 94% { transform: rotate(-6deg); } 97% { transform: rotate(3deg); } }
        .offer-strip-sweep { animation: offer-strip-sweep 7s linear infinite; }
        .offer-strip-shine { animation: offer-strip-shine 3.4s ease-in-out infinite; }
        .offer-strip-gift { animation: offer-strip-gift 3.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .offer-strip-sweep, .offer-strip-shine, .offer-strip-gift { animation: none; }
        }
      `}</style>
    </div>
  );
}
