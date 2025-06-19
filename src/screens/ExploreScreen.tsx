import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import { textStyles, getFontFamily } from '../assets/typography';
import { colors } from '../assets/colors';
import { Business, UserLocation } from '../types/business';
import { LocationService } from '../services/LocationService';
import { BusinessService } from '../services/BusinessService';

const ExploreScreen = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [loading, setLoading] = useState(true);
  const [_mapReady, _setMapReady] = useState(false);
  const [_mapError, _setMapError] = useState(false);

  useEffect(() => {
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    try {
      const hasPermission = await LocationService.requestLocationPermission();
      if (!hasPermission) {
        Alert.alert(
          'Location Permission Required',
          'Please enable location services to discover local businesses near you.',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      const location = await LocationService.getCurrentLocation();
      if (location) {
        setUserLocation(location);
      }

      // Load businesses
      const allBusinesses = await BusinessService.getAllBusinesses();
      if (location) {
        // Filter businesses by user's city for town-specific discovery
        const cityBusinesses = LocationService.getBusinessesByCity(
          location.city,
          location.state,
          allBusinesses
        );
        setBusinesses(cityBusinesses);
      } else {
        setBusinesses(allBusinesses);
      }
    } catch (error) {
      console.error('Error initializing location:', error);
      Alert.alert('Error', 'Failed to get your location. Using default area.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerPress = (business: Business) => {
    setSelectedBusiness(business);
  };

  const renderMapView = () => (
    <View style={styles.mapContainer}>
      {!_mapReady && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      )}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapPlaceholderTitle}>🗺️ Interactive Map</Text>
        <Text style={styles.mapPlaceholderText}>
          Map view is being configured.{'\n'}
          Showing businesses in {userLocation ? `${userLocation.city}, ${userLocation.state}` : 'your area'}
        </Text>
        <View style={styles.businessLocationsContainer}>
          {businesses.slice(0, 3).map((business) => (
            <TouchableOpacity 
              key={business.id}
              style={styles.businessLocationPin}
              onPress={() => handleMarkerPress(business)}
            >
              <Text style={styles.businessLocationName}>{business.name}</Text>
              <Text style={styles.businessLocationDistance}>
                📍 {userLocation ? 
                  `${LocationService.calculateDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    business.location.latitude,
                    business.location.longitude
                  ).toFixed(1)} mi` : 'Near you'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {selectedBusiness && (
        <View style={styles.businessCallout}>
          <TouchableOpacity
            style={styles.calloutClose}
            onPress={() => setSelectedBusiness(null)}
          >
            <Text style={styles.calloutCloseText}>×</Text>
          </TouchableOpacity>
          <View style={styles.calloutContent}>
            <Text style={styles.calloutTitle}>{selectedBusiness.name}</Text>
            <Text style={styles.calloutCategory}>{selectedBusiness.category}</Text>
            <View style={styles.calloutMeta}>
              <Text style={styles.calloutRating}>⭐ {selectedBusiness.rating}</Text>
              <Text style={styles.calloutDistance}>
                {userLocation ? 
                  `${LocationService.calculateDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    selectedBusiness.location.latitude,
                    selectedBusiness.location.longitude
                  ).toFixed(1)} mi` : ''}
              </Text>
            </View>
            <TouchableOpacity style={styles.calloutButton}>
              <Text style={styles.calloutButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  const renderListView = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.searchSection}>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍 Search businesses...</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Popular Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {['Home Services', 'Food & Dining', 'Health & Wellness', 'Technology', 'Beauty', 'Automotive'].map((category) => (
            <TouchableOpacity key={category} style={styles.categoryCard}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.businessesSection}>
        <Text style={styles.sectionTitle}>
          {userLocation ? `Businesses in ${userLocation.city}, ${userLocation.state}` : 'Nearby Businesses'}
        </Text>
        {businesses.map((business) => (
          <TouchableOpacity key={business.id} style={styles.businessCard}>
            <Image source={{ uri: business.images[0] || 'https://via.placeholder.com/100x100' }} style={styles.businessImage} />
            <View style={styles.businessInfo}>
              <Text style={styles.businessName}>{business.name}</Text>
              <Text style={styles.businessCategory}>{business.category}</Text>
              <View style={styles.businessMeta}>
                <Text style={styles.rating}>⭐ {business.rating}</Text>
                {userLocation && (
                  <Text style={styles.distance}>
                    {LocationService.calculateDistance(
                      userLocation.latitude,
                      userLocation.longitude,
                      business.location.latitude,
                      business.location.longitude
                    ).toFixed(1)} mi
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Contact</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>Discover local businesses near you</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Finding businesses in your area...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <Text style={styles.headerSubtitle}>
          {userLocation ? `${userLocation.city}, ${userLocation.state}` : 'Discover local businesses near you'}
        </Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'map' && styles.toggleButtonActive]}
            onPress={() => setViewMode('map')}
          >
            <Text style={[styles.toggleButtonText, viewMode === 'map' && styles.toggleButtonTextActive]}>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'list' && styles.toggleButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <Text style={[styles.toggleButtonText, viewMode === 'list' && styles.toggleButtonTextActive]}>List</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {viewMode === 'map' ? renderMapView() : renderListView()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    ...textStyles.headerTitle,
    marginBottom: 5,
  },
  headerSubtitle: {
    ...textStyles.headerSubtitle,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: colors.background.card,
    borderRadius: 8,
    padding: 4,
    marginTop: 15,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: colors.primary,
  },
  toggleButtonText: {
    fontFamily: getFontFamily('medium'),
    fontSize: 14,
    color: colors.text.secondary,
  },
  toggleButtonTextActive: {
    color: colors.text.inverse,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    fontFamily: getFontFamily('medium'),
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
  },
  mapPlaceholderTitle: {
    fontFamily: getFontFamily('bold'),
    fontSize: 24,
    color: colors.text.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  mapPlaceholderText: {
    fontFamily: getFontFamily('regular'),
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  businessLocationsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  businessLocationPin: {
    backgroundColor: 'white',
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    width: '90%',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  businessLocationName: {
    fontFamily: getFontFamily('semibold'),
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 4,
  },
  businessLocationDistance: {
    fontFamily: getFontFamily('regular'),
    fontSize: 12,
    color: colors.text.secondary,
  },
  businessCallout: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  calloutClose: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  calloutCloseText: {
    fontFamily: getFontFamily('medium'),
    fontSize: 18,
    color: colors.text.secondary,
  },
  calloutContent: {
    paddingTop: 10,
  },
  calloutTitle: {
    fontFamily: getFontFamily('semibold'),
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 4,
  },
  calloutCategory: {
    fontFamily: getFontFamily('regular'),
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  calloutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  calloutRating: {
    fontFamily: getFontFamily('medium'),
    fontSize: 14,
    color: colors.warning,
    marginRight: 12,
  },
  calloutDistance: {
    fontFamily: getFontFamily('regular'),
    fontSize: 14,
    color: colors.text.secondary,
  },
  calloutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  calloutButtonText: {
    fontFamily: getFontFamily('semibold'),
    color: colors.text.inverse,
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  searchSection: {
    padding: 20,
  },
  searchButton: {
    backgroundColor: colors.background.card,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchButtonText: {
    fontFamily: getFontFamily('regular'),
    fontSize: 16,
    color: colors.text.secondary,
  },
  categoriesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    ...textStyles.h3,
    marginBottom: 15,
    paddingHorizontal: 20,
    color: colors.text.primary,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryCard: {
    backgroundColor: '#2d3949',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryText: {
    fontFamily: getFontFamily('semibold'),
    color: colors.text.inverse,
    fontSize: 14,
  },
  businessesSection: {
    paddingHorizontal: 20,
  },
  businessCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  businessImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontFamily: getFontFamily('semibold'),
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 4,
  },
  businessCategory: {
    fontFamily: getFontFamily('regular'),
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 6,
  },
  businessMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: getFontFamily('medium'),
    fontSize: 14,
    color: colors.warning,
    marginRight: 12,
  },
  distance: {
    fontFamily: getFontFamily('regular'),
    fontSize: 14,
    color: colors.text.secondary,
  },
  contactButton: {
    backgroundColor: '#2d3949',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  contactButtonText: {
    fontFamily: getFontFamily('semibold'),
    color: colors.text.inverse,
    fontSize: 14,
  },
});

export default ExploreScreen;
