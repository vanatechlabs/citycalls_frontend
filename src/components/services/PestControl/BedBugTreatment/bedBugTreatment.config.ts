import type { PestServiceConfig } from "../types";
import { bedBugTreatmentFormOptions } from "./content/formOptions";
import { bedBugTreatmentPageContent } from "./content/pageContent";
import { bedBugTreatmentSidebarContent } from "./content/sidebarContent";

// /services/bed-bug-treatment
export const bedBugTreatmentConfig: PestServiceConfig = {
  slug: "bed-bug-treatment",
  pageContent: bedBugTreatmentPageContent,
  sidebarContent: bedBugTreatmentSidebarContent,
  form: bedBugTreatmentFormOptions,
  showcaseTitle: "Places",
  showcaseHighlight: "We Treat",
  showcaseItems: ["Mattresses", "Bed Frames", "Headboards", "Sofas", "Chairs", "Curtains", "Carpets", "Wardrobes", "PG Rooms", "Hotel Rooms"],
  showcaseIcon: "bed-double",
};
