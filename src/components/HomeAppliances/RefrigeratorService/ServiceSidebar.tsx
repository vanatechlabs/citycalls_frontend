import { Phone, CheckCircle2, MessageCircle, IndianRupee, Mail, Clock4, Headset, MapPin, Building, Building2, ChevronDown, HelpCircle } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from "react";
import z2Icon from "@/assets/icons/z2.png";

export function ServiceSidebar({ currentStep = 1 }: { currentStep?: number }) {
  return (
    <div className="space-y-6 sticky top-24">
      {/* Why Choose Us */}
      <div 
        className="bg-white rounded-xl p-5"
        style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
      >
        <h3 className="text-[14px] font-bold text-ink mb-4">Why Choose CityCalls?</h3>
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
          <div className="w-28 self-center shrink-0 relative">
            <div className="scale-[2.8] translate-x-20 origin-right">
              <DotLottieReact
                src="https://lottie.host/b43fbb7e-5f4c-420a-b516-1e9cd26810ec/gf22SDhjCv.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </div>
      </div>

      {/* Price Details - Hidden as per request */}
      {/* 
      <div 
        className="bg-white rounded-xl p-5"
        style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <IndianRupee className="w-4 h-4 text-[#3e8914]" />
          <h3 className="text-[14px] font-bold text-ink">Price Details</h3>
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
        <div className="border-t border-dashed border-black/10 pt-4 mb-4 flex justify-between items-center text-red-600">
          <span className="font-semibold text-[14px]">Total Amount</span>
          <span className="font-semibold text-[18px]">₹299</span>
        </div>
        <div className="bg-blue-50 text-blue-600 text-[11px] font-medium p-3 rounded-lg flex gap-2 leading-relaxed">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <p>Final payable amount may vary based on parts replacement (if required).</p>
        </div>
      </div>
      */}

      {/* Contact Us */}
      <div 
        className="bg-white rounded-xl p-5"
        style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
      >
        <h3 className="text-[14px] font-bold text-ink mb-4">Contact Us</h3>
        <div className="flex justify-between items-center gap-4">
          <ul className="space-y-3">
            <li className="flex items-center gap-2.5 text-[12px] font-bold text-ink">
              <Phone className="w-4 h-4 text-[#3e8914]" strokeWidth={2.5} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2.5 text-[12px] font-bold text-ink">
              <MessageCircle className="w-4 h-4 text-[#3e8914] fill-[#3e8914]" strokeWidth={2.5} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2.5 text-[12px] font-bold text-ink">
              <Mail className="w-4 h-4 text-[#3e8914]" strokeWidth={2.5} /> <span className="text-blue-600">hello@citycalls.in</span>
            </li>
            <li className="flex items-center gap-2.5 text-[12px] font-bold text-ink">
              <Clock4 className="w-4 h-4 text-[#3e8914]" strokeWidth={2.5} /> <span className="text-[#4B1426]">Mon-Sat: 9:00 AM – 8:00 PM</span>
            </li>
          </ul>
          
          <div className="flex flex-col items-center justify-center shrink-0 w-28 h-28">
            <DotLottieReact
              src="https://lottie.host/41ad0c1e-46a7-4f0b-9e22-6bbed70fff51/zSp0G89paf.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </div>

      {/* Our Service Coverage */}
      <div 
        className="bg-white rounded-xl p-5"
        style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[14px] font-bold text-ink mb-3">Our Service Coverage</h3>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#3e8914] shrink-0 mt-0.5" strokeWidth={2.5} />
              <p className="text-[12px] font-medium text-ink/70 leading-relaxed">
                All major areas in Ghaziabad<br />and nearby locations.
              </p>
            </div>
          </div>
          <img src={z2Icon} alt="Service Coverage" className="h-12 object-contain ml-4 self-end -mb-2 scale-[1.5] origin-bottom-right" />
        </div>
      </div>

      {/* Need Help Booking (Only from Step 2 onwards) */}
      {currentStep > 1 && <NeedHelpBooking />}

      {/* FAQs */}
      <FaqSection />
    </div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "Are your technicians verified?", a: "Every professional on CityCalls is background-verified, trained, and rated." },
    { q: "How long does the service take?", a: "Most of our services are completed within 60-90 minutes depending on the issue." },
    { q: "Do you use genuine spare parts?", a: "Yes, we only use 100% genuine and company-approved spare parts." },
    { q: "Do you provide warranty on service?", a: "Yes, we provide up to 30 days warranty on our repair services." }
  ];

  return (
    <div 
      className="bg-white rounded-xl p-5"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
    >
      <h3 className="text-[14px] font-bold text-ink mb-4">Frequently Asked Questions</h3>
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-black/5 rounded-lg bg-gray-50 overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-black/[0.02] transition-colors"
              >
                <span className="text-[11.5px] font-bold text-ink">{faq.q}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-ink/50 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === idx ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-3 pt-0 text-[11px] font-medium text-ink/70 leading-relaxed bg-black/[0.01]">
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NeedHelpBooking() {
  return (
    <div 
      className="bg-white rounded-xl p-5"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h3 className="text-[14px] font-bold text-ink mb-1">Need Help Booking?</h3>
          <p className="text-[11px] font-medium text-ink/70 leading-relaxed mb-4">
            Our support team is happy to assist you at every step.
          </p>
          <a href="#" className="inline-flex items-center gap-1.5 bg-[#3e8914] text-white px-4 py-2 rounded-md font-bold text-[12px] shadow-sm hover:bg-[#347311] transition-colors">
            <MessageCircle className="w-4 h-4 fill-white" />
            Chat on WhatsApp
          </a>
        </div>
        <div className="w-20 shrink-0 flex items-center justify-center relative">
          <DotLottieReact
            src="https://lottie.host/390dc42e-2a4e-491d-82be-a94b26e2ea88/jkOEDr9d1V.lottie"
            loop
            autoplay
            className="w-24 h-24 object-contain absolute right-[-20px] top-[-10px]"
          />
        </div>
      </div>
    </div>
  );
}
