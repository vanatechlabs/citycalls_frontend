import Link from "next/link";
import type { ReactNode } from "react";
import { CalendarDays, ChevronRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  // Part of the title shown in green.
  highlight: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const COMPANY = "Citytimes India Co.";

// Shared layout for Privacy Policy and Terms & Conditions: a text-only hero
// (no image), a sticky "On this page" list and numbered sections.
export function LegalPage({ eyebrow, title, highlight, intro, lastUpdated, sections }: LegalPageProps) {
  const index = title.indexOf(highlight);

  return (
    <div className="bg-white">
      {/* Hero — gradient, grid pattern and soft glows instead of a photo */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-[110px]" />
          <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        </div>

        <div className="container-x relative py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs font-medium text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/90">{title}</span>
          </nav>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> {eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl text-[34px] font-bold leading-[1.1] tracking-tight md:text-[48px]">
            {index < 0 ? title : (
              <>
                {title.slice(0, index)}
                <span className="text-primary">{highlight}</span>
                {title.slice(index + highlight.length)}
              </>
            )}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/75">{intro}</p>
          <div className="mt-7 flex flex-wrap gap-3 text-xs font-semibold text-white/80">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-primary" /> Last updated: {lastUpdated}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5">
              Applies to citycalls.in and all CityCalls services
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-x py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">On this page</p>
            <ol className="space-y-1 border-l-2 border-slate-100">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-0.5 flex gap-2 border-l-2 border-transparent py-1.5 pl-4 text-[13px] font-medium text-slate-600 transition-colors hover:border-primary hover:text-slate-900"
                  >
                    <span className="font-mono text-[11px] text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="min-w-0 max-w-3xl">
            {sections.map((section, i) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 border-b border-slate-100 py-7 first:pt-0 last:border-b-0">
                <h2 className="flex items-baseline gap-3 text-xl font-bold text-slate-900 md:text-[22px]">
                  <span className="font-mono text-sm font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  {section.title}
                </h2>
                <div className="legal-body mt-3 space-y-3 text-[15px] leading-relaxed text-slate-600 [&_li]:pl-1 [&_strong]:text-slate-800 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                  {section.body}
                </div>
              </section>
            ))}

            {/* Contact card */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-base font-bold text-slate-900">Questions? We&apos;re here to help.</p>
              <p className="mt-1 text-sm text-slate-600">{COMPANY} (operating the CityCalls brand)</p>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <a href="mailto:hello@citycalls.in" className="flex items-center gap-2 font-medium text-slate-700 hover:text-primary">
                  <Mail className="h-4 w-4 text-primary" /> hello@citycalls.in
                </a>
                <a href="tel:+917428808884" className="flex items-center gap-2 font-medium text-slate-700 hover:text-primary">
                  <Phone className="h-4 w-4 text-primary" /> +91 74288 08884
                </a>
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" /> Raj Nagar, Ghaziabad, UP 201002
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
