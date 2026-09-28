import { ApplianceServicePage, applianceServiceMetadata } from "@/components/services/ApplianceService/ApplianceServicePage";
import { televisionServiceConfig } from "@/components/services/TelevisionService/televisionService.config";

// /services/television-repair-services — content lives in components/services/TelevisionService/.
export function generateMetadata() {
  return applianceServiceMetadata(televisionServiceConfig);
}

export default function TelevisionServicePage() {
  return <ApplianceServicePage config={televisionServiceConfig} />;
}