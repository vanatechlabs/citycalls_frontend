import type { Metadata } from "next";
import { ContactView } from "@/components/contact/ContactView/ContactView";

import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { buildMetadata } from "@/lib/seo/seoMetadata";

const fallbackMetadata: Metadata = {
  title: "Contact Us | CityCalls",
  description: "Get in touch with CityCalls for home services across Ghaziabad — call, email or send us a message.",
};

export function generateMetadata() {
  return buildMetadata("/contact", fallbackMetadata);
}

export default function ContactPage() {
  return (
    <>
      <SeoJsonLd path="/contact" />
      <ContactView />
    </>
  );
}
