import type { Metadata } from "next";
import { BlogsList } from "@/components/blogs/BlogsList/BlogsList";

import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { buildMetadata } from "@/lib/seo/seoMetadata";

const fallbackMetadata: Metadata = {
  title: "Blogs | CityCalls",
  description: "Guides, tips and stories from CityCalls' verified home service professionals.",
};

export function generateMetadata() {
  return buildMetadata("/blogs", fallbackMetadata);
}

export default function BlogsPage() {
  return (
    <>
      <SeoJsonLd path="/blogs" />
      <BlogsList />
    </>
  );
}
