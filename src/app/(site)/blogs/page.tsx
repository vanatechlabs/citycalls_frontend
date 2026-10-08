import type { Metadata } from "next";
import { BlogsList } from "@/components/blogs/BlogsList/BlogsList";
import { BlogHero } from "@/components/blogs/BlogHero/BlogHero";

import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { buildMetadata } from "@/lib/seo/seoMetadata";
import { fetchPageBackground } from "@/lib/api/pageBackgrounds";
import { fetchBlogs } from "@/lib/api/blogs";

const fallbackMetadata: Metadata = {
  title: "Blogs | CityCalls",
  description: "Guides, tips and stories from CityCalls' verified home service professionals.",
};

// Used when Admin → Background Section has nothing set for /blogs.
const HERO_FALLBACK = {
  heading: "Guides, Tips & Stories",
  highlight: "Stories",
  description: "Expert advice, maintenance tips and honest how-tos from CityCalls' verified home service professionals.",
  image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop",
};

export function generateMetadata() {
  return buildMetadata("/blogs", fallbackMetadata);
}

export default async function BlogsPage() {
  // Blogs come from Admin → Blog Section.
  const [background, blogs] = await Promise.all([fetchPageBackground("/blogs"), fetchBlogs()]);
  return (
    <>
      <SeoJsonLd path="/blogs" />
      <BlogHero
        title={background?.heading || HERO_FALLBACK.heading}
        highlight={background?.heading ? background.highlight : HERO_FALLBACK.highlight}
        description={background?.description || HERO_FALLBACK.description}
        image={background?.image || HERO_FALLBACK.image}
        imageAlt={background?.imageAlt}
      />
      <BlogsList blogs={blogs} />
    </>
  );
}
