import type { PublicServicePage } from "@/lib/api/servicePages";
import { GHAZIABAD_AREAS, PEST_IMAGES } from "../../pestServicesList";

// Cockroach control page copy — hero, walkthrough, stats, banner and areas.
export const cockroachControlPageContent: PublicServicePage = {
  id: "local-cockroach-control",
  slug: "cockroach-control",
  serviceName: "Cockroach Control",
  serviceImage: PEST_IMAGES.cockroach,
  heroImage: PEST_IMAGES.cockroach,
  heroEyebrow: "Targeted Gel Treatment",
  heroTitle: "Cockroach Control in\nGhaziabad",
  heroHighlight: "Ghaziabad",
  heroDescription: "German and American cockroaches eliminated with odourless gel baiting — no smell, no mess, no need to vacate.",
  heroFeatures: [
    { title: "Odourless", subtitle: "Gel Bait" },
    { title: "No Need", subtitle: "to Vacate" },
    { title: "Kitchen", subtitle: "Safe" },
    { title: "3-Month", subtitle: "Warranty" },
  ],
  walkthroughEyebrow: "Simple Cockroach Care",
  walkthroughTitle: "How Cockroach Control Works",
  walkthroughHighlight: "Works",
  walkthroughDescription: "Gel bait is placed exactly where cockroaches hide and breed, so the whole colony is wiped out — not just the ones you see.",
  steps: [
    { badge: "Step 01", title: "Book Your Treatment", description: "Tell us where you see cockroaches and how many, then choose a convenient slot." },
    { badge: "Step 02", title: "Expert Assigned", description: "A certified pest control professional is assigned to your booking." },
    { badge: "Step 03", title: "Gel Baiting", description: "Gel is applied in cracks, hinges, drains and appliance gaps — where cockroaches hide and breed." },
    { badge: "Step 04", title: "Colony Wiped Out", description: "Cockroaches carry the bait back to the colony; most disappear within 7–10 days, backed by a 3-month warranty." },
  ],
  statsTitle: "TRUSTED FOR COCKROACH-FREE KITCHENS",
  statsHighlight: "COCKROACH-FREE KITCHENS",
  stats: [
    { value: "8K+", label: "Kitchens Treated" },
    { value: "50+", label: "Certified Experts" },
    { value: "3 Mo", label: "Service Warranty" },
    { value: "4.8", label: "Average Rating" },
  ],
  bannerEyebrow: "Cockroach Control",
  bannerTitle: "Say Goodbye to Cockroaches",
  bannerHighlight: "Cockroaches",
  bannerDescription: "Odourless gel baiting for kitchens and bathrooms that wipes out the entire colony — safe around food and family.",
  areasTitle: "Cockroach Control Areas in Ghaziabad",
  areasHighlight: "Ghaziabad",
  areasDescription: "Fast doorstep cockroach control across major Ghaziabad neighbourhoods for homes, restaurants and offices.",
  areas: GHAZIABAD_AREAS,
};
