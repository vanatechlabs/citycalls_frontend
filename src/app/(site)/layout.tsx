import type { ReactNode } from "react";
import { SiteChrome } from "@/components/layout/SiteChrome/SiteChrome";

// Main CityCalls site shell.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
