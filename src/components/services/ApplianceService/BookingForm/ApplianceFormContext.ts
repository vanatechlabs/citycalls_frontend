"use client";

import { createContext, useContext } from "react";
import type { ApplianceFormConfig } from "../types";

// The shared BookingForm renders Step 2 with only { onBack, onNext }, so the
// appliance's field config reaches ApplianceIssueDetails through context.
export const ApplianceFormContext = createContext<ApplianceFormConfig | null>(null);

export function useApplianceFormConfig(): ApplianceFormConfig {
  const config = useContext(ApplianceFormContext);
  if (!config) throw new Error("ApplianceIssueDetails must be rendered inside ApplianceBookingForm");
  return config;
}
