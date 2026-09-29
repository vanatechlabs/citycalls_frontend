import type { PublicServicePage } from "@/lib/api/servicePages";
import { GHAZIABAD_AREAS, PEST_IMAGES } from "../../pestServicesList";

// Bed bug treatment page copy — hero, walkthrough, stats, banner and areas.
export const bedBugTreatmentPageContent: PublicServicePage = {
  id: "local-bed-bug-treatment",
  slug: "bed-bug-treatment",
  serviceName: "Bed Bug Treatment",
  serviceImage: PEST_IMAGES.bedBug,
  heroImage: PEST_IMAGES.bedBug,
  heroEyebrow: "Two-Round Bed Bug Elimination",
  heroTitle: "Bed Bug Treatment in\nGhaziabad",
  heroHighlight: "Ghaziabad",
  heroDescription: "Mattresses, sofas, bed frames and crevices treated in two rounds — so both bugs and newly hatched eggs are gone.",
  heroFeatures: [
    { title: "Two-Round", subtitle: "Treatment" },
    { title: "Mattress", subtitle: "& Sofa Safe" },
    { title: "Odourless", subtitle: "Chemicals" },
    { title: "45-Day", subtitle: "Warranty" },
  ],
  walkthroughEyebrow: "Complete Bed Bug Removal",
  walkthroughTitle: "How Bed Bug Treatment Works",
  walkthroughHighlight: "Works",
  walkthroughDescription: "Bed bug eggs survive a single spray, so we treat twice — killing adults first, then the next hatch.",
  steps: [
    { badge: "Step 01", title: "Book Your Treatment", description: "Tell us how many beds and sofas are affected, then choose a convenient slot." },
    { badge: "Step 02", title: "Expert Assigned", description: "A certified pest control professional inspects mattresses, frames, headboards and furniture joints." },
    { badge: "Step 03", title: "Round 1 Treatment", description: "Mattresses, bed frames, sofas and crevices are sprayed with an odourless, fabric-safe insecticide." },
    { badge: "Step 04", title: "Round 2 After 15 Days", description: "A second round kills bugs hatched from surviving eggs, backed by a 45-day warranty." },
  ],
  statsTitle: "TRUSTED FOR PEACEFUL SLEEP",
  statsHighlight: "PEACEFUL SLEEP",
  stats: [
    { value: "3K+", label: "Homes Treated" },
    { value: "2", label: "Treatment Rounds" },
    { value: "45 Day", label: "Service Warranty" },
    { value: "4.8", label: "Average Rating" },
  ],
  bannerEyebrow: "Bed Bug Treatment",
  bannerTitle: "Sleep Tight, Bug-Free",
  bannerHighlight: "Bug-Free",
  bannerDescription: "A two-round treatment for mattresses, sofas and bed frames that removes bed bugs and their eggs for good.",
  areasTitle: "Bed Bug Treatment Areas in Ghaziabad",
  areasHighlight: "Ghaziabad",
  areasDescription: "Doorstep bed bug treatment for homes, PGs and hotels across major Ghaziabad neighbourhoods.",
  areas: GHAZIABAD_AREAS,
};
