"use client";

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
    // Phones: only the current step shows its name; the others are just their
    // circles joined by lines, so all three fit on one row.
    <div className="flex items-center justify-between gap-2 sm:gap-0 lg:justify-start lg:gap-4 mb-3 text-[11px] font-bold border-b border-black/5 pb-3 w-full sm:overflow-x-auto hide-scrollbar">
      {steps.map((s, i) => {
        const active = step === s.id;
        const done = step > s.id;
        const pending = step < s.id;
        
        return (
          <div
            key={s.id}
            aria-current={active ? "step" : undefined}
            className={`flex items-center gap-2 whitespace-nowrap ${i < steps.length - 1 ? "flex-1 sm:flex-none" : ""} sm:shrink-0`}
          >
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
              className={`${active ? "" : "sr-only sm:not-sr-only"} ${
                done || active ? "text-[#3e8914]" : "text-[#dcb12d]"
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden className={`h-[1.5px] min-w-3 flex-1 rounded-full sm:hidden ${done ? "bg-[#3e8914]" : "bg-black/15"}`} />
            )}
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
