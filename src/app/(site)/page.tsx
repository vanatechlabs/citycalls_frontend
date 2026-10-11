import { HeroCarousel } from "@/components/home/HeroCarousel/HeroCarousel";
import { OfferStrip } from "@/components/home/OfferStrip/OfferStrip";
import { SpotlightCarousel } from "@/components/home/SpotlightCarousel/SpotlightCarousel";
import { PremiumServices } from "@/components/home/PremiumServices/PremiumServices";
import { AboutSection } from "@/components/home/AboutSection/AboutSection";
import { PopularPackages } from "@/components/home/PopularPackages/PopularPackages";
import { ServicesGrid } from "@/components/home/ServicesGrid/ServicesGrid";
import { TrustStrip } from "@/components/home/TrustStrip/TrustStrip";
import { HowItWorks } from "@/components/home/HowItWorks/HowItWorks";
import { WhyChooseUs } from "@/components/home/WhyChooseUs/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials/Testimonials";
import { FAQSection } from "@/components/home/FAQSection/FAQSection";
import { DownloadApp } from "@/components/home/DownloadApp/DownloadApp";
import { BlogsPreview } from "@/components/home/BlogsPreview/BlogsPreview";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { buildMetadata } from "@/lib/seo/seoMetadata";
import { fetchBlogs } from "@/lib/api/blogs";
import { fetchHeroSlidesForPage, resolveWebsiteImageUrl } from "@/lib/api/cityCallsHome";
import { preload } from "react-dom";

// Shown when the CMS has no hero slides (same as the carousel's first bundled slide).
const FALLBACK_HERO_IMAGE = "/assets/Banner/h11.webp";

// Falls back to the root layout's metadata when no SEO entry exists.
export function generateMetadata() {
  return buildMetadata("/");
}

export default async function HomePage() {
  const [blogs, heroSlides] = await Promise.all([fetchBlogs(), fetchHeroSlidesForPage()]);
  // The banner image is the biggest thing on first paint — start it right away.
  preload(heroSlides.length ? resolveWebsiteImageUrl(heroSlides[0].image, 1920) : FALLBACK_HERO_IMAGE, {
    as: "image",
    fetchPriority: "high",
  });
  return (
    <>
      <SeoJsonLd path="/" />
      <HeroCarousel initialSlides={heroSlides} />
      <OfferStrip />
      <SpotlightCarousel />
      <PremiumServices />
      <AboutSection />
      <PopularPackages />
      <ServicesGrid />
      <TrustStrip />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQSection />
      <DownloadApp />
      {blogs.length > 0 && <BlogsPreview blogs={blogs} />}
    </>
  );
}
