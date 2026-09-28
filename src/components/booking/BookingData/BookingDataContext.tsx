"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { submitWebsiteBooking, type WebsiteBookingPayload, type WebsiteBookingResult } from "@/lib/api/bookings";

// Collects what each booking step fills in (Step1 personal, Step2 service
// details — any service's variant — and Step3 schedule), shows it on the
// Step4 review, and submits it as one registration on "Confirm Booking".

export interface BookingPersonal {
  fullName: string;
  email: string;
  phone: string;
  altPhone: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  language: string;
  heardFrom: string;
  referenceName: string;
  instructions: string;
}

export interface BookingServiceDetails {
  brand?: string;
  modelNumber?: string;
  applianceType?: string;
  capacity?: string;
  issues: string[];
  issueDescription: string;
  issueFrequency?: WebsiteBookingPayload["issueFrequency"];
  safetyConcern?: string;
  extraDetails?: { label: string; value: string }[];
}

export interface BookingSchedule {
  // YYYY-MM-DD (local date)
  preferredDate: string;
  timeSlot: string;
}

interface BookingDataValue {
  serviceSlug: string;
  serviceName: string;
  personal?: BookingPersonal;
  service?: BookingServiceDetails;
  schedule?: BookingSchedule;
  result?: WebsiteBookingResult;
  setPersonal: (personal: BookingPersonal) => void;
  setService: (service: BookingServiceDetails) => void;
  setSchedule: (schedule: BookingSchedule) => void;
  submit: () => Promise<WebsiteBookingResult>;
}

const BookingDataContext = createContext<BookingDataValue | null>(null);

// null outside a provider — steps then behave as plain UI (nothing is saved).
export function useBookingData() {
  return useContext(BookingDataContext);
}

// Form frequency wording → the backend's allowed values.
export function toIssueFrequency(value: string): WebsiteBookingPayload["issueFrequency"] {
  if (value === "First time") return "Once";
  return ["Always", "Sometimes", "Occasionally", "Once"].includes(value)
    ? (value as WebsiteBookingPayload["issueFrequency"])
    : undefined;
}

export function BookingDataProvider({ serviceSlug, serviceName, children }: {
  serviceSlug: string;
  serviceName: string;
  children: ReactNode;
}) {
  const [personal, setPersonal] = useState<BookingPersonal>();
  const [service, setService] = useState<BookingServiceDetails>();
  const [schedule, setSchedule] = useState<BookingSchedule>();
  const [result, setResult] = useState<WebsiteBookingResult>();

  async function submit() {
    if (!personal || !service) throw new Error("Please complete all the steps before confirming.");
    const optional = (value?: string) => value?.trim() || undefined;
    const booked = await submitWebsiteBooking({
      serviceSlug,
      serviceName,
      fullName: personal.fullName.trim(),
      email: personal.email.trim(),
      phone: personal.phone,
      altPhone: optional(personal.altPhone),
      address: personal.address.trim(),
      pincode: personal.pincode,
      city: personal.city.trim(),
      state: personal.state,
      language: optional(personal.language),
      heardFrom: optional(personal.heardFrom),
      referenceName: optional(personal.referenceName),
      instructions: optional(personal.instructions),
      brand: optional(service.brand),
      modelNumber: optional(service.modelNumber),
      applianceType: optional(service.applianceType),
      capacity: optional(service.capacity),
      issues: service.issues,
      issueDescription: service.issueDescription.trim(),
      issueFrequency: service.issueFrequency,
      safetyConcern: optional(service.safetyConcern),
      preferredDate: schedule?.preferredDate,
      timeSlot: optional(schedule?.timeSlot),
      extraDetails: service.extraDetails?.filter((d) => d.value.trim()),
    });
    setResult(booked);
    return booked;
  }

  return (
    <BookingDataContext.Provider
      value={{ serviceSlug, serviceName, personal, service, schedule, result, setPersonal, setService, setSchedule, submit }}
    >
      {children}
    </BookingDataContext.Provider>
  );
}
