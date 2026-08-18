import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookingStepper } from "../BookingModal/BookingStepper";
import { Step1 } from "../BookingModal/Step1";
import { Step2 } from "../BookingModal/Step2";
import { Step3 } from "../BookingModal/Step3";
import { Step4 } from "../BookingModal/Step4";
import { Step5 } from "../BookingModal/Step5";

interface Props {
  serviceSlug: string;
  onStepChange?: (step: number) => void;
}

export function BookingForm({ serviceSlug, onStepChange }: Props) {
  const [step, setStepState] = useState(1);

  const setStep = (newStep: number | ((prev: number) => number)) => {
    setStepState((prev) => {
      const nextStep = typeof newStep === 'function' ? newStep(prev) : newStep;
      if (onStepChange) onStepChange(nextStep);
      return nextStep;
    });
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden flex flex-col h-full min-h-[600px]"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}
    >
      
      {step !== 5 && (
        <div className="p-6 md:p-8 pb-0">
          <div className="mb-6">
            <h2 className="text-[22px] font-sans font-black uppercase tracking-tight text-ink leading-tight">
              Book{" "}
              <span className="text-[#3e8914] relative inline-block">
                Refrigerator Service
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
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                          pathLength: { duration: 1.2, ease: "easeInOut", delay: 0.4 },
                          opacity: { duration: 0.3, delay: 0.4 },
                        },
                      },
                    }}
                  />
                </motion.svg>
              </span>
            </h2>
            <p className="text-ink/60 text-[11px] mt-1.5 font-bold uppercase tracking-widest">
              Fast, Reliable & Secure
            </p>
          </div>
          <div className="-mb-12 relative z-10">
            <BookingStepper step={step} />
          </div>
        </div>
      )}

      <div className={`flex-1 p-6 md:p-8 pt-0 -mt-2 ${step === 5 ? 'p-0 md:p-0' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {step === 1 && <Step1 onNext={() => setStep(2)} />}
            {step === 2 && <Step2 onBack={() => setStep(1)} onNext={() => setStep(3)} />}
            {step === 3 && <Step3 onBack={() => setStep(2)} onSubmit={() => setStep(4)} />}
            {step === 4 && <Step4 onBack={() => setStep(3)} onEditStep={(s) => setStep(s)} onSubmit={() => setStep(5)} />}
            {step === 5 && <Step5 onClose={() => window.location.reload()} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
