import type { PestFormConfig } from "../../types";

// Step 2 "Cockroach Details" — cockroach control specifics.
export const cockroachControlFormOptions: PestFormConfig = {
  formId: "cockroach-step2-form",
  stepTitle: "Step 2: Cockroach Details",
  stepSubtitle: "Tell us about your property and where you see cockroaches",
  issueLabel: "Where do you see them?",
  issues: [
    { id: "kitchen-cabinets", label: "Kitchen Cabinets", icon: "kitchen" },
    { id: "sink-drains", label: "Sink / Drains", icon: "droplets" },
    { id: "bathrooms", label: "Bathrooms", icon: "bath" },
    { id: "appliances", label: "Behind Appliances", icon: "layers" },
    { id: "bedrooms", label: "Bedrooms / Wardrobes", icon: "bed" },
    { id: "small-brown", label: "Small Brown (German)", icon: "bug" },
    { id: "large-red", label: "Large Red (American)", icon: "bug-off" },
    { id: "other", label: "Other Areas", icon: "help" },
  ],
  defaultIssueId: "kitchen-cabinets",
  treatmentLabel: "Preferred Treatment",
  treatments: ["Gel baiting (odourless)", "Gel + spray for heavy infestation", "Not sure — suggest one"],
  descriptionPlaceholder: "E.g. Small brown cockroaches inside kitchen cabinets and near the sink, seen every night...",
  photoHint: "Upload photos of cockroaches or where you see them",
};
