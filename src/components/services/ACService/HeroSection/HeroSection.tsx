"use client";

import { HeroSection as SharedHeroSection } from "@/components/services/RefrigeratorService/HeroSection/HeroSection";
import type { PublicPageBackground } from "@/lib/api/pageBackgrounds";
import type { PublicServicePage } from "@/lib/api/servicePages";

interface HeroSectionProps {
  content: PublicServicePage;
  background?: PublicPageBackground | null;
}

export function HeroSection({ content, background }: HeroSectionProps) {
  return (
    <SharedHeroSection
      service={{
        slug: "ac-service",
        name: content.serviceName,
        image: content.serviceImage ?? content.heroImage,
        short: content.heroDescription,
      }}
      content={content}
      background={background}
    />
  );
}
