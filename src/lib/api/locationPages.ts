// City location pages from Admin → Blog Section → Add Location Page, served
// at citycalls.in/<slug> (e.g. /refrigerator-service-in-noida). Re-fetched at
// most once a minute, like blogs.
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1").replace(/\/$/, "");
const REVALIDATE_SECONDS = 60;

export interface LocationPageLink {
  _id: string;
  slug: string;
  location: string;
  serviceName: string;
  servicePath: string;
  pageType: "HOME" | "SERVICE";
  title: string;
}

export interface PublicLocationPage extends LocationPageLink {
  menuName: string;
  heroEyebrow: string;
  highlight: string;
  shortDescription: string;
  features: { title: string; subtitle: string }[];
  heroImage: string;
  heroImageAlt: string;
  highlightedHeading: string;
  // Rich text HTML (cleaned by the backend when saved).
  content: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  canonicalTag: string;
  ogTitle: string;
  ogImage: string;
  schemaMarkup: string;
  updatedAt?: string;
  // The same page in other cities, and other pages for this city.
  otherCities: LocationPageLink[];
  sameCity: LocationPageLink[];
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

// null when there's no published page with this slug (or the API is down).
export async function fetchLocationPage(slug: string): Promise<PublicLocationPage | null> {
  // Location slugs are only ever lowercase letters, numbers and dashes.
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug)) return null;
  try {
    const response = await fetch(`${API_BASE_URL}/public/websites/city-calls/location-pages/${encodeURIComponent(slug.toLowerCase())}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as ApiEnvelope<PublicLocationPage>;
    return payload.data ?? null;
  } catch {
    return null;
  }
}

// Every published location page (for the city links above the footer).
export async function fetchLocationPageLinks(): Promise<LocationPageLink[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/websites/city-calls/location-pages`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return [];
    const payload = (await response.json()) as ApiEnvelope<LocationPageLink[]>;
    return Array.isArray(payload.data) ? payload.data : [];
  } catch {
    return [];
  }
}
