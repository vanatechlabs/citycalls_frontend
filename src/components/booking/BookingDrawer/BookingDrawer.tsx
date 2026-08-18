import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { useBooking } from "@/context/BookingContext";
import {
  StepConfirmation,
  StepCustomer,
  StepPayment,
  StepCart,
  StepSlot,
  Stepper,
  validateStep,
} from "@/components/booking/steps/steps";

const stepTitles = ["Cart", "Your Details", "Pick Slot", "Payment", "Done"];

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

export function BookingDrawer() {
  const { open, closeDrawer, step, next, prev, data, setData, confirm, bookingId, reset } = useBooking();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setError(null), [step, open]);

  const handleNext = () => {
    const err = validateStep(step, data);
    if (err) return setError(err);
    if (step === 3) confirm(); // Move to confirmation after payment
    else next();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 280 }}
            className="fixed left-0 top-0 h-full w-full max-w-[400px] bg-background z-[999] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-ink px-6 pt-5 pb-4">
              {/* Subtle radial decoration */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{ background: "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)" }}
              />

              {/* Close Button */}
              <button
                onClick={closeDrawer}
                aria-label="Close"
                className="absolute top-3 right-3 z-50 grid place-items-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X size={16} className="text-white" />
              </button>

              <div className="relative z-10 pr-8">
                <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-semibold tracking-widest uppercase mb-1.5">
                  <CalendarDays className="w-3 h-3" />
                  CityCalls
                </div>

                <h2 className="text-xl font-serif font-black uppercase tracking-tight text-white leading-tight">
                  Book a{" "}
                  <span className="text-primary relative inline-block">
                    Service
                    <motion.svg
                      className="absolute -bottom-1 left-0 w-full h-2.5"
                      viewBox="0 0 150 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.path
                        d="M2 8C40 2, 110 2, 148 8"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        variants={pathVariants}
                      />
                    </motion.svg>
                  </span>
                  {" "}<span className="text-white text-lg font-normal normal-case tracking-normal">— {stepTitles[step]}</span>
                </h2>
                <p className="text-white text-[11px] mt-1.5 font-medium leading-tight">
                  Verified technicians • Same-day service available
                </p>
              </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto px-7 py-6 bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  {step === 0 && <StepCart />}
                  {step === 1 && <StepCustomer data={data} onChange={setData} />}
                  {step === 2 && <StepSlot data={data} onChange={setData} />}
                  {step === 3 && <StepPayment data={data} />}
                  {step === 4 && bookingId && (
                    <StepConfirmation data={data} bookingId={bookingId} />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {step === 0 ? (
              <div className="px-5 py-3 bg-white border-t border-black/5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[13px] font-medium text-ink">Subtotal</span>
                  <span className="text-[15px] font-bold text-ink">
                    Rs.{(data.cart || []).reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)}
                  </span>
                </div>
                {(data.cart && data.cart.length > 0) && (
                  <div className="flex justify-between items-center bg-green-50 px-2.5 py-1 rounded mb-2">
                    <span className="text-[11px] font-semibold text-green-700">You saved</span>
                    <span className="text-[11px] font-bold text-green-700">
                      Rs.{(data.cart || []).reduce((acc, curr) => acc + (Math.round(curr.price * 0.2) * curr.quantity), 0)}
                    </span>
                  </div>
                )}
                <p className="text-[10px] text-red-500 mb-2 font-medium">Shipping and taxes calculated at checkout.</p>
                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-ink px-5 py-2.5 rounded-md text-sm font-bold transition-colors"
                >
                  Proceed to Checkout <ChevronRight size={15} />
                </button>
              </div>
            ) : (
              <div className="px-5 py-3 border-t border-black/20 bg-[#faf9f8] flex items-center gap-3">
                {step > 0 && step < 4 && (
                  <button
                    onClick={prev}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
                  >
                    <ChevronLeft size={14} /> Back
                  </button>
                )}
                <div className="flex-1" />
                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 bg-ink hover:bg-ink/90 text-primary px-6 py-2.5 rounded-md text-sm font-medium transition-colors"
                  >
                    {step === 3 ? "Pay Now" : "Continue"}
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => { reset(); closeDrawer(); }}
                    className="inline-flex items-center bg-ink text-primary px-6 py-2.5 rounded-md text-sm font-medium"
                  >
                    Done
                  </button>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
