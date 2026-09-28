import type { Metadata } from "next";
import { RefrigeratorServiceView } from "@/components/services/RefrigeratorService/RefrigeratorServiceView/RefrigeratorServiceView";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { fetchPublicServicePage } from "@/lib/api/servicePages";
import { buildMetadata } from "@/lib/seo/seoMetadata";

const PATH = "/services/refrigerator-service";

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchPublicServicePage("refrigerator-service");
  return buildMetadata(
    PATH,
    content
      ? { title: `${content.heroTitle} | CityCalls`, description: content.heroDescription }
      : {
          title: "Refrigerator Repair & Service in Ghaziabad | CityCalls",
          description: "Book refrigerator repair, gas refill and servicing at your doorstep in Ghaziabad with CityCalls' verified technicians.",
        }
  );
}

export default async function RefrigeratorServicePage() {
  const content = await fetchPublicServicePage("refrigerator-service");
  return (
    <>
      <SeoJsonLd path={PATH} />
      <RefrigeratorServiceView content={content} />
    </>
  );
}
