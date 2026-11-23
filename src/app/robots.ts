import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/seoMetadata";

// /robots.txt — rules from the SEO team. Generated (rather than a file in
// public/) so the sitemap line always points at this site's own sitemap.

// Private, system and utility paths kept out of search.
const PRIVATE_PATHS = [
  "/api/",
  "/admin/",
  "/dashboard/",
  "/login",
  "/register",
  "/checkout",
  "/cart",
  "/booking/",
  "/my-bookings",
  "/profile",
  "/thank-you",
  "/_next/data/",
  "/search?",
];

// Tracking-parameter copies of pages.
const TRACKING_PATHS = ["/*?utm_", "/*?ref=", "/*?fbclid=", "/*?gclid="];

// Assets Google needs to render pages.
const RENDER_ASSETS = ["/_next/static/", "/assets/", "/*.css$", "/*.js$"];

// Aggressive SEO scrapers, blocked from the whole site.
const BLOCKED_BOTS = ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: ["/", ...RENDER_ASSETS], disallow: [...PRIVATE_PATHS, ...TRACKING_PATHS] },
      ...BLOCKED_BOTS.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
