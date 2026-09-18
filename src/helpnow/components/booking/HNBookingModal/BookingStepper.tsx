import { Check, Clock, ChevronRight } from "lucide-react";

interface Props {
  step: number;
}

export function BookingStepper({ step }: Props) {
  const steps = [
    { id: 1, label: "Service & Hours" },
    { id: 2, label: "Date & Time" },
    { id: 3, label: "Personal Info" },
    { id: 4, label: "Review" },
    { id: 5, label: "Payment" },
  ];

  return (
    <div className="flex items-center justify-between lg:justify-start lg:gap-3 mb-3 text-[11px] font-bold border-b border-slate-200 pb-3 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {steps.map((s, i) => {
        const active = step === s.id;
        const done = step > s.id;

        return (
          <div key={s.id} className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                done || active
                  ? "bg-[#f5a623] text-white"
                  : "bg-white border border-slate-300 text-slate-400"
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
                done || active ? "text-[#b5730f]" : "text-slate-400"
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div className="hidden sm:flex items-center mx-1.5 opacity-40">
                <div className="w-4 lg:w-6 h-[1.5px] bg-slate-400" />
                <ChevronRight className="w-3 h-3 text-slate-400 -ml-1" strokeWidth={2.5} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
