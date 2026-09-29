import { PestControlServicePage, pestServiceMetadata } from "@/components/services/PestControl/PestControlServicePage";
import { bedBugTreatmentConfig } from "@/components/services/PestControl/BedBugTreatment/bedBugTreatment.config";

// /services/bed-bug-treatment — content lives in components/services/PestControl/BedBugTreatment/.
export function generateMetadata() {
  return pestServiceMetadata(bedBugTreatmentConfig);
}

export default function BedBugTreatmentPage() {
  return <PestControlServicePage config={bedBugTreatmentConfig} />;
}
