import type { ServiceSidebarContent } from "@/components/services/RefrigeratorService/ServiceSidebar/ServiceSidebar";
import type { PublicServicePage } from "@/lib/api/servicePages";
import type { CleaningIconKey } from "./cleaningIcons";

// Step 2 ("Cleaning Details") of the booking form for one cleaning service.
// Last cleaning, household safety, description and photos are common to all
// cleaning services (CleaningIssueDetails); these are the parts that differ.
// Options match admin's New Registration (admin/src/lib/registrations/issueConfig.ts).
export interface CleaningFormConfig {
  formId: string;
  stepTitle: string;
  stepSubtitle: string;
  // Single-choice tiles, saved as the registration's type — "Sofa Material".
  typeLabel: string;
  typeOptions: string[];
  // Dropdown, saved as the registration's size — "Number of Seats".
  sizeLabel: string;
  sizeOptions: string[];
  // Multi-select tiles — what needs cleaning / what's wrong.
  issueLabel: string;
  issues: { id: string; label: string; icon: CleaningIconKey }[];
  defaultIssueId: string;
  descriptionPlaceholder: string;
  photoHint: string;
}

// Everything one sofa / home cleaning service page needs.
export interface CleaningServiceConfig {
  slug: string;
  // Local page copy — replaced by Admin → Pages content for this slug if any.
  pageContent: PublicServicePage;
  sidebarContent: ServiceSidebarContent;
  form: CleaningFormConfig;
  // "What We Clean" grid.
  showcaseTitle: string;
  showcaseHighlight: string;
  showcaseItems: string[];
  showcaseIcon: CleaningIconKey;
  // "Other ... services" strip at the bottom.
  group: "sofa" | "home";
}
