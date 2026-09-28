"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  { title: "Refrigerator", image: "/assets/Services/s1.png", slug: "refrigerator-service" },
  { title: "Washing Machine", image: "/assets/Services/s3.png", slug: "washing-machine-services" },
  { title: "Microwave Oven", image: "/assets/Services/s5.png", slug: "microwave-oven-services" },
  { title: "LED TV", image: "/assets/Services/s4.png", slug: "television-repair-services" },
  { title: "Geyser", image: "/assets/Services/s6.png", slug: "geyser-repair-services" },
  { title: "Kitchen Chimney", image: "/assets/Services/s7.png", slug: "chimney-repair-services" },
];

export function OtherServices() {
  return (
    <section className="w-full border-t border-black/5 bg-white py-12 md:py-16">
      <div className="container-x">
        <div className="mb-10 text-center">
          <h2 className="text-[24px] font-black uppercase leading-tight tracking-tight text-ink md:text-[32px]">OTHER <span className="text-[#3e8914]">APPLIANCE SERVICES</span></h2>
          <p className="mx-auto mt-2 max-w-lg text-[12px] font-bold text-ink/60 md:text-[14px]">Professional doorstep repair for your other essential home appliances.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group flex flex-col items-center justify-between rounded-xl border border-black/10 bg-white p-4 shadow-[0_2px_8px_rgb(0,0,0,0.04)] transition-all hover:border-[#3e8914]/30 hover:shadow-lg">
              <div className="mb-4 flex h-[100px] w-full items-center justify-center md:h-[120px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={service.image} alt={service.title} className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="text-center">
                <h3 className="text-[13px] font-bold text-ink md:text-[15px]">{service.title}</h3>
                <p className="mb-3 mt-1 text-[10px] font-medium text-ink/60 md:text-[11px]">Repair & Service</p>
                <span className="flex items-center justify-center gap-1 text-[12px] font-bold text-[#3e8914]">Book Now <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
