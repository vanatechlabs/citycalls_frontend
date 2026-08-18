import { useState } from "react";
import { Navigate } from "react-router-dom";
import { findService } from "@/data/services";
import { BookingForm } from "@/components/booking/BookingForm/BookingForm";
import { HeroSection } from "@/components/HomeAppliances/RefrigeratorService/HeroSection";
import { ServiceSidebar } from "@/components/HomeAppliances/RefrigeratorService/ServiceSidebar";
import { BrandsWeService } from "@/components/HomeAppliances/RefrigeratorService/BrandsWeService";
import { HowItWorks } from "@/components/HomeAppliances/RefrigeratorService/HowItWorks";
import { ParallaxBanner } from "@/components/HomeAppliances/RefrigeratorService/ParallaxBanner";
import { ServiceAreas } from "@/components/HomeAppliances/RefrigeratorService/ServiceAreas";
import { OtherServices } from "@/components/HomeAppliances/RefrigeratorService/OtherServices";
import { AppDownloadStatsBanner } from "@/components/shared/AppDownloadStatsBanner";

function RefrigeratorService() {
  const [currentStep, setCurrentStep] = useState(1);
  // Since this is specifically the refrigerator service page, we can hardcode the slug for data retrieval
  // or just use the findService logic for consistency if data is structured that way.
  const serviceSlug = 'refrigerator-service';
  const service = findService(serviceSlug);

  if (!service) {
    return <Navigate to="/404" replace />;
  }

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

      {/* Brands We Service Marquee */}
      <BrandsWeService />

      {/* How It Works Section */}
      <HowItWorks />

      {/* App Download and Stats Banner */}
      <AppDownloadStatsBanner />

      {/* Parallax Banner */}
      <ParallaxBanner />

      {/* Service Areas Section */}
      <ServiceAreas />

      {/* Other Services Section */}
      <OtherServices />
    </div>
  );
}

export default RefrigeratorService;
