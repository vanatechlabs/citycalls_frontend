"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { findService } from "@/data/services";
import { BookingForm } from "@/components/booking/BookingForm/BookingForm";
import { HeroSection } from "@/components/services/RefrigeratorService/HeroSection/HeroSection";
import { ServiceSidebar } from "@/components/services/RefrigeratorService/ServiceSidebar/ServiceSidebar";
import { BrandsWeService } from "@/components/services/RefrigeratorService/BrandsWeService/BrandsWeService";
import { HowItWorks } from "@/components/shared/HowItWorks/HowItWorks";
import { ParallaxBanner } from "@/components/services/RefrigeratorService/ParallaxBanner/ParallaxBanner";
import { ServiceAreas } from "@/components/services/RefrigeratorService/ServiceAreas/ServiceAreas";
import { OtherServices } from "@/components/services/RefrigeratorService/OtherServices/OtherServices";
import { AppDownloadStatsBanner } from "@/components/shared/AppDownloadStatsBanner";
import type { PublicPageBackground } from "@/lib/api/pageBackgrounds";
import type { PublicServicePage } from "@/lib/api/servicePages";

interface RefrigeratorServiceViewProps {
  slug?: string;
  content?: PublicServicePage | null;
  background?: PublicPageBackground | null;
}

export function RefrigeratorServiceView({ slug = "refrigerator-service", content, background }: RefrigeratorServiceViewProps = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const staticService = findService(slug);
  const service = staticService ?? (content ? {
    slug,
    name: content.serviceName,
    image: content.serviceImage ?? undefined,
    short: content.heroDescription,
  } : null);

  if (!service) notFound();

  return (
    <div className="bg-white min-h-screen">
      <HeroSection service={service} content={content ?? undefined} background={background} />

      {/* Main Content Area */}
      <section className="container-x py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Form & FAQ */}
          <div className="w-full lg:w-[65%]">
            <BookingForm serviceSlug={service.slug} serviceName={service.name} onStepChange={setCurrentStep} />
          </div>

          {/* Right Column: Sidebar Widgets */}
          <div className="w-full lg:w-[35%]">
            <ServiceSidebar currentStep={currentStep} />
          </div>
        </div>
      </section>

      <BrandsWeService />
      <HowItWorks
        eyebrow={content?.walkthroughEyebrow}
        title={content?.walkthroughTitle}
        highlight={content?.walkthroughHighlight}
        description={content?.walkthroughDescription}
        steps={content?.steps}
      />
      <AppDownloadStatsBanner title={content?.statsTitle} highlight={content?.statsHighlight} stats={content?.stats} />
      <ParallaxBanner
        eyebrow={content?.bannerEyebrow}
        title={content?.bannerTitle}
        highlight={content?.bannerHighlight}
        description={content?.bannerDescription}
        image={content?.bannerImage || undefined}
      />
      <ServiceAreas
        title={content?.areasTitle}
        highlight={content?.areasHighlight}
        description={content?.areasDescription}
        areas={content?.areas}
      />
      <OtherServices />
    </div>
  );
}
