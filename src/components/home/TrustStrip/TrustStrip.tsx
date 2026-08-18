import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import s1 from "@/assets/Services/s1.png";
import s2 from "@/assets/Services/s2.png";
import s3 from "@/assets/Services/s3.png";
import s4 from "@/assets/Services/s4.png";

const countersData = [
  { value: 10000, suffix: "+", label: "Happy Customers", image: s1 },
  { value: 100, suffix: "%", label: "Verified Professionals", image: s2 },
  { value: 60, suffix: " min", label: "Average Response Time", image: s3 },
  { value: 4.8, suffix: "★", label: "Average Rating", image: s4 },
];

export function TrustStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });
  const [counts, setCounts] = useState(countersData.map(() => 0));

  useEffect(() => {
    if (isInView) {
      countersData.forEach((c, i) => {
        animate(0, c.value, {
          duration: 2.5,
          ease: "easeOut",
          onUpdate: (latest) => {
            setCounts((prev) => {
              const next = [...prev];
              next[i] = c.value % 1 !== 0 ? Number(latest.toFixed(1)) : Math.round(latest);
              return next;
            });
          },
        });
      });
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="py-8 bg-background overflow-hidden border-b border-border"
    >
      <div className="container-x mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {countersData.map((c, i) => (
            <div
              key={c.label}
              className="group relative border border-border overflow-hidden hover:shadow-xl transition-all duration-300 rounded-md"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Light black overlay — image clearly visible */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />

                {/* Counter content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-10">
                  <div className="text-3xl md:text-4xl font-bold text-white leading-none drop-shadow-md">
                    {c.value % 1 !== 0 ? counts[i].toFixed(1) : counts[i].toLocaleString()}{c.suffix}
                  </div>
                  <div className="w-8 h-0.5 bg-primary my-3" />
                  <div className="text-white/90 text-[10px] font-semibold uppercase tracking-[0.15em] drop-shadow-sm">
                    {c.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
