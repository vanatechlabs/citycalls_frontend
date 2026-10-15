"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ServiceCardsGrid, type ServiceCard } from "@/components/services/ServiceCards/ServiceCardsGrid";
import { allServices } from "@/data/services";
import { fetchCityCallsOurServices, resolveWebsiteImageUrl } from "@/lib/api/cityCallsHome";
import { fetchCityCallsNavbarMenus } from "@/lib/api/navbar";

export type OtherServiceCard = ServiceCard;

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
      <div className="container-x">
        <div className="mb-10 text-center">
          <h2 className="text-[24px] font-black uppercase leading-tight tracking-tight text-ink md:text-[32px]">
            {heading} <span className="text-[#3e8914]">{fromMenu ? `${fromMenu.name} Services` : highlight}</span>
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-[12px] font-bold text-ink/60 md:text-[14px]">{description}</p>
        </div>

        <ServiceCardsGrid cards={cards} />
      </div>
    </section>
  );
}
