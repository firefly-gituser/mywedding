import React, { createContext, useState, useContext, ReactNode, useEffect, useMemo } from 'react';
import { Theme } from '../types/types';
import { useGalleryImages } from '../hooks/useGalleryImages';

// Define placeholder image for loading state
const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="%23999"%3ELoading...%3C/text%3E%3C/svg%3E';

// Create theme templates without images
const themeTemplates = [
  {
    primary: '#d4b08c',
    secondary: '#f8f5f1',
    accent: '#c19e67',
    text: '#555',
    dark: '#333',
    light: '#fff',
    layoutClass: 'default-layout'
  },
  {
    primary: '#98a886',
    secondary: '#f4f7f2',
    accent: '#6d7f59',
    text: '#4a4a4a',
    dark: '#333',
    light: '#fff',
    layoutClass: 'elegant-layout'
  },
  {
    primary: '#b3809f',
    secondary: '#f7f2f5',
    accent: '#9a5a80',
    text: '#494949',
    dark: '#333',
    light: '#fff',
    layoutClass: 'romantic-layout'
  },
  {
    primary: '#8ca8bf',
    secondary: '#f2f5f7',
    accent: '#5b7c98',
    text: '#4a4a4a',
    dark: '#333',
    light: '#fff',
    layoutClass: 'classic-layout'
  },
  {
    primary: '#b87a52',
    secondary: '#fdf8f3',
    accent: '#754c2e',
    text: '#4a3c32',
    dark: '#2a2118',
    light: '#fff',
    layoutClass: 'vintage-layout'
  },
  {
    primary: '#292929',
    secondary: '#f9f9f9',
    accent: '#d9a566',
    text: '#444444',
    dark: '#1f1f1f',
    light: '#ffffff',
    layoutClass: 'minimalist-layout'
  },
  {
    primary: '#003b5c',
    secondary: '#f5f7f9',
    accent: '#c8102e',
    text: '#333333',
    dark: '#00263a',
    light: '#ffffff',
    layoutClass: 'professional-layout'
  }
];

interface ThemeContextType {
  currentTheme: Theme;
  changeTheme: (themeIndex: number) => void;
  themeIndex: number;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Start with a random theme
  const initialThemeIndex = 2;
  const [themeIndex, setThemeIndex] = useState<number>(initialThemeIndex);
  const { loading, galleryData, getImageUrl, error } = useGalleryImages();
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    if (galleryData) {
      // Once we have the gallery data, create themes with images
      const updatedThemes = themeTemplates.map((template, index) => {
        // Sử dụng hero cho background chính
        const heroImage = galleryData.hero ? getImageUrl(galleryData.hero) : placeholderImage;
        
        // Sử dụng mobileHero cho mobile background
        const mobileHeroImage = galleryData.mobileHero ? getImageUrl(galleryData.mobileHero) : heroImage;
        
        return {
          ...template,
          backgroundImage: heroImage,
          mobileBackgroundImage: mobileHeroImage
        };
      });
      
      setThemes(updatedThemes);
    } else {
      // Create temporary themes with placeholder images
      const tempThemes = themeTemplates.map(template => ({
        ...template,
        backgroundImage: placeholderImage,
        mobileBackgroundImage: placeholderImage
      }));
      
      setThemes(tempThemes);
    }
  }, [galleryData, getImageUrl]);

  const changeTheme = (newThemeIndex: number) => {
    setThemeIndex(newThemeIndex);
  };

  // Use useMemo to prevent recreating the theme object on every render
  const currentTheme = useMemo(() => {
    return themes[themeIndex] || {
      ...themeTemplates[themeIndex],
      backgroundImage: placeholderImage,
      mobileBackgroundImage: placeholderImage
    };
  }, [themeIndex, themes]);

  if (error) {
    console.error('Failed to load gallery images:', error);
  }

  // Create a memoized value for the context to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    return {
      currentTheme,
      changeTheme,
      themeIndex,
      isLoading: loading
    };
  }, [currentTheme, themeIndex, loading]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};