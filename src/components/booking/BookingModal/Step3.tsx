import { useState } from "react";
import { ArrowLeft, Check, CalendarDays, Clock, Info, Pencil } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface Step3Props {
  onBack: () => void;
  onSubmit: () => void;
}

const timeSlots = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "01:00 PM - 03:00 PM",
  "03:00 PM - 05:00 PM",
  "05:00 PM - 07:00 PM",
  "07:00 PM - 09:00 PM"
];

export function Step3({ onBack, onSubmit }: Step3Props) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState("01:00 PM - 03:00 PM");
  const [isManualTime, setIsManualTime] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div 
      className="rounded-xl overflow-hidden bg-white mt-1"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
    >
      <div className="p-4 md:p-5">
        <h3 className="text-[14px] font-bold text-ink">Choose Date & Time</h3>
        <p className="text-ink/60 text-[11px] mt-0.5 mb-4 font-medium">
          Select a convenient date and time slot for our expert to visit.
        </p>

        <form id="step3-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left side: Calendar */}
            <div>
              <label className="block text-[11px] font-bold text-ink mb-2">Select Date <span className="text-red-500">*</span></label>
              <div className="border border-black/10 rounded p-2 shadow-sm mb-3 flex justify-center bg-white">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-3 flex items-center gap-3">
                <CalendarDays className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-[10px] text-ink/60 font-bold mb-0.5">Selected Date</p>
                  <p className="text-[11px] text-ink font-bold">
                    {date ? date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Please select a date'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Time Slots */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-ink flex items-center">
                  Select Time Slot <span className="text-red-500 ml-1">*</span>
                  <button 
                    type="button"
                    onClick={() => setIsManualTime(!isManualTime)}
                    className={`ml-2 p-1 rounded-md transition-colors ${isManualTime ? 'bg-red-500 text-white' : 'text-red-500 bg-red-50 hover:bg-red-100'}`}
                    title="Enter custom time manually"
                  >
                    <Clock className="w-3 h-3" strokeWidth={2.5} />
                  </button>
                </label>
                <button 
                  type="button"
                  onClick={() => setIsManualTime(!isManualTime)}
                  className="text-[10px] text-blue-600 hover:text-blue-700 font-bold flex items-center transition-colors cursor-pointer"
                >
                  Click <Clock className="w-2.5 h-2.5 text-blue-600 mx-1" /> for custom time
                </button>
              </div>
              
              <div className="space-y-2 mb-3">
                {isManualTime ? (
                  <div className="border border-black/10 rounded p-3 bg-white">
                    <label className="block text-[10px] font-bold text-ink/60 mb-1.5">Enter Custom Time</label>
                    <input 
                      type="time" 
                      required
                      className="w-full border border-black/20 rounded px-3 py-2 text-[12px] outline-none focus:border-primary-dark transition-colors font-medium"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                    />
                    <p className="text-[10px] text-ink/40 mt-1.5">Select a specific time for our expert to arrive.</p>
                  </div>
                ) : (
                  timeSlots.map((slot) => (
                    <label 
                      key={slot}
                      onClick={() => setTimeSlot(slot)}
                      className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-colors ${
                        timeSlot === slot ? 'border-[#3e8914] bg-[#3e8914]/5' : 'border-black/10 hover:border-black/20 bg-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        timeSlot === slot ? 'border-[#3e8914]' : 'border-black/20'
                      }`}>
                        {timeSlot === slot && <div className="w-2 h-2 bg-[#3e8914] rounded-full" />}
                      </div>
                      <span className={`text-[12px] font-medium ${timeSlot === slot ? 'text-[#3e8914] font-bold' : 'text-ink'}`}>
                        {slot}
                      </span>
                    </label>
                  ))
                )}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded p-3 flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-[10px] text-ink/60 font-bold mb-0.5">Duration</p>
                  <p className="text-[11px] text-ink font-bold">Estimated 60 - 90 minutes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-3.5 flex items-start gap-3">
            <Info className="w-4 h-4 text-[#3e8914] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[11px] font-bold text-emerald-900 mb-0.5">Important Notes</h4>
              <p className="text-[10px] text-emerald-800/90 font-medium leading-relaxed">
                Our expert will arrive within the selected time slot. You will receive a call or WhatsApp message from our team before the visit.
              </p>
            </div>
          </div>
        </form>
      </div>
      
      {/* Footer of the box */}
      <div className="border-t border-black/5 p-4 flex items-center justify-between gap-4 bg-black/[0.01]">
        <button type="button" onClick={onBack} className="border border-black/20 bg-white text-ink hover:bg-black/5 px-4 py-1.5 rounded font-bold text-[12px] shadow-sm transition-colors flex items-center justify-center gap-1.5 shrink-0">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>
        <button form="step3-form" type="submit" className="bg-[#3e8914] text-white px-5 py-1.5 rounded font-bold text-[12px] shadow-sm hover:bg-[#347311] transition-colors flex items-center justify-center gap-1.5 shrink-0">
          Confirm Booking
          <Check className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
