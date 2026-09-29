import { PestControlServicePage, pestServiceMetadata } from "@/components/services/PestControl/PestControlServicePage";
import { mosquitoControlConfig } from "@/components/services/PestControl/MosquitoControl/mosquitoControl.config";

// /services/mosquito-control — content lives in components/services/PestControl/MosquitoControl/.
export function generateMetadata() {
  return pestServiceMetadata(mosquitoControlConfig);
}

export default function MosquitoControlPage() {
  return <PestControlServicePage config={mosquitoControlConfig} />;
}
