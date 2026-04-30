import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import BookmarksScreen from '../screens/Bookmarks';
import BookDetailScreen from '../screens/BookDetail';
import { colors } from '../theme';
import type { RootStackParamList, MainTabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const tabBarIcon = (focused: boolean, glyph: string) => (
  <Text style={{ fontSize: 20, color: focused ? colors.primary : colors.textFaint }}>
    {glyph}
  </Text>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.surfaceElevated,
        borderTopColor: colors.border,
        borderTopWidth: 0.5,
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textFaint,
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginBottom: 2 },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Discover',
        tabBarIcon: ({ focused }) => tabBarIcon(focused, '⊙'),
      }}
    />
    <Tab.Screen
      name="Bookmarks"
      component={BookmarksScreen}
      options={{
        tabBarLabel: 'Saved',
        tabBarIcon: ({ focused }) => tabBarIcon(focused, focused ? '★' : '☆'),
      }}
    />
  </Tab.Navigator>
);

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { fontWeight: '700', color: colors.text, fontSize: 18 },
        headerShadowVisible: false,
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{ title: 'Details', headerBackButtonDisplayMode: 'minimal' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
