const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api/v1').replace(/\/$/, '');
const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1$/, '');

export interface PublicHeroSlide {
  _id: string;
  image: string;
  altText?: string;
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

export function resolveWebsiteImageUrl(image: string): string {
  if (/^https?:\/\//i.test(image)) return image;
  return `${API_ORIGIN}${image.startsWith('/') ? '' : '/'}${image}`;
}

export async function fetchCityCallsHeroSlides(signal?: AbortSignal): Promise<PublicHeroSlide[]> {
  const response = await fetch(
    `${API_BASE_URL}/public/websites/city-calls/home-page/hero-carousel/slides`,
    { signal, headers: { Accept: 'application/json' } }
  );

  if (!response.ok) {
    throw new Error(`Hero slides request failed with status ${response.status}`);
  }

  const payload = await response.json() as ApiEnvelope<PublicHeroSlide[]>;
  return Array.isArray(payload.data) ? payload.data : [];
}
