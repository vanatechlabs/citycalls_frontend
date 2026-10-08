import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetail } from "@/components/blogs/BlogDetail/BlogDetail";
import { fetchBlog, fetchBlogs } from "@/lib/api/blogs";
import { DEFAULT_OG_IMAGE, SITE_URL, parseMetaTags } from "@/lib/seo/seoMetadata";

type Props = { params: Promise<{ slug: string }> };

// A blog's SEO comes from its own fields in Admin → Blog Section.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlog(slug);
  if (!blog) return { title: "Blog not found | CityCalls" };

  const tags = parseMetaTags(blog.openGraphTags);
  const title = blog.metaTitle || `${blog.title} | CityCalls`;
  const description = blog.metaDescription || blog.excerpt;
  const canonical = blog.canonicalTag || `${SITE_URL}/blogs/${blog.slug}`;
  const image = blog.ogImage || blog.image || tags["og:image"];
  const keywords = blog.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean);

  return {
    title,
    description,
    ...(keywords.length && { keywords }),
    alternates: { canonical },
    openGraph: {
      type: "article",
      siteName: tags["og:site_name"] || "CityCalls",
      title: blog.ogTitle || tags["og:title"] || title,
      description: tags["og:description"] || description,
      url: canonical,
      ...(blog.publishedAt && { publishedTime: blog.publishedAt }),
      authors: [blog.author],
      images: [image ? { url: image, alt: blog.imageAlt || blog.title } : DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.ogTitle || tags["twitter:title"] || title,
      description: tags["twitter:description"] || description,
      images: [image || DEFAULT_OG_IMAGE.url],
    },
  };
}

// JSON-LD: the admin's schema markup, or a standard Article. "<" is escaped
// so the text can never close the <script> tag.
function jsonLd(blog: NonNullable<Awaited<ReturnType<typeof fetchBlog>>>) {
  let data: unknown = null;
  if (blog.schemaMarkup) {
    try {
      data = JSON.parse(blog.schemaMarkup);
    } catch {
      data = null;
    }
  }
  data ??= {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.h1Title || blog.title,
    description: blog.metaDescription || blog.excerpt,
    image: blog.image ? [blog.image] : undefined,
    author: { "@type": "Person", name: blog.author },
    publisher: { "@type": "Organization", name: "CityCalls", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt ?? blog.publishedAt,
    mainEntityOfPage: `${SITE_URL}/blogs/${blog.slug}`,
  };
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const [blog, all] = await Promise.all([fetchBlog(slug), fetchBlogs()]);
  if (!blog) notFound();
  const latest = all.filter((b) => b.slug !== blog.slug).slice(0, 5);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(blog) }} />
      <BlogDetail blog={blog} latest={latest} />
    </>
  );
}
