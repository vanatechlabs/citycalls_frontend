import type { PublicServicePage } from "@/lib/api/servicePages";
import { GHAZIABAD_AREAS, PEST_IMAGES } from "../../pestServicesList";

// Termite control page copy — hero, walkthrough, stats, banner and areas.
export const termiteControlPageContent: PublicServicePage = {
  id: "local-termite-control",
  slug: "termite-control",
  serviceName: "Termite Control",
  serviceImage: PEST_IMAGES.termite,
  heroImage: PEST_IMAGES.termite,
  heroEyebrow: "Anti-Termite Treatment",
  heroTitle: "Termite Control in\nGhaziabad",
  heroHighlight: "Ghaziabad",
  heroDescription: "Mud tubes, hollow wood and damaged furniture — stopped at the source with drill-fill-seal chemical barriers.",
  heroFeatures: [
    { title: "Drill-Fill", subtitle: "Seal Method" },
    { title: "Wood & Wall", subtitle: "Protection" },
    { title: "Odourless", subtitle: "Chemicals" },
    { title: "Up to 5-Year", subtitle: "Warranty" },
  ],
  walkthroughEyebrow: "Complete Termite Protection",
  walkthroughTitle: "How Termite Control Works",
  walkthroughHighlight: "Works",
  walkthroughDescription: "We find the colony's path, cut it off with a chemical barrier and protect your woodwork for years.",
  steps: [
    { badge: "Step 01", title: "Book an Inspection", description: "Tell us where you've seen mud tubes or wood damage and choose a convenient slot." },
    { badge: "Step 02", title: "Termite Expert Assigned", description: "A certified termite specialist inspects walls, floors, wooden frames and furniture." },
    { badge: "Step 03", title: "Drill, Fill & Seal", description: "Holes are drilled along wall-floor junctions, filled with termiticide and sealed; wood is sprayed too." },
    { badge: "Step 04", title: "Warranty & Follow-up", description: "Covered areas get a written warranty with scheduled follow-up checks." },
  ],
  statsTitle: "TRUSTED FOR TERMITE PROTECTION",
  statsHighlight: "TERMITE PROTECTION",
  stats: [
    { value: "3K+", label: "Homes Protected" },
    { value: "25+", label: "Termite Specialists" },
    { value: "5 Yr", label: "Max Warranty" },
    { value: "4.8", label: "Average Rating" },
  ],
  bannerEyebrow: "Termite Control",
  bannerTitle: "Protect Your Woodwork for Years",
  bannerHighlight: "for Years",
  bannerDescription: "Drill-fill-seal treatment for walls and floors plus wood surface spray — with up to 5 years of written warranty.",
  areasTitle: "Termite Control Areas in Ghaziabad",
  areasHighlight: "Ghaziabad",
  areasDescription: "Anti-termite treatment across major Ghaziabad neighbourhoods for homes, offices and new constructions.",
  areas: GHAZIABAD_AREAS,
};
