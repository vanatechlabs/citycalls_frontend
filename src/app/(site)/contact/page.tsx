import type { Metadata } from "next";
import { ContactView } from "@/components/contact/ContactView/ContactView";

export const metadata: Metadata = {
  title: "Contact Us | CityCalls",
  description: "Get in touch with CityCalls for home services across Ghaziabad — call, email or send us a message.",
};

export default function ContactPage() {
  return <ContactView />;
}
