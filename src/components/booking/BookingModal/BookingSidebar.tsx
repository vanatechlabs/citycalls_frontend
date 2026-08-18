import { ShieldCheck, Clock, Headphones, Wrench, BadgeCheck, Calendar, Phone } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface BookingSidebarProps {
  step: number;
}

export function BookingSidebar({ step }: BookingSidebarProps) {
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

        <h3 className="text-sm font-bold text-[#3e8914] mb-1">
          {step === 1 ? "We're here to help!" : step === 2 ? "We're here to help!" : "We're almost there!"}
        </h3>
        <p className="text-ink/70 text-[11px] text-center mb-6 leading-relaxed max-w-[180px]">
          {step === 1 
            ? "Share your details and we'll take care of the rest." 
            : step === 2
            ? "Provide a few more details about your issue so we can send the right expert."
            : "Choose a convenient date and time. We'll handle the rest."}
        </p>

        <div className="w-full space-y-4">
          {step === 1 ? (
            <>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-primary-dark" strokeWidth={1.5} />
                </div>
                <div className="pt-0.5">
                  <h4 className="font-bold text-ink text-[12px]">Secure & Reliable</h4>
                  <p className="text-ink/80 text-[10px] mt-0.5 leading-relaxed">Your information is safe<br/>with us.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 flex-shrink-0">
                  <Clock className="w-4 h-4 text-primary-dark" strokeWidth={1.5} />
                </div>
                <div className="pt-0.5">
                  <h4 className="font-bold text-ink text-[12px]">Quick Response</h4>
                  <p className="text-ink/80 text-[10px] mt-0.5 leading-relaxed">We'll reach out to you<br/>in no time.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 flex-shrink-0">
                  <Headphones className="w-4 h-4 text-primary-dark" strokeWidth={1.5} />
                </div>
                <div className="pt-0.5">
                  <h4 className="font-bold text-ink text-[12px]">Expert Support</h4>
                  <p className="text-ink/80 text-[10px] mt-0.5 leading-relaxed">Our experts are ready<br/>to assist you.</p>
                </div>
              </div>
            </>
          ) : step === 2 ? (
            <>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 flex-shrink-0">
                  <Wrench className="w-4 h-4 text-[#3e8914]" strokeWidth={1.5} />
                </div>
                <div className="pt-0.5">
                  <h4 className="font-bold text-ink text-[12px]">Right Expert</h4>
                  <p className="text-ink/80 text-[10px] mt-0.5 leading-relaxed">We'll assign the best<br/>professional for the job.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#3e8914]" strokeWidth={1.5} />
                </div>
                <div className="pt-0.5">
                  <h4 className="font-bold text-ink text-[12px]">Quality Service</h4>
                  <p className="text-ink/80 text-[10px] mt-0.5 leading-relaxed">We ensure reliable and<br/>trusted service.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 flex-shrink-0">
                  <BadgeCheck className="w-4 h-4 text-[#3e8914]" strokeWidth={1.5} />
                </div>
                <div className="pt-0.5">
                  <h4 className="font-bold text-ink text-[12px]">Satisfaction Guaranteed</h4>
                  <p className="text-ink/80 text-[10px] mt-0.5 leading-relaxed">Your satisfaction is our<br/>priority.</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 flex-shrink-0">
                  <Calendar className="w-4 h-4 text-[#3e8914]" strokeWidth={1.5} />
                </div>
                <div className="pt-0.5">
                  <h4 className="font-bold text-ink text-[12px]">Flexible Scheduling</h4>
                  <p className="text-ink/80 text-[10px] mt-0.5 leading-relaxed">Choose the date and time<br/>that works for you.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 flex-shrink-0">
                  <Clock className="w-4 h-4 text-[#3e8914]" strokeWidth={1.5} />
                </div>
                <div className="pt-0.5">
                  <h4 className="font-bold text-ink text-[12px]">On-Time Service</h4>
                  <p className="text-ink/80 text-[10px] mt-0.5 leading-relaxed">Our experts will arrive<br/>within the selected slot.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#3e8914]" strokeWidth={1.5} />
                </div>
                <div className="pt-0.5">
                  <h4 className="font-bold text-ink text-[12px]">Trusted Professionals</h4>
                  <p className="text-ink/80 text-[10px] mt-0.5 leading-relaxed">Background verified and<br/>highly trained experts.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#3e8914]" strokeWidth={1.5} />
                </div>
                <div className="pt-0.5">
                  <h4 className="font-bold text-ink text-[12px]">Instant Updates</h4>
                  <p className="text-ink/80 text-[10px] mt-0.5 leading-relaxed">Get SMS/WhatsApp updates<br/>about your booking.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
