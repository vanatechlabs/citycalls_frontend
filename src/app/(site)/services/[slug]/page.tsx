import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allServices, findService } from "@/data/services";
import { ServiceDetail } from "@/components/services/ServiceDetail/ServiceDetail";

type Props = { params: Promise<{ slug: string }> };

// Refrigerator has its own dedicated page at /services/refrigerator-service.
export function generateStaticParams() {
  return allServices.filter((s) => s.slug !== "refrigerator-service").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};
  return { title: `${service.name} in Ghaziabad | CityCalls`, description: service.short };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!findService(slug)) notFound();
  return <ServiceDetail slug={slug} />;
}
