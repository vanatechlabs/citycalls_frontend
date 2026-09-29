import type { ServiceSidebarContent } from "@/components/services/RefrigeratorService/ServiceSidebar/ServiceSidebar";
import type { PublicServicePage } from "@/lib/api/servicePages";
import { CLEANING_HOURS, GHAZIABAD_AREAS } from "../cleaningServicesList";

// Builders that fill in what every cleaning page shares (contact details,
// service areas, heading highlights), so each config only holds its own copy.

type Step = PublicServicePage["steps"][number];
type Stat = PublicServicePage["stats"][number];

interface PageCopy {
  slug: string;
  serviceName: string;
  image: string;
  heroEyebrow: string;
  heroDescription: string;
  heroFeatures: PublicServicePage["heroFeatures"];
  walkthroughEyebrow: string;
  walkthroughTitle: string;
  walkthroughDescription: string;
  steps: Step[];
  statsTitle: string;
  statsHighlight: string;
  stats: Stat[];
  bannerEyebrow: string;
  bannerTitle: string;
  bannerHighlight: string;
  bannerDescription: string;
  areasDescription: string;
}

export function cleaningPageContent(copy: PageCopy): PublicServicePage {
  return {
    id: `local-${copy.slug}`,
    slug: copy.slug,
    serviceName: copy.serviceName,
    serviceImage: copy.image,
    heroImage: copy.image,
    heroEyebrow: copy.heroEyebrow,
    heroTitle: `${copy.serviceName} in\nGhaziabad`,
    heroHighlight: "Ghaziabad",
    heroDescription: copy.heroDescription,
    heroFeatures: copy.heroFeatures,
    walkthroughEyebrow: copy.walkthroughEyebrow,
    walkthroughTitle: copy.walkthroughTitle,
    walkthroughHighlight: "Works",
    walkthroughDescription: copy.walkthroughDescription,
    steps: copy.steps,
    statsTitle: copy.statsTitle,
    statsHighlight: copy.statsHighlight,
    stats: copy.stats,
    bannerEyebrow: copy.bannerEyebrow,
    bannerTitle: copy.bannerTitle,
    bannerHighlight: copy.bannerHighlight,
    bannerDescription: copy.bannerDescription,
    areasTitle: `${copy.serviceName} Areas in Ghaziabad`,
    areasHighlight: "Ghaziabad",
    areasDescription: copy.areasDescription,
    areas: GHAZIABAD_AREAS,
  };
}

export function cleaningSidebarContent(serviceName: string, whyChooseItems: string[], faqs: ServiceSidebarContent["faqs"]): ServiceSidebarContent {
  return {
    whyChooseTitle: `Why Choose CityCalls for ${serviceName}?`,
    whyChooseItems,
    contactTitle: `${serviceName} Support`,
    phone: "+91 74288 08884",
    whatsapp: "+91 74288 08884",
    email: "hello@citycalls.in",
    hours: CLEANING_HOURS,
    coverageTitle: `${serviceName} Coverage`,
    coverageLines: ["All major areas in Ghaziabad", "and nearby locations."],
    faqs,
  };
}

export const step = (n: number, title: string, description: string): Step => ({ badge: `Step 0${n}`, title, description });
