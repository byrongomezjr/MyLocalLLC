// Business and location types for the My Local LLC app

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface BusinessHours {
  [key: string]: {
    open: string;
    close: string;
    isOpen: boolean;
  };
}

export interface Business {
  id: string;
  name: string;
  description: string;
  category: BusinessCategory;
  subcategory?: string;
  owner: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  location: Location;
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  hours: BusinessHours;
  rating: number;
  reviewCount: number;
  images: string[];
  verified: boolean;
  serviceRadius: number; // in miles
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum BusinessCategory {
  HOME_SERVICES = 'Home Services',
  FOOD_DINING = 'Food & Dining',
  HEALTH_WELLNESS = 'Health & Wellness',
  TECHNOLOGY = 'Technology',
  BEAUTY = 'Beauty',
  AUTOMOTIVE = 'Automotive',
  RETAIL = 'Retail',
  PROFESSIONAL_SERVICES = 'Professional Services',
  EDUCATION = 'Education',
  ENTERTAINMENT = 'Entertainment',
  FITNESS = 'Fitness',
  PET_SERVICES = 'Pet Services',
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
  timestamp: Date;
}

export interface SearchFilters {
  category?: BusinessCategory;
  maxDistance?: number; // in miles
  rating?: number;
  priceRange?: 'low' | 'medium' | 'high';
  openNow?: boolean;
}

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
