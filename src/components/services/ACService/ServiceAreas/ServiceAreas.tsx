"use client";

import { ServiceAreas as SharedServiceAreas } from "@/components/services/RefrigeratorService/ServiceAreas/ServiceAreas";
import type { PublicServicePage } from "@/lib/api/servicePages";

export function ServiceAreas({ content }: { content: PublicServicePage }) {
  return (
    <SharedServiceAreas
      title={content.areasTitle}
      highlight={content.areasHighlight}
      description={content.areasDescription}
      areas={content.areas}
    />
  );
}
