import type { ServiceCard } from "@/components/services/ServiceCards/ServiceCardsGrid";
import { allServices } from "@/data/services";
import { fetchCityCallsNavbarMenus } from "@/lib/api/navbar";
import { fetchCityCallsOurServices, resolveWebsiteImageUrl } from "@/lib/api/cityCallsHome";
import type { PublicLocationPage } from "@/lib/api/locationPages";

const clean = (path: string) => path.replace(/\/+$/, "").toLowerCase() || "/";
const lastSegment = (path: string) => path.split("/").filter(Boolean).pop() ?? "";

export interface LocationCards {
  // e.g. "Home Appliance Services" (service page) or "Our Services" (home page).
  groupName: string;
  cards: ServiceCard[];
}

// Cards under a location page, titled for its city ("AC Service in Noida"):
// a service page shows every service of its Navbar List menu (itself first),
// the home page every service. A card links to that service's page for the
// same city when one is published, else to the service page. Photo,
// description and price come from Our Services / the bundled data, like the
// home page cards.
export async function buildLocationCards(page: PublicLocationPage): Promise<LocationCards> {
  const [menus, homeCards] = await Promise.all([
    fetchCityCallsNavbarMenus().catch(() => []),
    fetchCityCallsOurServices().then((data) => data?.services ?? []).catch(() => []),
  ]);

  let groupName = "Our Services";
  let services = menus.flatMap((m) => m.services);
  if (page.pageType === "SERVICE") {
    const here = clean(page.servicePath);
    const menu = menus.find((m) => m.services.some((s) => clean(s.path) === here));
    if (menu) {
      groupName = `${menu.name} Services`;
      services = [...menu.services].sort((a, b) => Number(clean(b.path) === here) - Number(clean(a.path) === here));
    } else {
      groupName = page.menuName ? `${page.menuName} Services` : "Our Services";
      services = services.filter((s) => clean(s.path) === here);
    }
  }

  const cityPage = new Map(page.sameCity.map((p) => [clean(p.servicePath), p.slug]));
  const seen = new Set<string>();
  const cards: ServiceCard[] = [];
  for (const s of services) {
    const slug = lastSegment(s.path);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    const home = homeCards.find((c) => clean(c.path) === clean(s.path));
    const local = allServices.find((x) => x.slug === slug);
    const image = home?.image || local?.image || s.image || "";
    const localPage = clean(s.path) === clean(page.servicePath) ? null : cityPage.get(clean(s.path));
    cards.push({
      title: `${s.name} in ${page.location}`,
      bookingName: s.name,
      slug,
      path: localPage ? `/${localPage}` : s.path,
      image: image ? resolveWebsiteImageUrl(image, 640) : "",
      imageAlt: `${s.name} in ${page.location}`,
      subtitle: home?.shortDescription || local?.short || "",
      price: home?.priceText || local?.price || "",
    });
  }
  return { groupName, cards };
}
