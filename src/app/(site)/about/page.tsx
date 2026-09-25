import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero/AboutHero";
import { AboutStory } from "@/components/about/AboutStory/AboutStory";
import { WhyChooseUs } from "@/components/home/WhyChooseUs/WhyChooseUs";
import { AboutValues } from "@/components/about/AboutValues/AboutValues";
import { AboutParallax } from "@/components/about/AboutParallax/AboutParallax";
import { AboutJourney } from "@/components/about/AboutJourney/AboutJourney";

export const metadata: Metadata = {
  title: "About Us | CityCalls",
  description:
    "Learn about CityCalls — Ghaziabad's trusted marketplace for background-verified home service professionals.",
};

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <AboutHero />
      <AboutStory />
      <WhyChooseUs />
      <AboutValues />
      <AboutParallax />
      <AboutJourney />
    </div>
  );
}
