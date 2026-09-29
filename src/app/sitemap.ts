import type { MetadataRoute } from "next";
import { blogs } from "@/data/blogs";
import { allServices } from "@/data/services";
import { SITE_URL } from "@/lib/seo/seoMetadata";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1").replace(/\/$/, "");

// /sitemap.xml is rebuilt at most every 10 minutes, so pages added or
// switched off in admin (Navbar List) show up without a redeploy.
export const revalidate = 600;

interface SitemapPage {
  path: string;
  lastModified: string;
}

// Fixed routes + every active Navbar List service page, from the backend.
async function fetchSitemapPages(): Promise<SitemapPage[] | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/websites/city-calls/sitemap`, {
      next: { revalidate },
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as { data: SitemapPage[] };
    return payload.data?.length ? payload.data : null;
  } catch {
    return null;
  }
}

// Used only when the API is unreachable (e.g. during a Docker build).
function localPages(): SitemapPage[] {
  const lastModified = new Date().toISOString();
  return ["/", "/about", "/blogs", "/contact", ...allServices.map((s) => `/services/${s.slug}`)].map((path) => ({ path, lastModified }));
}

function priorityFor(path: string) {
  if (path === "/") return 1;
  if (path.startsWith("/services/")) return 0.9;
  return 0.7;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = (await fetchSitemapPages()) ?? localPages();

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
    lastModified: new Date(page.lastModified),
    changeFrequency: page.path === "/" || page.path === "/blogs" ? "daily" : "weekly",
    priority: priorityFor(page.path),
  }));

  // Blog posts live in the website's own data file, not the backend.
  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => {
    const published = new Date(blog.date);
    return {
      url: `${SITE_URL}/blogs/${blog.slug}`,
      ...(!Number.isNaN(published.getTime()) && { lastModified: published }),
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [...pageEntries, ...blogEntries];
}
