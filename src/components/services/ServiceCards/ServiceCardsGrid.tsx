"use client";

import { useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, PhoneCall } from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";
import { CARD_HOVER_STYLES } from "@/components/home/ServicesGrid/ServicesGrid";

export interface ServiceCard {
  title: string;
  image: string;
  slug: string;
  subtitle?: string;
  // Page link when it isn't /services/<slug>.
  path?: string;
  // Small pill on the photo, e.g. "₹299 visit charge".
  price?: string;
  imageAlt?: string;
  // Name for the booking form when the card title is longer
  // (e.g. "AC Service in Noida" books "AC Service").
  bookingName?: string;
}

const CARDS_PER_ROW = 4;

// The home page's Our Services card, in a 4-per-row grid. "Book Service"
// opens that service's booking form right here; the photo and name open its page.
// With `rowsPerStep`, only that many rows show at first and "Show More" adds
// as many again (like the home page's Our Services). Hidden cards stay in the
// page (just not displayed), so search engines still see every link.
export function ServiceCardsGrid({ cards, rowsPerStep }: { cards: ServiceCard[]; rowsPerStep?: number }) {
  const [booking, setBooking] = useState<ServiceCard | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const step = rowsPerStep ? rowsPerStep * CARDS_PER_ROW : cards.length;
  const [shown, setShown] = useState(step);
  const allShown = shown >= cards.length;

  const toggle = () => {
    if (!allShown) return setShown((n) => n + step);
    setShown(step);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{CARD_HOVER_STYLES}</style>
      <div ref={gridRef} className="grid scroll-mt-28 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((service, idx) => {
          const href = service.path ?? `/services/${service.slug}`;
          return (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 36, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (idx % 4) * 0.09, type: "spring", stiffness: 140, damping: 18 }}
              whileHover={{ y: -6 }}
              className={`svc-card group relative ${idx >= shown ? "hidden" : "flex"} flex-col overflow-hidden rounded-md border-2 border-border bg-card transition-[box-shadow,border-color] duration-700 hover:border-primary-dark hover:shadow-2xl`}
            >
              <div className="absolute left-0 top-0 z-40 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />

              {/* Photo — grows over the whole card on hover and shows the Book Service button */}
              <div className="svc-media absolute inset-x-0 top-0 z-20 overflow-hidden bg-muted">
                <Link href={href} className="block h-full w-full" tabIndex={-1} aria-label={`${service.title} — view details`}>
                  {service.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img loading="lazy" decoding="async" src={service.image} alt={service.imageAlt || service.title} className="svc-img h-full w-full object-cover" />
                  )}
                </Link>
                <div className="svc-shade pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                {service.price && (
                  <div className="absolute left-2.5 top-2.5 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-bold tracking-wide text-ink shadow-sm backdrop-blur">
                    {service.price}
                  </div>
                )}
                <div className="svc-actions absolute inset-x-0 bottom-0 p-4">
                  <p className="svc-reveal text-[15px] font-bold uppercase tracking-wider text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]" style={{ "--d": "0.3s" } as CSSProperties}>
                    {service.title}
                  </p>
                  <div className="svc-line mb-3 mt-1.5 h-0.5 bg-primary" />
                  <button
                    type="button"
                    onClick={() => setBooking(service)}
                    style={{ "--d": "0.42s" } as CSSProperties}
                    className="svc-reveal inline-flex items-center gap-2 rounded-md bg-primary-dark px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg transition-colors duration-300 hover:bg-ink"
                  >
                    <PhoneCall className="h-4 w-4" strokeWidth={2} />
                    Book Service
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {/* keeps the photo's space in the normal (not hovered) layout */}
              <div aria-hidden className="h-40 shrink-0" />

              <div className="svc-body relative z-30 -mt-5 ml-4 w-fit cursor-pointer" onClick={() => setBooking(service)}>
                <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-border bg-card shadow-md transition-all duration-300 group-hover:border-primary-dark group-hover:bg-primary-dark">
                  <PhoneCall className="h-4 w-4 text-primary-dark transition-colors duration-300 group-hover:text-card" strokeWidth={1.5} />
                </div>
              </div>

              <div className="svc-body relative z-10 flex flex-1 flex-col px-4 pb-4 pt-2">
                <div className="pointer-events-none absolute -top-4 right-2 select-none text-5xl font-black leading-none text-muted-foreground/10 transition-colors duration-500 group-hover:text-primary/20">
                  {(idx + 1).toString().padStart(2, "0")}
                </div>
                <Link href={href} className="block">
                  <h3 className="mb-1.5 text-[15px] font-bold uppercase tracking-wider text-ink transition-colors duration-300 group-hover:text-primary-dark">{service.title}</h3>
                </Link>
                <div className="mb-2.5 h-0.5 w-8 bg-border transition-all duration-500 group-hover:w-14 group-hover:bg-primary" />
                <p className="mb-4 line-clamp-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  {service.subtitle || "Trusted doorstep service by verified CityCalls professionals."}
                </p>
                <button
                  type="button"
                  onClick={() => setBooking(service)}
                  className="mt-auto inline-flex w-fit cursor-pointer items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary-dark transition-colors duration-300 hover:text-ink"
                >
                  Book Service
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              <div className="pointer-events-none absolute bottom-0 right-0 h-0 w-0 border-b-[36px] border-l-[36px] border-b-primary/30 border-l-transparent transition-colors duration-300 group-hover:border-b-primary/60" />
            </motion.div>
          );
        })}
      </div>

      {cards.length > step && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={toggle}
            aria-expanded={allShown}
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border-2 border-border bg-card px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest text-ink shadow-sm transition-colors duration-300 hover:border-primary-dark hover:text-primary-dark hover:shadow-md"
          >
            {allShown ? "Show Less" : `Show More (${cards.length - shown})`}
            <motion.span animate={{ rotate: allShown ? 180 : 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="flex">
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </button>
        </div>
      )}

      <BookingModal
        isOpen={!!booking}
        onClose={() => setBooking(null)}
        serviceSlug={booking?.slug ?? ""}
        serviceName={booking ? booking.bookingName ?? booking.title : undefined}
      />
    </>
  );
}
