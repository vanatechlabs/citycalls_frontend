import { ShieldCheck, Clock, Headphones } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface BookingSidebarProps {
  step?: number;
}

export function BookingSidebar({ step: _step }: BookingSidebarProps) {
  return (
    <div className="bg-[#f7fcf8] h-full flex flex-col items-center justify-between p-8 border-r border-black/5">
      <div className="flex-1 w-full flex flex-col items-center">
        <div className="w-full aspect-square flex items-center justify-center mb-4 overflow-visible">
          <DotLottieReact
            src="https://lottie.host/a9c01164-c25c-45e1-a92f-06671dfe1b1c/v1ecTXh8B2.lottie"
            loop
            autoplay
            className="w-full h-full scale-105 transform"
          />
        </div>

        <h3 className="text-sm font-bold text-[#b5730f] mb-1">
          We're here to help!
        </h3>
        <p className="text-ink/70 text-[11px] text-center mb-6 leading-relaxed max-w-[180px]">
          Share your details and we'll take care of the rest.
        </p>

        <div className="w-full space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-primary-dark" strokeWidth={1.5} />
            </div>
            <div className="pt-0.5">
              <h4 className="font-bold text-ink text-[12px]">Secure & Reliable</h4>
              <p className="text-ink/80 text-[10px] mt-0.5 leading-relaxed">
                Your information is safe<br />with us.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 flex-shrink-0">
              <Clock className="w-4 h-4 text-primary-dark" strokeWidth={1.5} />
            </div>
            <div className="pt-0.5">
              <h4 className="font-bold text-ink text-[12px]">Quick Response</h4>
              <p className="text-ink/80 text-[10px] mt-0.5 leading-relaxed">
                We'll reach out to you<br />in no time.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 flex-shrink-0">
              <Headphones className="w-4 h-4 text-primary-dark" strokeWidth={1.5} />
            </div>
            <div className="pt-0.5">
              <h4 className="font-bold text-ink text-[12px]">Expert Support</h4>
              <p className="text-ink/80 text-[10px] mt-0.5 leading-relaxed">
                Our experts are ready<br />to assist you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
