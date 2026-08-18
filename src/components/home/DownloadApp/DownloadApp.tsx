import { motion, useInView } from "framer-motion";
import { Apple, Play, Smartphone } from "lucide-react";
import { useRef } from "react";

export function DownloadApp() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="bg-background">
      <div className="container-x pb-10 pt-2">
        <div className="relative overflow-hidden rounded-2xl bg-ink text-white pl-7 pb-7 pt-5 pr-4 md:pl-10 md:pb-10 md:pt-8 md:pr-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center border border-white/10">
          {/* subtle ambient glow, no loud gradient */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
                className="h-px w-6 bg-primary"
              />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                Get the app
              </span>
            </div>

            <h2 className="text-2xl md:text-[28px] font-semibold leading-snug tracking-tight">
              Book, track &amp; reschedule
              <br />
              all from your phone.
            </h2>

            <p className="mt-3 text-white/55 text-[13.5px] leading-relaxed max-w-sm">
              Live technician tracking, one-tap rebooking, digital invoices, and exclusive
              app-only offers.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="group inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 hover:bg-white/[0.08] hover:border-white/25 transition-colors duration-200"
                >
                  <Apple size={20} className="text-white/80 group-hover:text-white transition-colors" />
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-wider text-white/40">
                      Download on
                    </div>
                    <div className="text-[13px] font-semibold">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="group inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 hover:bg-white/[0.08] hover:border-white/25 transition-colors duration-200"
                >
                  <Play size={18} className="text-white/80 group-hover:text-white transition-colors" />
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-wider text-white/40">Get it on</div>
                    <div className="text-[13px] font-semibold">Google Play</div>
                  </div>
                </a>
              </div>

              {/* Big QR Code Container */}
              <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl p-3.5 pr-6 shadow-xl backdrop-blur-md">
                <div className="w-24 h-24 bg-white rounded-xl p-2 flex items-center justify-center shrink-0 shadow-md">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://citycalls.in/app"
                    alt="Scan to Download App"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/20 border border-primary/30 px-2 py-0.5 rounded-full inline-block mb-1.5">
                    Quick Scan
                  </span>
                  <div className="text-[14px] font-bold text-white leading-tight">Scan QR Code</div>
                  <div className="text-[11px] text-white/70 mt-1 max-w-[140px] leading-snug">
                    Point your camera to download app directly
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, rotate: -4 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
                : {}
            }
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex justify-center z-10"
          >
            <div className="relative w-52 h-[360px] rounded-[1.8rem] bg-white/[0.03] border border-white/15 p-2 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)]">
              <div className="h-full w-full rounded-[1.4rem] bg-white overflow-hidden">
                <div className="h-[30%] bg-ink p-4 text-white flex flex-col justify-between overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5, ease: "backOut" }}
                  >
                    <Smartphone size={16} className="text-primary" />
                  </motion.div>
                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%", opacity: 0 }}
                      animate={isInView ? { y: "0%", opacity: 1 } : {}}
                      transition={{ duration: 0.45, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[10px] text-white/50"
                    >
                      Hi, Rohit
                    </motion.div>
                    <div className="overflow-hidden mt-0.5">
                      <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={isInView ? { y: "0%", opacity: 1 } : {}}
                        transition={{ duration: 0.45, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                        className="font-semibold text-[13px] leading-snug"
                      >
                        What needs fixing today?
                      </motion.div>
                    </div>
                  </div>
                </div>
                <div className="p-3 space-y-1.5">
                  {["AC Service", "Sofa Cleaning", "Pest Control", "Salon at Home"].map((x, i) => (
                    <motion.div
                      key={x}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.35, delay: 0.8 + i * 0.08, ease: "easeOut" }}
                      className="rounded-lg bg-black/[0.03] h-9 flex items-center px-3 text-[12px] font-medium text-ink"
                    >
                      {x}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}