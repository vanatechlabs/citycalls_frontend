"use client";

import { ShieldCheck, Clock, Headphones, PhoneCall, Zap, type LucideIcon } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface BookingSidebarProps {
  step: number;
  // "quick": the Quick Book form — talks about speed instead of the full form.
  variant?: "full" | "quick";
}

const CONTENT: Record<"full" | "quick", { title: string; subtitle: string; points: { icon: LucideIcon; title: string; text: string }[] }> = {
  full: {
    title: "We're here to help!",
    subtitle: "Share your details and we'll take care of the rest.",
    points: [
      { icon: ShieldCheck, title: "Secure & Reliable", text: "Your information is safe with us." },
      { icon: Clock, title: "Quick Response", text: "We'll reach out to you in no time." },
      { icon: Headphones, title: "Expert Support", text: "Our experts are ready to assist you." },
    ],
  },
  quick: {
    title: "Instant booking, fast call back",
    subtitle: "Just your name, number and the service — done in 30 seconds.",
    points: [
      { icon: Zap, title: "Instant Booking", text: "No long forms. Book in under a minute." },
      { icon: PhoneCall, title: "Fast Call Back", text: "Our team calls you back quickly to confirm." },
      { icon: Clock, title: "Same-day Service", text: "Technicians available today in Ghaziabad." },
    ],
  },
};

export function BookingSidebar({ variant = "full" }: BookingSidebarProps) {
  const content = CONTENT[variant];
  return (
    <div className="bg-[#f7fcf8] h-full flex flex-col items-center justify-between p-8 border-r border-black/5">
      <div className="flex-1 w-full flex flex-col items-center">
        {/* Illustration Container */}
        <div className="w-full aspect-square bg-[#f8faf7] rounded-xl border border-black/5 flex items-center justify-center mb-6 p-4">
            <div className="w-full h-full relative flex items-center justify-center">
              <DotLottieReact
                src="https://lottie.host/4cff5da0-3d74-454a-8ddc-a91174e9c554/6SdUuLZ5lV.lottie"
                loop
                autoplay
              />
            </div>
        </div>

        <h3 className="text-sm font-bold text-[#3e8914] mb-1 text-center">
          {content.title}
        </h3>
        <p className="text-ink/70 text-[11px] text-center mb-6 leading-relaxed max-w-[200px]">
          {content.subtitle}
        </p>

        <div className="w-full space-y-4">
          {content.points.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 flex-shrink-0">
                <Icon className="w-4 h-4 text-primary-dark" strokeWidth={1.5} />
              </div>
              <div className="pt-0.5">
                <h4 className="font-bold text-ink text-[12px]">{title}</h4>
                <p className="text-ink/80 text-[10px] mt-0.5 leading-relaxed max-w-[170px]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
