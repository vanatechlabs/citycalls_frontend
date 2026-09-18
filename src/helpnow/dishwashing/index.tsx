import { useState } from "react";
import { HNTopbar } from "@/helpnow/components/layout/HNTopbar";
import { HNNavbar } from "@/helpnow/components/layout/HNNavbar";
import { HNFooter } from "@/helpnow/components/layout/HNFooter";

import { HeroSection } from "./HeroSection";
import { BookingForm } from "./BookingForm";
import { ServiceSidebar } from "./ServiceSidebar";
import { CleaningSupplies } from "./CleaningSupplies";
import { HowItWorks } from "./HowItWorks";
import { AppDownloadStatsBanner } from "./AppDownloadStatsBanner";
import { ParallaxBanner } from "./ParallaxBanner";
import { ServiceAreas } from "./ServiceAreas";
import { OtherServices } from "./OtherServices";
import { HNFaq } from "@/helpnow/components/faq/HNFaq";

export default function DishWashingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div 
      className="bg-white min-h-screen text-slate-900"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* HelpNow Header */}
      {/* <HNTopbar /> */}
      <HNNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Booking Content Area (65% Form / 35% Sidebar) */}
      <section className="container-x mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Interactive Multi-step Booking Form */}
          <div className="w-full lg:w-[65%]">
            <BookingForm onStepChange={setCurrentStep} />
          </div>

          {/* Right: Service Sidebar Widgets */}
          <div className="w-full lg:w-[35%]">
            <ServiceSidebar currentStep={currentStep} />
          </div>
        </div>
      </section>

      {/* Cleaning Supplies & Brands Marquee */}
      <CleaningSupplies />

      {/* Interactive 4-Step How It Works Walkthrough */}
      <HowItWorks />

      {/* Mobile App & Customer Stats Banner */}
      <AppDownloadStatsBanner />

      {/* Parallax Visual Banner */}
      <ParallaxBanner />

      {/* Service Coverage Areas in Ghaziabad */}
      <ServiceAreas />

      {/* Other HelpNow Maid Services */}
      <OtherServices />

      {/* Frequently Asked Questions */}
      <HNFaq />

      {/* HelpNow Footer */}
      <HNFooter />
    </div>
  );
}
