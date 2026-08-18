import { Gift, ArrowRight, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function OfferStrip() {
  const handleCopyCode = () => {
    navigator.clipboard.writeText("CITY15");
    toast.success("Coupon code CITY15 copied to clipboard!");
  };

  return (
    <div 
      className="w-full py-2.5 shadow-sm bg-gradient-to-r from-slate-900 via-[#1a1a1a] to-slate-900 border-b border-primary/20 relative z-30" 
    >
      <div className="container-x mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {/* Icon */}
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <div className="bg-primary/20 backdrop-blur-sm p-1.5 rounded-full border border-primary/30 flex items-center justify-center">
              <Gift className="w-4 h-4 text-primary" />
            </div>
          </div>

          {/* OFFER TEXT */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-white text-center">
            <span className="text-[12px] sm:text-[13px] font-medium text-white/90">
              Special Home Services Discount
            </span>

            <span className="px-2 py-0.5 rounded font-bold text-[13px] shadow-sm bg-primary text-primary-foreground">
              FLAT 15% OFF
            </span>

            <span className="text-[12px] sm:text-[13px] font-medium text-white/90 ml-1">
              Use Code:
            </span>

            <button 
              onClick={handleCopyCode}
              className="group relative px-2.5 py-0.5 rounded font-bold border border-primary/50 text-[12px] sm:text-[13px] bg-black/40 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1.5"
              title="Click to copy"
            >
              CITY15
              <Copy size={12} className="opacity-60 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* BUTTON */}
          <Link
            to="/services"
            className="bg-white text-ink hover:bg-primary hover:text-white px-3 sm:px-4 py-1.5 rounded font-bold text-[11px] sm:text-[12px] transition-all duration-300 flex items-center gap-1.5 group shadow-sm ml-0 sm:ml-2 uppercase tracking-wider whitespace-nowrap"
          >
            Claim Offer
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
