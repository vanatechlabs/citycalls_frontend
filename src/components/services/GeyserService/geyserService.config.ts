import type { ApplianceServiceConfig } from "@/components/services/ApplianceService/types";
import { geyserFormOptions } from "./content/formOptions";
import { geyserPageContent } from "./content/pageContent";
import { geyserSidebarContent } from "./content/sidebarContent";

// /services/geyser-repair-services
export const geyserServiceConfig: ApplianceServiceConfig = {
  slug: "geyser-repair-services",
  pageContent: geyserPageContent,
  sidebarContent: geyserSidebarContent,
  form: geyserFormOptions,
  brandsTitle: "Geyser Brands",
  showcaseBrands: ["Racold", "AO Smith", "Bajaj", "Havells", "V-Guard", "Crompton", "Haier", "Venus", "Usha", "Jaquar"],
  brandIcon: "thermometer",
};
