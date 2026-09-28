import type { PestServiceConfig } from "../types";
import { cockroachControlFormOptions } from "./content/formOptions";
import { cockroachControlPageContent } from "./content/pageContent";
import { cockroachControlSidebarContent } from "./content/sidebarContent";

// /services/cockroach-control
export const cockroachControlConfig: PestServiceConfig = {
  slug: "cockroach-control",
  pageContent: cockroachControlPageContent,
  sidebarContent: cockroachControlSidebarContent,
  form: cockroachControlFormOptions,
  showcaseTitle: "Places",
  showcaseHighlight: "We Treat",
  showcaseItems: ["Kitchen Cabinets", "Sink & Drains", "Bathrooms", "Fridge & Stove Gaps", "Wardrobes", "Electrical Boards", "Restaurants", "Offices", "Shops", "Warehouses"],
  showcaseIcon: "bug",
};
