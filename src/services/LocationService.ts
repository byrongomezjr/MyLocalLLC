// Location service for My Local LLC app

import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { UserLocation } from '../types/business';

export class LocationService {
  /**
   * Request location permissions from the user
   */
  static async requestLocationPermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'ios') {
        const permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        return permission === RESULTS.GRANTED;
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'My Local LLC Location Permission',
            message: 'My Local LLC needs access to your location to show nearby businesses.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }

  /**
   * Get the user's current location
   */
  static async getCurrentLocation(): Promise<UserLocation | null> {
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Get city and state from coordinates using reverse geocoding
            const locationInfo = await LocationService.reverseGeocode(latitude, longitude);
            
            resolve({
              latitude,
              longitude,
              city: locationInfo.city,
              state: locationInfo.state,
              country: locationInfo.country,
              timestamp: new Date(),
            });
          } catch (error) {
            console.error('Error getting location info:', error);
            resolve({
              latitude,
              longitude,
              city: 'Unknown',
              state: 'Unknown',
              country: 'US',
              timestamp: new Date(),
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    });
  }

  /**
   * Calculate distance between two points using Haversine formula
   */
  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 3959; // Earth's radius in miles
    const dLat = LocationService.toRadians(lat2 - lat1);
    const dLon = LocationService.toRadians(lon2 - lon1);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(LocationService.toRadians(lat1)) *
        Math.cos(LocationService.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in miles
  }

  /**
   * Convert degrees to radians
   */
  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Reverse geocode coordinates to get address information
   * This is a simplified version - in production you'd use a real geocoding service
   */
  static async reverseGeocode(
    latitude: number,
    longitude: number
  ): Promise<{ city: string; state: string; country: string }> {
    try {
      // For development, we'll use a mock implementation
      // In production, you'd integrate with Google Maps Geocoding API or similar
      
      // Mock data for common areas (you can expand this)
      const mockLocations = [
        {
          bounds: { north: 40.8176, south: 40.8076, east: -74.1476, west: -74.1576 },
          city: 'Nutley',
          state: 'NJ',
          country: 'US'
        },
        {
          bounds: { north: 40.7589, south: 40.7489, east: -73.9851, west: -73.9951 },
          city: 'New York',
          state: 'NY',
          country: 'US'
        },
        // Add more locations as needed
      ];

      const location = mockLocations.find(loc => 
        latitude >= loc.bounds.south &&
        latitude <= loc.bounds.north &&
        longitude >= loc.bounds.west &&
        longitude <= loc.bounds.east
      );

      return location ? 
        { city: location.city, state: location.state, country: location.country } :
        { city: 'Unknown', state: 'Unknown', country: 'US' };
        
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return { city: 'Unknown', state: 'Unknown', country: 'US' };
    }
  }

  /**
   * Get businesses within a specific radius of a location
   */
  static getBusinessesInRadius(
    userLocation: UserLocation,
    businesses: any[],
    radiusMiles: number = 10
  ): any[] {
    return businesses
      .map(business => {
        const distance = LocationService.calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          business.location.latitude,
          business.location.longitude
        );
        
        return {
          ...business,
          distance: Math.round(distance * 10) / 10, // Round to 1 decimal place
        };
      })
      .filter(business => business.distance <= radiusMiles)
      .sort((a, b) => a.distance - b.distance); // Sort by distance
  }

  /**
   * Filter businesses by city/town
   */
  static getBusinessesByCity(
    userCity: string,
    userState: string,
    businesses: any[]
  ): any[] {
    return businesses.filter(business => 
      business.location.city.toLowerCase() === userCity.toLowerCase() &&
      business.location.state.toLowerCase() === userState.toLowerCase()
    );
  }
}
