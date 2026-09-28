import { ApplianceServicePage, applianceServiceMetadata } from "@/components/services/ApplianceService/ApplianceServicePage";
import { chimneyServiceConfig } from "@/components/services/ChimneyService/chimneyService.config";

// /services/chimney-repair-services — content lives in components/services/ChimneyService/.
export function generateMetadata() {
  return applianceServiceMetadata(chimneyServiceConfig);
}

export default function ChimneyServicePage() {
  return <ApplianceServicePage config={chimneyServiceConfig} />;
}