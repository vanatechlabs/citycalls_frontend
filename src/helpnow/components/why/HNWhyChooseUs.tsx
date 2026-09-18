import { useState } from "react";
import { motion } from "framer-motion";
import ab1 from "@/assets/Images/h1.png";
import ab2 from "@/assets/Images/h2.png";
import ab3 from "@/assets/Images/h3.png";
import ab4 from "@/assets/Images/h4.png";
import s1 from "@/assets/Images/h5.png";

const projects = [
  {
    id: 1,
    number: "01",
    title: "DISH WASHING",
    subtitle: "Utensil Care",
    subtitle2: "",
    description:
      "Sparkling clean utensils with thorough hygiene, grease-free washing, and organized kitchen storage.",
    image: ab1,
  },
  {
    id: 2,
    number: "02",
    title: "KITCHEN",
    subtitle: "CLEANING",
    subtitle2: "Sanitization",
    description:
      "Deep sanitized kitchen counters, stovetops, sink cleaning, and spotless tile wiping.",
    image: ab2,
  },
  {
    id: 3,
    number: "03",
    title: "FAN & WINDOW",
    subtitle: "CARE",
    subtitle2: "",
    description:
      "Dust-free windows, glass cleaning, mesh wiping, and high ceiling fan restoration.",
    image: ab3,
  },
  {
    id: 4,
    number: "04",
    title: "LAUNDRY &",
    subtitle: "IRONING",
    subtitle2: "",
    description:
      "Fresh, neatly washed, folded & crisp steam ironed clothes delivered with care.",
    image: ab4,
  },
  {
    id: 5,
    number: "05",
    title: "EXPERT HOME",
    subtitle: "CARE",
    subtitle2: "",
    description:
      "Background-checked, police-verified professional maids tailored for your daily home comfort.",
    image: s1,
  },
];

export function HNWhyChooseUs() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative w-full" style={{ background: "#ffffff", paddingTop: "60px" }}>
      <div className="flex w-full gap-0 overflow-hidden" style={{ height: "560px" }}>
          {projects.map((project, index) => {
            const isHovered = hovered === index;
            const originClass = index < 3 ? "origin-left" : "origin-right";

            return (
              <motion.div
                key={project.id}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={`relative h-full cursor-pointer overflow-hidden ${originClass}`}
                animate={{ flex: isHovered ? 3 : 1 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              >
                {/* IMAGE */}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{ scale: isHovered ? 1.08 : 1 }}
                  transition={{ duration: 1.5 }}
                />

                {/* DARK GRADIENT OVERLAY */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-75"
                  }`}
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.48) 45%, rgba(15,23,42,0.12) 100%)",
                  }}
                />

                {/* TILE GRID PATTERN */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ opacity: isHovered ? 0.05 : 0.02 }}
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <pattern id={`tileP${index}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                      <rect x="3" y="3" width="54" height="54" rx="2" fill="none" stroke="white" strokeWidth="0.7" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#tileP${index})`} />
                </svg>

                {/* CONTENT */}
                <div className="relative z-10 h-full flex flex-col justify-end p-5 lg:p-7">
                  {/* BOTTOM */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 lg:gap-6">
                    {/* LEFT titles */}
                    <div className="flex flex-col">
                      <h3
                        style={{
                          color: "#fff",
                          fontSize: "clamp(16px, 2vw, 22px)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          lineHeight: 1.2,
                          letterSpacing: "0.03em",
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          margin: 0,
                        }}
                      >
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <h3
                          style={{
                            color: "#fff",
                            fontSize: "clamp(16px, 2vw, 22px)",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            lineHeight: 1.2,
                            letterSpacing: "0.03em",
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            margin: "2px 0 0 12px",
                          }}
                        >
                          {project.subtitle}
                        </h3>
                      )}
                      {project.subtitle2 && (
                        <h3
                          style={{
                            color: "#fff",
                            fontSize: "clamp(16px, 2vw, 22px)",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            lineHeight: 1.2,
                            letterSpacing: "0.03em",
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            margin: "2px 0 0 24px",
                          }}
                        >
                          {project.subtitle2}
                        </h3>
                      )}

                      {/* Mustard gold accent bar */}
                      <div
                        className="mt-3 relative overflow-hidden"
                        style={{ height: 2, width: 72, background: "rgba(255,255,255,0.15)", borderRadius: 1 }}
                      >
                        <motion.div
                          className="absolute inset-0"
                          style={{ background: "#f5a623", borderRadius: 1 }}
                          animate={{ x: isHovered ? "0%" : "-100%" }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>

                    {/* RIGHT description */}
                    <motion.div
                      className="max-w-[260px]"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 16 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <p
                        style={{
                          color: "rgba(255,255,255,0.85)",
                          fontSize: 13,
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 400,
                          lineHeight: 1.7,
                          textAlign: "right",
                          margin: 0,
                          letterSpacing: "0.01em",
                        }}
                      >
                        {project.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </section>
  );
}

export const HNWhyAccordion = HNWhyChooseUs;
