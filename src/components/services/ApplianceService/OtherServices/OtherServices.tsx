"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";
import { CARD_HOVER_STYLES } from "@/components/home/ServicesGrid/ServicesGrid";
import { allServices } from "@/data/services";
import { fetchCityCallsOurServices, resolveWebsiteImageUrl } from "@/lib/api/cityCallsHome";
import { fetchCityCallsNavbarMenus } from "@/lib/api/navbar";

export interface OtherServiceCard {
  title: string;
  image: string;
  slug: string;
  subtitle?: string;
  // Page link when it isn't /services/<slug>.
  path?: string;
  // Small pill on the photo, e.g. "₹299 visit charge".
  price?: string;
  imageAlt?: string;
}

const APPLIANCE_SERVICES: OtherServiceCard[] = [
  { title: "Refrigerator", image: "/assets/Services/s1.webp", slug: "refrigerator-service" },
  { title: "Air Conditioner", image: "/assets/Services/s2.webp", slug: "ac-service" },
  { title: "Washing Machine", image: "/assets/Services/s3.webp", slug: "washing-machine-services" },
  { title: "LED TV", image: "/assets/Services/s4.webp", slug: "television-repair-services" },
  { title: "Microwave Oven", image: "/assets/Services/s5.webp", slug: "microwave-oven-services" },
  { title: "Geyser", image: "/assets/Services/s6.webp", slug: "geyser-repair-services" },
  { title: "Kitchen Chimney", image: "/assets/Services/s7.webp", slug: "chimney-repair-services" },
];

interface OtherServicesProps {
  // Defaults to the page being viewed.
  currentSlug?: string;
  // Shown until the Navbar List menu loads (or if it can't): the appliance
  // strip by default; pest control etc. pass their own.
  services?: OtherServiceCard[];
  heading?: string;
  highlight?: string;
  description?: string;
  // Kept for callers; every card now shows its photo edge to edge.
  imageFit?: "contain" | "cover";
}

const clean = (path: string) => path.replace(/\/+$/, "").toLowerCase();
const lastSegment = (path: string) => path.split("/").filter(Boolean).pop() ?? "";

// Bundled photo / one-line description / price for a service, by its slug.
function bundled(slug: string) {
  const service = allServices.find((s) => s.slug === slug);
  return { image: service?.image ?? "", subtitle: service?.short ?? "", price: service?.price ?? "" };
}

// "Other ... services" — the same cards as the home page's Our Services, for
// the other services of this page's Navbar List menu (every navlink of that
// menu except the page being viewed). Photo, description and price come from
// Admin → Website Section → Our Services when that service has a card there.
// "Book Service" opens that service's booking form right here; the photo and
// name open its page.
export function OtherServices({
  currentSlug,
  services = APPLIANCE_SERVICES,
  heading = "OTHER",
  highlight = "APPLIANCE SERVICES",
  description = "Professional doorstep repair for your other essential home appliances.",
}: OtherServicesProps) {
  const pathname = usePathname() ?? "";
  const slug = currentSlug ?? lastSegment(pathname);
  const [menu, setMenu] = useState<{ path: string; name: string; cards: OtherServiceCard[] } | null>(null);
  const [booking, setBooking] = useState<OtherServiceCard | null>(null);

  useEffect(() => {
    if (!pathname) return;
    const controller = new AbortController();
    Promise.all([
      fetchCityCallsNavbarMenus(controller.signal),
      // Only used to enrich the cards — fine if it can't be loaded.
      fetchCityCallsOurServices(controller.signal).then((data) => data?.services ?? []).catch(() => []),
    ])
      .then(([menus, homeCards]) => {
        const here = clean(pathname);
        const current = menus.find((m) => m.services.some((s) => clean(s.path) === here));
        if (!current) return;
        setMenu({
          path: pathname,
          name: current.name,
          cards: current.services
            .filter((s) => clean(s.path) !== here)
            .map((s) => {
              const serviceSlug = lastSegment(s.path);
              const home = homeCards.find((c) => clean(c.path) === clean(s.path));
              const local = bundled(serviceSlug);
              const image = home?.image || local.image || services.find((f) => f.slug === serviceSlug)?.image || s.image || "";
              return {
                title: s.name,
                slug: serviceSlug,
                path: s.path,
                image: image ? resolveWebsiteImageUrl(image, 640) : "",
                imageAlt: home?.imageAlt || s.name,
                subtitle: home?.shortDescription || local.subtitle,
                price: home?.priceText || local.price,
              };
            }),
        });
      })
      .catch(() => {
        // Keep the bundled cards — the rest of the page still works.
      });
    return () => controller.abort();
    // `services` is a fixed list per page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const fromMenu = menu?.path === pathname ? menu : null;
  const cards = fromMenu
    ? fromMenu.cards
    : services.filter((service) => service.slug !== slug).map((service) => {
        const local = bundled(service.slug);
        return { ...service, subtitle: service.subtitle ?? local.subtitle, price: service.price ?? local.price };
      });
  if (cards.length === 0) return null;

  return (
    <section className="w-full border-t border-black/5 bg-white py-12 md:py-16">
      <style>{CARD_HOVER_STYLES}</style>
      <div className="container-x">
        <div className="mb-10 text-center">
          <h2 className="text-[24px] font-black uppercase leading-tight tracking-tight text-ink md:text-[32px]">
            {heading} <span className="text-[#3e8914]">{fromMenu ? `${fromMenu.name} Services` : highlight}</span>
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-[12px] font-bold text-ink/60 md:text-[14px]">{description}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                className="svc-card group relative flex flex-col overflow-hidden rounded-md border-2 border-border bg-card transition-[box-shadow,border-color] duration-700 hover:border-primary-dark hover:shadow-2xl"
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
      </div>

      <BookingModal isOpen={!!booking} onClose={() => setBooking(null)} serviceSlug={booking?.slug ?? ""} serviceName={booking?.title} />
    </section>
  );
}
