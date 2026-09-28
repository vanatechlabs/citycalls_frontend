"use client";

import { BookingForm as SharedBookingForm } from "@/components/booking/BookingForm/BookingForm";
import type { ApplianceFormConfig } from "../types";
import { ApplianceFormContext } from "./ApplianceFormContext";
import { ApplianceIssueDetails } from "./ApplianceIssueDetails";

interface ApplianceBookingFormProps {
  serviceSlug: string;
  serviceName: string;
  form: ApplianceFormConfig;
  onStepChange?: (step: number) => void;
}

// The shared 5-step booking form with this appliance's own Step 2 fields.
export function ApplianceBookingForm({ serviceSlug, serviceName, form, onStepChange }: ApplianceBookingFormProps) {
  return (
    <ApplianceFormContext.Provider value={form}>
      <SharedBookingForm
        serviceSlug={serviceSlug}
        serviceName={serviceName}
        onStepChange={onStepChange}
        ServiceDetailsComponent={ApplianceIssueDetails}
      />
    </ApplianceFormContext.Provider>
  );
}
