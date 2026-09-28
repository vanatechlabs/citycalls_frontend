"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface OtherServiceCard {
  title: string;
  image: string;
  slug: string;
  subtitle?: string;
}

const APPLIANCE_SERVICES: OtherServiceCard[] = [
  { title: "Refrigerator", image: "/assets/Services/s1.png", slug: "refrigerator-service" },
  { title: "Air Conditioner", image: "/assets/Services/s2.png", slug: "ac-service" },
  { title: "Washing Machine", image: "/assets/Services/s3.png", slug: "washing-machine-services" },
  { title: "LED TV", image: "/assets/Services/s4.png", slug: "television-repair-services" },
  { title: "Microwave Oven", image: "/assets/Services/s5.png", slug: "microwave-oven-services" },
  { title: "Geyser", image: "/assets/Services/s6.png", slug: "geyser-repair-services" },
  { title: "Kitchen Chimney", image: "/assets/Services/s7.png", slug: "chimney-repair-services" },
];

interface OtherServicesProps {
  currentSlug: string;
  // Defaults are the appliance strip; pest control etc. pass their own.
  services?: OtherServiceCard[];
  heading?: string;
  highlight?: string;
  description?: string;
  // Photos fill the card (pest control); product cut-outs sit inside it (appliances).
  imageFit?: "contain" | "cover";
}

// "Other ... services" strip — every service in the list except the current one.
export function OtherServices({
  currentSlug,
  services = APPLIANCE_SERVICES,
  heading = "OTHER",
  highlight = "APPLIANCE SERVICES",
  description = "Professional doorstep repair for your other essential home appliances.",
  imageFit = "contain",
}: OtherServicesProps) {
  const cards = services.filter((service) => service.slug !== currentSlug);

  return (
    <section className="w-full border-t border-black/5 bg-white py-12 md:py-16">
      <div className="container-x">
        <div className="mb-10 text-center">
          <h2 className="text-[24px] font-black uppercase leading-tight tracking-tight text-ink md:text-[32px]">{heading} <span className="text-[#3e8914]">{highlight}</span></h2>
          <p className="mx-auto mt-2 max-w-lg text-[12px] font-bold text-ink/60 md:text-[14px]">{description}</p>
        </div>
        <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 ${cards.length <= 4 ? "lg:grid-cols-4" : "lg:grid-cols-6"}`}>
          {cards.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group flex flex-col items-center justify-between rounded-xl border border-black/10 bg-white p-4 shadow-[0_2px_8px_rgb(0,0,0,0.04)] transition-all hover:border-[#3e8914]/30 hover:shadow-lg">
              <div className={`mb-4 flex h-[100px] w-full items-center justify-center md:h-[120px] ${imageFit === "cover" ? "overflow-hidden rounded-lg" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.title}
                  className={`transition-transform duration-300 group-hover:scale-105 ${imageFit === "cover" ? "h-full w-full object-cover" : "max-h-full max-w-full object-contain"}`}
                />
              </div>
              <div className="text-center">
                <h3 className="text-[13px] font-bold text-ink md:text-[15px]">{service.title}</h3>
                <p className="mb-3 mt-1 text-[10px] font-medium text-ink/60 md:text-[11px]">{service.subtitle ?? "Repair & Service"}</p>
                <span className="flex items-center justify-center gap-1 text-[12px] font-bold text-[#3e8914]">Book Now <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
