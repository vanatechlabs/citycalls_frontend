import { ApplianceServicePage, applianceServiceMetadata } from "@/components/services/ApplianceService/ApplianceServicePage";
import { washingMachineServiceConfig } from "@/components/services/WashingMachineService/washingMachineService.config";

// /services/washing-machine-services — content lives in components/services/WashingMachineService/.
export function generateMetadata() {
  return applianceServiceMetadata(washingMachineServiceConfig);
}

export default function WashingMachineServicePage() {
  return <ApplianceServicePage config={washingMachineServiceConfig} />;
}