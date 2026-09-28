import type { ServiceSidebarContent } from "@/components/services/RefrigeratorService/ServiceSidebar/ServiceSidebar";
import type { PublicServicePage } from "@/lib/api/servicePages";
import type { IssueIconKey } from "./issueIcons";

// Step 2 ("Service Details") of the booking form for one appliance. Each
// service folder (WashingMachineService, TelevisionService, ...) fills this in
// its content/formOptions.ts; ApplianceIssueDetails renders it.
export interface ApplianceFormConfig {
  formId: string;
  stepTitle: string;
  stepSubtitle: string;
  brandLabel: string;
  brands: string[];
  modelPlaceholder: string;
  typeLabel: string;
  types: string[];
  capacityLabel: string;
  capacityPlaceholder: string;
  capacities: string[];
  ageLabel: string;
  issueLabel: string;
  issues: { id: string; label: string; icon: IssueIconKey }[];
  defaultIssueId: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  photoLabel: string;
  photoHint: string;
  // One appliance-specific yes/no style question (e.g. "Drain outlet nearby?").
  extraQuestion: { label: string; options: string[] };
  safetyOptions: { value: string; label: string }[];
}

// Everything one appliance service page needs.
export interface ApplianceServiceConfig {
  slug: string;
  // Local page copy — used when no CMS page exists for this slug in
  // Admin → Pages, otherwise the CMS content replaces it.
  pageContent: PublicServicePage;
  sidebarContent: ServiceSidebarContent;
  form: ApplianceFormConfig;
  brandsTitle: string;
  showcaseBrands: string[];
  brandIcon: IssueIconKey;
}
