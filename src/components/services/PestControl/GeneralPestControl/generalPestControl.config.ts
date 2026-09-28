import type { PestServiceConfig } from "../types";
import { generalPestControlFormOptions } from "./content/formOptions";
import { generalPestControlPageContent } from "./content/pageContent";
import { generalPestControlSidebarContent } from "./content/sidebarContent";

// /services/general-pest-control
export const generalPestControlConfig: PestServiceConfig = {
  slug: "general-pest-control",
  pageContent: generalPestControlPageContent,
  sidebarContent: generalPestControlSidebarContent,
  form: generalPestControlFormOptions,
  showcaseTitle: "Pests",
  showcaseHighlight: "We Treat",
  showcaseItems: ["Cockroaches", "Ants", "Spiders", "Lizards", "Silverfish", "Rats & Mice", "Flies", "Termites", "Mosquitoes", "Bed Bugs"],
  showcaseIcon: "bug",
};
