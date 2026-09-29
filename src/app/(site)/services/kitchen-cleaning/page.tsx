import { CleaningServicePage, cleaningServiceMetadata } from "@/components/services/Cleaning/CleaningServicePage";
import { kitchenCleaningConfig } from "@/components/services/Cleaning/configs/homeCleaning";

// /services/kitchen-cleaning — content lives in components/services/Cleaning/configs/homeCleaning.ts.
export function generateMetadata() {
  return cleaningServiceMetadata(kitchenCleaningConfig);
}

export default function KitchenCleaningPage() {
  return <CleaningServicePage config={kitchenCleaningConfig} />;
}
