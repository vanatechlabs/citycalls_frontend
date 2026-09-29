import { PestControlServicePage, pestServiceMetadata } from "@/components/services/PestControl/PestControlServicePage";
import { cockroachControlConfig } from "@/components/services/PestControl/CockroachControl/cockroachControl.config";

// /services/cockroach-control — content lives in components/services/PestControl/CockroachControl/.
export function generateMetadata() {
  return pestServiceMetadata(cockroachControlConfig);
}

export default function CockroachControlPage() {
  return <PestControlServicePage config={cockroachControlConfig} />;
}
