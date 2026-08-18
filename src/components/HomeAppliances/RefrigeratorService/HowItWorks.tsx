import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, UserCheck, Wrench, ThumbsUp } from 'lucide-react';

const steps = [
  {
    icon: CalendarCheck,
    title: "Book a Service",
    description: "Select your preferred date & time, and instantly book our service online."
  },
  {
    icon: UserCheck,
    title: "Expert Assigned",
    description: "A background-verified and highly trained technician is assigned to your booking."
  },
  {
    icon: Wrench,
    title: "Doorstep Repair",
    description: "Our expert visits your home, diagnoses the issue, and fixes it using genuine parts."
  },
  {
    icon: ThumbsUp,
    title: "Relax & Enjoy",
    description: "Experience a hassle-free repair with our 30-day post-service warranty."
  }
];

export function HowItWorks() {
  return (
    <div className="w-full bg-[#3e8914]/[0.02] pt-8 pb-12 md:pt-10 md:pb-16 border-t border-black/5 relative overflow-hidden">
      <div className="container-x relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[22px] md:text-[28px] font-sans font-black uppercase tracking-tight text-ink leading-tight">
            How It{" "}
            <span className="text-[#3e8914] relative inline-block">
              Works
              {/* Animated underline */}
              <motion.svg
                className="absolute -bottom-1.5 left-0 w-full h-3"
                viewBox="0 0 150 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.path
                  d="M0 8 L 150 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                      pathLength: 1,
                      opacity: 1,
                      transition: {
                        pathLength: { duration: 1.2, ease: "easeInOut", delay: 0.2 },
                        opacity: { duration: 0.3, delay: 0.2 },
                      },
                    },
                  }}
                />
              </motion.svg>
            </span>
          </h2>
          <p className="text-ink/60 text-[12px] md:text-[14px] mt-3 font-medium max-w-[500px] mx-auto">
            Your appliance repair is just a few clicks away. We make it simple, transparent, and absolutely hassle-free.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
          
          {/* Decorative Line for Desktop */}
          <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#3e8914]/10 via-[#3e8914]/30 to-[#3e8914]/10 z-0"></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                {/* Icon Circle */}
                <div className="w-[80px] h-[80px] rounded-full bg-white border border-[#3e8914]/20 flex items-center justify-center shadow-sm mb-5 group-hover:scale-110 group-hover:border-[#3e8914]/50 group-hover:shadow-md transition-all duration-300 relative">
                  {/* Step Number Badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#3e8914] text-white flex items-center justify-center text-[12px] font-bold border-2 border-white">
                    {idx + 1}
                  </div>
                  <Icon className="w-8 h-8 text-[#3e8914]" strokeWidth={1.5} />
                </div>
                
                {/* Content */}
                <h3 className="text-[15px] font-bold text-ink mb-2">{step.title}</h3>
                <p className="text-[12px] text-ink/70 font-medium leading-relaxed max-w-[250px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
