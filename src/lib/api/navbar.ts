const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api/v1').replace(/\/$/, '');

export interface PublicNavbarService {
  id: string;
  name: string;
  image: string | null;
  path: string;
}

export interface PublicNavbarMenu {
  id: string;
  name: string;
  slug: string;
  services: PublicNavbarService[];
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

export async function fetchCityCallsNavbarMenus(signal?: AbortSignal): Promise<PublicNavbarMenu[]> {
  const response = await fetch(`${API_BASE_URL}/public/websites/city-calls/navbar/menus`, {
    signal,
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Navbar menus request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as ApiEnvelope<PublicNavbarMenu[]>;
  return Array.isArray(payload.data) ? payload.data : [];
}
