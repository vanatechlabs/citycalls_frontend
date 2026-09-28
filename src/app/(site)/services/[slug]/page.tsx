import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allServices, findService } from "@/data/services";
import { ServiceDetail } from "@/components/services/ServiceDetail/ServiceDetail";
import { RefrigeratorServiceView } from "@/components/services/RefrigeratorService/RefrigeratorServiceView/RefrigeratorServiceView";
import { fetchPublicServicePage } from "@/lib/api/servicePages";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { buildMetadata } from "@/lib/seo/seoMetadata";

type Props = { params: Promise<{ slug: string }> };

// These have dedicated routes (app/(site)/services/<slug>/) and service
// folders under components/services/ — don't pre-render them here too.
const DEDICATED_SERVICE_ROUTES = [
  "refrigerator-service",
  "ac-service",
  "washing-machine-services",
  "television-repair-services",
  "microwave-oven-services",
  "geyser-repair-services",
  "chimney-repair-services",
];

export function generateStaticParams() {
  return allServices
    .filter((s) => !DEDICATED_SERVICE_ROUTES.includes(s.slug))
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = `/services/${slug}`;
  const managedPage = await fetchPublicServicePage(slug);
  if (managedPage) {
    return buildMetadata(path, { title: `${managedPage.heroTitle} | CityCalls`, description: managedPage.heroDescription });
  }
  const service = findService(slug);
  if (!service) return {};
  return buildMetadata(path, { title: `${service.name} in Ghaziabad | CityCalls`, description: service.short });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const managedPage = await fetchPublicServicePage(slug);
  if (!managedPage && !findService(slug)) notFound();
  return (
    <>
      <SeoJsonLd path={`/services/${slug}`} />
      {managedPage ? <RefrigeratorServiceView slug={slug} content={managedPage} /> : <ServiceDetail slug={slug} />}
    </>
  );
}
