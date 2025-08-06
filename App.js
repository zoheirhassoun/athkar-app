import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import AthkarScreen from './screens/AthkarScreen';
import SettingsScreen from './screens/SettingsScreen';
import AthkarDetailScreen from './screens/AthkarDetailScreen';

// Import Theme Provider
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AthkarStack() {
  const { theme } = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen 
        name="AthkarList" 
        component={AthkarScreen} 
        options={{ title: 'الأذكار' }}
      />
      <Stack.Screen 
        name="AthkarDetail" 
        component={AthkarDetailScreen} 
        options={{ title: 'الذكر' }}
      />
    </Stack.Navigator>
  );
}

function AppContent() {
  const { theme, isDark } = useTheme();
  
  return (
    <NavigationContainer>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Athkar') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
          },
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'الرئيسية' }}
        />
        <Tab.Screen 
          name="Athkar" 
          component={AthkarStack} 
          options={{ headerShown: false, title: 'الأذكار' }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: 'الإعدادات' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
} 