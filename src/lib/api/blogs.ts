import { resolveWebsiteImageUrl } from "@/lib/api/cityCallsHome";
import { blogs as localBlogs } from "@/data/blogs";
import { parseContent, readingTime } from "@/components/blogs/blogUtils";

// Blogs from Admin → Blog Section. Pages re-fetch at most once a minute, so
// admin edits show up quickly without every visit hitting the API.
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1").replace(/\/$/, "");
const REVALIDATE_SECONDS = 60;

export interface PublicBlogSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  image: string;
  imageAlt: string;
  featured: boolean;
  publishedAt?: string;
  readingMinutes: number;
}

export interface PublicBlog extends PublicBlogSummary {
  h1Title: string;
  // Rich text HTML (cleaned by the backend when saved).
  content: string;
  metaKeywords: string;
  metaTitle: string;
  metaDescription: string;
  canonicalTag: string;
  ogTitle: string;
  ogImage: string;
  openGraphTags: string;
  schemaMarkup: string;
  updatedAt?: string;
}

// "2026-05-12T…" → "May 12, 2026"
export function formatBlogDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "Asia/Kolkata" });
}

const withImages = <T extends PublicBlogSummary>(blog: T): T => ({
  ...blog,
  image: blog.image ? resolveWebsiteImageUrl(blog.image) : "",
  ...("ogImage" in blog && typeof blog.ogImage === "string" && blog.ogImage ? { ogImage: resolveWebsiteImageUrl(blog.ogImage) } : {}),
});

// ── Fallback: the site's bundled articles, used only if the API is down ──
const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function plainToHtml(text: string) {
  return parseContent(text)
    .map((b) =>
      b.type === "paragraph"
        ? `<p>${escapeHtml(b.text)}</p>`
        : `<${b.type === "numbered" ? "ol" : "ul"}>${b.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</${b.type === "numbered" ? "ol" : "ul"}>`
    )
    .join("");
}

const fallbackBlogs: PublicBlog[] = localBlogs.map((b) => ({
  _id: b.slug,
  title: b.title,
  slug: b.slug,
  excerpt: b.excerpt,
  author: b.author,
  category: b.category,
  image: b.image,
  imageAlt: b.title,
  featured: false,
  publishedAt: new Date(b.date).toISOString(),
  readingMinutes: readingTime(b.content),
  h1Title: "",
  content: plainToHtml(b.content),
  metaKeywords: "",
  metaTitle: "",
  metaDescription: "",
  canonicalTag: "",
  ogTitle: "",
  ogImage: "",
  openGraphTags: "",
  schemaMarkup: "",
}));

// Newest first. Never throws.
export async function fetchBlogs(): Promise<PublicBlogSummary[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/websites/city-calls/blogs`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`status ${response.status}`);
    const payload = (await response.json()) as { data: PublicBlogSummary[] };
    return (payload.data ?? []).map(withImages);
  } catch {
    return fallbackBlogs;
  }
}

// null when there's no published blog with this slug.
export async function fetchBlog(slug: string): Promise<PublicBlog | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/websites/city-calls/blogs/${encodeURIComponent(slug)}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`status ${response.status}`);
    const payload = (await response.json()) as { data: PublicBlog };
    return payload.data ? withImages(payload.data) : null;
  } catch {
    return fallbackBlogs.find((b) => b.slug === slug) ?? null;
  }
}
