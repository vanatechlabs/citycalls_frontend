"use client";

import { useState } from "react";

import { AppDownloadStatsBanner } from "@/components/shared/AppDownloadStatsBanner";
import { HowItWorks } from "@/components/shared/HowItWorks/HowItWorks";
import { BrandsWeService } from "@/components/services/ApplianceService/BrandsWeService/BrandsWeService";
import { OtherServices } from "@/components/services/ApplianceService/OtherServices/OtherServices";
import { HeroSection } from "@/components/services/RefrigeratorService/HeroSection/HeroSection";
import { ParallaxBanner } from "@/components/services/RefrigeratorService/ParallaxBanner/ParallaxBanner";
import { ServiceAreas } from "@/components/services/RefrigeratorService/ServiceAreas/ServiceAreas";
import { ServiceSidebar } from "@/components/services/RefrigeratorService/ServiceSidebar/ServiceSidebar";
import type { PublicPageBackground } from "@/lib/api/pageBackgrounds";
import type { PublicServicePage } from "@/lib/api/servicePages";
import { CleaningBookingForm } from "../BookingForm/CleaningBookingForm";
import { CLEANING_ICONS } from "../cleaningIcons";
import { OTHER_CLEANING_SERVICES } from "../cleaningServicesList";
import type { CleaningServiceConfig } from "../types";

interface CleaningServiceViewProps {
  config: CleaningServiceConfig;
  // Admin → Pages content for this slug; replaces config.pageContent when set.
  content?: PublicServicePage | null;
  // Admin → Background Section hero for this page.
  background?: PublicPageBackground | null;
}

// The full sofa / home cleaning service page — same layout as the appliance
// and pest control pages, with the cleaning booking step, a "What We Clean"
// grid and the other services of the same group.
export function CleaningServiceView({ config, content, background }: CleaningServiceViewProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const page = content ?? config.pageContent;
  const other = OTHER_CLEANING_SERVICES[config.group];

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        service={{ slug: config.slug, name: page.serviceName, image: page.serviceImage ?? page.heroImage, short: page.heroDescription }}
        content={page}
        background={background}
      />

      <section className="container-x py-10">
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="w-full lg:w-[65%]">
            <CleaningBookingForm serviceSlug={config.slug} serviceName={config.pageContent.serviceName} form={config.form} onStepChange={setCurrentStep} />
          </div>
          <div className="w-full lg:w-[35%]">
            <ServiceSidebar currentStep={currentStep} content={config.sidebarContent} />
          </div>
        </div>
      </section>

      <BrandsWeService
        title={config.showcaseTitle}
        highlight={config.showcaseHighlight}
        brands={config.showcaseItems}
        icon={CLEANING_ICONS[config.showcaseIcon]}
      />
      <HowItWorks
        eyebrow={page.walkthroughEyebrow}
        title={page.walkthroughTitle}
        highlight={page.walkthroughHighlight}
        description={page.walkthroughDescription}
        steps={page.steps}
      />
      <AppDownloadStatsBanner title={page.statsTitle} highlight={page.statsHighlight} stats={page.stats} />
      <ParallaxBanner
        eyebrow={page.bannerEyebrow}
        title={page.bannerTitle}
        highlight={page.bannerHighlight}
        description={page.bannerDescription}
        image={page.bannerImage}
      />
      <ServiceAreas title={page.areasTitle} highlight={page.areasHighlight} description={page.areasDescription} areas={page.areas} />
      <OtherServices
        currentSlug={config.slug}
        services={other.services}
        highlight={other.highlight}
        description={other.description}
        imageFit="cover"
      />
    </div>
  );
}
