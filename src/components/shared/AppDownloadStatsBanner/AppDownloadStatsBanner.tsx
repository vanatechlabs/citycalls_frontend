"use client";

import React, { useEffect, useRef } from 'react';
import { Users, UserCheck, FileText, Star, Smartphone } from 'lucide-react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

const Counter = ({ from, to, suffix = "", decimals = 0 }: { from: number, to: number, suffix?: string, decimals?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => 
    latest.toFixed(decimals) + suffix
  );

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export const AppDownloadStatsBanner = () => {
  return (
    <div className="container-x py-4 md:py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Section: App Download */}
        <div className="w-full lg:w-1/2 bg-[#f3faef] rounded-2xl p-5 md:p-6 flex items-center relative overflow-hidden">
          <div className="w-1/3 absolute -bottom-20 -left-4 z-10 hidden md:block">
            {/* Phone Mockup */}
            <div className="relative w-full max-w-[140px] h-[260px] rounded-[1.4rem] bg-gray-900 border-[3px] border-gray-800 p-1 shadow-2xl mx-auto transform">
              <div className="h-full w-full rounded-xl bg-white overflow-hidden flex flex-col">
                <div className="h-[35%] bg-gray-900 p-3 text-white flex flex-col justify-between">
                  <div>
                    <Smartphone size={14} className="text-[#3e8914]" />
                  </div>
                  <div>
                    <div className="text-[8px] text-white/50">Hi, Rohit</div>
                    <div className="font-semibold text-[10px] leading-snug mt-0.5">
                      What needs fixing today?
                    </div>
                  </div>
                </div>
                <div className="p-2 space-y-1.5 flex-1 bg-white">
                  {["AC Service", "Sofa Cleaning", "Pest Control", "Salon at Home"].map((x) => (
                    <div
                      key={x}
                      className="rounded-lg bg-gray-50 h-7 flex items-center px-2 text-[9px] font-medium text-gray-900"
                    >
                      {x}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 md:ml-auto md:pl-8 relative z-10 flex flex-col justify-center py-2">
            <h3 className="text-lg md:text-xl font-black text-gray-900 mb-2 uppercase tracking-wide whitespace-nowrap">
              DOWNLOAD <span className="text-[#3e8914]">CITYCALLS</span> APP
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Book faster, track in real-time and get exclusive app offers.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex gap-3">
                <a href="#" className="inline-block hover:opacity-90 transition-opacity">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-10" />
                </a>
                <a href="#" className="inline-block hover:opacity-90 transition-opacity">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="h-10" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Stats */}
        <div className="w-full lg:w-1/2 bg-[#f3faef] rounded-2xl p-5 md:p-6 flex flex-col justify-center items-center">
          <h3 className="text-lg md:text-xl font-black text-gray-900 mb-5 uppercase tracking-wide text-center whitespace-nowrap">
            TRUSTED BY <span className="text-[#3e8914]">THOUSANDS</span>
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            <div className="flex flex-col items-center text-center">
              <Users className="w-8 h-8 text-[#3e8914] mb-3" />
              <div className="text-xl md:text-2xl font-bold text-blue-900 mb-1">
                <Counter from={0} to={10} suffix="K+" />
              </div>
              <div className="text-xs text-gray-500">Happy Customers</div>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <UserCheck className="w-8 h-8 text-[#3e8914] mb-3" />
              <div className="text-xl md:text-2xl font-bold text-blue-900 mb-1">
                <Counter from={0} to={150} suffix="+" />
              </div>
              <div className="text-xs text-gray-500">Expert Technicians</div>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <FileText className="w-8 h-8 text-[#3e8914] mb-3" />
              <div className="text-xl md:text-2xl font-bold text-blue-900 mb-1">
                <Counter from={0} to={50} suffix="K+" />
              </div>
              <div className="text-xs text-gray-500">Services Completed</div>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <Star className="w-8 h-8 text-[#3e8914] mb-3" />
              <div className="text-xl md:text-2xl font-bold text-[#3e8914] mb-1 flex items-center gap-1">
                <Counter from={0} to={4.8} decimals={1} /> <Star className="w-4 h-4 fill-[#3e8914] text-[#3e8914]" />
              </div>
              <div className="text-xs text-gray-500">Average Rating</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
