import { resolveWebsiteImageUrl } from '@/lib/api/cityCallsHome';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api/v1').replace(/\/$/, '');

// A service page's parallax banner from Admin → Background Section → Add
// Parallax Image.
export interface PublicPageParallax {
  pagePath: string;
  subheading?: string;
  heading: string;
  highlight?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

// null when the page has no active parallax entry or the API is unreachable.
export async function fetchPageParallax(path: string, signal?: AbortSignal): Promise<PublicPageParallax | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/websites/city-calls/parallax?path=${encodeURIComponent(path)}`, {
      signal,
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return null;
    const { data } = (await response.json()) as { data: PublicPageParallax | null };
    if (!data) return null;
    return { ...data, image: data.image ? resolveWebsiteImageUrl(data.image, 1920) : undefined };
  } catch {
    return null;
  }
}
