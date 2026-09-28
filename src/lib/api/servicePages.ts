const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api/v1').replace(/\/$/, '');

export interface PublicServicePage {
  id: string;
  slug: string;
  serviceName: string;
  serviceImage: string | null;
  heroImage?: string;
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroFeatures: { title: string; subtitle: string }[];
  walkthroughEyebrow: string;
  walkthroughTitle: string;
  walkthroughHighlight: string;
  walkthroughDescription: string;
  steps: { badge: string; title: string; description: string }[];
  statsTitle: string;
  statsHighlight: string;
  stats: { value: string; label: string }[];
  bannerEyebrow: string;
  bannerTitle: string;
  bannerHighlight: string;
  bannerDescription: string;
  bannerImage?: string;
  areasTitle: string;
  areasHighlight: string;
  areasDescription: string;
  areas: string[];
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

export async function fetchPublicServicePage(slug: string): Promise<PublicServicePage | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/websites/city-calls/pages/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as ApiEnvelope<PublicServicePage>;
    return payload.data ?? null;
  } catch {
    return null;
  }
}
