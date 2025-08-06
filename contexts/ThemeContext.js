import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ألوان الوضع الفاتح
export const lightTheme = {
  colors: {
    background: '#f5f5f5',
    surface: '#ffffff',
    primary: '#1e3a8a',
    primaryGradient: ['#1e3a8a', '#3b82f6', '#06b6d4'],
    secondary: '#059669',
    accent: '#f59e0b',
    text: '#333333',
    textSecondary: '#666666',
    textTertiary: '#999999',
    border: '#e5e5e5',
    shadow: '#000000',
    success: '#059669',
    warning: '#f59e0b',
    error: '#ef4444',
    cardBackground: '#ffffff',
    headerBackground: '#ffffff',
  },
  isDark: false,
};

// ألوان الوضع المظلم
export const darkTheme = {
  colors: {
    background: '#1a1a1a',
    surface: '#2d2d2d',
    primary: '#3b82f6',
    primaryGradient: ['#2563eb', '#3b82f6', '#06b6d4'],
    secondary: '#10b981',
    accent: '#fbbf24',
    text: '#ffffff',
    textSecondary: '#d1d5db',
    textTertiary: '#9ca3af',
    border: '#374151',
    shadow: '#000000',
    success: '#10b981',
    warning: '#fbbf24',
    error: '#f87171',
    cardBackground: '#2d2d2d',
    headerBackground: '#374151',
  },
  isDark: true,
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('darkMode');
      if (savedTheme !== null) {
        setIsDark(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem('darkMode', JSON.stringify(newTheme));
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  const value = {
    isDark,
    theme,
    toggleTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;