"use client";

import { BookingForm as SharedBookingForm } from "@/components/booking/BookingForm/BookingForm";
import type { PestFormConfig } from "../types";
import { PestFormContext } from "./PestFormContext";
import { PestIssueDetails } from "./PestIssueDetails";

interface PestBookingFormProps {
  serviceSlug: string;
  serviceName: string;
  form: PestFormConfig;
  onStepChange?: (step: number) => void;
}

// The shared 5-step booking form with the pest control Step 2.
export function PestBookingForm({ serviceSlug, serviceName, form, onStepChange }: PestBookingFormProps) {
  return (
    <PestFormContext.Provider value={form}>
      <SharedBookingForm
        serviceSlug={serviceSlug}
        serviceName={serviceName}
        onStepChange={onStepChange}
        ServiceDetailsComponent={PestIssueDetails}
      />
    </PestFormContext.Provider>
  );
}
