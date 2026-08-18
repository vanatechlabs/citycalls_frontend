import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { blogs, findBlog } from "@/data/blogs";

function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const blog = slug ? findBlog(slug) : undefined;
  
  if (!blog) {
    return <Navigate to="/404" replace />;
  }

  const related = blogs.filter((b) => b.slug !== blog.slug).slice(0, 3);
  return (
    <>
      <article className="bg-background">
        <div className="container-x pt-10 pb-4 max-w-3xl">
          <Link to="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary-dark">
            <ChevronLeft size={14} /> Back to blog
          </Link>
        </div>
        <header className="container-x max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-widest text-primary-dark">{blog.category}</div>
          <h1 className="mt-2 text-3xl md:text-5xl font-black leading-[1.1]">{blog.title}</h1>
          <div className="mt-4 text-sm text-muted-foreground">{blog.author} · {blog.date}</div>
        </header>
        <div className="container-x mt-8 max-w-4xl">
          <img src={blog.image} alt={blog.title} className="w-full aspect-[16/9] object-cover rounded-3xl shadow-soft" />
        </div>
        <div className="container-x py-12 max-w-3xl">
          <div className="prose prose-neutral max-w-none text-[17px] leading-relaxed text-ink whitespace-pre-line">
            {blog.content}
          </div>
        </div>
      </article>

      <section className="bg-muted/40">
        <div className="container-x py-16">
          <h3 className="text-2xl font-black">Keep reading</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((b) => (
              <Link key={b.slug} to={`/blogs/${b.slug}`} className="group rounded-3xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-elevate transition-all">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={b.image} alt={b.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary-dark">{b.category}</div>
                  <h4 className="mt-1.5 font-bold leading-snug group-hover:text-primary-dark transition-colors">{b.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogDetailPage;
