export const acBrands = [
  "LG",
  "Samsung",
  "Daikin",
  "Voltas",
  "Hitachi",
  "Panasonic",
  "Carrier",
  "Blue Star",
  "Lloyd",
  "O General",
  "Other",
];

export const acTypes = ["Split AC", "Window AC", "Cassette AC", "Ducted AC"];
export const acCapacities = ["Up to 1 Ton", "1.5 Ton", "2 Ton", "Above 2 Ton", "Not Sure"];

export const acIssueOptions = [
  { id: "not-cooling", label: "Not Cooling", icon: "snowflake" },
  { id: "low-cooling", label: "Low Cooling", icon: "thermometer" },
  { id: "water-leakage", label: "Water Leakage", icon: "droplets" },
  { id: "gas-refill", label: "Gas Refill", icon: "gauge" },
  { id: "noise-vibration", label: "Noise / Vibration", icon: "volume" },
  { id: "deep-cleaning", label: "Deep Cleaning", icon: "sparkles" },
  { id: "installation", label: "Install / Uninstall", icon: "wrench" },
  { id: "other", label: "Other Issue", icon: "help" },
] as const;

export const acSafetyOptions = [
  { value: "electrical", label: "Electrical hazard / sparking" },
  { value: "burning-smell", label: "Burning smell" },
  { value: "refrigerant", label: "Suspected refrigerant leak" },
  { value: "water-near-wiring", label: "Water near electrical wiring" },
  { value: "none", label: "No immediate safety concern" },
];
