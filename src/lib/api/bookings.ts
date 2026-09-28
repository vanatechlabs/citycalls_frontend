const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1").replace(/\/$/, "");

// Body of POST /public/registrations (backend registrations.validation.ts,
// publicCreateRegistrationSchema). Lands in Admin → Registration Section as a
// Pending, unread registration.
export interface WebsiteBookingPayload {
  serviceSlug: string;
  serviceName: string;
  fullName: string;
  email: string;
  phone: string;
  altPhone?: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  language?: string;
  heardFrom?: string;
  referenceName?: string;
  instructions?: string;
  brand?: string;
  modelNumber?: string;
  applianceType?: string;
  capacity?: string;
  issues: string[];
  issueDescription: string;
  issueFrequency?: "Always" | "Sometimes" | "Occasionally" | "Once";
  safetyConcern?: string;
  preferredDate?: string;
  timeSlot?: string;
  extraDetails?: { label: string; value: string }[];
}

export interface WebsiteBookingResult {
  registrationNo: string;
  serviceName: string;
}

export async function submitWebsiteBooking(payload: WebsiteBookingPayload): Promise<WebsiteBookingResult> {
  const response = await fetch(`${API_BASE_URL}/public/registrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const body = (await response.json().catch(() => null)) as
    | { data?: WebsiteBookingResult; message?: string; errors?: { message: string }[] }
    | null;
  if (!response.ok || !body?.data) {
    throw new Error(body?.errors?.[0]?.message || body?.message || "Could not submit your booking. Please try again.");
  }
  return body.data;
}
