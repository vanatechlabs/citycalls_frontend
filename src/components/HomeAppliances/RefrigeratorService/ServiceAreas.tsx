import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const areas = [
  "Indirapuram",
  "Vaishali",
  "Kaushambi",
  "Raj Nagar",
  "Crossing Republik",
  "Sahibabad",
  "Nehru Nagar",
  "Rajnagar Extension"
];

export function ServiceAreas() {
  return (
    <div className="w-full bg-black/[0.02] py-12 md:py-16 border-t border-black/5">
      <div className="container-x">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-[22px] md:text-[28px] font-sans font-black uppercase tracking-tight text-ink leading-tight">
            Service Areas in{" "}
            <span className="text-[#3e8914] relative inline-block">
              Ghaziabad
              {/* Animated underline */}
              <motion.svg
                className="absolute -bottom-1.5 left-0 w-full h-3"
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
          <p className="text-ink/60 text-[12px] md:text-[14px] mt-3 font-medium max-w-[500px] mx-auto">
            We cover all major locations across Ghaziabad to provide you with fast and reliable doorstep service.
          </p>
        </div>

        {/* Area Pills */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-[800px] mx-auto">
          {areas.map((area, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-2 bg-white border border-[#3e8914]/20 rounded-full px-5 py-2.5 shadow-[0_2px_8px_rgb(0,0,0,0.04)] hover:shadow-md hover:border-[#3e8914]/40 hover:bg-[#3e8914]/[0.02] transition-all cursor-default"
            >
              <MapPin className="w-4 h-4 text-[#3e8914]" />
              <span className="text-[13px] md:text-[14px] font-bold text-ink">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
