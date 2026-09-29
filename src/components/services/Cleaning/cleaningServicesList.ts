import type { OtherServiceCard } from "@/components/services/ApplianceService/OtherServices/OtherServices";

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

// Hero and card images per cleaning service (same photos as data/services.ts).
export const CLEANING_IMAGES = {
  sofaShampooing: "/assets/Services/s10.png",
  sofaDryCleaning: unsplash("photo-1493663284031-b7e3aefcae8e"),
  carpet: unsplash("photo-1524758631624-e2822e304c36"),
  mattress: unsplash("photo-1631049307264-da0ec9d70304"),
  home: unsplash("photo-1581578731548-c64695cc6952"),
  kitchen: "/assets/Services/s11.png",
  bathroom: unsplash("photo-1552321554-5fefe8c9ef14"),
};

export const SOFA_CLEANING_SERVICES: OtherServiceCard[] = [
  { title: "Sofa Shampooing", image: CLEANING_IMAGES.sofaShampooing, slug: "sofa-shampooing", subtitle: "Foam extraction" },
  { title: "Sofa Dry Cleaning", image: CLEANING_IMAGES.sofaDryCleaning, slug: "sofa-dry-cleaning", subtitle: "Water-free" },
  { title: "Carpet Cleaning", image: CLEANING_IMAGES.carpet, slug: "carpet-cleaning", subtitle: "On-site shampoo" },
  { title: "Mattress Cleaning", image: CLEANING_IMAGES.mattress, slug: "mattress-cleaning", subtitle: "Dust-mite removal" },
];

export const HOME_CLEANING_SERVICES: OtherServiceCard[] = [
  { title: "Home Cleaning", image: CLEANING_IMAGES.home, slug: "home-cleaning", subtitle: "Full-home deep clean" },
  { title: "Kitchen Cleaning", image: CLEANING_IMAGES.kitchen, slug: "kitchen-cleaning", subtitle: "Deep degrease" },
  { title: "Bathroom Cleaning", image: CLEANING_IMAGES.bathroom, slug: "bathroom-cleaning", subtitle: "Descale & sanitise" },
];

// Bottom "Other ... services" strip, per group.
export const OTHER_CLEANING_SERVICES = {
  sofa: {
    services: SOFA_CLEANING_SERVICES,
    highlight: "SOFA CLEANING SERVICES",
    description: "Deep cleaning for every other fabric at home — sofas, carpets and mattresses.",
  },
  home: {
    services: HOME_CLEANING_SERVICES,
    highlight: "HOME CLEANING SERVICES",
    description: "Trained crews and food-safe products for every other room in your home.",
  },
};

// Areas list shared by every cleaning page.
export const GHAZIABAD_AREAS = [
  "Indirapuram", "Vaishali", "Kaushambi", "Raj Nagar", "Crossing Republik", "Sahibabad", "Nehru Nagar", "Rajnagar Extension",
];

export const CLEANING_HOURS = "Mon-Sat: 9:00 AM – 8:00 PM";
