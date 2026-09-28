import type { Metadata } from "next";

import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { fetchPublicServicePage } from "@/lib/api/servicePages";
import { buildMetadata } from "@/lib/seo/seoMetadata";
import { PestControlServiceView } from "./PestControlServiceView/PestControlServiceView";
import type { PestServiceConfig } from "./types";

// Shared by every app/(site)/services/<pest-service>/page.tsx route: CMS
// content (Admin → Pages) if it exists, else the service's local copy, plus
// the SEO entry from Admin → SEO Manager.

export async function pestServiceMetadata(config: PestServiceConfig): Promise<Metadata> {
  const page = (await fetchPublicServicePage(config.slug)) ?? config.pageContent;
  return buildMetadata(`/services/${config.slug}`, {
    title: `${page.heroTitle.replace(/\n/g, " ")} | CityCalls`,
    description: page.heroDescription,
  });
}

export async function PestControlServicePage({ config }: { config: PestServiceConfig }) {
  const content = await fetchPublicServicePage(config.slug);
  return (
    <>
      <SeoJsonLd path={`/services/${config.slug}`} />
      <PestControlServiceView config={config} content={content} />
    </>
  );
}
