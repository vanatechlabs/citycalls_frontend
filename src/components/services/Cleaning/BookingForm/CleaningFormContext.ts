"use client";

import { createContext, useContext } from "react";
import type { CleaningFormConfig } from "../types";

// The shared BookingForm renders Step 2 with only { onBack, onNext }, so the
// cleaning service's field config reaches CleaningIssueDetails through context.
export const CleaningFormContext = createContext<CleaningFormConfig | null>(null);

export function useCleaningFormConfig(): CleaningFormConfig {
  const config = useContext(CleaningFormContext);
  if (!config) throw new Error("CleaningIssueDetails must be rendered inside CleaningBookingForm");
  return config;
}
