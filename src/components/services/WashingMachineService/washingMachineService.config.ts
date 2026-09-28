import type { ApplianceServiceConfig } from "@/components/services/ApplianceService/types";
import { washingMachineFormOptions } from "./content/formOptions";
import { washingMachinePageContent } from "./content/pageContent";
import { washingMachineSidebarContent } from "./content/sidebarContent";

// /services/washing-machine-services
export const washingMachineServiceConfig: ApplianceServiceConfig = {
  slug: "washing-machine-services",
  pageContent: washingMachinePageContent,
  sidebarContent: washingMachineSidebarContent,
  form: washingMachineFormOptions,
  brandsTitle: "Washing Machine Brands",
  showcaseBrands: ["LG", "Samsung", "Whirlpool", "IFB", "Bosch", "Godrej", "Haier", "Panasonic", "Voltas Beko", "Onida"],
  brandIcon: "washing-machine",
};
