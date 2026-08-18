import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { findService } from "@/data/services";
import { BookingSidebar } from "./BookingSidebar";
import { BookingStepper } from "./BookingStepper";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import { useState, useEffect } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceSlug: string;
}

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: "easeInOut", delay: 0.4 },
      opacity: { duration: 0.3, delay: 0.4 },
    },
  },
} as any;

export function BookingModal({ isOpen, onClose, serviceSlug }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const service = findService(serviceSlug);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.97, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[95vw] max-w-[1000px] h-[90vh] bg-white rounded-md overflow-hidden flex flex-col md:flex-row"
            style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors z-10 shadow-sm"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
            
            {/* Left Sidebar */}
            <div className="w-[30%] min-w-[280px] hidden md:block border-r border-black/5 bg-[#f7fcf8]">
              <BookingSidebar step={step} />
            </div>

            {/* Right Content */}
            <div 
              data-lenis-prevent
              className={`flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 pt-4 md:pt-6 lg:pt-6 relative [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#3e8914]/40 hover:[&::-webkit-scrollbar-thumb]:bg-[#3e8914]/60 [&::-webkit-scrollbar-thumb]:rounded-full ${step === 5 ? 'p-0 md:p-0 lg:p-0' : ''}`}>
              
              <div className="absolute top-1 right-16 z-10 pointer-events-none">
                <DotLottieReact src="https://lottie.host/b43fbb7e-5f4c-420a-b516-1e9cd26810ec/gf22SDhjCv.lottie" loop autoplay className="w-[70px] h-[70px]" />
              </div>

              {step !== 5 && (
                <>
                  <div className="mb-5">
                    <h2 className="text-[22px] font-sans font-black uppercase tracking-tight text-ink leading-tight flex items-center flex-wrap gap-x-1">
                      <span>Book a</span>
                      <span className="text-[#3e8914] relative inline-block">
                        Service
                        {/* Animated underline */}
                        <motion.svg
                          className="absolute -bottom-1 left-0 w-full h-2.5"
                          viewBox="0 0 150 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          initial="hidden"
                          animate="visible"
                        >
                          <motion.path
                            d="M0 8 L 150 8"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            variants={pathVariants}
                          />
                        </motion.svg>
                      </span>
                      {service && (
                        <span className="text-[16px] text-[#0D47A1] mt-0.5 whitespace-nowrap">
                          - {service.name}
                        </span>
                      )}
                    </h2>
                    <p className="text-ink/60 text-xs mt-1.5 font-medium">
                      Verified technicians <span className="inline-block w-1 h-1 rounded-full bg-black/20 mx-1 align-middle" /> Same-day service available
                    </p>
                  </div>
                  
                  <BookingStepper step={step} />
                </>
              )}

              <div className={step !== 5 ? "mt-6" : "mt-0"}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step === 1 && <Step1 onNext={() => setStep(2)} />}
                    {step === 2 && <Step2 onBack={() => setStep(1)} onNext={() => setStep(3)} />}
                    {step === 3 && <Step3 onBack={() => setStep(2)} onSubmit={() => setStep(4)} />}
                    {step === 4 && <Step4 onBack={() => setStep(3)} onEditStep={(s) => setStep(s)} onSubmit={() => setStep(5)} />}
                    {step === 5 && <Step5 onClose={onClose} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
