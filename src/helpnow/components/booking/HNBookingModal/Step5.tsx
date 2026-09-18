import { useState } from "react";
import { CreditCard, QrCode, Building2, Banknote, ShieldCheck, Check, Sparkles } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface Step5Props {
  onClose?: () => void;
}

export function Step5({ onClose }: Step5Props) {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[420px]">
        <div className="w-24 h-24 mb-4">
          <DotLottieReact
            src="https://lottie.host/b43fbb7e-5f4c-420a-b516-1e9cd26810ec/gf22SDhjCv.lottie"
            loop={false}
            autoplay
          />
        </div>

        <div className="inline-block bg-[#fff6e8] text-[#b5730f] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-[#f5a623]/30">
          Booking Confirmed!
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-1">
          Maid Service Booked Successfully!
        </h3>
        <p className="text-slate-500 text-xs max-w-sm mb-6 leading-relaxed">
          Your booking ID is <strong className="text-slate-900">#HN-89412</strong>. Our background-verified maid details and live tracking link have been sent via SMS & WhatsApp.
        </p>

        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-left w-full max-w-sm mb-6 text-[12px] space-y-1.5">
          <div className="flex justify-between text-slate-600">
            <span>Service:</span>
            <span className="font-semibold text-slate-900">HelpNow Maid Cleaning</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Date & Slot:</span>
            <span className="font-semibold text-slate-900">Today · 09:00 AM - 12:00 PM</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Amount Paid:</span>
            <span className="font-bold text-emerald-600">₹605 (UPI Paid)</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="bg-[#f5a623] hover:bg-[#e0951a] text-white px-8 py-3 rounded-md font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer"
        >
          Back to Homepage
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-none overflow-hidden bg-white mt-1 relative border border-slate-200"
      style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 1px 3px 0px" }}
    >
      <div className="px-4 pt-4 pb-5 md:px-6 md:pt-4 md:pb-6">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#f5a623]" />
              Select Payment Method
            </h3>
            <p className="text-slate-500 text-[11px] mt-0.5 font-medium">
              100% Encrypted & Safe Payment Gateway
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Total</span>
            <div className="text-base font-black text-slate-900">₹605</div>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              id: "upi",
              name: "UPI / Instant QR",
              desc: "Google Pay, PhonePe, Paytm, BHIM UPI",
              icon: QrCode,
              recommended: true,
            },
            {
              id: "card",
              name: "Credit / Debit Card",
              desc: "Visa, Mastercard, RuPay, Maestro",
              icon: CreditCard,
            },
            {
              id: "netbanking",
              name: "Net Banking",
              desc: "All major Indian banks supported",
              icon: Building2,
            },
            {
              id: "cod",
              name: "Pay After Service",
              desc: "Pay cash or UPI after maid finishes work",
              icon: Banknote,
            },
          ].map((m) => {
            const Icon = m.icon;
            const active = paymentMethod === m.id;
            return (
              <button
                type="button"
                key={m.id}
                onClick={() => setPaymentMethod(m.id)}
                className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-left ${
                  active
                    ? "border-[#f5a623] bg-[#fff6e8]/70 text-slate-900 font-bold shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 font-medium hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      active ? "bg-[#f5a623] text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold flex items-center gap-2">
                      {m.name}
                      {m.recommended && (
                        <span className="bg-emerald-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                          Fastest
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal mt-0.5">{m.desc}</div>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    active ? "border-[#f5a623] bg-[#f5a623] text-white" : "border-slate-300 bg-white"
                  }`}
                >
                  {active && <Check className="w-3 h-3" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Nav */}
      <div className="border-t border-slate-200 p-4 flex items-center justify-between bg-slate-50">
        <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Protected by 256-bit SSL encryption</span>
        </div>

        <button
          type="button"
          onClick={handlePay}
          className="bg-[#f5a623] hover:bg-[#e0951a] text-white px-8 py-3 rounded-md font-bold text-[12px] uppercase tracking-wider shadow-md transition-colors flex items-center gap-2 cursor-pointer"
        >
          Pay ₹605 & Confirm
        </button>
      </div>
    </div>
  );
}
