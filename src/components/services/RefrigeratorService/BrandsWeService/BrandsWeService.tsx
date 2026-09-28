"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';

const logo1 = "/assets/logo/logo1.png";
const logo2 = "/assets/logo/logo2.png";
const logo3 = "/assets/logo/logo3.png";
const logo4 = "/assets/logo/logo4.png";
const logo5 = "/assets/logo/logo5.png";
const logo6 = "/assets/logo/logo6.png";
const logo7 = "/assets/logo/logo7.png";
const logo8 = "/assets/logo/logo8.png";
const logo9 = "/assets/logo/logo9.png";
const logo10 = "/assets/logo/logo10.png";

const brands = [
  { name: "Whirlpool", image: logo1, id: 1 },
  { name: "VIDEOCON", image: logo2, id: 2 },
  { name: "SAMSUNG", image: logo3, id: 3 },
  { name: "Panasonic", image: logo4, id: 4 },
  { name: "LG", image: logo5, id: 5 },
  { name: "Kelvinator", image: logo6, id: 6 },
  { name: "Electrolux", image: logo7, id: 7 },
  { name: "Godrej", image: logo8, id: 8 },
  { name: "BOSCH", image: logo9, id: 9 },
  { name: "HITACHI", image: logo10, id: 10 },
];

export function BrandsWeService() {
  return (
    <div className="w-full overflow-hidden bg-white pt-6 pb-10 border-t border-black/5">
      <div className="container-x mb-8">
        <h2 className="text-center text-[22px] font-sans font-black uppercase tracking-tight text-ink leading-tight">
          Brands{" "}
          <span className="text-[#3e8914] relative inline-block">
            We Service
            {/* Animated underline */}
            <motion.svg
              className="absolute -bottom-1 left-0 w-full h-2.5"
              viewBox="0 0 150 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.path
                d="M0 8 L 150 8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: 1,
                    transition: {
                      pathLength: { duration: 1.2, ease: "easeInOut", delay: 0.2 },
                      opacity: { duration: 0.3, delay: 0.2 },
                    },
                  },
                }}
              />
            </motion.svg>
          </span>
        </h2>
      </div>
      
      {/* Logo Cloud Container */}
      <div className="relative max-w-5xl mx-auto mt-10 px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 border-x border-t border-black/10 bg-white">
          {brands.map((brand, idx) => {
            const isMobileRightEdge = idx % 2 === 1;
            const isDesktopRightEdge = idx % 5 === 4;
            const isMobileBottomEdge = idx >= 8;
            const isDesktopBottomEdge = idx >= 5;

            const mobileCol = idx % 2;
            const mobileRow = Math.floor(idx / 2);
            const mobileBg = ((mobileCol + mobileRow) % 2 === 0) ? 'bg-gray-50' : 'bg-white';

            const desktopCol = idx % 5;
            const desktopRow = Math.floor(idx / 5);
            const desktopBg = ((desktopCol + desktopRow) % 2 === 0) ? 'md:bg-gray-50' : 'md:bg-white';

            return (
              <div 
                key={idx} 
                className={`relative flex items-center justify-center p-6 md:p-8 border-b border-black/10 ${
                  isMobileRightEdge ? '' : 'border-r border-black/10'
                } ${
                  isDesktopRightEdge ? 'md:border-r-0' : 'md:border-r md:border-black/10'
                } ${mobileBg} ${desktopBg}`}
              >
                <motion.img 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", bounce: 0.5 }}
                  src={brand.image} 
                  alt={brand.name} 
                  className="max-w-full max-h-[40px] md:max-h-[50px] object-contain hover:scale-110 transition-transform duration-300 pointer-events-none select-none" 
                />
                
                {/* Mobile PlusIcon */}
                {!isMobileRightEdge && !isMobileBottomEdge && (
                  <PlusIcon 
                    className="absolute -right-[12.5px] -bottom-[12.5px] z-10 size-6 text-gray-300 md:hidden" 
                    strokeWidth={1} 
                  />
                )}
                {/* Desktop PlusIcon */}
                {!isDesktopRightEdge && !isDesktopBottomEdge && (
                  <PlusIcon 
                    className="absolute -right-[12.5px] -bottom-[12.5px] z-10 size-6 text-gray-300 hidden md:block" 
                    strokeWidth={1} 
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
