import { ApplianceServicePage, applianceServiceMetadata } from "@/components/services/ApplianceService/ApplianceServicePage";
import { geyserServiceConfig } from "@/components/services/GeyserService/geyserService.config";

// /services/geyser-repair-services — content lives in components/services/GeyserService/.
export function generateMetadata() {
  return applianceServiceMetadata(geyserServiceConfig);
}

export default function GeyserServicePage() {
  return <ApplianceServicePage config={geyserServiceConfig} />;
}