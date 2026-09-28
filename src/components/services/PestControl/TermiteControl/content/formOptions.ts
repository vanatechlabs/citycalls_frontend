import type { PestFormConfig } from "../../types";

// Step 2 "Termite Details" — termite control specifics.
export const termiteControlFormOptions: PestFormConfig = {
  formId: "termite-step2-form",
  stepTitle: "Step 2: Termite Details",
  stepSubtitle: "Tell us about your property and the termite signs you've noticed",
  issueLabel: "Which signs have you noticed?",
  issues: [
    { id: "mud-tubes", label: "Mud Tubes on Walls", icon: "layers" },
    { id: "hollow-wood", label: "Hollow Wood", icon: "hammer" },
    { id: "furniture-damage", label: "Furniture Damage", icon: "sofa" },
    { id: "door-frames", label: "Door / Window Frames", icon: "house" },
    { id: "wall-ceiling", label: "Wall / Ceiling Damage", icon: "building" },
    { id: "wings", label: "Discarded Wings", icon: "wind" },
    { id: "pre-construction", label: "Pre-construction", icon: "warehouse" },
    { id: "other", label: "Other Signs", icon: "help" },
  ],
  defaultIssueId: "mud-tubes",
  treatmentLabel: "Treatment Type",
  treatments: ["Post-construction (drill-fill-seal)", "Wood / furniture treatment only", "Pre-construction (soil treatment)", "Not sure — inspect first"],
  descriptionPlaceholder: "E.g. Mud lines on the bedroom wall behind the wardrobe, and the kitchen cabinet door sounds hollow...",
  photoHint: "Upload photos of mud tubes or damaged wood",
};
