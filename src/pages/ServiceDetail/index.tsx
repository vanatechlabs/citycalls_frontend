import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronDown, Phone, ShieldCheck, CheckCircle2, MessageSquare, Clock, IndianRupee } from "lucide-react";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { findService } from "@/data/services";
import { BookingForm } from "@/components/booking/BookingForm/BookingForm";
import refBg from "@/assets/banner/refbg.png";

function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? findService(slug) : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="bg-[#f9fafb] min-h-screen overflow-x-hidden">
      {/* Hero banner */}
      <section ref={containerRef} className="relative text-white overflow-hidden bg-ink" style={{ perspective: "1000px" }}>
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${service.slug === 'refrigerator-service' ? refBg : service.image})`,
            y: bgY 
          }}
        />
        {/* Dark gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
        
        <div className="container-x relative py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Side Content */}
          <motion.div 
            className="max-w-2xl transform-gpu"
            style={{ y, opacity, rotateX, scale, transformOrigin: "top center" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[10px] font-bold tracking-widest text-[#88be1e] uppercase mb-3"
            >
              Professional & Reliable
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans leading-[1.15] mb-4"
            >
              {service.name} in <br/>
              <span className="text-[#88be1e]">Ghaziabad</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base text-white/90 max-w-xl font-medium mb-6"
            >
              {service.short || "Cooling issues, gas refill, ice buildup — sorted at your doorstep."}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-5 md:gap-8 text-xs font-semibold"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} className="text-[#88be1e]" />
                </div>
                <span>Expert<br/>Technicians</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-[#88be1e]" />
                </div>
                <span>Same Day<br/>Service</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <IndianRupee size={20} className="text-[#88be1e]" />
                </div>
                <span>Transparent<br/>Pricing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} className="text-[#88be1e]" />
                </div>
                <span>30-Day<br/>Warranty</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side Trusted Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, type: "spring", bounce: 0.3 }}
            className="hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-[#3e8914]" />
                <span className="text-white/80 text-xs font-medium">Trusted by</span>
              </div>
              <div className="text-3xl font-black text-white mb-1 tracking-tight">4.8K+</div>
              <div className="text-xs font-medium text-white/80 mb-4">Happy Customers</div>
              
              {/* Avatars */}
              <div className="flex justify-center -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <img 
                    key={i} 
                    src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                    alt="Customer" 
                    className="w-8 h-8 rounded-full border-2 border-ink object-cover"
                  />
                ))}
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container-x py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="w-full lg:w-[65%]">
            <BookingForm serviceSlug={service.slug} />

            {/* FAQs moved below form */}
            <div className="mt-10 bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-black/5 p-6 md:p-8">
              <h3 className="text-[18px] font-bold text-ink mb-6">Frequently Asked Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {service.faqs.map((f: { q: string; a: string }, i: number) => (
                  <div key={f.q} className="rounded-lg border border-black/5 bg-[#f9fafb]">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)} 
                      className="w-full flex items-center justify-between text-left px-4 py-3"
                    >
                      <span className="font-semibold text-[13px] text-ink/80">{f.q}</span>
                      <ChevronDown size={14} className={`text-ink/40 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && <div className="px-4 pb-4 pt-1 text-[12px] leading-relaxed text-ink/60">{f.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Widgets */}
          <div className="w-full lg:w-[35%] space-y-6 sticky top-24">
            
            {/* Price Details */}
            <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-black/5 p-5">
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee className="w-4 h-4 text-[#3e8914]" />
                <h3 className="font-bold text-[15px]">Price Details</h3>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-[13px] font-medium text-ink/80">
                  <span>Service Visit Charge</span>
                  <span>₹299</span>
                </div>
                <div className="flex justify-between text-[13px] font-medium text-ink/80">
                  <span>Diagnostic Fee</span>
                  <span>₹0</span>
                </div>
              </div>
              <div className="border-t border-dashed border-black/10 pt-4 mb-4 flex justify-between items-center">
                <span className="font-bold text-[14px]">Total Amount</span>
                <span className="font-black text-[18px] text-[#3e8914]">₹299</span>
              </div>
              <div className="bg-[#f2f9f1] text-[#3e8914] text-[11px] font-medium p-3 rounded-lg flex gap-2 leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <p>Final payable amount may vary based on parts replacement (if required).</p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-black/5 p-5">
              <h3 className="font-bold text-[15px] mb-4">Why Choose CityCalls?</h3>
              <div className="flex gap-4">
                <ul className="space-y-3 flex-1">
                  <li className="flex items-start gap-2 text-[12px] font-medium text-ink/80">
                    <CheckCircle2 className="w-4 h-4 text-[#3e8914] shrink-0" /> Doorstep repair by experts
                  </li>
                  <li className="flex items-start gap-2 text-[12px] font-medium text-ink/80">
                    <CheckCircle2 className="w-4 h-4 text-[#3e8914] shrink-0" /> Genuine spare parts
                  </li>
                  <li className="flex items-start gap-2 text-[12px] font-medium text-ink/80">
                    <CheckCircle2 className="w-4 h-4 text-[#3e8914] shrink-0" /> No hidden charges
                  </li>
                  <li className="flex items-start gap-2 text-[12px] font-medium text-ink/80">
                    <CheckCircle2 className="w-4 h-4 text-[#3e8914] shrink-0" /> Service warranty up to 30 days
                  </li>
                </ul>
                <div className="w-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#e8f5e9] rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-[#3e8914]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-black/5 p-5">
              <h3 className="font-bold text-[15px] mb-2">Need Help?</h3>
              <div className="flex justify-between items-center mb-5">
                <p className="text-[12px] text-ink/70 leading-relaxed max-w-[200px]">
                  Our support team is ready to assist you at every step.
                </p>
                <div className="w-10 h-10 rounded-full bg-[#f4f7fb] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-ink" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-1.5 border border-[#3e8914] text-[#3e8914] rounded-lg py-2.5 text-[12px] font-bold hover:bg-[#3e8914]/5 transition-colors">
                  <Phone className="w-3.5 h-3.5" /> Call Now
                </button>
                <button className="flex items-center justify-center gap-1.5 bg-[#25D366] text-white rounded-lg py-2.5 text-[12px] font-bold hover:bg-[#20b858] transition-colors">
                  <MessageSquare className="w-3.5 h-3.5 fill-current" /> Chat on WhatsApp
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicePage;
