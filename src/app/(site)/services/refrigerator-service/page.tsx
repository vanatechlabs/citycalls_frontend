import type { Metadata } from "next";
import { RefrigeratorServiceView } from "@/components/services/RefrigeratorService/RefrigeratorServiceView/RefrigeratorServiceView";

export const metadata: Metadata = {
  title: "Refrigerator Repair & Service in Ghaziabad | CityCalls",
  description:
    "Book refrigerator repair, gas refill and servicing at your doorstep in Ghaziabad with CityCalls' verified technicians.",
};

export default function RefrigeratorServicePage() {
  return <RefrigeratorServiceView />;
}
