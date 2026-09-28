import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero/AboutHero";
import { AboutStory } from "@/components/about/AboutStory/AboutStory";
import { WhyChooseUs } from "@/components/home/WhyChooseUs/WhyChooseUs";
import { AboutValues } from "@/components/about/AboutValues/AboutValues";
import { AboutParallax } from "@/components/about/AboutParallax/AboutParallax";
import { AboutJourney } from "@/components/about/AboutJourney/AboutJourney";

import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { buildMetadata } from "@/lib/seo/seoMetadata";

const fallbackMetadata: Metadata = {
  title: "About Us | CityCalls",
  description:
    "Learn about CityCalls — Ghaziabad's trusted marketplace for background-verified home service professionals.",
};

export function generateMetadata() {
  return buildMetadata("/about", fallbackMetadata);
}

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <SeoJsonLd path="/about" />
      <AboutHero />
      <AboutStory />
      <WhyChooseUs />
      <AboutValues />
      <AboutParallax />
      <AboutJourney />
    </div>
  );
}
