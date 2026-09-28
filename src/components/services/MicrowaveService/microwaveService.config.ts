import type { ApplianceServiceConfig } from "@/components/services/ApplianceService/types";
import { microwaveFormOptions } from "./content/formOptions";
import { microwavePageContent } from "./content/pageContent";
import { microwaveSidebarContent } from "./content/sidebarContent";

// /services/microwave-oven-services
export const microwaveServiceConfig: ApplianceServiceConfig = {
  slug: "microwave-oven-services",
  pageContent: microwavePageContent,
  sidebarContent: microwaveSidebarContent,
  form: microwaveFormOptions,
  brandsTitle: "Microwave Brands",
  showcaseBrands: ["LG", "Samsung", "IFB", "Panasonic", "Whirlpool", "Bajaj", "Morphy Richards", "Godrej", "Haier", "Bosch"],
  brandIcon: "flame",
};
