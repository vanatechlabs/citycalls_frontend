import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, Sparkles } from "lucide-react";
import cara1 from "@/assets/Banner/cara1.png";
import cara2 from "@/assets/Banner/cara2.png";
import cara3 from "@/assets/Banner/cara3.png";
import s1 from "@/assets/Services/s1.png";
import s2 from "@/assets/Services/s2.png";
import s3 from "@/assets/Services/s3.png";
import s4 from "@/assets/Services/s4.png";

const images = [
  { url: cara1, title: "AC Repair" },
  { url: s1, title: "Home Cleaning" },
  { url: cara2, title: "Pest Control" },
  { url: s2, title: "Salon at Home" },
  { url: cara3, title: "Plumbing" },
  { url: s3, title: "Electrical" },
  { url: s4, title: "Sofa Cleaning" },
];

export function HowItWorks() {
  const [selectedImg, setSelectedImg] = useState<any>(null);

  return (
    <section className="relative py-8 overflow-hidden font-sans bg-white border-t border-gray-100">
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -mr-48 -mt-48 pointer-events-none" />

      <div className="container-x mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary-dark" />
            <span className="uppercase tracking-[0.2em] text-primary-dark font-bold text-[11px]">
              Trending Services
            </span>
            <div className="h-px w-8 bg-primary-dark" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-serif text-ink leading-tight font-bold">
            Most popular choices <span className="text-primary">this week.</span>
          </h2>
        </div>
      </div>

      {/* Marquee Area */}
      <div className="relative mb-0 overflow-hidden">
        <style>{`
          .glimpse-marquee-container {
            display: flex;
            width: max-content;
            animation: scroll-glimpse 40s linear infinite;
          }
          @keyframes scroll-glimpse {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .glimpse-marquee-container:hover {
            animation-play-state: paused;
          }
          .glimpse-card {
            width: 280px;
            height: 260px;
            flex-shrink: 0;
            margin-left: -15px;
            clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
            cursor: pointer;
            position: relative;
            transition: all 0.5s ease;
          }
          .glimpse-card:first-child {
            margin-left: 0;
          }
          @media (max-width: 768px) {
            .glimpse-card {
              width: 220px;
              height: 200px;
              margin-left: -10px;
            }
          }
        `}</style>
        
        <div className="glimpse-marquee-container py-2">
          {/* Double images for seamless loop */}
          {[...images, ...images, ...images].map((img, idx) => (
            <div
              key={idx}
              className="glimpse-card group/card bg-gray-100"
              onClick={() => setSelectedImg(img)}
            >
              <img 
                loading="lazy" 
                decoding="async" 
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
              />
              
              {/* Overlay with Zoom Icon */}
              <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 z-20">
                  <ZoomIn className="text-white w-10 h-10 mb-2 transform scale-50 group-hover/card:scale-100 transition-transform duration-500" />
              </div>

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent opacity-90 z-10" />
              
              <div className="absolute bottom-5 left-0 w-full text-center z-10">
                 <span className="text-white font-bold text-sm tracking-widest uppercase">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/95 p-4 md:p-10"
            onClick={() => setSelectedImg(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                loading="lazy" 
                src={selectedImg.url}
                alt={selectedImg.title}
                className="w-full h-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-6 text-center px-4">
                <h3 className="text-white font-bold text-2xl uppercase tracking-widest">{selectedImg.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}