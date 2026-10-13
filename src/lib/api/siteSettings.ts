// Site-wide switches from Admin → Settings (Website Navbar). Re-fetched at
// most once a minute; if the API can't be reached the defaults apply.
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1").replace(/\/$/, "");
const REVALIDATE_SECONDS = 60;

export interface SiteSettings {
  // true: solid black navbar on every page. false: see-through over photo banners.
  solidNavbar: boolean;
}

const DEFAULTS: SiteSettings = { solidNavbar: false };

// Never throws.
export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/websites/city-calls/site-settings`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return DEFAULTS;
    const { data } = (await response.json()) as { data?: Partial<SiteSettings> };
    return { solidNavbar: !!data?.solidNavbar };
  } catch {
    return DEFAULTS;
  }
}
