import { CleaningServicePage, cleaningServiceMetadata } from "@/components/services/Cleaning/CleaningServicePage";
import { carpetCleaningConfig } from "@/components/services/Cleaning/configs/sofaCleaning";

// /services/carpet-cleaning — content lives in components/services/Cleaning/configs/sofaCleaning.ts.
export function generateMetadata() {
  return cleaningServiceMetadata(carpetCleaningConfig);
}

export default function CarpetCleaningPage() {
  return <CleaningServicePage config={carpetCleaningConfig} />;
}
