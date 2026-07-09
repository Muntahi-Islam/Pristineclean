export interface QuoteFormData {
  service: string;
  propertyType: "RESIDENTIAL" | "COMMERCIAL";
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  frequency: string;
  preferredDate?: Date;
  preferredTime?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  extras: string[];
  images: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  company?: string;
  notes?: string;
}

export interface GalleryItem {
  id: string;
  title: string | null;
  description: string | null;
  image: string;
  category: string;
  featured: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  avatar: string | null;
  content: string;
  rating: number;
  videoUrl: string | null;
  featured: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  category: string;
  author: string;
  readingTime: number | null;
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  icon: string | null;
  image: string | null;
  price: number | null;
  priceLabel: string | null;
  featured: boolean;
}

export type QuoteStatus = "PENDING" | "REVIEWED" | "CONTACTED" | "CLOSED";
