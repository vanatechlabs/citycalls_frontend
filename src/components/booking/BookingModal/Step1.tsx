"use client";

import { Lock, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step1Props {
  onNext?: () => void;
}

export function Step1({ onNext }: Step1Props) {
  const [otpState, setOtpState] = useState<'idle' | 'sent' | 'verified'>('idle');
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", whatsapp: "", altNumber: "", address: "", city: "", state: "", pincode: "", language: "English", source: "", reference: "", instructions: "", otp: ""
  });
  
  const upd = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSendOtp = () => {
    if (form.whatsapp.length >= 10) setOtpState('sent');
  };

  const handleVerify = () => {
    if (form.otp.length > 0) {
      setOtpState('verified');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext) onNext();
  };

  return (
    <div 
      className="rounded-xl overflow-hidden bg-white mt-1 relative"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
    >
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#3e8914] text-white px-4 py-2 rounded-full shadow-lg shadow-black/10 flex items-center gap-2 z-50 text-[11px] font-bold"
          >
            <div className="bg-white rounded-full p-0.5">
              <Check className="w-3 h-3 text-[#3e8914]" strokeWidth={3} />
            </div>
            Phone number Verified Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-4 pt-3 pb-4 md:px-5 md:pt-3 md:pb-5">
        <h3 className="text-[14px] font-bold text-ink">Personal Information</h3>
        <p className="text-ink/60 text-[11px] mt-0.5 mb-4 font-medium">
          Please provide your details so we can reach you easily
        </p>

        <form id="step1-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">Full Name <span className="text-red-500">*</span></label>
              <input required type="text" placeholder="Enter your full name" className="w-full border border-black/20 rounded px-3 py-1.5 text-[12px] outline-none focus:border-primary-dark transition-colors font-medium placeholder:font-normal placeholder:text-ink/40" value={form.name} onChange={e => upd("name", e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">Email Address <span className="text-red-500">*</span></label>
              <input required type="email" placeholder="Enter your email address" className="w-full border border-black/20 rounded px-3 py-1.5 text-[12px] outline-none focus:border-primary-dark transition-colors font-medium placeholder:font-normal placeholder:text-ink/40" value={form.email} onChange={e => upd("email", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">Phone number <span className="text-red-500">*</span></label>
              <div className={`flex items-center border ${otpState === 'verified' ? 'border-[#3e8914]/50 bg-[#3e8914]/5' : 'border-black/20 bg-white'} rounded overflow-hidden focus-within:border-primary-dark transition-colors`}>
                
                {otpState !== 'sent' && (
                  <select className="bg-transparent px-2 py-1.5 border-r border-black/20 text-[12px] outline-none cursor-pointer font-medium text-ink h-full shrink-0" disabled={otpState === 'verified'}>
                    <option>+91</option>
                  </select>
                )}
                
                {otpState === 'sent' ? (
                  <input autoFocus type="text" placeholder="Enter OTP" maxLength={6} className="flex-1 min-w-0 px-3 py-1.5 text-[12px] outline-none font-medium text-center tracking-widest placeholder:tracking-normal placeholder:font-normal placeholder:text-ink/40" value={form.otp} onChange={e => upd("otp", e.target.value.replace(/\D/g, ""))} />
                ) : (
                  <input required type="tel" placeholder="Enter your phone number" className="flex-1 min-w-0 px-2 py-1.5 text-[12px] outline-none font-medium bg-transparent placeholder:font-normal placeholder:text-ink/40" value={form.whatsapp} onChange={e => upd("whatsapp", e.target.value.replace(/\D/g, ""))} disabled={otpState === 'verified'} />
                )}

                {otpState === 'idle' && (
                  <button type="button" onClick={handleSendOtp} className={`text-[10px] font-bold text-white transition-colors px-2 py-1 shrink-0 whitespace-nowrap rounded-[4px] m-0.5 ${form.whatsapp.length >= 10 ? 'bg-[#3e8914] hover:bg-[#347311]' : 'bg-black/20 cursor-not-allowed'}`}>
                    Send OTP
                  </button>
                )}

                {otpState === 'sent' && (
                  <button type="button" onClick={handleVerify} className={`text-[10px] font-bold text-white transition-colors px-3 py-1 shrink-0 whitespace-nowrap rounded-[4px] m-0.5 ${form.otp.length > 0 ? 'bg-[#3e8914] hover:bg-[#347311]' : 'bg-black/20 cursor-not-allowed'}`}>
                    Verify
                  </button>
                )}

                {otpState === 'verified' && (
                  <div className="px-2 shrink-0 flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#3e8914]" strokeWidth={3} />
                  </div>
                )}
              </div>
              <p className="text-[10px] text-red-500 mt-1 font-medium">We will contact you on this phone number</p>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">Alternate Number (Optional)</label>
              <div className="flex items-center border border-black/20 rounded overflow-hidden focus-within:border-primary-dark transition-colors bg-white">
                <select className="bg-transparent px-2 border-r border-black/20 text-[12px] outline-none cursor-pointer font-medium text-ink">
                  <option>+91</option>
                </select>
                <input type="tel" placeholder="Enter alternate number" className="flex-1 px-3 py-1.5 text-[12px] outline-none font-medium placeholder:font-normal placeholder:text-ink/40" value={form.altNumber} onChange={e => upd("altNumber", e.target.value.replace(/\D/g, ""))} />
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-[11px] font-bold text-ink mb-1.5">Complete Address <span className="text-red-500">*</span></label>
            <input required type="text" placeholder="House / Flat / Building, Street, Area" className="w-full border border-black/20 rounded px-3 py-1.5 text-[12px] outline-none focus:border-primary-dark transition-colors font-medium placeholder:font-normal placeholder:text-ink/40" value={form.address} onChange={e => upd("address", e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">Pincode <span className="text-red-500">*</span></label>
              <input required type="text" placeholder="Enter pincode" className="w-full border border-black/20 rounded px-3 py-1.5 text-[12px] outline-none focus:border-primary-dark transition-colors font-medium placeholder:font-normal placeholder:text-ink/40" value={form.pincode} onChange={e => upd("pincode", e.target.value.replace(/\D/g, ""))} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">City <span className="text-red-500">*</span></label>
              <input required type="text" placeholder="Enter your city" className="w-full border border-black/20 rounded px-3 py-1.5 text-[12px] outline-none focus:border-primary-dark transition-colors font-medium placeholder:font-normal placeholder:text-ink/40" value={form.city} onChange={e => upd("city", e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">State <span className="text-red-500">*</span></label>
              <select required className="w-full border border-black/20 rounded px-3 py-1.5 text-[12px] outline-none focus:border-primary-dark transition-colors font-medium cursor-pointer" value={form.state} onChange={e => upd("state", e.target.value)}>
                <option value="" disabled hidden className="text-ink/40">Select your state</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="DL">Delhi</option>
                <option value="HR">Haryana</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">Preferred Language</label>
              <select className="w-full border border-black/20 rounded px-3 py-1.5 text-[12px] outline-none focus:border-primary-dark transition-colors font-medium cursor-pointer" value={form.language} onChange={e => upd("language", e.target.value)}>
                <option value="" disabled hidden className="text-ink/40">Select language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">How did you hear about us?</label>
              <select className="w-full border border-black/20 rounded px-3 py-1.5 text-[12px] outline-none focus:border-primary-dark transition-colors font-medium cursor-pointer" value={form.source} onChange={e => upd("source", e.target.value)}>
                <option value="" disabled hidden className="text-ink/40">Select an option</option>
                <option value="Google">Google</option>
                <option value="Facebook">Facebook</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Just Dial">Just Dial</option>
                <option value="TradeMart">TradeMart</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(form.source === 'Friend' || form.source === 'Other') && (
              <div>
                <label className="block text-[11px] font-bold text-ink mb-1.5">Name (for reference) <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="Enter name for reference" className="w-full border border-black/20 rounded px-3 py-1.5 text-[12px] outline-none focus:border-primary-dark transition-colors font-medium placeholder:font-normal placeholder:text-ink/40" value={form.reference} onChange={e => upd("reference", e.target.value)} />
              </div>
            )}
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">Any instructions for us? (Optional)</label>
              <input type="text" placeholder="e.g. Gate number, landmark, floor number etc." className="w-full border border-black/20 rounded px-3 py-1.5 text-[12px] outline-none focus:border-primary-dark transition-colors font-medium placeholder:font-normal placeholder:text-ink/40" value={form.instructions} onChange={e => upd("instructions", e.target.value)} />
            </div>
          </div>
        </form>
      </div>
      
      {/* Footer of the box */}
      <div className="border-t border-black/5 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-black/[0.01]">
        <div className="flex items-center gap-2 text-blue-600 justify-center pb-4">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span className="text-[11px] font-medium">Your information is 100% secure and will never be shared.</span>
        </div>
        <button form="step1-form" type="submit" className="bg-[#3e8914] text-white px-6 py-2 rounded font-bold text-[13px] shadow-sm hover:bg-[#347311] transition-colors flex items-center justify-center gap-2 shrink-0">
          Next Step
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
