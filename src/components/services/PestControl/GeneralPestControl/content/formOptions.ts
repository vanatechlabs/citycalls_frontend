import type { PestFormConfig } from "../../types";

// Step 2 "Pest Control Details" — general pest control specifics.
export const generalPestControlFormOptions: PestFormConfig = {
  formId: "general-pest-step2-form",
  stepTitle: "Step 2: Pest Control Details",
  stepSubtitle: "Tell us about your property and the pests you've noticed",
  issueLabel: "Which pests have you seen?",
  issues: [
    { id: "cockroaches", label: "Cockroaches", icon: "bug" },
    { id: "ants", label: "Ants", icon: "footprints" },
    { id: "spiders", label: "Spiders", icon: "bug-off" },
    { id: "lizards", label: "Lizards", icon: "snail" },
    { id: "silverfish", label: "Silverfish", icon: "worm" },
    { id: "rodents", label: "Rats / Mice", icon: "rat" },
    { id: "flies", label: "Flies", icon: "wind" },
    { id: "other", label: "Other Pests", icon: "help" },
  ],
  defaultIssueId: "cockroaches",
  treatmentLabel: "Preferred Treatment",
  treatments: ["Gel + Spray (recommended)", "Gel only (no smell)", "Spray only", "Not sure — suggest one"],
  descriptionPlaceholder: "E.g. Cockroaches in kitchen cabinets and ants near the dining area, mostly at night...",
  photoHint: "Upload photos of pests or affected areas",
};
