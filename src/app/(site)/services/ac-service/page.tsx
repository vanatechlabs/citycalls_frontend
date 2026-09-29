import type { Metadata } from "next";

import { ACServiceView } from "@/components/services/ACService/ACServiceView/ACServiceView";
import { acServicePageContent } from "@/components/services/ACService/content/acServicePageContent";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { fetchPageBackground } from "@/lib/api/pageBackgrounds";
import { fetchPublicServicePage } from "@/lib/api/servicePages";
import { buildMetadata } from "@/lib/seo/seoMetadata";

const PATH = "/services/ac-service";

export async function generateMetadata(): Promise<Metadata> {
  const managedContent = await fetchPublicServicePage("ac-service");
  const content = managedContent ?? acServicePageContent;

  return buildMetadata(PATH, {
    title: `${content.heroTitle.replace(/\n/g, " ")} | CityCalls`,
    description: content.heroDescription,
  });
}

export default async function ACServicePage() {
  const [content, background] = await Promise.all([fetchPublicServicePage("ac-service"), fetchPageBackground(PATH)]);
  return (
    <>
      <SeoJsonLd path={PATH} />
      <ACServiceView content={content} background={background} />
    </>
  );
}
