import { resolveWebsiteImageUrl } from '@/lib/api/cityCallsHome';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api/v1').replace(/\/$/, '');
// Admin edits show up within a minute without every request hitting the API.
const BACKGROUND_REVALIDATE_SECONDS = 60;

// A service page's hero from Admin → Background Section. Fields left empty
// in admin fall back to the page's own hero copy.
export interface PublicPageBackground {
  pagePath: string;
  subheading?: string;
  heading: string;
  highlight?: string;
  description?: string;
  features: { title: string; subtitle: string }[];
  image?: string;
  imageAlt?: string;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

// null when the page has no active background or the API is unreachable.
export async function fetchPageBackground(path: string): Promise<PublicPageBackground | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/websites/city-calls/backgrounds?path=${encodeURIComponent(path)}`, {
      next: { revalidate: BACKGROUND_REVALIDATE_SECONDS },
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as ApiEnvelope<PublicPageBackground | null>;
    const background = payload.data;
    if (!background) return null;
    return { ...background, image: background.image ? resolveWebsiteImageUrl(background.image) : undefined };
  } catch {
    return null;
  }
}
