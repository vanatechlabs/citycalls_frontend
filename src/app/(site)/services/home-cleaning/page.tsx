import { CleaningServicePage, cleaningServiceMetadata } from "@/components/services/Cleaning/CleaningServicePage";
import { homeCleaningConfig } from "@/components/services/Cleaning/configs/homeCleaning";

// /services/home-cleaning — content lives in components/services/Cleaning/configs/homeCleaning.ts.
export function generateMetadata() {
  return cleaningServiceMetadata(homeCleaningConfig);
}

export default function HomeCleaningPage() {
  return <CleaningServicePage config={homeCleaningConfig} />;
}
