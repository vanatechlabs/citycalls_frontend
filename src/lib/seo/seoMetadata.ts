import type { Metadata } from "next";
import { resolveWebsiteImageUrl } from "@/lib/api/cityCallsHome";

// SEO entries managed in Admin → SEO Manager, one per page path.
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1").replace(/\/$/, "");
// Re-fetched at most once a minute per page, so admin edits show up quickly
// without making every request hit the API.
const SEO_REVALIDATE_SECONDS = 60;

export interface PublicSeoMeta {
  pagePath: string;
  metaTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
  openGraphTags?: string;
  schemaMarkup?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

// null when the page has no active SEO entry or the API is unreachable —
// pages then keep their own built-in metadata.
export async function fetchSeoMeta(path: string): Promise<PublicSeoMeta | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/websites/city-calls/seo/meta?path=${encodeURIComponent(path)}`, {
      next: { revalidate: SEO_REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as { data: PublicSeoMeta | null };
    return payload.data ?? null;
  } catch {
    return null;
  }
}

// Pulls property/name → content out of pasted <meta ...> tags, e.g.
// <meta property="og:title" content="..."> → { "og:title": "..." }.
function parseMetaTags(html?: string): Record<string, string> {
  const tags: Record<string, string> = {};
  if (!html) return tags;
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const key = /\b(?:property|name)\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1]?.toLowerCase();
    const content = /\bcontent\s*=\s*["']([^"']*)["']/i.exec(tag)?.[1];
    if (key && content !== undefined) tags[key] = content;
  }
  return tags;
}

type OpenGraphType = "website" | "article";

// The page's own metadata, overridden field by field by whatever the admin
// filled in for this path.
export async function buildMetadata(path: string, fallback: Metadata = {}): Promise<Metadata> {
  const seo = await fetchSeoMeta(path);
  if (!seo) return fallback;

  const tags = parseMetaTags(seo.openGraphTags);
  const title = seo.metaTitle || (typeof fallback.title === "string" ? fallback.title : undefined);
  const description = seo.metaDescription || fallback.description || undefined;
  const image = seo.ogImage ? resolveWebsiteImageUrl(seo.ogImage) : tags["og:image"];
  const keywords = seo.metaKeywords?.split(",").map((k) => k.trim()).filter(Boolean);

  return {
    ...fallback,
    ...(title && { title }),
    ...(description && { description }),
    ...(keywords?.length && { keywords }),
    ...(seo.canonicalUrl && { alternates: { ...fallback.alternates, canonical: seo.canonicalUrl } }),
    openGraph: {
      ...fallback.openGraph,
      siteName: tags["og:site_name"] || "CityCalls",
      type: (tags["og:type"] === "article" ? "article" : "website") as OpenGraphType,
      title: tags["og:title"] || title,
      description: tags["og:description"] || description,
      ...((tags["og:url"] || seo.canonicalUrl) && { url: tags["og:url"] || seo.canonicalUrl }),
      ...(image && { images: [{ url: image }] }),
    },
    twitter: {
      ...fallback.twitter,
      card: tags["twitter:card"] === "summary" ? "summary" : "summary_large_image",
      title: tags["twitter:title"] || tags["og:title"] || title,
      description: tags["twitter:description"] || tags["og:description"] || description,
      ...((tags["twitter:image"] || image) && { images: [tags["twitter:image"] || image] }),
    },
  };
}
