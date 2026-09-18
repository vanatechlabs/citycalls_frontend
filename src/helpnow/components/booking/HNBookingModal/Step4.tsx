import { ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, MapPin, Calendar, Clock, Edit3, User, Sparkles, Lock } from "lucide-react";

interface Step4Props {
  onBack?: () => void;
  onEditStep?: (step: number) => void;
  onSubmit?: () => void;
}

export function Step4({ onBack, onEditStep, onSubmit }: Step4Props) {
  return (
    <div className="bg-white mt-1 relative border border-slate-200">
      <div className="px-4 pt-4 pb-5 md:px-6 md:pt-4 md:pb-6 space-y-4">
        {/* Header */}
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4.5 h-4.5 text-[#f5a623]" />
            Review Your Booking
          </h3>
          <p className="text-slate-500 text-[11px] mt-0.5 font-medium">
            Please check all the details below and confirm your booking.
          </p>
        </div>

        {/* 1. Personal Information Card */}
        <div className="border border-slate-200 p-4 bg-white rounded-lg space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#fff6e8] flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-[#b5730f]" />
              </div>
              <h4 className="text-[13px] font-bold text-slate-900">
                Personal Information
              </h4>
            </div>
            {onEditStep && (
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="border border-[#f5a623] text-[#b5730f] bg-white hover:bg-[#fff6e8] px-3 py-1 rounded text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5 text-[11.5px]">
            {/* Left Column */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="text-slate-500 text-[11px] font-medium">Full Name</span>
                <span className="font-bold text-[#800000]">Rahul Sharma</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="text-slate-500 text-[11px] font-medium">WhatsApp No.</span>
                <span className="font-bold text-slate-900">+91 98765 43210</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="text-slate-500 text-[11px] font-medium">Email Address</span>
                <span className="font-bold text-[#2563eb] truncate">rahul.sharma@email.com</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="text-slate-500 text-[11px] font-medium">Address</span>
                <span className="font-bold text-slate-900 leading-snug">123, Green Park, Near Metro Station</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="text-slate-500 text-[11px] font-medium">City</span>
                <span className="font-bold text-slate-900">New Delhi</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="text-slate-500 text-[11px] font-medium">State</span>
                <span className="font-bold text-slate-900">Delhi</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="text-slate-500 text-[11px] font-medium">Pincode</span>
                <span className="font-bold text-slate-900">110016</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="text-slate-500 text-[11px] font-medium">Language</span>
                <span className="font-bold text-slate-900">English</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="text-slate-500 text-[11px] font-medium">Alternate No.</span>
                <span className="font-bold text-slate-900">+91 91234 56789</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Service Details Card */}
        <div className="border border-slate-200 p-4 bg-white rounded-lg space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#fff6e8] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#b5730f]" />
              </div>
              <h4 className="text-[13px] font-bold text-slate-900">
                Service Details
              </h4>
            </div>
            {onEditStep && (
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="border border-[#f5a623] text-[#b5730f] bg-white hover:bg-[#fff6e8] px-3 py-1 rounded text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5 text-[11.5px]">
            {/* Left Column */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-[110px_1fr] items-baseline">
                <span className="text-slate-500 text-[11px] font-medium">Category</span>
                <span className="font-bold text-[#800000]">HelpNow Maid Service</span>
              </div>
              <div className="grid grid-cols-[110px_1fr] items-baseline">
                <span className="text-slate-500 text-[11px] font-medium">Service</span>
                <span className="font-bold text-slate-900">Kitchen Cleaning & Utensil Care</span>
              </div>
              <div className="grid grid-cols-[110px_1fr] items-baseline">
                <span className="text-slate-500 text-[11px] font-medium">Maids & Duration</span>
                <span className="font-bold text-[#2563eb]">1 Maid · 3 Hours (+30 Mins)</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-[110px_1fr] items-start">
                <span className="text-slate-500 text-[11px] font-medium">Requirements</span>
                <span className="font-bold text-slate-900 leading-snug">Dish Washing, Kitchen Deep Clean, Floor Mopping</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Date & Time Card */}
        <div className="border border-slate-200 p-4 bg-white rounded-lg space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#fff6e8] flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5 text-[#b5730f]" />
              </div>
              <h4 className="text-[13px] font-bold text-slate-900">
                Date & Time
              </h4>
            </div>
            {onEditStep && (
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="border border-[#f5a623] text-[#b5730f] bg-white hover:bg-[#fff6e8] px-3 py-1 rounded text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2.5 gap-x-4 text-[11.5px]">
            <div className="grid grid-cols-[100px_1fr] md:grid-cols-1 items-baseline">
              <span className="text-slate-500 text-[11px] font-medium">Selected Date</span>
              <span className="font-bold text-[#2563eb] mt-0.5">Wednesday, August 26, 2026</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] md:grid-cols-1 items-baseline">
              <span className="text-slate-500 text-[11px] font-medium">Selected Time Slot</span>
              <span className="font-bold text-slate-900 mt-0.5">09:00 AM - 12:00 PM</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] md:grid-cols-1 items-baseline">
              <span className="text-slate-500 text-[11px] font-medium">Duration</span>
              <span className="font-bold text-slate-800 mt-0.5">Estimated 60 - 90 minutes</span>
            </div>
          </div>

          {/* Important Note Banner */}
          <div className="bg-[#eff6ff] border border-[#bfdbfe] p-3 rounded-lg flex items-start gap-2.5 mt-2">
            <div className="w-4 h-4 rounded-full border border-[#2563eb] text-[#2563eb] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              i
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#1e40af]">Important Note</div>
              <p className="text-[11px] text-[#1e40af]/90 font-medium leading-relaxed mt-0.5">
                Our expert will arrive within the selected time slot. You will receive a call or WhatsApp message from our team before the visit.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Price Breakdown Card */}
        <div className="border border-slate-200 p-4 bg-slate-50/50 rounded-lg space-y-2">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Price Breakdown
          </div>

          <div className="flex items-center justify-between text-[11.5px] text-slate-700">
            <span>Base Hourly Fare (1 Maid × 3 hrs @ ₹159/hr)</span>
            <span className="font-bold text-[#2563eb]">₹477</span>
          </div>
          <div className="flex items-center justify-between text-[11.5px] text-slate-700">
            <span>Extra Time Protection (+30 Mins Buffer)</span>
            <span className="font-bold text-emerald-600">+₹79</span>
          </div>
          <div className="flex items-center justify-between text-[11.5px] text-slate-700">
            <span>Safety & Service Convenience Fee</span>
            <span className="font-bold">₹49</span>
          </div>

          <div className="border-t border-slate-200 pt-2 flex items-center justify-between">
            <span className="font-bold text-slate-900 text-[13px]">Total Amount Payable</span>
            <span className="font-semibold text-red-600 text-base">₹605</span>
          </div>
        </div>

        {/* Security Assurance */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#2563eb] font-semibold pt-1">
          <Lock className="w-3.5 h-3.5 text-[#2563eb]" />
          <span>Your information is 100% secure and will never be shared.</span>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="border-t border-slate-200 p-4 flex items-center justify-between bg-slate-50">
        <button
          type="button"
          onClick={onBack}
          className="border border-slate-300 bg-white text-slate-700 px-4 py-2 rounded-lg font-bold text-[11px] uppercase tracking-wider hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="bg-[#f5a623] hover:bg-[#e0951a] text-white px-6 py-2.5 rounded-lg font-bold text-[12px] uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
        >
          Confirm Booking
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
