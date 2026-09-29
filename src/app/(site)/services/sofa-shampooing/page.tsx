import { CleaningServicePage, cleaningServiceMetadata } from "@/components/services/Cleaning/CleaningServicePage";
import { sofaShampooingConfig } from "@/components/services/Cleaning/configs/sofaCleaning";

// /services/sofa-shampooing — content lives in components/services/Cleaning/configs/sofaCleaning.ts.
export function generateMetadata() {
  return cleaningServiceMetadata(sofaShampooingConfig);
}

export default function SofaShampooingPage() {
  return <CleaningServicePage config={sofaShampooingConfig} />;
}
