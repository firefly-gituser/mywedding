import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Theme } from '../types/types';
import HDS_5942 from '../assets/HDS_5942.JPG';
import HDS_5643 from '../assets/HDS_5643.JPG';
import HDS_6116 from '../assets/HDS_6116.JPG';
import HDS_5521 from '../assets/HDS_5521.JPG';
import HDS_6073 from '../assets/HDS_6073.JPG';
import HDS_4821 from '../assets/HDS_4821.JPG';
import HDS_5560 from '../assets/HDS_5560.JPG';

// Theme definitions
export const themes: Theme[] = [
  {
    primary: '#d4b08c',
    secondary: '#f8f5f1',
    accent: '#c19e67',
    text: '#555',
    dark: '#333',
    light: '#fff',
    backgroundImage: HDS_5942,
    layoutClass: 'default-layout'
  },
  {
    primary: '#98a886',
    secondary: '#f4f7f2',
    accent: '#6d7f59',
    text: '#4a4a4a',
    dark: '#333',
    light: '#fff',
    backgroundImage: HDS_5643,
    layoutClass: 'elegant-layout'
  },
  {
    primary: '#b3809f',
    secondary: '#f7f2f5',
    accent: '#9a5a80',
    text: '#494949',
    dark: '#333',
    light: '#fff',
    backgroundImage: HDS_6116,
    layoutClass: 'romantic-layout'
  },
  {
    primary: '#8ca8bf',
    secondary: '#f2f5f7',
    accent: '#5b7c98',
    text: '#4a4a4a',
    dark: '#333',
    light: '#fff',
    backgroundImage: HDS_5521,
    layoutClass: 'classic-layout'
  },
  {
    primary: '#b87a52',
    secondary: '#fdf8f3',
    accent: '#754c2e',
    text: '#4a3c32',
    dark: '#2a2118',
    light: '#fff',
    backgroundImage: HDS_6073,
    layoutClass: 'vintage-layout'
  },
  {
    primary: '#292929',
    secondary: '#f9f9f9',
    accent: '#d9a566',
    text: '#444444',
    dark: '#1f1f1f',
    light: '#ffffff',
    backgroundImage: HDS_4821,
    layoutClass: 'minimalist-layout'
  },
  {
    primary: '#003b5c',
    secondary: '#f5f7f9',
    accent: '#c8102e',
    text: '#333333',
    dark: '#00263a',
    light: '#ffffff',
    backgroundImage: HDS_5560,
    layoutClass: 'professional-layout'
  }
];

interface ThemeContextType {
  currentTheme: Theme;
  changeTheme: (themeIndex: number) => void;
  themeIndex: number;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Start with a random theme
  const initialThemeIndex = Math.floor(Math.random() * themes.length);
  const [themeIndex, setThemeIndex] = useState<number>(initialThemeIndex);
  const currentTheme = themes[themeIndex];

  const changeTheme = (newThemeIndex: number) => {
    setThemeIndex(newThemeIndex);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themeIndex }}>
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