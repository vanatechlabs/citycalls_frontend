import type { Metadata } from "next";
import { BlogHero } from "@/components/blogs/BlogHero/BlogHero";
import { ServicesGrid } from "@/components/home/ServicesGrid/ServicesGrid";
import { PopularPackages } from "@/components/home/PopularPackages/PopularPackages";
import { WhyChooseUs } from "@/components/home/WhyChooseUs/WhyChooseUs";

import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { buildMetadata } from "@/lib/seo/seoMetadata";
import { fetchPageBackground } from "@/lib/api/pageBackgrounds";

// All services in one place — the "Explore all services" buttons and the
// navbar mega menu link here.

const fallbackMetadata: Metadata = {
  title: "All Services | CityCalls",
  description:
    "Appliance repair, deep cleaning, pest control and salon at home in Ghaziabad — verified professionals, transparent pricing and doorstep service.",
};

// Used when Admin → Background Section has nothing set for /services.
const HERO_FALLBACK = {
  heading: "Every Home Service, One Trusted Name",
  highlight: "One Trusted Name",
  description: "Appliance repair, cleaning, pest control and more — book verified professionals at your doorstep across Ghaziabad.",
  image: "/assets/Banner/cara2.webp",
};

export function generateMetadata() {
  return buildMetadata("/services", fallbackMetadata);
}

export default async function ServicesPage() {
  const background = await fetchPageBackground("/services");
  return (
    <>
      <SeoJsonLd path="/services" />
      <BlogHero
        title={background?.heading || HERO_FALLBACK.heading}
        highlight={background?.heading ? background.highlight : HERO_FALLBACK.highlight}
        description={background?.description || HERO_FALLBACK.description}
        image={background?.image || HERO_FALLBACK.image}
        imageAlt={background?.imageAlt || "CityCalls professional at work in a customer's home"}
        eyebrow={background?.subheading || "Our Services"}
      />
      <ServicesGrid hideButton />
      <PopularPackages hideButton />
      <WhyChooseUs />
    </>
  );
}
