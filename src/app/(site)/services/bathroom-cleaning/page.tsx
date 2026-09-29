import { CleaningServicePage, cleaningServiceMetadata } from "@/components/services/Cleaning/CleaningServicePage";
import { bathroomCleaningConfig } from "@/components/services/Cleaning/configs/homeCleaning";

// /services/bathroom-cleaning — content lives in components/services/Cleaning/configs/homeCleaning.ts.
export function generateMetadata() {
  return cleaningServiceMetadata(bathroomCleaningConfig);
}

export default function BathroomCleaningPage() {
  return <CleaningServicePage config={bathroomCleaningConfig} />;
}
