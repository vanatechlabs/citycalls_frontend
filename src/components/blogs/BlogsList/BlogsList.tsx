"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, BookOpen, Calendar, ChevronRight, Clock, Search, ShieldCheck, Sparkles, X } from "lucide-react";
import { blogs } from "@/data/blogs";
import { initials, readingTime } from "@/components/blogs/blogUtils";

const byNewest = [...blogs].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export function BlogsList() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const featured = byNewest[0];
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    blogs.forEach((b) => counts.set(b.category, (counts.get(b.category) ?? 0) + 1));
    return [{ name: "All", count: blogs.length }, ...[...counts].map(([name, count]) => ({ name, count }))];
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return byNewest.filter(
      (b) =>
        (category === "All" || b.category === category) &&
        (!q || [b.title, b.excerpt, b.category, b.author].some((f) => f.toLowerCase().includes(q)))
    );
  }, [category, query]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute -bottom-48 right-10 h-[26rem] w-[26rem] rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        </div>

        <div className="container-x relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: heading, search, stats */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs font-medium text-white/60">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white/90">Blogs</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur">
              <BookOpen className="h-3.5 w-3.5 text-primary" /> The CityCalls Journal
            </span>

            <h1 className="mt-5 text-[36px] font-bold leading-[1.08] tracking-tight md:text-[52px]">
              Guides, tips &amp; stories
              <br />
              <span className="bg-gradient-to-r from-primary to-emerald-300 bg-clip-text text-transparent">from our pros.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/75 md:text-base">
              Practical advice from the technicians who fix, clean and care for Ghaziabad homes every day — so you know
              what to look for, what it should cost and when to call a pro.
            </p>

            {/* Search */}
            <label className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 backdrop-blur-md transition focus-within:border-primary/60 focus-within:bg-white/[0.1]">
              <Search className="h-5 w-5 shrink-0 text-white/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles — AC, pests, sofa cleaning…"
                className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/45"
                aria-label="Search articles"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white" aria-label="Clear search">
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {[
                { icon: BookOpen, value: `${blogs.length}+`, label: "Expert articles" },
                { icon: Sparkles, value: String(categories.length - 1), label: "Service topics" },
                { icon: ShieldCheck, value: "100%", label: "By verified pros" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <span>
                    <span className="block text-lg font-bold leading-none">{value}</span>
                    <span className="text-xs font-medium text-white/60">{label}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: featured (latest) article */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="relative"
            >
              <div aria-hidden className="absolute -inset-3 rotate-[-3deg] rounded-[32px] border border-white/10 bg-white/[0.04]" />
              <Link
                href={`/blogs/${featured.slug}`}
                className="group relative block overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1a14] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a14] via-[#0d1a14]/30 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink shadow">
                    <Sparkles className="h-3.5 w-3.5" /> Latest story
                  </span>
                </div>
                <div className="relative -mt-12 p-6">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{featured.category}</span>
                  <h2 className="mt-2 text-xl font-bold leading-snug text-white transition-colors group-hover:text-primary md:text-2xl">{featured.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-white/65">{featured.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-ink">{initials(featured.author)}</span>
                      <span className="text-xs">
                        <span className="block font-semibold text-white">{featured.author}</span>
                        <span className="text-white/55">{featured.date} · {readingTime(featured.content)} min read</span>
                      </span>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-all group-hover:rotate-45 group-hover:bg-primary group-hover:text-ink">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Articles ── */}
      <section className="bg-background">
        <div className="container-x py-14">
          <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ink md:text-3xl">Browse all articles</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {visible.length} {visible.length === 1 ? "article" : "articles"}
                {category !== "All" && <> in <span className="font-semibold text-primary-dark">{category}</span></>}
                {query && <> matching “{query}”</>}
              </p>
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by topic">
              {categories.map((c) => {
                const active = category === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCategory(c.name)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                      active ? "border-ink bg-ink text-white shadow-md" : "border-border bg-card text-ink hover:border-primary/50 hover:bg-accent"
                    }`}
                  >
                    {c.name}
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${active ? "bg-primary text-ink" : "bg-muted text-muted-foreground"}`}>{c.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-border py-16 text-center">
              <Search className="h-8 w-8 text-muted-foreground" />
              <p className="mt-3 font-semibold text-ink">No articles found</p>
              <p className="mt-1 text-sm text-muted-foreground">Try another word or topic.</p>
              <button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="mt-5 rounded-full bg-ink px-5 py-2 text-xs font-bold text-white hover:bg-ink/90">
                Show all articles
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {visible.map((b, idx) => (
                <motion.article
                  key={b.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 4) * 0.08 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.25)]"
                >
                  <Link href={`/blogs/${b.slug}`} className="flex h-full flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={b.image} alt={b.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink shadow-sm backdrop-blur-sm">
                        {b.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-3 flex items-center gap-3 text-[11px] font-semibold text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" />{b.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-primary" />{readingTime(b.content)} min</span>
                      </div>
                      <h3 className="mb-2 line-clamp-2 text-[15px] font-bold leading-snug text-ink transition-colors group-hover:text-primary-dark">{b.title}</h3>
                      <p className="mb-5 line-clamp-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">{b.excerpt}</p>
                      <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                        <span className="flex items-center gap-2 text-xs font-semibold text-ink">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary-dark">{initials(b.author)}</span>
                          {b.author}
                        </span>
                        <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
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
