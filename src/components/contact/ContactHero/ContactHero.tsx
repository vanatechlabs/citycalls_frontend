"use client";

import { Navigation } from "lucide-react";
import { CITYCALLS_OFFICES } from "@/components/contact/offices";

export default function ContactHero() {
  return (
    <div className="bg-[#f5f3ef] p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30" 
           style={{ background: 'radial-gradient(circle at 10% 10%, rgba(0,0,0,0.08) 0%, transparent 60%)' }}></div>
      <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none opacity-30" 
           style={{ background: 'radial-gradient(circle at 90% 90%, rgba(0,0,0,0.05) 0%, transparent 50%)' }}></div>

      <div className="z-10 relative h-full flex flex-col justify-start">
        <div className="text-center mb-12 lg:mb-0 lg:-mt-4">
          {/* Logo / Brand Name */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-black p-2 px-4 rounded-xl inline-block shadow-sm">
              <img src="/logo.webp" alt="CityCalls Logo" className="h-10 md:h-12 object-contain" />
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl font-serif mt-6 uppercase tracking-tight">We&apos;re here for you</h1>
          <p className="mt-4 text-xs md:text-sm max-w-sm mx-auto text-ink/80 leading-relaxed font-medium">
            Have a question, feedback or just want to say hello? We&apos;d love to hear from you. Let&apos;s connect.
          </p>
        </div>

        {/* Two maps, half each: one per office */}
        <div className="mt-auto pt-2 mx-auto flex w-full max-w-3xl flex-col gap-3 h-[560px] lg:h-[600px]">
          {CITYCALLS_OFFICES.map((office) => (
            <div key={office.city} className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-3 border-b border-black/5 px-4 py-2">
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary">{office.city}</div>
                  <div className="truncate text-xs font-medium text-ink/70">{office.lines.join(", ")}</div>
                </div>
                <a
                  href={office.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700"
                >
                  <Navigation className="h-3.5 w-3.5" /> Directions
                </a>
              </div>
              <iframe
                title={`CityCalls ${office.city} on Google Maps — ${office.lines.join(", ")}`}
                className="min-h-0 w-full flex-1"
                src={office.mapEmbed}
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
