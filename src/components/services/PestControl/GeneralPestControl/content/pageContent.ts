import type { PublicServicePage } from "@/lib/api/servicePages";
import { GHAZIABAD_AREAS, PEST_IMAGES } from "../../pestServicesList";

// General pest control page copy — hero, walkthrough, stats, banner and areas.
export const generalPestControlPageContent: PublicServicePage = {
  id: "local-general-pest-control",
  slug: "general-pest-control",
  serviceName: "General Pest Control",
  serviceImage: PEST_IMAGES.general,
  heroImage: PEST_IMAGES.general,
  heroEyebrow: "Certified Pest Management",
  heroTitle: "General Pest Control in\nGhaziabad",
  heroHighlight: "Ghaziabad",
  heroDescription: "Cockroaches, ants, spiders, lizards and silverfish — removed with odourless, child-safe and pet-safe treatment.",
  heroFeatures: [
    { title: "Govt. Approved", subtitle: "Chemicals" },
    { title: "Odourless", subtitle: "Treatment" },
    { title: "Kid & Pet", subtitle: "Safe" },
    { title: "3-Month", subtitle: "Warranty" },
  ],
  walkthroughEyebrow: "Simple Pest Care",
  walkthroughTitle: "How Pest Control Works",
  walkthroughHighlight: "Works",
  walkthroughDescription: "From inspection to a pest-free home, every treatment is safe, transparent and done by certified professionals.",
  steps: [
    { badge: "Step 01", title: "Book Your Treatment", description: "Tell us your property type and the pests you've seen, then pick a convenient slot." },
    { badge: "Step 02", title: "Certified Expert Assigned", description: "A trained, background-verified pest control professional is assigned to your booking." },
    { badge: "Step 03", title: "Inspection & Treatment", description: "The expert inspects entry points and hiding spots, then applies gel and spray where pests live and breed." },
    { badge: "Step 04", title: "Aftercare & Warranty", description: "You get aftercare tips and a 3-month warranty — free re-treatment if pests come back." },
  ],
  statsTitle: "TRUSTED FOR PEST-FREE HOMES",
  statsHighlight: "PEST-FREE HOMES",
  stats: [
    { value: "10K+", label: "Homes Treated" },
    { value: "50+", label: "Certified Experts" },
    { value: "3 Mo", label: "Service Warranty" },
    { value: "4.8", label: "Average Rating" },
  ],
  bannerEyebrow: "General Pest Control",
  bannerTitle: "A Pest-Free Home, Guaranteed",
  bannerHighlight: "Guaranteed",
  bannerDescription: "Gel baiting and targeted spray for kitchens, bathrooms and bedrooms — odourless, safe and backed by a 3-month warranty.",
  areasTitle: "Pest Control Areas in Ghaziabad",
  areasHighlight: "Ghaziabad",
  areasDescription: "Fast doorstep pest control across major Ghaziabad neighbourhoods for homes, offices and shops.",
  areas: GHAZIABAD_AREAS,
};
