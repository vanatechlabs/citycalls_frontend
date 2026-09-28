"use client";

import { createContext, useContext } from "react";
import type { PestFormConfig } from "../types";

// The shared BookingForm renders Step 2 with only { onBack, onNext }, so the
// pest service's field config reaches PestIssueDetails through context.
export const PestFormContext = createContext<PestFormConfig | null>(null);

export function usePestFormConfig(): PestFormConfig {
  const config = useContext(PestFormContext);
  if (!config) throw new Error("PestIssueDetails must be rendered inside PestBookingForm");
  return config;
}
