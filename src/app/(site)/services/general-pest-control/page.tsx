import { PestControlServicePage, pestServiceMetadata } from "@/components/services/PestControl/PestControlServicePage";
import { generalPestControlConfig } from "@/components/services/PestControl/GeneralPestControl/generalPestControl.config";

// /services/general-pest-control — content lives in components/services/PestControl/GeneralPestControl/.
export function generateMetadata() {
  return pestServiceMetadata(generalPestControlConfig);
}

export default function GeneralPestControlPage() {
  return <PestControlServicePage config={generalPestControlConfig} />;
}
