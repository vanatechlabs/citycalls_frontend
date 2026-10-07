import Link from "next/link";
import {
  ArrowLeft, ArrowUpRight, BadgeCheck, Calendar, CheckCircle2, ChevronRight, Clock, Lightbulb, Phone, ShieldCheck, Star, Tag,
} from "lucide-react";
import { blogs, type Blog } from "@/data/blogs";
import { initials, parseContent, readingTime } from "@/components/blogs/blogUtils";
import { BookServiceButton, ReadingProgress, ShareButtons } from "./BlogArticleClient";

const SUPPORT_PHONE = "+91 74288 08884";
const SUPPORT_TEL = "+917428808884";

// Article page: dark hero with the title and author, the cover image, the
// article with a sticky "book a service" sidebar, an author card and more
// articles to read.
export function BlogDetail({ blog }: { blog: Blog }) {
  const minutes = readingTime(blog.content);
  const blocks = parseContent(blog.content);
  // With 3+ blocks: the first reads as an intro, the last as the takeaway.
  const lead = blocks.length > 2 && blocks[0].type === "paragraph" ? blocks[0] : null;
  const last = blocks[blocks.length - 1];
  const takeaway = blocks.length > 2 && last.type === "paragraph" ? last : null;
  const body = blocks.filter((b) => b !== lead && b !== takeaway);

  // Same topic first, then the newest of the rest.
  const related = [
    ...blogs.filter((b) => b.slug !== blog.slug && b.category === blog.category),
    ...blogs.filter((b) => b.slug !== blog.slug && b.category !== blog.category),
  ].slice(0, 3);

  return (
    <>
      <ReadingProgress />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-ink pb-40 text-white md:pb-52">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img src={blog.image} alt="" className="h-full w-full scale-110 object-cover opacity-20 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/90 to-ink" />
          <div className="absolute -left-40 -top-40 h-[26rem] w-[26rem] rounded-full bg-primary/20 blur-[120px]" />
        </div>

        <div className="container-x relative max-w-4xl pt-10 text-center md:pt-14">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-medium text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blogs" className="hover:text-white">Blogs</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="max-w-[220px] truncate text-white/90">{blog.title}</span>
          </nav>

          <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            <Tag className="h-3.5 w-3.5" /> {blog.category}
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-[32px] font-bold leading-[1.12] tracking-tight md:text-[48px]">{blog.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70 md:text-lg">{blog.excerpt}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            <span className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-ink ring-4 ring-white/10">{initials(blog.author)}</span>
              <span className="text-left">
                <span className="flex items-center gap-1 font-semibold text-white">
                  {blog.author} <BadgeCheck className="h-4 w-4 text-primary" />
                </span>
                <span className="text-xs text-white/55">CityCalls Expert</span>
              </span>
            </span>
            <span className="hidden h-8 w-px bg-white/15 sm:block" />
            <span className="flex items-center gap-1.5 text-white/75"><Calendar className="h-4 w-4 text-primary" />{blog.date}</span>
            <span className="flex items-center gap-1.5 text-white/75"><Clock className="h-4 w-4 text-primary" />{minutes} min read</span>
          </div>
        </div>
      </section>

      {/* ── Cover image, overlapping the hero ── */}
      <div className="container-x relative z-10 -mt-32 max-w-5xl md:-mt-44">
        <div className="overflow-hidden rounded-[28px] border-4 border-white bg-white shadow-[0_30px_70px_-25px_rgba(0,0,0,0.45)]">
          <img src={blog.image} alt={blog.title} className="aspect-[16/8] w-full object-cover" />
        </div>
      </div>

      {/* ── Article + sidebar ── */}
      <div className="bg-background">
        <div className="container-x grid max-w-6xl gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="min-w-0">
            {lead && (
              <p className="text-lg font-medium leading-relaxed text-ink first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.85] first-letter:text-primary-dark md:text-xl">
                {lead.text}
              </p>
            )}

            <div className={`space-y-6 text-[17px] leading-[1.85] text-ink/85 ${lead ? "mt-8" : ""}`}>
              {body.map((block, i) => {
                if (block.type === "paragraph") return <p key={i}>{block.text}</p>;
                if (block.type === "numbered") {
                  return (
                    <ol key={i} className="space-y-3">
                      {block.items.map((item, n) => {
                        // "Weak airflow — usually a clogged filter" → bold heading + explanation.
                        const [head, ...rest] = item.split(/\s[—–-]\s/);
                        return (
                          <li key={n} className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/40">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-sm font-bold text-primary-dark">{n + 1}</span>
                            <span className="pt-1 text-[16px] leading-relaxed">
                              {rest.length ? (<><strong className="font-semibold text-ink">{head}</strong> — {rest.join(" — ")}</>) : item}
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  );
                }
                return (
                  <ul key={i} className="space-y-3 rounded-2xl border border-primary/20 bg-primary/[0.05] p-5">
                    {block.items.map((item, n) => (
                      <li key={n} className="flex gap-3 text-[16px] leading-relaxed">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              })}
            </div>

            {takeaway && (
              <aside className="relative mt-10 overflow-hidden rounded-2xl bg-ink p-6 text-white md:p-7">
                <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
                <p className="relative flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  <Lightbulb className="h-4 w-4" /> The bottom line
                </p>
                <p className="relative mt-3 text-lg font-medium leading-relaxed">{takeaway.text}</p>
              </aside>
            )}

            {/* Tags + share */}
            <div className="mt-10 flex flex-col gap-5 border-y border-border py-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {[blog.category, "Ghaziabad", "Home care tips"].map((tag) => (
                  <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-ink/75">#{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Share</span>
                <ShareButtons title={blog.title} compact />
              </div>
            </div>

            {/* Author */}
            <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-600 text-xl font-bold text-white shadow-lg">{initials(blog.author)}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Written by</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-lg font-bold text-ink">{blog.author} <BadgeCheck className="h-5 w-5 text-primary" /></p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {blog.category} expert at CityCalls. Shares what our verified technicians see on real jobs across Ghaziabad — so you can spot problems early and know what fair service looks like.
                </p>
              </div>
            </div>

            <Link href="/blogs" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:gap-3 hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-xl">
              <div aria-hidden className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/30 blur-3xl" />
              <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified pros
              </span>
              <h3 className="relative mt-4 text-xl font-bold leading-snug">Need help with {blog.category.toLowerCase()}?</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-white/70">
                Book a verified CityCalls technician — doorstep service in Ghaziabad, honest prices, same-day slots.
              </p>
              <div className="relative mt-4 flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                <span className="ml-1.5 text-xs font-semibold text-white/70">4.8 · 10,000+ happy customers</span>
              </div>
              <BookServiceButton className="relative mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-ink transition-all hover:brightness-110 active:scale-[0.98]" />
              <a href={`tel:${SUPPORT_TEL}`} className="relative mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                <Phone className="h-4 w-4" /> {SUPPORT_PHONE}
              </a>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink">About this article</h3>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  { icon: Tag, label: "Topic", value: blog.category },
                  { icon: Calendar, label: "Published", value: blog.date },
                  { icon: Clock, label: "Reading time", value: `${minutes} min` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-2 text-muted-foreground"><Icon className="h-4 w-4 text-primary" />{label}</dt>
                    <dd className="font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 border-t border-border pt-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Share this article</p>
                <ShareButtons title={blog.title} compact />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Keep reading ── */}
      {related.length > 0 && (
        <section className="border-t border-border bg-muted/40">
          <div className="container-x py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-dark">Keep reading</p>
                <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">More from the journal</h2>
              </div>
              <Link href="/blogs" className="inline-flex items-center gap-1.5 rounded-full border border-ink px-5 py-2 text-xs font-bold text-ink transition-colors hover:bg-ink hover:text-white">
                View all articles <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((b) => (
                <Link
                  key={b.slug}
                  href={`/blogs/${b.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.25)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={b.image} alt={b.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink backdrop-blur-sm">{b.category}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="line-clamp-2 font-bold leading-snug text-ink transition-colors group-hover:text-primary-dark">{b.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{b.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between pt-4 text-xs font-semibold text-muted-foreground">
                      <span>{b.date} · {readingTime(b.content)} min read</span>
                      <ArrowUpRight className="h-4 w-4 text-primary transition-transform group-hover:rotate-45" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
