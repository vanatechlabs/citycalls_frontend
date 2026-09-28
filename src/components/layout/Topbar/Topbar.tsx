"use client";

import { Clock, Mail, Phone } from "lucide-react";
import Link from "next/link";

export function Topbar() {
  const marqueeText = "Get 20% off on your first deep cleaning service! Use code: CLEAN20 • Verified technicians available across Ghaziabad • Book now and get service in under 60 minutes!";


  return (
    <>
      <style>{`
        @keyframes sparkleAnim {
          0%   { opacity: 0; transform: scale(0.5) translateY(0); }
          40%  { opacity: 1; transform: scale(1.2) translateY(-2px); }
          80%  { opacity: 0.6; transform: scale(0.9) translateY(-3px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-4px); }
        }
        .sparkle-dot {
          position: relative;
          display: inline-block;
          margin: 0 15px;
          color: #94d052;
          animation: sparkleAnim 1.6s ease-in-out infinite;
          -webkit-text-fill-color: #94d052;
        }
      `}</style>
      <div className="bg-white dark:bg-[#090d16] border-b border-black/5 dark:border-white/10 text-slate-800 dark:text-slate-100 text-[11px] md:text-xs font-medium py-1.5 z-[150] relative transition-colors duration-300">
        <div className="container-x flex items-center justify-between flex-nowrap gap-x-4">
          
          {/* Left Section - Contact Info */}
          <div className="flex items-center justify-center md:justify-start gap-4 md:gap-5 w-full md:w-auto overflow-hidden flex-shrink-0">
            <a href="tel:+917428808884" className="flex items-center gap-1.5 text-slate-800 dark:text-slate-100 hover:text-primary transition-colors font-bold whitespace-nowrap">
              <Phone size={13} className="text-primary" />
              <span>+91 74288 08884</span>
            </a>
            <a href="mailto:hello@citycalls.in" className="hidden sm:flex items-center gap-1.5 text-slate-800 dark:text-slate-100 hover:text-primary transition-colors font-bold whitespace-nowrap">
              <Mail size={13} className="text-primary" />
              <span>hello@citycalls.in</span>
            </a>
          </div>

          {/* Center Section - Sparkling Marquee */}
          <div className="hidden md:flex flex-1 min-w-0 max-w-[300px] lg:max-w-[500px] overflow-hidden relative items-center justify-center ml-4">
            <div className="marquee-track flex items-center">
              <div className="flex items-center gap-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-[#124D1C] dark:text-[#4ADE80] whitespace-nowrap font-bold uppercase tracking-wider text-[10px] drop-shadow-sm">{marqueeText}</span>
                    <span className="sparkle-dot">✦</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-[#124D1C] dark:text-[#4ADE80] whitespace-nowrap font-bold uppercase tracking-wider text-[10px] drop-shadow-sm">{marqueeText}</span>
                    <span className="sparkle-dot">✦</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Timing & Login */}
          <div className="hidden md:flex items-center gap-4 shrink-0 pl-4">
            <div className="flex items-center gap-1.5 font-bold whitespace-nowrap text-slate-800 dark:text-slate-200">
              <Clock size={13} className="text-primary" /> 
              <span>Mon-Sat: 9:00 AM - 8:00 PM</span>
            </div>


            <div className="flex items-center gap-1.5">
              <Link 
                href="/customer-login"
                className="px-2.5 py-1.5 rounded-md bg-black/5 dark:bg-white/10 hover:bg-primary text-slate-900 dark:text-white hover:text-white transition-all duration-300 font-bold border border-black/10 dark:border-white/20 hover:border-primary text-[9px] uppercase tracking-wider whitespace-nowrap shadow-sm hover:scale-105 inline-block"
              >
                Customer Login
              </Link>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
