"use client";

import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PhoneCall, ChevronDown } from "lucide-react";
import { allServices } from "@/data/services";
import {
  fetchCityCallsOurServices,
  resolveWebsiteImageUrl,
  type PublicOurServicesSection,
  type PublicServiceCard,
} from "@/lib/api/cityCallsHome";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { BookingModal } from "@/components/booking/BookingModal";

// Shown until (or if) Admin → Website Section → Our Services can't be loaded.
const fallbackSection: PublicOurServicesSection = {
  eyebrow: "Our services",
  heading: "Everything your home needs — one tap away.",
  highlight: "one tap away.",
  description: "Handpicked, background-verified professionals across appliance repair, cleaning, pest control, beauty and more.",
  buttonText: "Explore All Services",
  buttonLink: "/services",
  status: "ACTIVE",
};

const FALLBACK_SLUGS = [
  "refrigerator-service", "ac-service", "washing-machine-services", "television-repair-services",
  "microwave-oven-services", "geyser-repair-services", "chimney-repair-services", "general-pest-control",
  "termite-control", "sofa-shampooing", "kitchen-cleaning", "beauty-salon-services",
];

const fallbackCards: PublicServiceCard[] = FALLBACK_SLUGS.flatMap((slug, i) => {
  const service = allServices.find((s) => s.slug === slug);
  return service
    ? [{
        _id: `default-${i}`,
        name: service.name,
        path: `/services/${slug}`,
        shortDescription: service.short ?? "",
        image: service.image ?? "",
        imageAlt: service.name,
        priceText: service.price ?? "",
        sortOrder: i,
      }]
    : [];
});

// "/services/ac-service" → "ac-service" (what the booking form is keyed by).
const slugOf = (path: string) => path.split("/").filter(Boolean).pop() ?? "";

// Heading words before the highlight, and the highlighted words.
function headingParts(heading: string, highlight: string) {
  const index = highlight ? heading.indexOf(highlight) : -1;
  const words = (text: string) => text.split(/\s+/).filter(Boolean);
  if (index < 0) return { plain: words(heading), highlighted: [] as string[] };
  return { plain: words(heading.slice(0, index)), highlighted: words(highlight) };
}

const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const wordVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- Cool "rise + blur + shine sweep" card animation (no layout, no stretch) ---
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 45, scale: 0.9, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: 0.5 + (i % 4) * 0.09,
      type: "spring",
      stiffness: 140,
      damping: 16,
      mass: 0.7,
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.94,
    filter: "blur(4px)",
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
};

// Diagonal light-sweep that plays once as each card enters
const shineVariants: Variants = {
  hidden: { x: "-130%", opacity: 0 },
  visible: (i: number) => ({
    x: "130%",
    opacity: [0, 1, 0],
    transition: {
      delay: 0.5 + (i % 4) * 0.09 + 0.25,
      duration: 0.75,
      ease: "easeInOut",
    },
  }),
};

const dividerVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: { delay: 0.5 + (i % 4) * 0.09 + 0.4, duration: 0.4, ease: "easeOut" },
  }),
};

const CARDS_PER_ROW = 4;

// Card hover: the image slowly grows over the card while the white text area
// dissolves, then the name, line and Book Service button rise in one by one.
// Leaving reverses it quickly, without the entrance delays.
const CARD_HOVER_STYLES = `
  .svc-media {
    height: 10rem;
    transition: height 0.8s cubic-bezier(0.65, 0, 0.35, 1);
    will-change: height;
  }
  .svc-card:hover .svc-media { height: 100%; }

  .svc-img {
    transform: scale(1.01);
    transition: transform 1.8s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
  }
  .svc-card:hover .svc-img { transform: scale(1.1); }

  .svc-shade {
    opacity: 0;
    transition: opacity 0.35s ease;
  }
  .svc-card:hover .svc-shade {
    opacity: 1;
    transition: opacity 0.8s ease 0.1s;
  }

  /* white text area: comes back only once the image has started shrinking */
  .svc-body {
    transition: opacity 0.45s ease 0.25s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s, filter 0.45s ease 0.25s;
  }
  .svc-card:hover .svc-body {
    opacity: 0;
    transform: translateY(14px);
    filter: blur(3px);
    transition: opacity 0.3s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), filter 0.35s ease;
  }

  .svc-reveal {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.2s ease, transform 0.25s ease;
  }
  .svc-card:hover .svc-reveal {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.5s ease var(--d, 0s), transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s);
  }
  .svc-line {
    width: 0;
    transition: width 0.2s ease;
  }
  .svc-card:hover .svc-line {
    width: 3.5rem;
    transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s;
  }
  .svc-actions { pointer-events: none; }
  .svc-card:hover .svc-actions { pointer-events: auto; }

  @media (prefers-reduced-motion: reduce) {
    .svc-media, .svc-img, .svc-shade, .svc-body, .svc-reveal, .svc-line { transition: none !important; }
  }
`;

export function ServicesGrid() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState("");
  const [visibleRows, setVisibleRows] = useState(1);
  const [section, setSection] = useState<PublicOurServicesSection>(fallbackSection);
  const [cards, setCards] = useState<PublicServiceCard[]>(fallbackCards);

  useEffect(() => {
    const controller = new AbortController();
    fetchCityCallsOurServices(controller.signal)
      .then((data) => {
        if (data?.section) setSection({ ...fallbackSection, ...data.section });
        if (Array.isArray(data?.services)) setCards(data.services);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.warn("Using bundled services because the CMS cards could not be loaded.");
      });
    return () => controller.abort();
  }, []);

  const { plain: headingWords, highlighted: highlightWords } = headingParts(section.heading, section.highlight);

  const openModal = (slug: string) => {
    setActiveSlug(slug);
    setModalOpen(true);
  };

  const totalRows = Math.ceil(cards.length / CARDS_PER_ROW);
  const visibleCards = cards.slice(0, visibleRows * CARDS_PER_ROW);
  const isFullyExpanded = visibleRows >= totalRows;

  const handleToggle = () => {
    setVisibleRows((prev) => (prev >= totalRows ? 1 : prev + 1));
  };

  if (section.status === "INACTIVE" || cards.length === 0) return null;

  return (
    <section ref={sectionRef} id="services" className="pt-8 pb-8 bg-gray-50 overflow-hidden">
      <style>{CARD_HOVER_STYLES}</style>
      <div className="container-x mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
              className="h-px w-8 bg-primary-dark"
            />
            <span className="uppercase tracking-[0.3em] text-primary-dark font-bold text-[12px]">
              {section.eyebrow}
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              style={{ transformOrigin: "left" }}
              className="h-px w-8 bg-primary-dark"
            />
          </motion.div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-ink leading-tight relative inline-block">
            <span className="inline overflow-hidden">
              <motion.span
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline"
              >
                {headingWords.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
                    <motion.span variants={wordVariants} className="inline-block will-change-transform">
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </span>{" "}
            {highlightWords.length > 0 && (
            <span className="text-primary relative inline-block">
              <span className="inline overflow-hidden">
                <motion.span
                  variants={lineVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delayChildren: 0.35 }}
                  className="inline"
                >
                  {highlightWords.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
                      <motion.span variants={wordVariants} className="inline-block will-change-transform">
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </motion.span>
              </span>
              <motion.svg
                viewBox="0 0 200 16"
                preserveAspectRatio="none"
                className="absolute left-0 -bottom-2 w-full h-3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.75 }}
              >
                <path
                  d="M2 8 Q 50 14, 100 8 T 198 8"
                  fill="none"
                  stroke="currentColor"
                  className="stroke-primary"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
            )}
          </h2>

          {/* Paragraph + Show More/Less inline row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <p className="text-muted-foreground max-w-2xl">
              {section.description}
            </p>

            {totalRows > 1 && (
              <button
                onClick={handleToggle}
                className="group inline-flex items-center gap-2 border-2 border-border hover:border-primary-dark bg-card px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest text-ink hover:text-primary-dark transition-colors duration-300 shadow-sm hover:shadow-md shrink-0 w-fit"
              >
                {isFullyExpanded ? "Show Less" : "Show More"}
                <motion.span
                  animate={{ rotate: isFullyExpanded ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>
            )}
          </motion.div>
        </div>

        {/*
          Grid — NO `layout` prop. New rows only ever get appended below the
          existing ones, so already-visible cards never reposition. That's
          what keeps this glitch/stretch-free.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleCards.map((card, idx) => {
              const slug = slugOf(card.path);
              const service = {
                slug,
                name: card.name,
                image: card.image ? resolveWebsiteImageUrl(card.image) : undefined,
                imageAlt: card.imageAlt || card.name,
                price: card.priceText,
                short: card.shortDescription,
                href: card.path,
              };
              return (
                <motion.div
                  key={card._id}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  exit="exit"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 180, damping: 24 }}
                  className="svc-card group relative bg-card border-2 border-border overflow-hidden rounded-md hover:shadow-2xl hover:border-primary-dark transition-[box-shadow,border-color] duration-700 flex flex-col"
                >
                  <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-500 absolute top-0 left-0 z-40" />

                  {/* Shine sweep on entrance */}
                  <motion.div
                    custom={idx}
                    variants={shineVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="pointer-events-none absolute inset-0 z-30 w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  />

                  {/* Image — grows over the whole card on hover (covering the
                      white text area) and reveals the Book Service button. */}
                  <div className="svc-media absolute inset-x-0 top-0 z-20 overflow-hidden">
                    <Link href={service.href} className="block h-full w-full" tabIndex={-1}>
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        className="svc-img w-full h-full object-cover"
                      />
                    </Link>
                    <div className="svc-shade pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    {service.price && (
                      <div className="absolute top-2.5 left-2.5 rounded-full bg-background/90 backdrop-blur px-2 py-0.5 text-[10px] font-bold text-ink shadow-sm tracking-wide">
                        {service.price}
                      </div>
                    )}

                    <div className="svc-actions absolute inset-x-0 bottom-0 p-4">
                      <h3
                        className="svc-reveal text-[15px] font-bold uppercase tracking-wider text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]"
                        style={{ "--d": "0.3s" } as CSSProperties}
                      >
                        {service.name}
                      </h3>
                      <div className="svc-line mb-3 mt-1.5 h-0.5 bg-primary" />
                      <button
                        type="button"
                        onClick={() => openModal(service.slug)}
                        style={{ "--d": "0.42s" } as CSSProperties}
                        className="svc-reveal inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg transition-colors duration-300 hover:bg-primary-dark"
                      >
                        <PhoneCall className="h-4 w-4" strokeWidth={2} />
                        Book Service
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {/* keeps the image's space in the normal (not hovered) layout */}
                  <div aria-hidden className="h-40 shrink-0" />

                  <div
                    className="svc-body relative z-30 -mt-5 ml-4 cursor-pointer"
                    onClick={() => openModal(service.slug)}
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-card border-2 border-border rounded-md group-hover:bg-primary-dark group-hover:border-primary-dark transition-all duration-300 shadow-md">
                      <PhoneCall
                        className="w-4 h-4 text-primary-dark group-hover:text-card transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <div className="svc-body relative z-10 px-4 pt-2 pb-4 flex flex-col flex-1">
                    <div className="absolute -top-4 right-2 text-5xl font-black text-muted-foreground/10 group-hover:text-primary/20 transition-colors duration-500 leading-none select-none pointer-events-none">
                      {(idx + 1).toString().padStart(2, "0")}
                    </div>

                    <Link href={service.href} className="block">
                      <h3 className="text-[15px] font-bold text-ink group-hover:text-primary mb-1.5 uppercase tracking-wider transition-colors duration-300">
                        {service.name}
                      </h3>
                    </Link>

                    <motion.div
                      custom={idx}
                      variants={dividerVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      style={{ transformOrigin: "left" }}
                      className="w-8 h-0.5 bg-border group-hover:w-14 group-hover:bg-primary transition-all duration-500 mb-2.5"
                    />

                    <p className="text-muted-foreground text-[13px] leading-relaxed mb-4 flex-1 line-clamp-3">
                      {service.short}
                    </p>

                    <button
                      onClick={() => openModal(service.slug)}
                      className="inline-flex items-center gap-2 text-primary text-[11px] font-bold uppercase tracking-widest hover:text-primary-dark transition-colors duration-300 w-fit mt-auto cursor-pointer"
                    >
                      Book Service
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>

                  <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[36px] border-l-transparent border-b-[36px] border-b-primary/30 group-hover:border-b-primary/60 transition-colors duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-6 text-center"
        >
          {section.buttonText && (
          <Link
            href={section.buttonLink || "/services"}
            className="inline-flex items-center justify-center gap-2.5 bg-primary-dark hover:bg-primary text-primary-foreground px-8 py-3 font-bold uppercase tracking-widest text-[11px] shadow-lg transition-all duration-300 group rounded-md"
          >
            {section.buttonText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
          )}
          <p className="mt-3 text-muted-foreground text-[10px] font-semibold uppercase tracking-widest">
            Your trusted home service partner
          </p>
        </motion.div>
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceSlug={activeSlug}
      />
    </section>
  );
}
