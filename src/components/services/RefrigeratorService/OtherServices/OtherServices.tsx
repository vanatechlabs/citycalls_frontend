"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from "next/link";

// We import a few placeholder service images from the assets folder.
// (You can swap these with the exact correct images if they don't match)
const s1 = "/assets/Services/s1.png";
const s2 = "/assets/Services/s2.png";
const s3 = "/assets/Services/s3.png";
const s4 = "/assets/Services/s4.png";
const s5 = "/assets/Services/s5.png";
const s6 = "/assets/Services/s6.png";

const services = [
  { title: "Refrigerator", image: s1, slug: "refrigerator-service" },
  { title: "Washing Machine", image: s2, slug: "washing-machine-service" },
  { title: "AC", image: s3, slug: "ac-service" },
  { title: "Microwave Oven", image: s4, slug: "microwave-service" },
  { title: "RO Water Purifier", image: s5, slug: "ro-service" },
  { title: "LED TV", image: s6, slug: "led-tv-service" },
];

export function OtherServices() {
  return (
    <div className="w-full bg-white py-12 md:py-16 border-t border-black/5">
      <div className="container-x">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-[24px] md:text-[32px] font-sans font-black uppercase tracking-tight text-ink leading-tight">
            OUR <span className="text-[#3e8914]">SERVICES</span>
          </h2>
          <p className="text-ink/60 text-[12px] md:text-[14px] mt-2 font-bold max-w-[500px] mx-auto">
            We repair all major home and kitchen appliances.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {services.map((service, idx) => (
            <Link 
              key={idx}
              href={`/services/${service.slug}`}
              className="bg-white border border-black/10 rounded-xl p-4 flex flex-col items-center justify-between shadow-[0_2px_8px_rgb(0,0,0,0.04)] hover:shadow-lg hover:border-[#3e8914]/30 transition-all group"
            >
              {/* Image Container */}
              <div className="w-full h-[100px] md:h-[120px] flex items-center justify-center mb-4">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text */}
              <div className="text-center">
                <h3 className="text-[13px] md:text-[15px] font-bold text-ink">{service.title}</h3>
                <p className="text-[10px] md:text-[11px] font-medium text-ink/60 mt-1 mb-3">Repair & Service</p>
                
                <div className="flex items-center justify-center gap-1 text-[#3e8914] text-[12px] font-bold">
                  Book Now 
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
