import { useState } from "react";
import { ArrowRight, ArrowLeft, Calendar as CalendarIcon, Clock, Info, ChevronLeft, ChevronRight, Check, Zap } from "lucide-react";

interface Step2Props {
  onBack?: () => void;
  onNext?: () => void;
}

export function Step2({ onBack, onNext }: Step2Props) {
  const [selectedDay, setSelectedDay] = useState(27);
  const [selectedSlot, setSelectedSlot] = useState("01:00 PM - 03:00 PM");
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [customTime, setCustomTime] = useState("");

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Helper to format full date string based on selectedDay
  const getFullDateString = (day: number) => {
    const date = new Date(2026, 7, day); // August 2026
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const timeSlots = [
    "Instant (Within 30-45 mins)",
    "09:00 AM - 11:00 AM",
    "11:00 AM - 01:00 PM",
    "01:00 PM - 03:00 PM",
    "03:00 PM - 05:00 PM",
    "05:00 PM - 07:00 PM",
    "07:00 PM - 09:00 PM",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext) onNext();
  };

  return (
    <div className="bg-white mt-1 relative border border-slate-200">
      <div className="px-4 pt-4 pb-5 md:px-6 md:pt-4 md:pb-6">
        {/* Header */}
        <div className="mb-5 border-b border-slate-100 pb-3">
          <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#f5a623]" />
            Choose Date & Time
          </h3>
          <p className="text-slate-500 text-[11px] mt-0.5 font-medium">
            Select a convenient date and time slot for our expert to visit.
          </p>
        </div>

        <form id="step2-form" onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT COLUMN: Mini Interactive Calendar + Selected Date Banner */}
            <div className="space-y-3">
              <label className="block text-[11px] font-bold text-slate-900">
                Select Date <span className="text-red-500">*</span>
              </label>

              <div className="border border-slate-200 p-4 bg-white">
                {/* Month Selector */}
                <div className="flex items-center justify-between mb-4">
                  <button type="button" className="p-1 hover:bg-slate-100 rounded transition-colors">
                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                  </button>
                  <span className="text-[13px] font-bold text-slate-900">August 2026</span>
                  <button type="button" className="p-1 hover:bg-slate-100 rounded transition-colors">
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                </div>

                {/* Weekday Labels */}
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {weekDays.map((d) => (
                    <span key={d} className="text-[10px] font-bold text-slate-400">
                      {d}
                    </span>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {[26, 27, 28, 29, 30, 31].map((prevDay) => (
                    <span key={`prev-${prevDay}`} className="text-[11px] text-slate-300 py-1.5">
                      {prevDay}
                    </span>
                  ))}
                  {daysInMonth.map((day) => {
                    const isSelected = selectedDay === day;
                    const isPast = day < 26;
                    return (
                      <button
                        type="button"
                        key={day}
                        disabled={isPast}
                        onClick={() => setSelectedDay(day)}
                        className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-[11px] transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#f5a623] text-white font-bold shadow-sm"
                            : isPast
                            ? "text-slate-300 cursor-not-allowed"
                            : "text-slate-700 hover:bg-slate-100 font-medium"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Date Banner Box (As shown in screenshot) */}
              <div className="bg-[#fff6e8] border border-[#f5a623]/40 p-3 flex items-start gap-2.5">
                <CalendarIcon className="w-4 h-4 text-[#b5730f] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold text-[#b5730f] uppercase tracking-wider">
                    Selected Date
                  </div>
                  <div className="text-[12px] font-bold text-slate-900 mt-0.5">
                    {getFullDateString(selectedDay)}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Time Slots & Native Custom Time Input */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                  Select Time Slot <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomTime(!isCustomTime)}
                  className="text-[10px] text-[#b5730f] font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Clock className="w-3 h-3" />
                  {isCustomTime ? "Show standard slots" : "Click for custom time"}
                </button>
              </div>

              {!isCustomTime ? (
                /* Standard Time Slots Grid */
                <div className="space-y-2">
                  {timeSlots.map((slot) => {
                    const active = selectedSlot === slot;
                    const isInstant = slot.startsWith("Instant");
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`w-full p-2.5 border flex items-center justify-between text-left transition-all cursor-pointer rounded ${
                          active
                            ? "border-[#f5a623] bg-[#fff6e8] text-slate-900 font-bold ring-1 ring-[#f5a623]"
                            : isInstant
                            ? "border-amber-300 bg-amber-50/50 text-slate-800 font-medium hover:border-amber-400 hover:bg-amber-50"
                            : "border-slate-200 bg-white text-slate-700 font-medium hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              active ? "border-[#f5a623] bg-[#f5a623] text-white" : "border-slate-300 bg-white"
                            }`}
                          >
                            {active && <Check className="w-2.5 h-2.5" strokeWidth={3} />}
                          </div>
                          <span className="text-[11.5px] flex items-center gap-1.5">
                            {isInstant && <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />}
                            {slot}
                          </span>
                        </div>
                        {isInstant && (
                          <span className="text-[9.5px] font-bold uppercase tracking-wider bg-amber-500 text-white px-1.5 py-0.5 rounded shrink-0">
                            ⚡ Fastest
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Custom Time Input Box with HTML Native Time Picker & Dropdown Option */
                <div className="border border-slate-200 p-4 bg-white space-y-3">
                  <label className="block text-[11px] font-bold text-slate-900">
                    Enter Custom Time
                  </label>
                  
                  <div className="relative">
                    <input
                      type="time"
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      className="w-full border border-slate-300 px-3 py-2 text-[13px] font-bold outline-none focus:border-[#f5a623] bg-white cursor-pointer"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 font-normal">
                    Select a specific time for our expert to arrive.
                  </p>
                </div>
              )}

              {/* Duration Box */}
              <div className="bg-[#fff6e8]/50 border border-[#f5a623]/30 p-3 flex items-center justify-between">
                <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#f5a623]" />
                  Duration
                </div>
                <div className="text-[11px] font-semibold text-emerald-600">
                  Estimated 60 - 90 minutes
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-slate-50 border border-slate-200 p-3 space-y-1">
                <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#f5a623]" />
                  Important Notes
                </div>
                <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                  Our expert will arrive within the selected time slot. You will receive a call or WhatsApp message from our team before the visit.
                </p>
              </div>
            </div>
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
          form="step2-form"
          type="submit"
          className="bg-[#f5a623] hover:bg-[#e0951a] text-white px-6 py-2.5 font-bold text-[12px] uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
        >
          Continue to Personal Info
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
