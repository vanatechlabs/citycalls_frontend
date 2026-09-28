"use client";

import { ParallaxBanner as SharedParallaxBanner } from "@/components/services/RefrigeratorService/ParallaxBanner/ParallaxBanner";
import type { PublicServicePage } from "@/lib/api/servicePages";

export function ParallaxBanner({ content }: { content: PublicServicePage }) {
  return (
    <SharedParallaxBanner
      eyebrow={content.bannerEyebrow}
      title={content.bannerTitle}
      highlight={content.bannerHighlight}
      description={content.bannerDescription}
      image={content.bannerImage}
    />
  );
}
