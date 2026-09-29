import type { Metadata } from "next";

import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { fetchPageBackground } from "@/lib/api/pageBackgrounds";
import { fetchPublicServicePage } from "@/lib/api/servicePages";
import { buildMetadata } from "@/lib/seo/seoMetadata";
import { ApplianceServiceView } from "./ApplianceServiceView/ApplianceServiceView";
import type { ApplianceServiceConfig } from "./types";

// Shared by every app/(site)/services/<appliance>/page.tsx route: CMS content
// (Admin → Pages) if it exists, else the service's local copy, plus the SEO
// entry from Admin → SEO Manager.

export async function applianceServiceMetadata(config: ApplianceServiceConfig): Promise<Metadata> {
  const page = (await fetchPublicServicePage(config.slug)) ?? config.pageContent;
  return buildMetadata(`/services/${config.slug}`, {
    title: `${page.heroTitle.replace(/\n/g, " ")} | CityCalls`,
    description: page.heroDescription,
  });
}

export async function ApplianceServicePage({ config }: { config: ApplianceServiceConfig }) {
  const [content, background] = await Promise.all([
    fetchPublicServicePage(config.slug),
    fetchPageBackground(`/services/${config.slug}`),
  ]);
  return (
    <>
      <SeoJsonLd path={`/services/${config.slug}`} />
      <ApplianceServiceView config={config} content={content} background={background} />
    </>
  );
}
