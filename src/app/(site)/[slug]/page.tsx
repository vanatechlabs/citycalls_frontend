import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationPageView } from "@/components/location/LocationPageView";
import { buildLocationCards } from "@/components/location/locationCards";
import { allServices } from "@/data/services";
import { resolveShareImageUrl, resolveWebsiteImageUrl } from "@/lib/api/cityCallsHome";
import { fetchLocationPage, type PublicLocationPage } from "@/lib/api/locationPages";
import { fetchPageBackground } from "@/lib/api/pageBackgrounds";
import { fetchPublicServicePage } from "@/lib/api/servicePages";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/seoMetadata";

// City location pages from Admin → Blog Section → Add Location Page, at the
// site root like Design House's (citycalls.in/refrigerator-service-in-noida).
// The website's own routes (about, blogs, services…) win over this one; any
// other path that isn't a published location page is a 404.
type Props = { params: Promise<{ slug: string }> };

const HOME_HERO_IMAGE = "/assets/Banner/cara1.webp";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchLocationPage(slug);
  if (!page) return { title: "Page not found | CityCalls" };

  const title = page.metaTitle || `${page.title} | CityCalls`;
  const description = page.metaDescription || page.shortDescription;
  const canonical = page.canonicalTag || `${SITE_URL}/${page.slug}`;
  const image = page.ogImage || page.heroImage;
  const keywords = page.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean);

  return {
    title,
    description,
    ...(keywords.length && { keywords }),
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "CityCalls",
      title: page.ogTitle || title,
      description,
      url: canonical,
      locale: "en_IN",
      images: [image ? { url: resolveShareImageUrl(image), alt: page.heroImageAlt || page.title } : DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: page.ogTitle || title,
      description,
      images: [image ? resolveShareImageUrl(image) : DEFAULT_OG_IMAGE.url],
    },
  };
}

// The admin's schema markup, or a Service offered in the city plus a
// breadcrumb. "<" is escaped so the text can never close the <script> tag.
function jsonLd(page: PublicLocationPage) {
  if (page.schemaMarkup) {
    try {
      return JSON.stringify(JSON.parse(page.schemaMarkup)).replace(/</g, "\\u003c");
    } catch {
      // fall through to the default
    }
  }
  const url = `${SITE_URL}/${page.slug}`;
  return JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.title,
      serviceType: page.serviceName,
      description: page.metaDescription || page.shortDescription,
      url,
      areaServed: { "@type": "City", name: page.location },
      provider: {
        "@type": "LocalBusiness",
        name: "CityCalls",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/logo.png`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        ...(page.pageType === "SERVICE"
          ? [{ "@type": "ListItem", position: 2, name: page.serviceName, item: `${SITE_URL}${page.servicePath}` }]
          : []),
        { "@type": "ListItem", position: page.pageType === "SERVICE" ? 3 : 2, name: page.title, item: url },
      ],
    },
  ]).replace(/</g, "\\u003c");
}

// The hero photo the selected service page itself shows (its Background
// Section entry, then its managed hero, then the bundled photo).
async function fallbackHeroImage(page: PublicLocationPage) {
  if (page.pageType === "HOME") return HOME_HERO_IMAGE;
  const serviceSlug = page.servicePath.split("/").filter(Boolean).pop() ?? "";
  const [background, managed] = await Promise.all([
    fetchPageBackground(page.servicePath),
    serviceSlug ? fetchPublicServicePage(serviceSlug) : Promise.resolve(null),
  ]);
  const image = background?.image || managed?.heroImage || allServices.find((s) => s.slug === serviceSlug)?.image;
  return image ? resolveWebsiteImageUrl(image, 2000) : HOME_HERO_IMAGE;
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const page = await fetchLocationPage(slug);
  if (!page) notFound();
  const [cards, fallbackImage] = await Promise.all([buildLocationCards(page), page.heroImage ? Promise.resolve("") : fallbackHeroImage(page)]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(page) }} />
      <LocationPageView page={page} cards={cards} fallbackImage={fallbackImage} />
    </>
  );
}
