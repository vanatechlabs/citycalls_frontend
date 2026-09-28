import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogs, findBlog } from "@/data/blogs";
import { BlogDetail } from "@/components/blogs/BlogDetail/BlogDetail";
import { buildMetadata } from "@/lib/seo/seoMetadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = findBlog(slug);
  if (!blog) return {};
  return buildMetadata(`/blogs/${slug}`, { title: `${blog.title} | CityCalls`, description: blog.excerpt });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = findBlog(slug);
  if (!blog) notFound();
  return <BlogDetail blog={blog} />;
}
