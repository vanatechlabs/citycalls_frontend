"use client";

import { ServiceSidebar as SharedServiceSidebar } from "@/components/services/RefrigeratorService/ServiceSidebar/ServiceSidebar";
import { acSidebarContent } from "@/components/services/ACService/content/acSidebarContent";

export function ServiceSidebar({ currentStep = 1 }: { currentStep?: number }) {
  return <SharedServiceSidebar currentStep={currentStep} content={acSidebarContent} />;
}
