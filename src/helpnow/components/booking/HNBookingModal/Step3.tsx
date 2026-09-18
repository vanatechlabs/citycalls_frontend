import { Lock, ArrowRight, ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step3Props {
  onBack?: () => void;
  onNext?: () => void;
}

export function Step3({ onBack, onNext }: Step3Props) {
  const [otpState, setOtpState] = useState<"idle" | "sent" | "verified">("idle");
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    altNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    language: "English",
    source: "",
    instructions: "",
    otp: "",
  });

  const upd = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSendOtp = () => {
    if (form.phone.length >= 10) setOtpState("sent");
  };

  const handleVerify = () => {
    if (form.otp.length > 0) {
      setOtpState("verified");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext) onNext();
  };

  return (
    <div className="bg-white mt-1 relative border border-slate-200">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50 text-[11px] font-bold"
          >
            <div className="bg-white rounded-full p-0.5">
              <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
            </div>
            Phone number Verified Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-4 pt-4 pb-5 md:px-6 md:pt-4 md:pb-6">
        <h3 className="text-[16px] font-bold text-slate-900">Personal Information</h3>
        <p className="text-slate-500 text-[11px] mt-0.5 mb-4 font-medium">
          Please provide your details so we can reach you easily
        </p>

        <form id="step3-form" onSubmit={handleSubmit} className="space-y-3.5">
          {/* Full Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-900 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] font-medium"
                value={form.name}
                onChange={(e) => upd("name", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-900 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                placeholder="Enter your email address"
                className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] font-medium"
                value={form.email}
                onChange={(e) => upd("email", e.target.value)}
              />
            </div>
          </div>

          {/* Phone Number with OTP & Alternate Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-900 mb-1">
                Phone number <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex items-center border ${
                  otpState === "verified"
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-300 bg-white"
                } focus-within:border-[#f5a623] transition-colors`}
              >
                {otpState !== "sent" && (
                  <select
                    className="bg-transparent px-2 py-2 border-r border-slate-300 text-[12px] outline-none cursor-pointer font-medium text-slate-900"
                    disabled={otpState === "verified"}
                  >
                    <option>+91</option>
                  </select>
                )}

                {otpState === "sent" ? (
                  <input
                    autoFocus
                    type="text"
                    placeholder="Enter OTP"
                    maxLength={6}
                    className="flex-1 min-w-0 px-3 py-2 text-[12px] outline-none font-medium text-center tracking-widest"
                    value={form.otp}
                    onChange={(e) => upd("otp", e.target.value.replace(/\D/g, ""))}
                  />
                ) : (
                  <input
                    required
                    type="tel"
                    placeholder="Enter your phone number"
                    className="flex-1 min-w-0 px-2 py-2 text-[12px] outline-none font-medium bg-transparent"
                    value={form.phone}
                    onChange={(e) => upd("phone", e.target.value.replace(/\D/g, ""))}
                    disabled={otpState === "verified"}
                  />
                )}

                {otpState === "idle" && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className={`text-[10px] font-bold text-white transition-colors px-3 py-1.5 shrink-0 whitespace-nowrap m-0.5 ${
                      form.phone.length >= 10
                        ? "bg-[#f5a623] hover:bg-[#e0951a] cursor-pointer"
                        : "bg-slate-300 cursor-not-allowed"
                    }`}
                  >
                    Send OTP
                  </button>
                )}

                {otpState === "sent" && (
                  <button
                    type="button"
                    onClick={handleVerify}
                    className={`text-[10px] font-bold text-white transition-colors px-3 py-1.5 shrink-0 whitespace-nowrap m-0.5 ${
                      form.otp.length > 0
                        ? "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                        : "bg-slate-300 cursor-not-allowed"
                    }`}
                  >
                    Verify
                  </button>
                )}

                {otpState === "verified" && (
                  <div className="px-2 shrink-0 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} />
                  </div>
                )}
              </div>
              <p className="text-[9.5px] text-slate-400 font-normal mt-1">
                We will contact you on this phone number
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-900 mb-1">
                Alternate Number (Optional)
              </label>
              <div className="flex items-center border border-slate-300 bg-white focus-within:border-[#f5a623]">
                <select className="bg-transparent px-2 py-2 border-r border-slate-300 text-[12px] outline-none cursor-pointer font-medium text-slate-900">
                  <option>+91</option>
                </select>
                <input
                  type="tel"
                  placeholder="Enter alternate number"
                  className="flex-1 min-w-0 px-2 py-2 text-[12px] outline-none font-medium bg-transparent"
                  value={form.altNumber}
                  onChange={(e) => upd("altNumber", e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>
          </div>

          {/* Complete Address */}
          <div>
            <label className="block text-[11px] font-bold text-slate-900 mb-1">
              Complete Address <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="House / Flat / Building, Street, Area"
              className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] font-medium"
              value={form.address}
              onChange={(e) => upd("address", e.target.value)}
            />
          </div>

          {/* Pincode, City, State */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-900 mb-1">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="Enter pincode"
                className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] font-medium"
                value={form.pincode}
                onChange={(e) => upd("pincode", e.target.value.replace(/\D/g, ""))}
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-900 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="Enter your city"
                className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] font-medium"
                value={form.city}
                onChange={(e) => upd("city", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-900 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] font-medium cursor-pointer bg-white"
                value={form.state}
                onChange={(e) => upd("state", e.target.value)}
              >
                <option value="" disabled hidden>Select your state</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="DL">Delhi</option>
                <option value="HR">Haryana</option>
                <option value="MH">Maharashtra</option>
                <option value="KA">Karnataka</option>
              </select>
            </div>
          </div>

          {/* Language & How did you hear */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-900 mb-1">
                Preferred Language
              </label>
              <select
                className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] font-medium cursor-pointer bg-white"
                value={form.language}
                onChange={(e) => upd("language", e.target.value)}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-900 mb-1">
                How did you hear about us?
              </label>
              <select
                className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] font-medium cursor-pointer bg-white"
                value={form.source}
                onChange={(e) => upd("source", e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="Google">Google Search</option>
                <option value="Social Media">Social Media</option>
                <option value="Referral">Friend / Referral</option>
                <option value="Newspaper">Newspaper / Banner</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Any instructions */}
          <div>
            <label className="block text-[11px] font-bold text-slate-900 mb-1">
              Any instructions for us? (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Gate number, landmark, floor number etc."
              className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] font-medium"
              value={form.instructions}
              onChange={(e) => upd("instructions", e.target.value)}
            />
          </div>

          {/* Security Banner */}
          <div className="bg-[#fff6e8]/60 border border-[#f5a623]/30 p-2.5 flex items-center justify-center gap-2 text-center">
            <Lock className="w-3.5 h-3.5 text-[#b5730f] shrink-0" />
            <span className="text-[11px] font-semibold text-[#b5730f]">
              Your information is 100% secure and will never be shared.
            </span>
          </div>
        </form>
      </div>

      {/* Footer Nav */}
      <div className="border-t border-slate-200 p-4 flex items-center justify-between bg-slate-50">
        <button
          type="button"
          onClick={onBack}
          className="border border-slate-300 bg-white text-slate-700 px-4 py-2 font-bold text-[11px] uppercase tracking-wider hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <button
          form="step3-form"
          type="submit"
          className="bg-[#f5a623] hover:bg-[#e0951a] text-white px-6 py-2.5 font-bold text-[12px] uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
        >
          Continue to Review
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
