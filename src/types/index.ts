export type ServiceCategoryId =
  | "home-appliance"
  | "pest-control"
  | "sofa-cleaning"
  | "home-cleaning"
  | "smart-plus"
  | "beauty-salon";

export interface SubService {
  slug: string;
  name: string;
  categoryId: ServiceCategoryId;
  short: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  brands?: string[];
  issues: string[];
  included: string[];
  faqs: { q: string; a: string }[];
}

export interface ServiceCategory {
  id: ServiceCategoryId;
  label: string;
  services: SubService[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  quantity: number;
  image?: string;
}

export interface BookingData {
  cart?: CartItem[];
  serviceSlug?: string;
  subCategory?: string; // brand or sub-option
  name?: string;
  phone?: string;
  address?: string;
  pincode?: string;
  issue?: string;
  issueOther?: string;
  date?: string;
  slot?: string;
}
