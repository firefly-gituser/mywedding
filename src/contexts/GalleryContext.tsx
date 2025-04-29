import React, { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { GalleryResponse } from '../types/types';

interface GalleryContextType {
  loading: boolean;
  error: string | null;
  galleryData: GalleryResponse | null;
  getImageUrl: (imageName: string) => string;
}

// Create a context with a default value
export const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

interface GalleryProviderProps {
  children: ReactNode;
}

export const GalleryProvider: React.FC<GalleryProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryData, setGalleryData] = useState<GalleryResponse | null>(null);

  // Memoize getImageUrl with useCallback to prevent it from being recreated on each render
  const getImageUrl = useCallback((imageName: string): string => {
    if (!galleryData) return '';
    return galleryData.urlPattern.replace(galleryData.variableName, imageName);
  }, [galleryData]); // Only recreate when galleryData changes

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        // Get the gallery URL from environment variables
        const galleryUrl = process.env.REACT_APP_GALLERY_JSON_URL;
        
        if (!galleryUrl) {
          throw new Error('Gallery JSON URL not defined in environment variables');
        }

        const response = await fetch(galleryUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch gallery data: ${response.statusText}`);
        }

        const data: GalleryResponse = await response.json();
        setGalleryData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const value = {
    loading,
    error,
    galleryData,
    getImageUrl
  };

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};

// Custom hook to use the gallery context
export const useGalleryContext = (): GalleryContextType => {
  const context = useContext(GalleryContext);
  
  if (context === undefined) {
    throw new Error('useGalleryContext must be used within a GalleryProvider');
  }
  
  return context;
};