import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";

// Main CityCalls page frame (Navbar + content + Footer). Used by the (site)
// route group and by the root not-found page so 404s keep the site chrome.
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Topbar /> — hidden on the live site; import from "@/components/layout/Topbar/Topbar" to enable. */}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
