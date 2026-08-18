import { HeroCarousel } from "@/components/home/HeroCarousel/HeroCarousel";
import { OfferStrip } from "@/components/home/OfferStrip/OfferStrip";
import { SpotlightCarousel } from "@/components/home/SpotlightCarousel/SpotlightCarousel";
import { PremiumServices } from "@/components/home/PremiumServices/PremiumServices";
import { TrustStrip } from "@/components/home/TrustStrip/TrustStrip";
import { ServicesGrid } from "@/components/home/ServicesGrid/ServicesGrid";
import { HowItWorks } from "@/components/home/HowItWorks/HowItWorks";
import { AboutSection } from "@/components/home/AboutSection/AboutSection";
import { PopularPackages } from "@/components/home/PopularPackages/PopularPackages";
import { WhyChooseUs } from "@/components/home/WhyChooseUs/WhyChooseUs";
import { MarqueeText } from "@/components/home/MarqueeText/MarqueeText";
import { Testimonials } from "@/components/home/Testimonials/Testimonials";
import { FAQSection } from "@/components/home/FAQSection/FAQSection";
import { CustomerMarquee } from "@/components/home/CustomerMarquee/CustomerMarquee";
import { DownloadApp } from "@/components/home/DownloadApp/DownloadApp";
import { BlogsPreview } from "@/components/home/BlogsPreview/BlogsPreview";

const HomePage = () => {
  return (
    <>
      <HeroCarousel />
      <OfferStrip />
      <SpotlightCarousel />
      <PremiumServices />
      <MarqueeText />
      <AboutSection />
      <PopularPackages />
          <ServicesGrid />
      <TrustStrip />
  
      <HowItWorks />
      {/* <AboutSection /> */}
      <WhyChooseUs />
      <Testimonials />
      <FAQSection />
      <DownloadApp />
      <BlogsPreview />
    </>
  );
};

export default HomePage;
