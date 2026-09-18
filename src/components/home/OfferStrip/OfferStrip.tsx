import { Gift, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function OfferStrip() {
  return (
    <div className="w-full py-2.5 shadow-md bg-gradient-to-r from-slate-950 via-[#0d131f] to-slate-950 border-y border-primary/20 relative z-30 overflow-hidden group">
      <div className="flex items-center">
        <div className="marquee-track group-hover:[animation-play-state:paused] flex items-center gap-6 whitespace-nowrap">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center gap-6">
              {/* Text 1: Special Home Services Discount */}
              <div className="flex items-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-4 py-1.5 rounded-full transition-colors">
                <Gift className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-white/90">
                  Special Home Services Discount
                </span>
                <span className="px-2.5 py-0.5 rounded font-black text-xs bg-primary text-slate-950 uppercase tracking-wider shadow-sm">
                  FLAT 15% OFF
                </span>
                <span className="text-xs font-medium text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  Use Code: <strong className="font-bold text-amber-200">CITY15</strong>
                </span>
                <Link
                  to="/services"
                  className="text-xs font-bold text-white hover:text-primary transition-colors flex items-center gap-1 ml-1"
                >
                  Claim Offer
                  <ArrowRight className="w-3 h-3 text-primary" />
                </Link>
              </div>

              <span className="text-primary/60 font-bold text-xs select-none">✦</span>

              {/* Text 2: First Service Discount */}
              <div className="flex items-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-4 py-1.5 rounded-full transition-colors">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-white/90">
                  First Deep Cleaning & Doorstep Repair
                </span>
                <span className="px-2.5 py-0.5 rounded font-black text-xs bg-amber-400 text-slate-950 uppercase tracking-wider shadow-sm">
                  GET 20% OFF
                </span>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/30">
                  Use Code: <strong className="font-bold text-emerald-300">CLEAN20</strong>
                </span>
                <Link
                  to="/contact"
                  className="text-xs font-bold text-white hover:text-amber-400 transition-colors flex items-center gap-1 ml-1"
                >
                  Book Under 60 Mins
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                </Link>
              </div>

              <span className="text-amber-400/60 font-bold text-xs select-none">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

