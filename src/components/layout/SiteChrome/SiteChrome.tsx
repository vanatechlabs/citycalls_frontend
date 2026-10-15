import type { CSSProperties, ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { LocationStrip } from "@/components/location/LocationStrip";
import { fetchLocationPageLinks } from "@/lib/api/locationPages";
import { fetchSocialLinks } from "@/lib/api/socialLinks";
import { fetchSiteSettings } from "@/lib/api/siteSettings";

// Main CityCalls page frame (Navbar + content + Footer). Used by the (site)
// route group and by the root not-found page so 404s keep the site chrome.
export async function SiteChrome({ children }: { children: ReactNode }) {
  // Admin → Social Media: footer social icons, call and WhatsApp buttons.
  // Admin → Settings → Website Navbar: black navbar on, or see-through over banners.
  // Admin → Blog Section → Location Page List: city links above the footer.
  const [socialLinks, { solidNavbar }, locationLinks] = await Promise.all([fetchSocialLinks(), fetchSiteSettings(), fetchLocationPageLinks()]);

  return (
    // With the black navbar the banners don't sit under it, so they need no room for it.
    <div className="flex min-h-screen flex-col" style={solidNavbar ? ({ "--nav-h": "0px" } as CSSProperties) : undefined}>
      {/* <Topbar /> — hidden on the live site; import from "@/components/layout/Topbar/Topbar" to enable. */}
      <Navbar solid={solidNavbar} />
      <main className="flex-1">{children}</main>
      <LocationStrip links={locationLinks} />
      <Footer links={socialLinks} />
    </div>
  );
}
