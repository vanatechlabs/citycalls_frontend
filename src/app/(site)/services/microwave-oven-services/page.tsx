import { ApplianceServicePage, applianceServiceMetadata } from "@/components/services/ApplianceService/ApplianceServicePage";
import { microwaveServiceConfig } from "@/components/services/MicrowaveService/microwaveService.config";

// /services/microwave-oven-services — content lives in components/services/MicrowaveService/.
export function generateMetadata() {
  return applianceServiceMetadata(microwaveServiceConfig);
}

export default function MicrowaveServicePage() {
  return <ApplianceServicePage config={microwaveServiceConfig} />;
}