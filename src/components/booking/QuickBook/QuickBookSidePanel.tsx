"use client";

import Image from "next/image";
import { CalendarDays, PhoneCall, ShieldCheck, Zap, type LucideIcon } from "lucide-react";

const POINTS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: PhoneCall, title: "Quick Confirmation", text: "We will call you shortly" },
  { icon: CalendarDays, title: "Flexible Scheduling", text: "Choose date & time as per your convenience" },
  { icon: ShieldCheck, title: "Verified Professionals", text: "Trained & background checked" },
];

// Left panel of the Quick Book form: soft green, a big "30 Seconds" headline,
// three promises and the quick.png illustration at the bottom.
export function QuickBookSidePanel() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-[#eef8e8] via-[#f7fcf4] to-white px-7 pt-7">
      {/* Soft background circles */}
      <span aria-hidden className="pointer-events-none absolute -right-24 top-16 h-64 w-64 rounded-full bg-white/50" />
      <span aria-hidden className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 rounded-full bg-[#3e8914]/[0.04]" />

      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3e8914]/12 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2f6b0f] shadow-[0_4px_14px_-6px_rgba(62,137,20,0.45)] ring-1 ring-[#3e8914]/15">
          <Zap className="h-3 w-3 fill-[#3e8914] text-[#3e8914]" />
          Instant Booking
        </span>

        <h3 className="mt-4 text-[34px] font-extrabold leading-[1.08] tracking-tight text-ink">
          Book a<br />
          Service in<br />
          <span className="text-[#3e8914]">30 Seconds</span>
        </h3>
        {/* Hand-drawn underline */}
        <svg aria-hidden viewBox="0 0 140 12" className="mt-1.5 h-2.5 w-28" fill="none">
          <path d="M3 9 C 40 2, 90 1, 137 5" stroke="#5aa832" strokeWidth="4" strokeLinecap="round" />
        </svg>

        <p className="mt-3 text-[12px] leading-relaxed text-ink/65">
          Share a few details and our team will call you back to confirm your visit.
        </p>

        <ul className="mt-5 space-y-3.5">
          {POINTS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                <Icon className="h-5 w-5 text-[#3e8914]" strokeWidth={2.2} />
              </span>
              <span>
                <span className="block text-[12px] font-bold text-ink">{title}</span>
                <span className="block text-[10.5px] leading-snug text-ink/60">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Illustration: calendar, bell and "We'll call you soon!" phone */}
      <div className="relative -mx-3 mt-auto shrink-0 pb-4 pt-4">
        <Image
          src="/assets/icons/quick.png"
          alt="Calendar with a tick and a phone saying we'll call you soon"
          width={1460}
          height={880}
          sizes="320px"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
