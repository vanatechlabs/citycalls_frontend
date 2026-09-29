"use client";

import { BookingForm as SharedBookingForm } from "@/components/booking/BookingForm/BookingForm";
import type { CleaningFormConfig } from "../types";
import { CleaningFormContext } from "./CleaningFormContext";
import { CleaningIssueDetails } from "./CleaningIssueDetails";

interface CleaningBookingFormProps {
  serviceSlug: string;
  serviceName: string;
  form: CleaningFormConfig;
  onStepChange?: (step: number) => void;
}

// The shared 5-step booking form with the cleaning Step 2.
export function CleaningBookingForm({ serviceSlug, serviceName, form, onStepChange }: CleaningBookingFormProps) {
  return (
    <CleaningFormContext.Provider value={form}>
      <SharedBookingForm
        serviceSlug={serviceSlug}
        serviceName={serviceName}
        onStepChange={onStepChange}
        ServiceDetailsComponent={CleaningIssueDetails}
      />
    </CleaningFormContext.Provider>
  );
}
