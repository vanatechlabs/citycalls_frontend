import type { ApplianceServiceConfig } from "@/components/services/ApplianceService/types";
import { chimneyFormOptions } from "./content/formOptions";
import { chimneyPageContent } from "./content/pageContent";
import { chimneySidebarContent } from "./content/sidebarContent";

// /services/chimney-repair-services
export const chimneyServiceConfig: ApplianceServiceConfig = {
  slug: "chimney-repair-services",
  pageContent: chimneyPageContent,
  sidebarContent: chimneySidebarContent,
  form: chimneyFormOptions,
  brandsTitle: "Chimney Brands",
  showcaseBrands: ["Elica", "Faber", "Hindware", "Glen", "Kaff", "Sunflame", "Bosch", "Prestige", "Pigeon", "Inalsa"],
  brandIcon: "wind",
};
