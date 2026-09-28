import type { PestServiceConfig } from "../types";
import { termiteControlFormOptions } from "./content/formOptions";
import { termiteControlPageContent } from "./content/pageContent";
import { termiteControlSidebarContent } from "./content/sidebarContent";

// /services/termite-control
export const termiteControlConfig: PestServiceConfig = {
  slug: "termite-control",
  pageContent: termiteControlPageContent,
  sidebarContent: termiteControlSidebarContent,
  form: termiteControlFormOptions,
  showcaseTitle: "Areas",
  showcaseHighlight: "We Protect",
  showcaseItems: ["Wardrobes", "Door Frames", "Window Frames", "Kitchen Cabinets", "Wooden Floors", "Beds & Sofas", "Wall Joints", "Ceilings", "Staircases", "New Constructions"],
  showcaseIcon: "shield",
};
