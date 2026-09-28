import type { ServiceSidebarContent } from "@/components/services/RefrigeratorService/ServiceSidebar/ServiceSidebar";
import type { PublicServicePage } from "@/lib/api/servicePages";
import type { PestIconKey } from "./pestIcons";

// Step 2 ("Pest Control Details") of the booking form for one pest service.
// Property type/size, infestation level, occupancy, last treatment and
// household safety are common to all pest services (PestIssueDetails); these
// are the parts that differ per service.
export interface PestFormConfig {
  formId: string;
  stepTitle: string;
  stepSubtitle: string;
  // Multi-select tiles — which pests / signs / places the customer has seen.
  issueLabel: string;
  issues: { id: string; label: string; icon: PestIconKey }[];
  defaultIssueId: string;
  // Service-specific treatment choice (e.g. gel vs spray, drill-fill-seal).
  treatmentLabel: string;
  treatments: string[];
  descriptionPlaceholder: string;
  photoHint: string;
}

// Everything one pest control service page needs.
export interface PestServiceConfig {
  slug: string;
  // Local page copy — replaced by Admin → Pages content for this slug if any.
  pageContent: PublicServicePage;
  sidebarContent: ServiceSidebarContent;
  form: PestFormConfig;
  // "Pests We Treat" / "Signs We Look For" grid.
  showcaseTitle: string;
  showcaseHighlight: string;
  showcaseItems: string[];
  showcaseIcon: PestIconKey;
}
