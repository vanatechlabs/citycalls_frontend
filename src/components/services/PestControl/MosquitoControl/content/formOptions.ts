import type { PestFormConfig } from "../../types";

// Step 2 "Mosquito Details" — mosquito control specifics.
export const mosquitoControlFormOptions: PestFormConfig = {
  formId: "mosquito-step2-form",
  stepTitle: "Step 2: Mosquito Details",
  stepSubtitle: "Tell us about your property and where mosquitoes are a problem",
  issueLabel: "Where is the problem?",
  issues: [
    { id: "indoors", label: "Inside the House", icon: "house" },
    { id: "bedrooms-night", label: "Bedrooms at Night", icon: "moon" },
    { id: "balcony-terrace", label: "Balcony / Terrace", icon: "fence" },
    { id: "stagnant-water", label: "Stagnant Water", icon: "droplets" },
    { id: "garden-lawn", label: "Garden / Lawn", icon: "trees" },
    { id: "drains", label: "Drains / Sewer", icon: "waves" },
    { id: "society-area", label: "Society Common Area", icon: "building" },
    { id: "other", label: "Other Areas", icon: "help" },
  ],
  defaultIssueId: "indoors",
  treatmentLabel: "Treatment Type",
  treatments: ["Indoor spray + outdoor fogging", "Indoor spray only", "Outdoor fogging + larvicide", "Not sure — suggest one"],
  descriptionPlaceholder: "E.g. Lots of mosquitoes in the evening, water collects on the terrace and there's an open drain behind the house...",
  photoHint: "Upload photos of stagnant water or breeding spots",
};
