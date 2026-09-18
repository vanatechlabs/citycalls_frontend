import { HNTopbar } from "@/helpnow/components/layout/HNTopbar";
import { HNNavbar } from "@/helpnow/components/layout/HNNavbar";
import { HNHeroCarousel } from "@/helpnow/components/hero/HNHeroCarousel";
import { HNAboutSection } from "@/helpnow/components/about/HNAboutSection";
import { HNServicesGrid } from "@/helpnow/components/services/HNServicesGrid";
import { HNWhyChooseUs } from "@/helpnow/components/why/HNWhyChooseUs";
import { HNHowItWorks } from "@/helpnow/components/howitworks/HNHowItWorks";
import { HNPricing } from "@/helpnow/components/pricing/HNPricing";
import { HNReviews } from "@/helpnow/components/reviews/HNReviews";
import { HNDownloadApp } from "@/helpnow/components/download/HNDownloadApp";
import { HNFaq } from "@/helpnow/components/faq/HNFaq";
import { HNFooter } from "@/helpnow/components/layout/HNFooter";

export default function HelpNowPage() {
  return (
    <div style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      {/* <HNTopbar /> */}
      <HNNavbar />
      <HNHeroCarousel />
      <HNAboutSection />
      <HNWhyChooseUs />
      <HNServicesGrid />
      <HNHowItWorks />
      <HNPricing />
      <HNReviews />
      <HNDownloadApp />
      <HNFaq />
      <HNFooter />
    </div>
  );
}
