import type { Metadata } from "next";
import { BlogsList } from "@/components/blogs/BlogsList/BlogsList";

export const metadata: Metadata = {
  title: "Blogs | CityCalls",
  description: "Guides, tips and stories from CityCalls' verified home service professionals.",
};

export default function BlogsPage() {
  return <BlogsList />;
}
