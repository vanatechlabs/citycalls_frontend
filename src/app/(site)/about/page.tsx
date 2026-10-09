import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero/AboutHero";
import { AboutStory } from "@/components/about/AboutStory/AboutStory";
import { WhyChooseUs } from "@/components/home/WhyChooseUs/WhyChooseUs";
import { AboutValues } from "@/components/about/AboutValues/AboutValues";
import { AboutParallax } from "@/components/about/AboutParallax/AboutParallax";
import { AboutJourney } from "@/components/about/AboutJourney/AboutJourney";

import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { fetchAboutPage } from "@/lib/api/aboutPage";
import { buildMetadata } from "@/lib/seo/seoMetadata";

const fallbackMetadata: Metadata = {
  title: "About Us | CityCalls",
  description:
    "Learn about CityCalls — Ghaziabad's trusted marketplace for background-verified home service professionals.",
};

export function generateMetadata() {
  return buildMetadata("/about", fallbackMetadata);
}

export default async function AboutPage() {
  const about = await fetchAboutPage();
  return (
    <div className="overflow-hidden">
      <SeoJsonLd path="/about" />
      <AboutHero content={about.hero} />
      <AboutStory content={about.story} />
      <WhyChooseUs />
      <AboutValues content={about.values} />
      <AboutParallax content={about.parallax} />
      {about.journey.items.length > 0 && <AboutJourney content={about.journey} />}
    </div>
  );
}
