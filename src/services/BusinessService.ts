// Mock business data service for My Local LLC

import { Business, BusinessCategory, BusinessHours } from '../types/business';

// Mock business hours
const defaultHours: BusinessHours = {
  monday: { open: '9:00 AM', close: '5:00 PM', isOpen: true },
  tuesday: { open: '9:00 AM', close: '5:00 PM', isOpen: true },
  wednesday: { open: '9:00 AM', close: '5:00 PM', isOpen: true },
  thursday: { open: '9:00 AM', close: '5:00 PM', isOpen: true },
  friday: { open: '9:00 AM', close: '5:00 PM', isOpen: true },
  saturday: { open: '10:00 AM', close: '3:00 PM', isOpen: true },
  sunday: { open: '10:00 AM', close: '3:00 PM', isOpen: false },
};

// Mock businesses for Nutley, NJ and surrounding areas
export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Joe\'s Plumbing Services',
    description: 'Professional plumbing services for residential and commercial properties.',
    category: BusinessCategory.HOME_SERVICES,
    subcategory: 'Plumbing',
    owner: {
      id: 'owner1',
      name: 'Joe Martinez',
      email: 'joe@joesplumbing.com',
      phone: '(973) 555-0123',
    },
    location: {
      latitude: 40.8126,
      longitude: -74.1526,
      address: '123 Main St',
      city: 'Nutley',
      state: 'NJ',
      zipCode: '07110',
      country: 'US',
    },
    contact: {
      phone: '(973) 555-0123',
      email: 'joe@joesplumbing.com',
      website: 'www.joesplumbing.com',
    },
    hours: defaultHours,
    rating: 4.8,
    reviewCount: 42,
    images: ['https://via.placeholder.com/300x200'],
    verified: true,
    serviceRadius: 15,
    tags: ['emergency service', 'licensed', 'insured'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: '2',
    name: 'Maria\'s Catering',
    description: 'Authentic Italian cuisine for your special events and gatherings.',
    category: BusinessCategory.FOOD_DINING,
    subcategory: 'Catering',
    owner: {
      id: 'owner2',
      name: 'Maria Rossi',
      email: 'maria@mariascatering.com',
      phone: '(973) 555-0124',
    },
    location: {
      latitude: 40.8156,
      longitude: -74.1496,
      address: '456 Park Ave',
      city: 'Nutley',
      state: 'NJ',
      zipCode: '07110',
      country: 'US',
    },
    contact: {
      phone: '(973) 555-0124',
      email: 'maria@mariascatering.com',
    },
    hours: {
      ...defaultHours,
      sunday: { open: '12:00 PM', close: '8:00 PM', isOpen: true },
    },
    rating: 4.9,
    reviewCount: 67,
    images: ['https://via.placeholder.com/300x200'],
    verified: true,
    serviceRadius: 25,
    tags: ['italian cuisine', 'wedding catering', 'corporate events'],
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: '3',
    name: 'Tech Repair Pro',
    description: 'Computer and smartphone repair services. Same-day service available.',
    category: BusinessCategory.TECHNOLOGY,
    subcategory: 'Computer Repair',
    owner: {
      id: 'owner3',
      name: 'Mike Chen',
      email: 'mike@techrepairpro.com',
      phone: '(973) 555-0125',
    },
    location: {
      latitude: 40.8096,
      longitude: -74.1556,
      address: '789 Franklin Ave',
      city: 'Nutley',
      state: 'NJ',
      zipCode: '07110',
      country: 'US',
    },
    contact: {
      phone: '(973) 555-0125',
      email: 'mike@techrepairpro.com',
      website: 'www.techrepairpro.com',
    },
    hours: defaultHours,
    rating: 4.7,
    reviewCount: 28,
    images: ['https://via.placeholder.com/300x200'],
    verified: true,
    serviceRadius: 10,
    tags: ['same-day service', 'data recovery', 'warranty'],
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: '4',
    name: 'Bella\'s Beauty Salon',
    description: 'Full-service hair salon and spa. Expert stylists and latest trends.',
    category: BusinessCategory.BEAUTY,
    subcategory: 'Hair Salon',
    owner: {
      id: 'owner4',
      name: 'Isabella Garcia',
      email: 'bella@bellasbeauty.com',
      phone: '(973) 555-0126',
    },
    location: {
      latitude: 40.8136,
      longitude: -74.1506,
      address: '321 Washington Ave',
      city: 'Nutley',
      state: 'NJ',
      zipCode: '07110',
      country: 'US',
    },
    contact: {
      phone: '(973) 555-0126',
      email: 'bella@bellasbeauty.com',
    },
    hours: {
      ...defaultHours,
      monday: { open: '10:00 AM', close: '7:00 PM', isOpen: true },
      tuesday: { open: '10:00 AM', close: '7:00 PM', isOpen: true },
      wednesday: { open: '10:00 AM', close: '7:00 PM', isOpen: true },
      thursday: { open: '10:00 AM', close: '8:00 PM', isOpen: true },
      friday: { open: '10:00 AM', close: '8:00 PM', isOpen: true },
      saturday: { open: '9:00 AM', close: '6:00 PM', isOpen: true },
    },
    rating: 4.6,
    reviewCount: 35,
    images: ['https://via.placeholder.com/300x200'],
    verified: true,
    serviceRadius: 8,
    tags: ['color specialist', 'bridal packages', 'organic products'],
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-12-01'),
  },
  // Add some businesses in nearby towns for testing
  {
    id: '5',
    name: 'Summit Auto Repair',
    description: 'Trusted auto repair shop serving the community for over 20 years.',
    category: BusinessCategory.AUTOMOTIVE,
    subcategory: 'Auto Repair',
    owner: {
      id: 'owner5',
      name: 'Robert Johnson',
      email: 'bob@summitauto.com',
      phone: '(908) 555-0127',
    },
    location: {
      latitude: 40.7156,
      longitude: -74.3606,
      address: '567 Springfield Ave',
      city: 'Summit',
      state: 'NJ',
      zipCode: '07901',
      country: 'US',
    },
    contact: {
      phone: '(908) 555-0127',
      email: 'bob@summitauto.com',
    },
    hours: defaultHours,
    rating: 4.5,
    reviewCount: 89,
    images: ['https://via.placeholder.com/300x200'],
    verified: true,
    serviceRadius: 20,
    tags: ['ASE certified', 'family owned', 'towing service'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-12-01'),
  },
];

export class BusinessService {
  /**
   * Get all businesses (in production, this would be an API call)
   */
  static async getAllBusinesses(): Promise<Business[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockBusinesses;
  }

  /**
   * Get businesses by city
   */
  static async getBusinessesByCity(city: string, state: string): Promise<Business[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockBusinesses.filter(business => 
      business.location.city.toLowerCase() === city.toLowerCase() &&
      business.location.state.toLowerCase() === state.toLowerCase()
    );
  }

  /**
   * Get businesses by category
   */
  static async getBusinessesByCategory(category: BusinessCategory): Promise<Business[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockBusinesses.filter(business => business.category === category);
  }

  /**
   * Search businesses by name or description
   */
  static async searchBusinesses(query: string): Promise<Business[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const searchTerm = query.toLowerCase();
    return mockBusinesses.filter(business => 
      business.name.toLowerCase().includes(searchTerm) ||
      business.description.toLowerCase().includes(searchTerm) ||
      business.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  /**
   * Get business by ID
   */
  static async getBusinessById(id: string): Promise<Business | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockBusinesses.find(business => business.id === id) || null;
  }
}
