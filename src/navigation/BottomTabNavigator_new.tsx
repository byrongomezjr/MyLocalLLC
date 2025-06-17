import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../assets/colors';

import MyLLCScreen from '../screens/MyLLCScreen';
import MessagesScreen from '../screens/MessagesScreen';
import AdvertiseScreen from '../screens/AdvertiseScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabIcon = ({ 
  focused, 
  iconName, 
  label 
}: { 
  focused: boolean; 
  iconName: string; 
  label: string; 
}) => (
  <View style={styles.tabIconContainer}>
    <Icon 
      name={iconName} 
      size={focused ? 24 : 22} 
      color={focused ? colors.primary : colors.text.secondary}
      style={styles.tabIcon}
    />
    <Text 
      style={[styles.tabLabel, focused && styles.tabLabelFocused]}
      numberOfLines={1}
      adjustsFontSizeToFit={true}
      minimumFontScale={0.8}
    >
      {label}
    </Text>
  </View>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
      }}
    >
      <Tab.Screen
        name="MyLLC"
        component={MyLLCScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="business" label="My LLC" />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="message" label="Messages" />
          ),
        }}
      />
      <Tab.Screen
        name="Advertise"
        component={AdvertiseScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="campaign" label="Advertise" />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="settings" label="Settings" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background.card,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    height: 85,
    paddingBottom: 25,
    paddingTop: 8,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    paddingHorizontal: 4,
  },
  tabIcon: {
    marginBottom: 3,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.text.secondary,
    textAlign: 'center',
    width: '100%',
  },
  tabLabelFocused: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 10,
  },
});

export default BottomTabNavigator;
