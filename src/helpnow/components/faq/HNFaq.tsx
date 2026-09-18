import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

import h1 from "@/assets/Images/h1.png";
import h2 from "@/assets/Images/h2.png";
import h3 from "@/assets/Images/h3.png";
import h4 from "@/assets/Images/h4.png";
import h5 from "@/assets/Images/h5.png";
import dish from "@/assets/Banner/dish.png";

const faqs = [
  { 
    q: "How quickly can I get a technician / maid?", 
    a: "For most services in Ghaziabad, we dispatch a verified pro within 60–90 minutes of booking. You can also schedule a specific slot up to 7 days out.",
    image: h1
  },
  { 
    q: "Do I pay before or after the service?", 
    a: "Always after. You inspect the work, then pay by UPI, card, wallet or cash after complete satisfaction.",
    image: h2
  },
  { 
    q: "Is there a service warranty?", 
    a: "Yes. All services come with a 30-day service warranty and 100% satisfaction guarantee. If not satisfied, we send another helper or refund.",
    image: h3
  },
  { 
    q: "Are the technicians & maids background-verified?", 
    a: "Every professional is police-verified, hygiene-trained by HelpNow, and continuously rated by customers. Low-rated pros are removed immediately.",
    image: h4
  },
  { 
    q: "What if I'm not happy with the service?", 
    a: "Raise a complaint from your booking page or contact our support team. We'll send another pro at no cost or refund the visit charge — your call.",
    image: h5
  },
  { 
    q: "Do you serve areas outside Ghaziabad?", 
    a: "Right now we're focused on all major sectors and societies in Ghaziabad. Noida, Greater Noida, and Delhi are on our active roadmap for 2026.",
    image: dish
  },
];

export function HNFaq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-14 md:py-20 bg-white border-t border-slate-200 relative overflow-hidden" id="faq">
      {/* Background Decor with HelpNow Amber Glow */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-[#f5a623]/8 rounded-full blur-[90px] -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-[#e0951a]/8 rounded-full blur-[90px] -ml-48 -mb-48 pointer-events-none" />

      <div className="container-x mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#f5a623]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#b5730f]">
              Support & Info
            </span>
            <div className="h-px w-8 bg-[#f5a623]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-sans font-black uppercase tracking-tight text-slate-900 leading-tight">
            Frequently Asked <span className="text-[#f5a623]">Questions</span>
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-[14px] md:text-[15px] font-medium leading-relaxed">
            Find answers to common inquiries about booking, services, and policies with HelpNow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Accordions */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className={`group transition-all duration-300 overflow-hidden border ${
                    isActive
                      ? "border-[#f5a623]/40 bg-white shadow-md border-l-4 border-l-[#f5a623]"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                  style={{ borderRadius: '10px' }}
                >
                  <button
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive 
                          ? "bg-[#f5a623] text-white shadow-sm" 
                          : "bg-[#fff6e8] text-[#b5730f]"
                      }`}>
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span className={`font-bold text-[15px] transition-colors duration-300 ${isActive ? "text-[#b5730f]" : "text-slate-900"}`}>
                        {item.q}
                      </span>
                    </div>
                    <div className={`shrink-0 w-6 h-6 border rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive ? "bg-[#fff6e8] border-[#f5a623] text-[#b5730f]" : "bg-white border-slate-200 text-slate-400"
                    }`}>
                      {isActive ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-5 pb-5 pt-1 pl-[4.25rem]">
                          <div className="space-y-3">
                            <p className="text-slate-600 leading-relaxed text-[14px] font-medium">
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Synced Image + CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 order-first lg:order-last mb-8 lg:mb-0">
            <div className="relative aspect-[4/3] bg-white border-2 border-slate-100 overflow-hidden shadow-md rounded-2xl p-2">
              <div className="w-full h-full relative rounded-xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex ?? "none"}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-0 bg-slate-50"
                  >
                    {activeIndex !== null && faqs[activeIndex]?.image ? (
                      <img
                        src={faqs[activeIndex].image}
                        alt={faqs[activeIndex]?.q}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={faqs[0].image}
                        alt="FAQ"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Corner decor */}
              <div className="absolute top-4 left-4 w-5 h-5 border-l-2 border-t-2 border-white/60 z-10 pointer-events-none rounded-tl" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-r-2 border-b-2 border-white/60 z-10 pointer-events-none rounded-br" />
            </div>

            {/* CTA below image */}
            <div className="mt-4 p-5 bg-[#fffbf0] border border-[#f5a623]/25 shadow-sm text-center rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#f5a623]/10 rounded-bl-full pointer-events-none" />
              <p className="text-slate-900 text-[13px] font-bold mb-3 relative z-10">
                &ldquo;Still have questions about our services?&rdquo;
              </p>
              <Link
                to="/contact"
                className="inline-block bg-[#f5a623] text-white px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#e0951a] transition-all shadow-md rounded-lg relative z-10 cursor-pointer"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
