import { Check, Clock, ChevronRight } from "lucide-react";

interface Props {
  step: number;
}

export function BookingStepper({ step }: Props) {
  const steps = [
    { id: 1, label: "Personal Information" },
    { id: 2, label: "Service Details" },
    { id: 3, label: "Choose Date & Time" },
  ];

  return (
    <div className="flex items-center justify-between lg:justify-start lg:gap-4 mb-3 text-[11px] font-bold border-b border-black/5 pb-3 w-full overflow-x-auto hide-scrollbar">
      {steps.map((s, i) => {
        const active = step === s.id;
        const done = step > s.id;
        const pending = step < s.id;
        
        return (
          <div key={s.id} className="flex items-center gap-2 whitespace-nowrap shrink-0">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                done || active
                  ? "bg-[#3e8914] text-white"
                  : "bg-white border border-[#dcb12d] text-[#dcb12d]"
              }`}
            >
              {done ? (
                <Check className="w-3 h-3" strokeWidth={3} />
              ) : active ? (
                <span>{s.id}</span>
              ) : (
                <Clock className="w-3 h-3" />
              )}
            </div>
            <span
              className={`${
                done || active ? "text-[#3e8914]" : "text-[#dcb12d]"
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div className="hidden sm:flex items-center mx-2 opacity-50">
                <div className="w-8 lg:w-12 h-[1.5px] bg-black" />
                <ChevronRight className="w-3.5 h-3.5 text-black -ml-1.5" strokeWidth={3} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
