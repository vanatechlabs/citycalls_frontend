import { CleaningServicePage, cleaningServiceMetadata } from "@/components/services/Cleaning/CleaningServicePage";
import { mattressCleaningConfig } from "@/components/services/Cleaning/configs/sofaCleaning";

// /services/mattress-cleaning — content lives in components/services/Cleaning/configs/sofaCleaning.ts.
export function generateMetadata() {
  return cleaningServiceMetadata(mattressCleaningConfig);
}

export default function MattressCleaningPage() {
  return <CleaningServicePage config={mattressCleaningConfig} />;
}
