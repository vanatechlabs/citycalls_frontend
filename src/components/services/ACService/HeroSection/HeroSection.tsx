"use client";

import { HeroSection as SharedHeroSection } from "@/components/services/RefrigeratorService/HeroSection/HeroSection";
import type { PublicServicePage } from "@/lib/api/servicePages";

interface HeroSectionProps {
  content: PublicServicePage;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <SharedHeroSection
      service={{
        slug: "ac-service",
        name: content.serviceName,
        image: content.serviceImage ?? content.heroImage,
        short: content.heroDescription,
      }}
      content={content}
    />
  );
}
