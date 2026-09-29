// Step 2 fields common to every cleaning service.

export const LAST_CLEANED = ["Never", "Within 6 months", "6 – 12 months ago", "Over a year ago"];

// Who's at home — decides which cleaning agents are used.
export const HOUSEHOLD_SAFETY = [
  "Kids at home",
  "Pets at home",
  "Elderly or pregnant member",
  "Asthma / allergy patient",
  "None of these",
];

// Water and power are needed for extraction / scrubbing machines.
export const UTILITIES = ["Water & electricity available", "Only electricity available", "Not sure"];

// Labels used for the extra answers saved with the registration.
export const EXTRA_LABELS = {
  lastCleaned: "Last Professional Cleaning",
  utilities: "Water & Electricity",
};
