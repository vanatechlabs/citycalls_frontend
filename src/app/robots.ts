import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/seoMetadata";

// Replaces public/robots.txt so it can point crawlers at the generated sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
