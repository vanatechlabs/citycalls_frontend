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

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
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
      <BlogsPreview />
    </>
  );
}
