import Link from "next/link";
import { ArrowUpRight, BadgeCheck, MapPin } from "lucide-react";
import { HeroSection } from "@/components/services/RefrigeratorService/HeroSection/HeroSection";
import { ServiceCardsGrid } from "@/components/services/ServiceCards/ServiceCardsGrid";
import type { LocationPageLink, PublicLocationPage } from "@/lib/api/locationPages";
import { resolveWebsiteImageUrl } from "@/lib/api/cityCallsHome";
import type { LocationCards } from "./locationCards";

interface LocationPageViewProps {
  page: PublicLocationPage;
  cards: LocationCards;
  // Photo for the hero when the page has none of its own.
  fallbackImage: string;
}

// citycalls.in/<slug> — a service (or the whole of CityCalls) in one city:
// the service-page hero, the admin's content, the services as cards titled
// for the city, then links to the same page in other cities (internal links
// for SEO, like Design House's location chips).
export function LocationPageView({ page, cards, fallbackImage }: LocationPageViewProps) {
  const heroImage = page.heroImage ? resolveWebsiteImageUrl(page.heroImage, 2000) : fallbackImage;
  const background = {
    pagePath: `/${page.slug}`,
    subheading: page.heroEyebrow || "Professional & Reliable",
    heading: page.title,
    highlight: page.highlight || page.location,
    description: page.shortDescription,
    features: page.features,
    image: heroImage,
    imageAlt: page.heroImageAlt || page.title,
  };

  return (
    <>
      <HeroSection service={{ slug: page.slug, name: page.serviceName, image: heroImage }} background={background} />

      {/* Content */}
      <section className="bg-white py-12 md:py-16">
        <div className="container-x">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-[26px] font-black leading-tight tracking-tight text-ink md:text-[34px]">
              {page.serviceName} in <span className="relative inline-block text-primary-dark">
                {page.location}
                <svg aria-hidden viewBox="0 0 120 8" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-2 w-full text-primary">
                  <path d="M2 6 C 30 1, 90 1, 118 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary-dark">
                <MapPin className="h-3.5 w-3.5" /> {page.location}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/60 bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-700">
                <BadgeCheck className="h-3.5 w-3.5" /> {page.pageType === "HOME" ? "Home Services" : page.menuName || page.serviceName}
              </span>
            </div>

            <div className="my-7 h-px bg-gradient-to-r from-primary/40 via-border to-transparent" />

            {page.highlightedHeading && (
              <p className="mb-5 border-l-4 border-primary pl-4 text-[18px] font-semibold italic leading-snug text-primary-dark md:text-[21px]">
                {page.highlightedHeading}
              </p>
            )}

            <article className="location-content" dangerouslySetInnerHTML={{ __html: page.content }} />
            <style>{`
              .location-content { font-size: 1.0625rem; line-height: 1.75; color: #333; font-weight: 450; }
              .location-content > * + * { margin-top: 1rem; }
              .location-content p { text-align: justify; hyphens: auto; }
              .location-content h1, .location-content h2, .location-content h3, .location-content h4, .location-content h5, .location-content h6 { color: #1a1a1a; font-weight: 800; line-height: 1.3; margin-top: 2rem; }
              .location-content h1 { font-size: 2rem; }
              .location-content h2 { font-size: 1.6rem; }
              .location-content h3 { font-size: 1.35rem; }
              .location-content h4 { font-size: 1.15rem; }
              .location-content ul { list-style: disc; padding-left: 1.5rem; }
              .location-content ol { list-style: decimal; padding-left: 1.5rem; }
              .location-content li { margin-top: 0.4rem; padding-left: 0.25rem; }
              .location-content li::marker { color: var(--primary-dark); font-weight: 700; }
              .location-content strong, .location-content b { color: #111827; font-weight: 700; }
              .location-content a { color: var(--primary-dark); font-weight: 600; border-bottom: 2px solid var(--primary); text-decoration: none; }
              .location-content a:hover { color: var(--primary); }
              .location-content blockquote { border-left: 4px solid var(--primary-dark); background: #f9fafb; padding: 1.25rem 1.5rem; font-style: italic; border-radius: 0 1rem 1rem 0; }
            `}</style>
          </div>
        </div>
      </section>

      {/* Services for this city */}
      {cards.cards.length > 0 && (
        <section className="w-full border-t border-black/5 bg-[#f7f9f4] py-12 md:py-16">
          <div className="container-x">
            <div className="mb-10 text-center">
              <h2 className="text-[24px] font-black uppercase leading-tight tracking-tight text-ink md:text-[32px]">
                {cards.groupName} in <span className="text-[#3e8914]">{page.location}</span>
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-[12px] font-bold text-ink/60 md:text-[14px]">
                Background-verified CityCalls professionals at your doorstep in {page.location} — book in a minute.
              </p>
            </div>
            <ServiceCardsGrid cards={cards.cards} rowsPerStep={2} />
          </div>
        </section>
      )}

      <LocationLinks title={`${page.serviceName} in other cities`} links={page.otherCities} label={(l) => l.location} />
      <LocationLinks title={`More services in ${page.location}`} links={page.sameCity} label={(l) => l.serviceName} muted />
    </>
  );
}

function LocationLinks({ title, links, label, muted = false }: { title: string; links: LocationPageLink[]; label: (link: LocationPageLink) => string; muted?: boolean }) {
  if (links.length === 0) return null;
  return (
    <section className={`border-t border-black/5 py-8 ${muted ? "bg-white" : "bg-[#f7f9f4]"}`}>
      <div className="container-x">
        <h2 className="mb-4 text-[13px] font-black uppercase tracking-[0.18em] text-ink/70">{title}</h2>
        <div className="flex flex-wrap gap-2.5">
          {links.map((link) => (
            <Link
              key={link._id}
              href={`/${link.slug}`}
              title={link.title}
              className="group inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1.5 text-[12px] font-semibold text-ink/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-dark hover:bg-primary-dark hover:text-white hover:shadow-md"
            >
              <MapPin className="h-3 w-3 text-primary-dark transition-colors group-hover:text-white" />
              {label(link)}
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
