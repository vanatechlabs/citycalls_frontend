"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Star } from "lucide-react";
import { formatBlogDate, type PublicBlogSummary } from "@/lib/api/blogs";

// Blog list below the hero, laid out like the Design House blogs page:
// category pills, then a 3-column grid of square-edged cards.
export function BlogsList({ blogs }: { blogs: PublicBlogSummary[] }) {
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", ...new Set(blogs.map((b) => b.category))], [blogs]);
  const visible = category === "All" ? blogs : blogs.filter((b) => b.category === category);

  return (
    <>
      {/* Category filter */}
      <section className="border-b border-gray-200 bg-white py-8">
        <div className="container-x max-w-7xl">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 ${
                  category === c ? "bg-primary-dark text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog grid */}
      <section className="bg-gradient-to-b from-white via-gray-50 to-white py-20">
        <div className="container-x max-w-7xl">
          {visible.length === 0 ? (
            <div className="py-20 text-center">
              <h3 className="mb-4 text-2xl font-bold text-gray-800">No Blogs Found</h3>
              <p className="text-gray-600">Check back later for new content!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((blog, idx) => (
                <motion.article
                  key={blog.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 3) * 0.1 }}
                  className="group overflow-hidden border-2 border-gray-200 bg-white transition-all duration-300 hover:border-primary-dark hover:shadow-2xl"
                >
                  <Link href={`/blogs/${blog.slug}`} className="block">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img src={blog.image} alt={blog.imageAlt || blog.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute left-4 top-4 flex gap-2">
                        <span className="inline-block bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-dark shadow-md backdrop-blur-sm">
                          {blog.category}
                        </span>
                        {blog.featured && (
                          <span className="inline-flex items-center gap-1 bg-amber-400 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-ink shadow-md">
                            <Star className="h-3 w-3 fill-current" /> Featured
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="mb-2.5 flex items-center gap-3 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                          {formatBlogDate(blog.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-primary" />
                          {blog.readingMinutes} min read
                        </span>
                      </div>

                      <h3 className="mb-2.5 line-clamp-2 text-lg font-bold uppercase tracking-wide text-primary-dark transition-colors duration-300 group-hover:text-primary">
                        {blog.title}
                      </h3>

                      <p className="mb-3.5 line-clamp-3 text-sm leading-relaxed text-slate-600">{blog.excerpt}</p>

                      <div className="mb-3 text-xs text-gray-500">By {blog.author}</div>

                      <div className="mb-3 flex flex-wrap gap-1">
                        {[blog.category, "Ghaziabad"].map((tag) => (
                          <span key={tag} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">#{tag.replace(/\s+/g, "")}</span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-primary transition-all duration-300 group-hover:gap-2">
                        <span>Read More</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
