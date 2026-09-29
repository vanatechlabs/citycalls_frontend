import { PestControlServicePage, pestServiceMetadata } from "@/components/services/PestControl/PestControlServicePage";
import { termiteControlConfig } from "@/components/services/PestControl/TermiteControl/termiteControl.config";

// /services/termite-control — content lives in components/services/PestControl/TermiteControl/.
export function generateMetadata() {
  return pestServiceMetadata(termiteControlConfig);
}

export default function TermiteControlPage() {
  return <PestControlServicePage config={termiteControlConfig} />;
}
