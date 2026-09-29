import type { Metadata } from "next";

import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { fetchPageBackground } from "@/lib/api/pageBackgrounds";
import { fetchPublicServicePage } from "@/lib/api/servicePages";
import { buildMetadata } from "@/lib/seo/seoMetadata";
import { CleaningServiceView } from "./CleaningServiceView/CleaningServiceView";
import type { CleaningServiceConfig } from "./types";

// Shared by every app/(site)/services/<cleaning-service>/page.tsx route: CMS
// content (Admin → Pages) if it exists, else the service's local copy, plus
// the SEO entry from Admin → SEO Manager and the Background Section hero.

export async function cleaningServiceMetadata(config: CleaningServiceConfig): Promise<Metadata> {
  const page = (await fetchPublicServicePage(config.slug)) ?? config.pageContent;
  return buildMetadata(`/services/${config.slug}`, {
    title: `${page.heroTitle.replace(/\n/g, " ")} | CityCalls`,
    description: page.heroDescription,
  });
}

export async function CleaningServicePage({ config }: { config: CleaningServiceConfig }) {
  const [content, background] = await Promise.all([
    fetchPublicServicePage(config.slug),
    fetchPageBackground(`/services/${config.slug}`),
  ]);
  return (
    <>
      <SeoJsonLd path={`/services/${config.slug}`} />
      <CleaningServiceView config={config} content={content} background={background} />
    </>
  );
}
