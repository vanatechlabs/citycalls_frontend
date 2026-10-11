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

// Cloudinary "image/upload/" URL that has no transformations yet.
const CLOUDINARY_UPLOAD = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(?![a-z]{1,3}_[^/]*\/)/i;

// Admin / CMS image path → URL for showing on the page. Images are served
// light: Cloudinary converts to WebP/AVIF, compresses and caps the width
// (pass the largest width the image is shown at, ×2 for sharp screens), and
// bundled /assets PNG/JPGs use their WebP copies.
export function resolveWebsiteImageUrl(image: string, width = 1600): string {
  if (/^https?:\/\//i.test(image)) {
    return image.replace(CLOUDINARY_UPLOAD, `$1f_auto,q_auto,c_limit,w_${width}/`);
  }
  if (image.startsWith('/assets/')) return image.replace(/\.(png|jpe?g)$/i, '.webp');
  return `${API_ORIGIN}${image.startsWith('/') ? '' : '/'}${image}`;
}

// Same, but untouched — for og:image / share previews (WhatsApp and some
// social apps don't show WebP).
export function resolveShareImageUrl(image: string): string {
  if (/^https?:\/\//i.test(image) || image.startsWith('/assets/')) return image;
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

// Server-side version for the home page: the first slide's image is then in
// the HTML (and preloaded), instead of appearing only after the page runs.
// Re-fetched at most once a minute. Never throws — [] means use the bundled slides.
export async function fetchHeroSlidesForPage(): Promise<PublicHeroSlide[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/websites/city-calls/home-page/hero-carousel/slides`, {
      next: { revalidate: 60 },
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return [];
    const payload = await response.json() as ApiEnvelope<PublicHeroSlide[]>;
    return Array.isArray(payload.data) ? payload.data : [];
  } catch {
    return [];
  }
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

// Admin → Website Section → About: the "About CityCalls" section.
export interface PublicHomeAbout {
  eyebrow: string;
  heading: string;
  highlight: string;
  description: string;
  points: string[];
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  buttonText: string;
  buttonLink: string;
  // [0] tall left image, [1] top right, [2] bottom right.
  images: { image: string; alt: string }[];
  status: 'ACTIVE' | 'INACTIVE';
}

export async function fetchCityCallsHomeAbout(signal?: AbortSignal): Promise<PublicHomeAbout> {
  return fetchPublic<PublicHomeAbout>('about', signal);
}

// Admin → Website Section → Popular Packages: the cards and their heading.
export interface PublicPopularPackage {
  _id: string;
  name: string;
  duration: string;
  price: number;
  image: string;
  imageAlt: string;
  featured: boolean;
  sortOrder: number;
}

export interface PublicPackagesSection {
  eyebrow: string;
  heading: string;
  highlight: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export async function fetchCityCallsPopularPackages(
  signal?: AbortSignal
): Promise<{ section: PublicPackagesSection; packages: PublicPopularPackage[] }> {
  return fetchPublic('popular-packages', signal);
}

// Admin → Website Section → Our Services: the service cards and their heading.
export interface PublicServiceCard {
  _id: string;
  name: string;
  // Service page, e.g. "/services/ac-service" (follows the Navbar List link).
  path: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  priceText: string;
  sortOrder: number;
}

export interface PublicOurServicesSection {
  eyebrow: string;
  heading: string;
  highlight: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export async function fetchCityCallsOurServices(
  signal?: AbortSignal
): Promise<{ section: PublicOurServicesSection; services: PublicServiceCard[] }> {
  return fetchPublic('our-services', signal);
}

// Admin → Website Section → Counters: the number cards.
export type PublicCounterIcon =
  | 'users' | 'shield-check' | 'timer' | 'star' | 'award' | 'thumbs-up' | 'wrench' | 'house' | 'clock' | 'map-pin';

export interface PublicHomeCounters {
  items: { value: number; suffix: string; label: string; icon: PublicCounterIcon; image: string; imageAlt: string }[];
  status: 'ACTIVE' | 'INACTIVE';
}

export async function fetchCityCallsHomeCounters(signal?: AbortSignal): Promise<PublicHomeCounters> {
  return fetchPublic<PublicHomeCounters>('counters', signal);
}

// Admin → Pages Section → Testimonials: the review carousel and its heading.
export interface PublicTestimonial {
  _id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  message: string;
  // Initials badge colour.
  color: string;
  sortOrder: number;
}

export interface PublicTestimonialsSection {
  eyebrow: string;
  heading: string;
  highlight: string;
  minRating: number;
}

export async function fetchCityCallsTestimonials(
  signal?: AbortSignal
): Promise<{ section: PublicTestimonialsSection; testimonials: PublicTestimonial[] }> {
  return fetchPublic('testimonials', signal);
}

// Admin → Website Section → FAQ: the questions and their headings.
export interface PublicFaq {
  _id: string;
  question: string;
  answer: string;
  image: string;
  altText: string;
  sortOrder: number;
}

export interface PublicFaqSection {
  subheading: string;
  heading: string;
  highlightedWord: string;
  description: string;
}

export async function fetchCityCallsFaqs(signal?: AbortSignal): Promise<{ section: PublicFaqSection; faqs: PublicFaq[] }> {
  return fetchPublic('faq', signal);
}

// Admin → Website Section → Key Features: the "Why choose us" cards.
export interface PublicKeyFeature {
  _id: string;
  title: string;
  description: string;
  // lucide-react icon name, e.g. "BadgeCheck".
  icon: string;
  sortOrder: number;
}

export interface PublicKeyFeaturesSection {
  eyebrow: string;
  heading: string;
  highlight: string;
  description: string;
}

export async function fetchCityCallsKeyFeatures(
  signal?: AbortSignal
): Promise<{ section: PublicKeyFeaturesSection; features: PublicKeyFeature[] }> {
  return fetchPublic('key-features', signal);
}

// Admin → Website Section → How It Works: the home page's step cards.
export interface PublicHowItWorksStep {
  _id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  // lucide-react icon name, e.g. "CalendarCheck".
  icon: string;
  sortOrder: number;
}

export interface PublicHowItWorksSection {
  eyebrow: string;
  heading: string;
  highlight: string;
  description: string;
}

export async function fetchCityCallsHowItWorks(
  signal?: AbortSignal
): Promise<{ section: PublicHowItWorksSection; steps: PublicHowItWorksStep[] }> {
  return fetchPublic('how-it-works', signal);
}
