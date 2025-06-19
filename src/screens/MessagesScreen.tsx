import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors } from '../assets/colors';
import { textStyles } from '../assets/typography';

const MessagesScreen = () => {
  const sampleMessages = [
    {
      id: '1',
      businessName: 'Joe\'s Plumbing Services',
      lastMessage: 'Thank you for your inquiry! We can schedule...',
      timestamp: '2h ago',
      unread: true,
    },
    {
      id: '2',
      businessName: 'Maria\'s Catering',
      lastMessage: 'Our catering packages start at $15 per person...',
      timestamp: '1d ago',
      unread: false,
    },
    {
      id: '3',
      businessName: 'Tech Repair Pro',
      lastMessage: 'Your device is ready for pickup!',
      timestamp: '3d ago',
      unread: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Text style={styles.headerSubtitle}>Chat with local businesses</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {sampleMessages.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No messages yet</Text>
            <Text style={styles.emptyStateSubtitle}>
              Start conversations with local businesses to see your messages here
            </Text>
          </View>
        ) : (
          sampleMessages.map((message) => (
            <TouchableOpacity key={message.id} style={styles.messageCard}>
              <View style={styles.messageHeader}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatarText}>
                    {message.businessName.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.messageInfo}>
                  <View style={styles.messageTop}>
                    <Text style={styles.businessName}>{message.businessName}</Text>
                    <Text style={styles.timestamp}>{message.timestamp}</Text>
                  </View>
                  <Text 
                    style={[
                      styles.lastMessage,
                      message.unread && styles.unreadMessage
                    ]}
                    numberOfLines={2}
                  >
                    {message.lastMessage}
                  </Text>
                </View>
                {message.unread && <View style={styles.unreadDot} />}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.composeButton}>
        <Text style={styles.composeButtonText}>✉️</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
  content: {
    flex: 1,
    paddingTop: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 100,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  messageCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2d3949',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageInfo: {
    flex: 1,
  },
  messageTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  businessName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    color: '#6b7280',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#1f2937',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    marginLeft: 8,
  },
  composeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2d3949',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  composeButtonText: {
    fontSize: 24,
  },
});

export default MessagesScreen;
