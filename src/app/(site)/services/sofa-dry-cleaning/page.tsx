import { CleaningServicePage, cleaningServiceMetadata } from "@/components/services/Cleaning/CleaningServicePage";
import { sofaDryCleaningConfig } from "@/components/services/Cleaning/configs/sofaCleaning";

// /services/sofa-dry-cleaning — content lives in components/services/Cleaning/configs/sofaCleaning.ts.
export function generateMetadata() {
  return cleaningServiceMetadata(sofaDryCleaningConfig);
}

export default function SofaDryCleaningPage() {
  return <CleaningServicePage config={sofaDryCleaningConfig} />;
}
