import type { PestFormConfig } from "../../types";

// Step 2 "Bed Bug Details" — bed bug treatment specifics.
export const bedBugTreatmentFormOptions: PestFormConfig = {
  formId: "bed-bug-step2-form",
  stepTitle: "Step 2: Bed Bug Details",
  stepSubtitle: "Tell us about your property and where you've found bed bugs",
  issueLabel: "Where have you found them?",
  issues: [
    { id: "mattress", label: "Mattress", icon: "bed-double" },
    { id: "bed-frame", label: "Bed Frame / Headboard", icon: "bed" },
    { id: "sofa", label: "Sofa / Chairs", icon: "sofa" },
    { id: "curtains", label: "Curtains / Carpets", icon: "layers" },
    { id: "wall-cracks", label: "Wall Cracks / Sockets", icon: "building" },
    { id: "bites", label: "Bites on Skin", icon: "footprints" },
    { id: "after-travel", label: "After Travel / Hotel", icon: "house" },
    { id: "other", label: "Other Places", icon: "help" },
  ],
  defaultIssueId: "mattress",
  treatmentLabel: "Number of Beds / Sofas",
  treatments: ["1 bed", "2 beds", "3 beds", "4+ beds", "Beds + sofa set", "Full home"],
  descriptionPlaceholder: "E.g. Bed bugs found in two mattresses and the living-room sofa, getting bites every night...",
  photoHint: "Upload photos of bugs, stains or bites",
};
