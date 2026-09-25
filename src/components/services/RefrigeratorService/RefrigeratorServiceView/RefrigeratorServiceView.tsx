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

export function RefrigeratorServiceView() {
  const [currentStep, setCurrentStep] = useState(1);
  const service = findService("refrigerator-service");

  if (!service) notFound();

  return (
    <div className="bg-white min-h-screen">
      <HeroSection service={service} />

      {/* Main Content Area */}
      <section className="container-x py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Form & FAQ */}
          <div className="w-full lg:w-[65%]">
            <BookingForm serviceSlug={service.slug} onStepChange={setCurrentStep} />
          </div>

          {/* Right Column: Sidebar Widgets */}
          <div className="w-full lg:w-[35%]">
            <ServiceSidebar currentStep={currentStep} />
          </div>
        </div>
      </section>

      <BrandsWeService />
      <HowItWorks />
      <AppDownloadStatsBanner />
      <ParallaxBanner />
      <ServiceAreas />
      <OtherServices />
    </div>
  );
}
