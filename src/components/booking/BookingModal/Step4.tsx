import { useState } from "react";
import { ArrowLeft, Check, Lock, User, PenTool, Calendar, Info, Edit2, Image as ImageIcon, X } from "lucide-react";

interface Step4Props {
  onBack: () => void;
  onEditStep: (step: number) => void;
  onSubmit: () => void;
}

export function Step4({ onBack, onEditStep, onSubmit }: Step4Props) {
  const [showImages, setShowImages] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="mt-1 flex flex-col h-full">
      <div 
        className="rounded-xl overflow-hidden bg-white relative flex-1"
        style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
      >
        <div className="p-4 md:p-5">
          <h3 className="text-[14px] font-bold text-ink">Review Your Booking</h3>
          <p className="text-ink/60 text-[11px] mt-0.5 mb-4 font-medium">
            Please check all the details below and confirm your booking.
          </p>

          <form id="step4-form" onSubmit={handleSubmit} className="space-y-4">
            
            {/* Personal Information */}
            <div className="border border-black/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#3e8914]/10 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-[#3e8914]" />
                  </div>
                  <h4 className="text-[12px] font-bold text-ink">Personal Information</h4>
                </div>
                <button type="button" onClick={() => onEditStep(1)} className="flex items-center gap-1 text-[#3e8914] border border-[#3e8914] hover:bg-[#3e8914]/5 px-3 py-1 rounded text-[10px] font-bold transition-colors">
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {/* Left Column */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-start"><span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Full Name</span><span className="text-[11px] font-medium text-[#4B1426] break-words">Rahul Sharma</span></div>
                  <div className="flex items-start"><span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">WhatsApp No.</span><span className="text-[11px] font-medium text-ink break-words">+91 98765 43210</span></div>
                  <div className="flex items-start"><span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Email Address</span><span className="text-[11px] font-medium text-blue-600 break-words flex-1">rahul.sharma@email.com</span></div>
                  <div className="flex items-start"><span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Address</span><span className="text-[11px] font-medium text-ink leading-relaxed break-words flex-1">123, Green Park, Near Metro Station</span></div>
                </div>
                {/* Right Column */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-start"><span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">City</span><span className="text-[11px] font-medium text-ink break-words">New Delhi</span></div>
                  <div className="flex items-start"><span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">State</span><span className="text-[11px] font-medium text-ink break-words">Delhi</span></div>
                  <div className="flex items-start"><span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Pincode</span><span className="text-[11px] font-medium text-ink break-words">110016</span></div>
                  <div className="flex items-start"><span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Language</span><span className="text-[11px] font-medium text-ink break-words">English</span></div>
                  <div className="flex items-start"><span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Alternate No.</span><span className="text-[11px] font-medium text-ink break-words">+91 91234 56789</span></div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="border border-black/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#3e8914]/10 flex items-center justify-center">
                    <PenTool className="w-3.5 h-3.5 text-[#3e8914]" />
                  </div>
                  <h4 className="text-[12px] font-bold text-ink">Service Details</h4>
                </div>
                <button type="button" onClick={() => onEditStep(2)} className="flex items-center gap-1 text-[#3e8914] border border-[#3e8914] hover:bg-[#3e8914]/5 px-3 py-1 rounded text-[10px] font-bold transition-colors">
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start"><span className="text-[10px] text-ink/60 font-bold w-24 shrink-0 mt-0.5">Category</span><span className="text-[11px] font-medium text-[#4B1426] break-words">Home Appliance</span></div>
                  <div className="flex items-start"><span className="text-[10px] text-ink/60 font-bold w-24 shrink-0 mt-0.5">Sub Category</span><span className="text-[11px] font-medium text-ink break-words">Microwave & Oven</span></div>
                  <div className="flex items-start"><span className="text-[10px] text-ink/60 font-bold w-24 shrink-0 mt-0.5">Brand</span><span className="text-[11px] font-medium text-ink break-words">LG</span></div>
                  <div className="flex items-start"><span className="text-[10px] text-ink/60 font-bold w-24 shrink-0 mt-0.5">Model</span><span className="text-[11px] font-medium text-ink break-words">MC2886BRUM (if known)</span></div>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <span className="text-[10px] text-ink/60 font-bold block mb-0.5">Issue / Problem</span>
                    <span className="text-[11px] font-medium text-ink leading-relaxed block break-words">Microwave is not heating properly.<br />The food remains cold even after setting high power.</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink/60 font-bold block mb-0.5">Upload</span>
                    <button type="button" onClick={() => setShowImages(true)} className="text-[11px] font-medium text-blue-600 hover:underline flex items-center gap-1"><ImageIcon className="w-3 h-3" /> 3 photos uploaded</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="border border-black/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#3e8914]/10 flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5 text-[#3e8914]" />
                  </div>
                  <h4 className="text-[12px] font-bold text-ink">Date & Time</h4>
                </div>
                <button type="button" onClick={() => onEditStep(3)} className="flex items-center gap-1 text-[#3e8914] border border-[#3e8914] hover:bg-[#3e8914]/5 px-3 py-1 rounded text-[10px] font-bold transition-colors">
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-[10px] text-ink/60 font-bold block mb-0.5">Selected Date</span>
                  <span className="text-[11px] font-medium text-blue-600 flex items-center gap-1">Wednesday, 25 June 2025</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink/60 font-bold block mb-0.5">Selected Time Slot</span>
                  <span className="text-[11px] font-medium text-[#4B1426] flex items-center gap-1">01:00 PM - 03:00 PM</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink/60 font-bold block mb-0.5">Duration</span>
                  <span className="text-[11px] font-medium text-ink flex items-center gap-1">Estimated 60 - 90 minutes</span>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-red-50 border border-red-200 rounded p-4 flex items-start gap-3">
              <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[12px] font-bold text-red-600 mb-0.5">Important Note</h4>
                <p className="text-[11px] text-red-900/80 font-medium leading-relaxed">
                  Our expert will arrive within the selected time slot. You will receive a call or WhatsApp message from our team before the visit.
                </p>
              </div>
            </div>

          </form>
        </div>

        {/* Footer of the box */}
        <div className="border-t border-black/5 p-4 flex items-center justify-between gap-4 bg-black/[0.01]">
          <button type="button" onClick={onBack} className="cursor-pointer border border-black/20 bg-white text-ink hover:bg-black/5 px-4 py-1.5 rounded font-bold text-[12px] shadow-sm transition-colors flex items-center justify-center gap-1.5 shrink-0">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <button form="step4-form" type="submit" className="cursor-pointer bg-[#3e8914] text-white px-5 py-1.5 rounded font-bold text-[12px] shadow-sm hover:bg-[#347311] transition-colors flex items-center justify-center gap-1.5 shrink-0">
            Confirm Booking
            <Check className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1.5 mt-3 text-blue-600 pb-2">
        <Lock className="w-3 h-3" />
        <span className="text-[10px] font-medium">Your information is 100% secure and will never be shared.</span>
      </div>

      {/* Image Viewer Modal */}
      {showImages && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-black/10">
              <h3 className="font-bold text-ink">Uploaded Photos</h3>
              <button onClick={() => setShowImages(false)} className="p-1 hover:bg-black/5 rounded-full transition-colors">
                <X className="w-5 h-5 text-ink" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 bg-black/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80" alt="Upload 1" className="w-full h-auto rounded-lg shadow-sm border border-black/10" />
                <img src="https://images.unsplash.com/photo-1585659722983-36cb2b4690d5?auto=format&fit=crop&w=800&q=80" alt="Upload 2" className="w-full h-auto rounded-lg shadow-sm border border-black/10" />
                <img src="https://images.unsplash.com/photo-1558565251-115fdf89b9ce?auto=format&fit=crop&w=800&q=80" alt="Upload 3" className="w-full h-auto rounded-lg shadow-sm border border-black/10 sm:col-span-2" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
