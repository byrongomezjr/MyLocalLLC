import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { textStyles, getFontFamily } from '../assets/typography';
import { colors } from '../assets/colors';

const MyLLCScreen = () => {
  const sampleBusinesses = [
    {
      id: '1',
      name: 'Joe\'s Plumbing Services',
      category: 'Home Services',
      rating: 4.8,
      distance: '0.5 miles',
      image: 'https://via.placeholder.com/100x100',
    },
    {
      id: '2',
      name: 'Maria\'s Catering',
      category: 'Food & Dining',
      rating: 4.9,
      distance: '1.2 miles',
      image: 'https://via.placeholder.com/100x100',
    },
    {
      id: '3',
      name: 'Tech Repair Pro',
      category: 'Technology',
      rating: 4.7,
      distance: '0.8 miles',
      image: 'https://via.placeholder.com/100x100',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Local LLC</Text>
        <Text style={styles.headerSubtitle}>Discover local businesses near you</Text>
      </View>
      
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
          <Text style={styles.sectionTitle}>Nearby Businesses</Text>
          {sampleBusinesses.map((business) => (
            <TouchableOpacity key={business.id} style={styles.businessCard}>
              <Image source={{ uri: business.image }} style={styles.businessImage} />
              <View style={styles.businessInfo}>
                <Text style={styles.businessName}>{business.name}</Text>
                <Text style={styles.businessCategory}>{business.category}</Text>
                <View style={styles.businessMeta}>
                  <Text style={styles.rating}>⭐ {business.rating}</Text>
                  <Text style={styles.distance}>{business.distance}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactButtonText}>Contact</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    ...textStyles.appTitle,
    color: colors.text.inverse,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontFamily: getFontFamily('regular'),
    fontSize: 16,
    color: colors.text.headerSubtitle,
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

export default MyLLCScreen;
