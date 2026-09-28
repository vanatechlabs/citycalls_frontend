"use client";

import { useState } from "react";

import { AppDownloadStatsBanner } from "@/components/shared/AppDownloadStatsBanner";
import { HowItWorks } from "@/components/shared/HowItWorks/HowItWorks";
import { HeroSection } from "@/components/services/RefrigeratorService/HeroSection/HeroSection";
import { ParallaxBanner } from "@/components/services/RefrigeratorService/ParallaxBanner/ParallaxBanner";
import { ServiceAreas } from "@/components/services/RefrigeratorService/ServiceAreas/ServiceAreas";
import { ServiceSidebar } from "@/components/services/RefrigeratorService/ServiceSidebar/ServiceSidebar";
import type { PublicServicePage } from "@/lib/api/servicePages";
import { ApplianceBookingForm } from "../BookingForm/ApplianceBookingForm";
import { BrandsWeService } from "../BrandsWeService/BrandsWeService";
import { ISSUE_ICONS } from "../issueIcons";
import { OtherServices } from "../OtherServices/OtherServices";
import type { ApplianceServiceConfig } from "../types";

interface ApplianceServiceViewProps {
  config: ApplianceServiceConfig;
  // Admin → Pages content for this slug; replaces config.pageContent when set.
  content?: PublicServicePage | null;
}

// The full appliance service page (same layout as the AC page), driven by one
// service's config from its own folder, e.g. WashingMachineService/.
export function ApplianceServiceView({ config, content }: ApplianceServiceViewProps) {
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
            <ApplianceBookingForm serviceSlug={config.slug} serviceName={config.pageContent.serviceName} form={config.form} onStepChange={setCurrentStep} />
          </div>
          <div className="w-full lg:w-[35%]">
            <ServiceSidebar currentStep={currentStep} content={config.sidebarContent} />
          </div>
        </div>
      </section>

      <BrandsWeService title={config.brandsTitle} brands={config.showcaseBrands} icon={ISSUE_ICONS[config.brandIcon]} />
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
      <OtherServices currentSlug={config.slug} />
    </div>
  );
}
