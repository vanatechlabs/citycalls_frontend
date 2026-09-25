"use client";

import { CheckCircle2, Copy, CalendarDays, Send, Settings, Calendar, MapPin, Phone, ShieldCheck, HeadphonesIcon, Shield, ThumbsUp, MessageSquare, ArrowRight, X } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface Step5Props {
  onClose: () => void;
}

export function Step5({ onClose }: Step5Props) {
  const bookingId = "CC2506250187";

  return (
    <div className="flex flex-col items-center h-full w-full max-w-3xl mx-auto overflow-y-auto pb-6">
      {/* Success Lottie Animation */}
      <div className="w-32 h-32 mb-2">
        <DotLottieReact
          src="https://lottie.host/9e55030f-8b01-4aa4-9327-71baf241c785/G9A5gQun0i.lottie"
          loop
          autoplay
        />
      </div>

      <div className="text-center mb-6">
        <h2 className="text-[20px] font-bold text-[#3e8914] mb-1">Thank You!</h2>
        <h3 className="text-[14px] font-bold text-ink mb-2">Your booking has been confirmed.</h3>
        <p className="text-[11px] text-ink/70 font-medium max-w-sm mx-auto leading-relaxed mb-4">
          We've received your request and our expert will be there within the selected time slot.
        </p>

        <div className="inline-flex flex-col items-center justify-center p-4 px-6 bg-[#f2f9f1] border border-[#3e8914]/20 rounded-lg">
          <span className="text-[12px] font-bold text-[#3e8914] block mb-1.5">Your Booking ID</span>
          <div className="flex items-center gap-2 bg-white border border-dashed border-[#3e8914]/40 px-3 py-1.5 rounded shadow-sm">
            <span className="text-[16px] font-bold text-[#3e8914] tracking-wide">{bookingId}</span>
            <button className="p-1 hover:bg-[#3e8914]/10 rounded text-[#3e8914] transition-colors" title="Copy ID">
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="w-full border border-black/10 rounded-lg p-4 mb-5 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-black/5">
          <CalendarDays className="w-3.5 h-3.5 text-ink/60" />
          <h4 className="text-[12px] font-bold text-ink">Booking Summary</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          {/* Left Column */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start">
              <div className="flex items-center gap-1.5 w-24 md:w-28 shrink-0 mt-0.5 text-ink/60">
                <Settings className="w-3 h-3" />
                <span className="text-[10px] font-bold">Service</span>
              </div>
              <span className="text-[11px] font-medium text-ink break-words flex-1">Microwave & Oven Repair</span>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center gap-1.5 w-24 md:w-28 shrink-0 mt-0.5 text-ink/60">
                <span className="text-[10px] font-bold ml-[18px]">Brand</span>
              </div>
              <span className="text-[11px] font-medium text-ink break-words flex-1">LG</span>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center gap-1.5 w-24 md:w-28 shrink-0 mt-0.5 text-ink/60">
                <span className="text-[10px] font-bold ml-[18px]">Model</span>
              </div>
              <span className="text-[11px] font-medium text-ink/70 break-words flex-1">MC2886BRUM (Optional)</span>
            </div>

            <div className="flex items-start">
              <div className="flex items-center gap-1.5 w-24 md:w-28 shrink-0 mt-0.5 text-ink/60">
                <MapPin className="w-3 h-3" />
                <span className="text-[10px] font-bold">Address</span>
              </div>
              <span className="text-[11px] font-medium text-ink leading-relaxed break-words flex-1">
                123, Green Park, Near Metro Station, New Delhi, Delhi - 110016
              </span>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start">
              <div className="flex items-center gap-1.5 w-24 md:w-28 shrink-0 mt-0.5 text-ink/60">
                <Calendar className="w-3 h-3" />
                <span className="text-[10px] font-bold">Date</span>
              </div>
              <span className="text-[11px] font-medium text-ink break-words flex-1">Wednesday, 25 June 2025</span>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center gap-1.5 w-24 md:w-28 shrink-0 mt-0.5 text-ink/60">
                <span className="text-[10px] font-bold ml-[18px]">Time Slot</span>
              </div>
              <span className="text-[11px] font-medium text-[#4B1426] break-words flex-1">01:00 PM - 03:00 PM</span>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center gap-1.5 w-24 md:w-28 shrink-0 mt-0.5 text-ink/60">
                <span className="text-[10px] font-bold ml-[18px]">Duration</span>
              </div>
              <span className="text-[11px] font-medium text-ink break-words flex-1">Estimated 60 - 90 minutes</span>
            </div>

            <div className="flex items-start">
              <div className="flex items-center gap-1.5 w-24 md:w-28 shrink-0 mt-0.5 text-ink/60">
                <Phone className="w-3 h-3" />
                <span className="text-[10px] font-bold">Contact</span>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <span className="text-[11px] font-medium text-ink flex items-center gap-1.5 break-words">
                  <Phone className="w-3 h-3 text-[#3e8914]" /> +91 74288 08884
                </span>
                <span className="text-[11px] font-medium text-ink flex items-center gap-1.5 break-words">
                  <MessageSquare className="w-3 h-3 text-green-500" /> +91 74288 08884
                </span>
                <span className="text-[11px] font-medium text-blue-600 break-words">
                  rahul.sharma@email.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="w-full bg-[#f4f7fb] rounded-lg p-3 grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-3 h-3 text-blue-600" />
          </div>
          <div className="flex-1">
            <h5 className="text-[10px] font-bold text-ink leading-tight">Verified Pros</h5>
            <p className="text-[9px] text-ink/70 leading-tight">Background checked</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <HeadphonesIcon className="w-3 h-3 text-blue-600" />
          </div>
          <div className="flex-1">
            <h5 className="text-[10px] font-bold text-ink leading-tight">On-Time</h5>
            <p className="text-[9px] text-ink/70 leading-tight">Punctual service</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <Shield className="w-3 h-3 text-blue-600" />
          </div>
          <div className="flex-1">
            <h5 className="text-[10px] font-bold text-ink leading-tight">Safe & Secure</h5>
            <p className="text-[9px] text-ink/70 leading-tight">Complete protection</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <ThumbsUp className="w-3 h-3 text-blue-600" />
          </div>
          <div className="flex-1">
            <h5 className="text-[10px] font-bold text-ink leading-tight">Guaranteed</h5>
            <p className="text-[9px] text-ink/70 leading-tight">100% satisfaction</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col sm:flex-row gap-3 mt-auto">
        <button className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-[#25D366] text-[#25D366] px-4 py-2 rounded font-bold text-[12px] hover:bg-[#25D366]/5 transition-colors shadow-sm cursor-pointer">
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          Share on WhatsApp
        </button>
        <button onClick={onClose} className="flex-[2] flex items-center justify-center gap-1.5 bg-[#3e8914] text-white px-4 py-2 rounded font-bold text-[12px] hover:bg-[#347311] transition-colors shadow-sm cursor-pointer">
          Close
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
