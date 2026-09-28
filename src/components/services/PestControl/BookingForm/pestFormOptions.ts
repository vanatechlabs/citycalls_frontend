// Step 2 fields common to every pest control service.

export const PROPERTY_TYPES = ["1 BHK", "2 BHK", "3 BHK", "4 BHK+", "Villa / House", "Office / Shop"];

export const PROPERTY_SIZES = ["Below 500 sq ft", "500 – 1000 sq ft", "1000 – 1500 sq ft", "1500 – 2500 sq ft", "Above 2500 sq ft", "Not Sure"];

export const INFESTATION_LEVELS = [
  { value: "Low", hint: "A few sightings" },
  { value: "Medium", hint: "Seen every day" },
  { value: "High", hint: "Everywhere" },
];

// Shown to the customer → stored as the backend's issueFrequency.
export const SIGHTING_FREQUENCY: { label: string; value: "Always" | "Sometimes" | "Occasionally" | "Once" }[] = [
  { label: "Every day", value: "Always" },
  { label: "Few times a week", value: "Sometimes" },
  { label: "Occasionally", value: "Occasionally" },
  { label: "Seen once", value: "Once" },
];

export const OCCUPANCY = ["Occupied", "Vacant / Moving in", "Under renovation"];

export const LAST_TREATMENT = ["Never", "Within 3 months", "3 – 12 months ago", "Over a year ago"];

// Who's at home — decides chemical choice and re-entry time.
export const HOUSEHOLD_SAFETY = [
  "Kids at home",
  "Pets at home",
  "Elderly or pregnant member",
  "Asthma / allergy patient",
  "None of these",
];

// Labels used for the extra answers saved with the registration.
export const EXTRA_LABELS = {
  infestation: "Infestation Level",
  occupancy: "Property Status",
  lastTreatment: "Last Pest Treatment",
};
