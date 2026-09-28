import type { OtherServiceCard } from "@/components/services/ApplianceService/OtherServices/OtherServices";

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

// Hero and card images per pest service (same photos as data/services.ts).
export const PEST_IMAGES = {
  general: "/assets/Services/s8.png",
  termite: unsplash("photo-1526397751294-331021109fbd"),
  cockroach: unsplash("photo-1560393464-5c69a73c5770"),
  mosquito: unsplash("photo-1595853035070-59a39fe84de3"),
  bedBug: unsplash("photo-1618477388954-7852f32655ec"),
};

// "Other pest control services" strip on every pest page.
export const PEST_CONTROL_SERVICES: OtherServiceCard[] = [
  { title: "General Pest Control", image: PEST_IMAGES.general, slug: "general-pest-control", subtitle: "Full-home treatment" },
  { title: "Termite Control", image: PEST_IMAGES.termite, slug: "termite-control", subtitle: "Drill-fill-seal" },
  { title: "Cockroach Control", image: PEST_IMAGES.cockroach, slug: "cockroach-control", subtitle: "Odourless gel" },
  { title: "Mosquito Control", image: PEST_IMAGES.mosquito, slug: "mosquito-control", subtitle: "Fogging & larvicide" },
  { title: "Bed Bug Treatment", image: PEST_IMAGES.bedBug, slug: "bed-bug-treatment", subtitle: "Two-round treatment" },
];

// Areas list shared by every pest page.
export const GHAZIABAD_AREAS = [
  "Indirapuram", "Vaishali", "Kaushambi", "Raj Nagar", "Crossing Republik", "Sahibabad", "Nehru Nagar", "Rajnagar Extension",
];
