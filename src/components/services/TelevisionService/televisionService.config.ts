import type { ApplianceServiceConfig } from "@/components/services/ApplianceService/types";
import { televisionFormOptions } from "./content/formOptions";
import { televisionPageContent } from "./content/pageContent";
import { televisionSidebarContent } from "./content/sidebarContent";

// /services/television-repair-services
export const televisionServiceConfig: ApplianceServiceConfig = {
  slug: "television-repair-services",
  pageContent: televisionPageContent,
  sidebarContent: televisionSidebarContent,
  form: televisionFormOptions,
  brandsTitle: "TV Brands",
  showcaseBrands: ["Samsung", "LG", "Sony", "Mi / Xiaomi", "OnePlus", "TCL", "Panasonic", "Vu", "Philips", "Haier"],
  brandIcon: "tv",
};
