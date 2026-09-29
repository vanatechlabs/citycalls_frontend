"use client";

import { useState } from "react";

import { AppDownloadStatsBanner } from "@/components/shared/AppDownloadStatsBanner";
import { HowItWorks } from "@/components/shared/HowItWorks/HowItWorks";
import { BookingForm } from "@/components/services/ACService/BookingForm/BookingForm";
import { BrandsWeService } from "@/components/services/ACService/BrandsWeService/BrandsWeService";
import { HeroSection } from "@/components/services/ACService/HeroSection/HeroSection";
import { OtherServices } from "@/components/services/ACService/OtherServices/OtherServices";
import { ParallaxBanner } from "@/components/services/ACService/ParallaxBanner/ParallaxBanner";
import { ServiceAreas } from "@/components/services/ACService/ServiceAreas/ServiceAreas";
import { ServiceSidebar } from "@/components/services/ACService/ServiceSidebar/ServiceSidebar";
import { acServicePageContent } from "@/components/services/ACService/content/acServicePageContent";
import type { PublicPageBackground } from "@/lib/api/pageBackgrounds";
import type { PublicServicePage } from "@/lib/api/servicePages";

export function ACServiceView({ content, background }: { content?: PublicServicePage | null; background?: PublicPageBackground | null }) {
  const [currentStep, setCurrentStep] = useState(1);
  const pageContent = content ?? acServicePageContent;

  return (
    <div className="min-h-screen bg-white">
      <HeroSection content={pageContent} background={background} />

      <section className="container-x py-10">
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="w-full lg:w-[65%]">
            <BookingForm onStepChange={setCurrentStep} />
          </div>
          <div className="w-full lg:w-[35%]">
            <ServiceSidebar currentStep={currentStep} />
          </div>
        </div>
      </section>

      <BrandsWeService />
      <HowItWorks
        eyebrow={pageContent.walkthroughEyebrow}
        title={pageContent.walkthroughTitle}
        highlight={pageContent.walkthroughHighlight}
        description={pageContent.walkthroughDescription}
        steps={pageContent.steps}
      />
      <AppDownloadStatsBanner title={pageContent.statsTitle} highlight={pageContent.statsHighlight} stats={pageContent.stats} />
      <ParallaxBanner content={pageContent} />
      <ServiceAreas content={pageContent} />
      <OtherServices />
    </div>
  );
}
