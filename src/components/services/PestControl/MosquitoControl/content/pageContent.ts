import type { PublicServicePage } from "@/lib/api/servicePages";
import { GHAZIABAD_AREAS, PEST_IMAGES } from "../../pestServicesList";

// Mosquito control page copy — hero, walkthrough, stats, banner and areas.
export const mosquitoControlPageContent: PublicServicePage = {
  id: "local-mosquito-control",
  slug: "mosquito-control",
  serviceName: "Mosquito Control",
  serviceImage: PEST_IMAGES.mosquito,
  heroImage: PEST_IMAGES.mosquito,
  heroEyebrow: "Indoor & Outdoor Mosquito Care",
  heroTitle: "Mosquito Control in\nGhaziabad",
  heroHighlight: "Ghaziabad",
  heroDescription: "Indoor spray, outdoor fogging and larvicide for balconies, terraces and stagnant water — safe for kids and pets.",
  heroFeatures: [
    { title: "Indoor", subtitle: "Spray" },
    { title: "Outdoor", subtitle: "Fogging" },
    { title: "Larvae", subtitle: "Control" },
    { title: "Kid & Pet", subtitle: "Safe" },
  ],
  walkthroughEyebrow: "Simple Mosquito Care",
  walkthroughTitle: "How Mosquito Control Works",
  walkthroughHighlight: "Works",
  walkthroughDescription: "We kill adult mosquitoes and stop new ones breeding, so your home stays bite-free through the season.",
  steps: [
    { badge: "Step 01", title: "Book Your Treatment", description: "Tell us where mosquitoes bother you most and whether there's stagnant water nearby." },
    { badge: "Step 02", title: "Expert Assigned", description: "A certified pest control professional is assigned to your booking." },
    { badge: "Step 03", title: "Spray, Fog & Larvicide", description: "Indoor residual spray, outdoor fogging and larvicide in water collection points where mosquitoes breed." },
    { badge: "Step 04", title: "Breeding Check & Report", description: "You get a short report of breeding spots found and tips to keep them from coming back." },
  ],
  statsTitle: "TRUSTED FOR BITE-FREE HOMES",
  statsHighlight: "BITE-FREE HOMES",
  stats: [
    { value: "4K+", label: "Homes Treated" },
    { value: "300+", label: "Societies Covered" },
    { value: "95%", label: "Mosquito Reduction" },
    { value: "4.8", label: "Average Rating" },
  ],
  bannerEyebrow: "Mosquito Control",
  bannerTitle: "Sleep Bite-Free Tonight",
  bannerHighlight: "Bite-Free",
  bannerDescription: "Indoor spray plus outdoor fogging and larvicide treatment — protecting your family from dengue, malaria and chikungunya.",
  areasTitle: "Mosquito Control Areas in Ghaziabad",
  areasHighlight: "Ghaziabad",
  areasDescription: "Mosquito control for homes and housing societies across major Ghaziabad neighbourhoods.",
  areas: GHAZIABAD_AREAS,
};
