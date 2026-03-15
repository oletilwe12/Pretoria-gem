export type Category = 'Restaurants' | 'Coffee Shops' | 'Outdoor & Nature' | 'Fun Activities' | 'Markets' | 'Date Ideas';

export interface Place {
  id: string;
  name: string;
  slug: string;
  category: Category;
  subcategory?: string;
  area: string;
  suburb: string;
  description: string;
  why_go: string;
  best_for: string;
  price_type: 'Free' | 'Under R100' | 'Under R250' | 'Premium';
  min_price?: number;
  max_price?: number;
  address: string;
  latitude: number;
  longitude: number;
  website_url?: string;
  phone?: string;
  opening_hours: Record<string, string>;
  hero_image: string;
  gallery_images: string[];
  tags: string[];
  is_featured: boolean;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface Submission {
  id: string;
  name: string;
  category: string;
  suburb: string;
  description: string;
  contact_email: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}
