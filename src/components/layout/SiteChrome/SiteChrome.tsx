import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { fetchSocialLinks } from "@/lib/api/socialLinks";

// Main CityCalls page frame (Navbar + content + Footer). Used by the (site)
// route group and by the root not-found page so 404s keep the site chrome.
export async function SiteChrome({ children }: { children: ReactNode }) {
  // Admin → Social Media: footer social icons, call and WhatsApp buttons.
  const socialLinks = await fetchSocialLinks();

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Topbar /> — hidden on the live site; import from "@/components/layout/Topbar/Topbar" to enable. */}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer links={socialLinks} />
    </div>
  );
}
