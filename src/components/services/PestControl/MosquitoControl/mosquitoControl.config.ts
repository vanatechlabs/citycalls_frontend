import type { PestServiceConfig } from "../types";
import { mosquitoControlFormOptions } from "./content/formOptions";
import { mosquitoControlPageContent } from "./content/pageContent";
import { mosquitoControlSidebarContent } from "./content/sidebarContent";

// /services/mosquito-control
export const mosquitoControlConfig: PestServiceConfig = {
  slug: "mosquito-control",
  pageContent: mosquitoControlPageContent,
  sidebarContent: mosquitoControlSidebarContent,
  form: mosquitoControlFormOptions,
  showcaseTitle: "Spots",
  showcaseHighlight: "We Treat",
  showcaseItems: ["Bedrooms", "Living Rooms", "Balconies", "Terraces", "Gardens & Lawns", "Water Tanks", "Drains", "Coolers & Pots", "Basements", "Society Parks"],
  showcaseIcon: "shield",
};
