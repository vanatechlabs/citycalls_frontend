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
  // Overlay darkness 0–90 % set in admin; null/undefined = default gradient.
  overlayOpacity?: number | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

export function resolveWebsiteImageUrl(image: string): string {
  if (/^https?:\/\//i.test(image)) return image;
  if (image.startsWith('/assets/')) return image;
  return `${API_ORIGIN}${image.startsWith('/') ? '' : '/'}${image}`;
}

export interface PublicLaunchSpotlightSlide {
  id: string;
  image: string;
  altText: string;
  badgeText: string;
  heading: string;
  subheading: string;
  link: string;
  accentColor: string;
  sortOrder: number;
  // Overlay darkness 0–100 % set in admin; null/undefined = default.
  overlayOpacity?: number | null;
}

export interface PublicOfferStrip {
  textLeft: string;
  discountText: string;
  textRight: string;
  couponCode: string;
  buttonText: string;
  buttonLink: string;
  bgGradientFrom: string;
  bgGradientVia: string;
  bgGradientTo: string;
  discountBg: string;
  discountTextColor: string;
  couponBg: string;
  couponTextColor: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface PublicOffer {
  _id: string;
  title: string;
  description?: string;
  couponCode?: string;
  icon: string;
  accentColor: string;
  tintColor: string;
  sortOrder: number;
}

async function fetchPublic<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/public/websites/city-calls/home-page/${path}`, {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`${path} request failed with status ${response.status}`);
  }

  const payload = await response.json() as ApiEnvelope<T>;
  return payload.data;
}

export async function fetchCityCallsOfferStrip(signal?: AbortSignal): Promise<PublicOfferStrip> {
  return fetchPublic<PublicOfferStrip>('offers/strip', signal);
}

export async function fetchCityCallsOffers(signal?: AbortSignal): Promise<PublicOffer[]> {
  const offers = await fetchPublic<PublicOffer[]>('offers/deals', signal);
  return Array.isArray(offers) ? offers : [];
}

export async function fetchCityCallsLaunchSpotlight(signal?: AbortSignal): Promise<PublicLaunchSpotlightSlide[]> {
  const slides = await fetchPublic<PublicLaunchSpotlightSlide[]>('launch-spotlight', signal);
  return Array.isArray(slides) ? slides : [];
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

// Admin → Website Section → Features: the "Home repairs everywhere…" section.
export type PublicFeatureIcon =
  | 'wrench' | 'zap' | 'sparkles' | 'shield-check' | 'droplets' | 'wind' | 'bug' | 'paint-roller' | 'house' | 'settings';

export interface PublicHomeFeatures {
  // One heading line per "\n".
  heading: string;
  highlight: string;
  description: string;
  image: string;
  imageAlt: string;
  imageBadge: string;
  items: { icon: PublicFeatureIcon; title: string; description: string }[];
  status: 'ACTIVE' | 'INACTIVE';
}

export async function fetchCityCallsHomeFeatures(signal?: AbortSignal): Promise<PublicHomeFeatures> {
  return fetchPublic<PublicHomeFeatures>('features', signal);
}
