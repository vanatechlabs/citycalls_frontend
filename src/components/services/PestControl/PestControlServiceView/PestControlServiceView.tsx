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
import type { PublicServicePage } from "@/lib/api/servicePages";
import { PestBookingForm } from "../BookingForm/PestBookingForm";
import { PEST_ICONS } from "../pestIcons";
import { PEST_CONTROL_SERVICES } from "../pestServicesList";
import type { PestServiceConfig } from "../types";

interface PestControlServiceViewProps {
  config: PestServiceConfig;
  // Admin → Pages content for this slug; replaces config.pageContent when set.
  content?: PublicServicePage | null;
}

// The full pest control service page — same layout as the appliance pages,
// with the pest booking step, a "Pests We Treat" grid and other pest services.
export function PestControlServiceView({ config, content }: PestControlServiceViewProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const page = content ?? config.pageContent;

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        service={{ slug: config.slug, name: page.serviceName, image: page.serviceImage ?? page.heroImage, short: page.heroDescription }}
        content={page}
      />

      <section className="container-x py-10">
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="w-full lg:w-[65%]">
            <PestBookingForm serviceSlug={config.slug} serviceName={config.pageContent.serviceName} form={config.form} onStepChange={setCurrentStep} />
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
        icon={PEST_ICONS[config.showcaseIcon]}
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
        services={PEST_CONTROL_SERVICES}
        highlight="PEST CONTROL SERVICES"
        description="Safe, certified treatments for every other pest problem at home or office."
        imageFit="cover"
      />
    </div>
  );
}
