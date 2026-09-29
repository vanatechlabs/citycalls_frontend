const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api/v1').replace(/\/$/, '');
// Admin edits show up within a minute without every request hitting the API.
const SOCIAL_LINKS_REVALIDATE_SECONDS = 60;

// Admin → SEO Section → Social Media.
export interface PublicSocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  callNumber?: string;
}

// Used until the admin saves the Social Media page, or when the API is down.
export const DEFAULT_SOCIAL_LINKS: PublicSocialLinks = {
  facebook: 'https://www.facebook.com/',
  instagram: 'https://www.instagram.com/',
  twitter: 'https://twitter.com/',
  youtube: 'https://www.youtube.com/',
  linkedin: 'https://www.linkedin.com/',
  whatsappNumber: '917428808884',
  whatsappMessage: 'Hello! I would like to book a home service.',
  callNumber: '+917428808884',
};

export async function fetchSocialLinks(): Promise<PublicSocialLinks> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/websites/city-calls/social-links`, {
      next: { revalidate: SOCIAL_LINKS_REVALIDATE_SECONDS },
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return DEFAULT_SOCIAL_LINKS;
    const payload = (await response.json()) as { data: PublicSocialLinks | null };
    return payload.data ?? DEFAULT_SOCIAL_LINKS;
  } catch {
    return DEFAULT_SOCIAL_LINKS;
  }
}
