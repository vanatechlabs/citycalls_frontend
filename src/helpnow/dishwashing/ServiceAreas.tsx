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
  "Rajnagar Extension",
  "Vasundhara",
  "Siddharth Vihar"
];

export function ServiceAreas() {
  return (
    <div className="w-full bg-slate-50/70 py-14 md:py-16 border-t border-slate-200">
      <div className="container-x mx-auto px-4 max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#f5a623] bg-[#fff6e8] px-3.5 py-1.5 rounded-full border border-[#f5a623]/30 inline-block mb-3">
            Fast Doorstep Availability
          </span>
          <h2 className="text-[22px] md:text-[30px] font-sans font-black uppercase tracking-tight text-slate-900 leading-tight">
            Service Areas in{" "}
            <span className="text-[#f5a623] relative inline-block">
              Ghaziabad
              <motion.svg
                className="absolute -bottom-1.5 left-0 w-full h-3"
                viewBox="0 0 150 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <motion.path
                  d="M0 8 L 150 8"
                  stroke="#f5a623"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </h2>
          <p className="text-slate-600 text-[12px] md:text-[14px] mt-3 font-medium max-w-[520px] mx-auto">
            We cover all major locations across Ghaziabad to provide you with fast and reliable verified doorstep maids.
          </p>
        </div>

        {/* Area Pills */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-[850px] mx-auto">
          {areas.map((area, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-2 bg-white border border-[#f5a623]/30 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md hover:border-[#f5a623] hover:bg-[#fff6e8]/40 transition-all cursor-default"
            >
              <MapPin className="w-4 h-4 text-[#f5a623]" />
              <span className="text-[13px] md:text-[14px] font-bold text-slate-900">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
