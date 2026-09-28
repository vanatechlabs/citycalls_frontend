"use client";

import { BookingForm as SharedBookingForm } from "@/components/booking/BookingForm/BookingForm";
import { ACIssueDetails } from "./ACIssueDetails";

interface ACBookingFormProps {
  onStepChange?: (step: number) => void;
}

export function BookingForm({ onStepChange }: ACBookingFormProps) {
  return (
    <SharedBookingForm
      serviceSlug="ac-service"
      serviceName="AC Service & Repair"
      onStepChange={onStepChange}
      ServiceDetailsComponent={ACIssueDetails}
    />
  );
}
