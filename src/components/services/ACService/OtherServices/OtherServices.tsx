"use client";

import { OtherServices as SharedOtherServices } from "@/components/services/ApplianceService/OtherServices/OtherServices";

// Same strip as every other service page: the other services of this page's
// Navbar List menu, each with a "Book Now" that opens its booking form.
export function OtherServices() {
  return <SharedOtherServices />;
}
