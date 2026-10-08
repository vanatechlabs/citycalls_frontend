import Link from "next/link";
import { Calendar, Clock, Tag, User } from "lucide-react";
import { formatBlogDate, type PublicBlog, type PublicBlogSummary } from "@/lib/api/blogs";
import { BlogHero } from "@/components/blogs/BlogHero/BlogHero";
import { ArticleActions, ReadingProgress } from "./BlogArticleClient";

// Article page, laid out like the Design House blog detail page: photo hero
// with the title, then the article (meta, title, excerpt, share / save,
// content, tags) beside a sticky "Latest Blogs" list — in CityCalls greens.
// Content is rich text from Admin → Blog Section (cleaned by the backend).
export function BlogDetail({ blog, latest }: { blog: PublicBlog; latest: PublicBlogSummary[] }) {
  const keywordTags = blog.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean).slice(0, 6);
  const tags = keywordTags.length ? keywordTags : [blog.category, "Ghaziabad", "Home Care Tips"];

  return (
    <>
      <ReadingProgress />
      <BlogHero title={blog.h1Title || blog.title} image={blog.image} imageAlt={blog.imageAlt || blog.title} />

      <section className="bg-white py-16">
        <div className="container-x max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Article */}
            <div className="lg:col-span-8">
              <div className="mb-10 text-left">
                <div className="mb-6 flex flex-wrap items-center gap-6 border-b pb-6 text-sm text-gray-500">
                  <span className="flex items-center gap-2 font-medium">
                    <User size={16} className="text-primary-dark" />
                    By {blog.author}
                  </span>
                  <span className="flex items-center gap-2 font-medium">
                    <Calendar size={16} className="text-primary" />
                    {formatBlogDate(blog.publishedAt)}
                  </span>
                  <span className="flex items-center gap-2 font-medium">
                    <Clock size={16} className="text-primary" />
                    {blog.readingMinutes} min read
                  </span>
                  <span className="flex items-center gap-2 rounded-full bg-primary-dark/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-dark">
                    <Tag size={14} />
                    {blog.category}
                  </span>
                </div>

                <h2 className="mb-6 font-serif text-2xl font-semibold leading-tight text-gray-900 md:text-4xl">{blog.title}</h2>

                <p className="border-l-4 border-primary bg-gray-50/50 py-2 pl-6 text-lg font-medium italic leading-relaxed text-gray-600">
                  {blog.excerpt}
                </p>
              </div>

              <ArticleActions slug={blog.slug} title={blog.title} />

              {/* Content */}
              <article className="blog-content mb-12 text-left" dangerouslySetInnerHTML={{ __html: blog.content }} />
              <style>{`
                .blog-content { font-size: 1.125rem; line-height: 1.7; color: #333; font-weight: 450; }
                .blog-content > * + * { margin-top: 1rem; }
                .blog-content p { text-align: justify; hyphens: auto; }
                .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4, .blog-content h5, .blog-content h6 { color: #1a1a1a; font-weight: 800; line-height: 1.3; margin-top: 2.25rem; }
                .blog-content h1 { font-size: 2.1rem; }
                .blog-content h2 { font-size: 1.75rem; border-bottom: 2px solid #f1f1f1; padding-bottom: 0.5rem; }
                .blog-content h3 { font-size: 1.4rem; }
                .blog-content h4 { font-size: 1.2rem; }
                .blog-content ul { list-style: disc; padding-left: 1.5rem; }
                .blog-content ol { list-style: decimal; padding-left: 1.5rem; }
                .blog-content li { margin-top: 0.4rem; padding-left: 0.25rem; }
                .blog-content li::marker { color: var(--primary-dark); font-weight: 700; }
                .blog-content strong, .blog-content b { color: #111827; font-weight: 700; }
                .blog-content a { color: var(--primary-dark); font-weight: 600; border-bottom: 2px solid var(--primary); text-decoration: none; }
                .blog-content a:hover { color: var(--primary); }
                .blog-content blockquote { border-left: 4px solid var(--primary-dark); background: #f9fafb; padding: 1.25rem 1.5rem; font-style: italic; border-radius: 0 1rem 1rem 0; }
              `}</style>

              {/* Tags */}
              <div className="mb-12 border-t border-gray-100 pt-8">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href="/blogs"
                      className="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-sm font-bold text-gray-600 transition-all hover:border-primary-dark hover:text-primary-dark"
                    >
                      #{tag.replace(/\s+/g, "")}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: latest blogs */}
            <aside className="space-y-8 lg:col-span-4">
              <div className="sticky top-24">
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-primary-dark">
                  <span className="h-6 w-1.5 rounded-full bg-primary" />
                  Latest Blogs
                </h3>
                <div className="flex flex-col gap-4">
                  {latest.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/blogs/${b.slug}`}
                      className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:border-primary-dark/20 hover:shadow-md"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                        <img src={b.image} alt={b.imageAlt || b.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <div className="flex flex-col gap-1 pr-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">{b.category}</span>
                        <h4 className="line-clamp-2 text-sm font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-primary-dark">
                          {b.title}
                        </h4>
                        <span className="text-[10px] font-medium text-gray-500">{formatBlogDate(b.publishedAt)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
