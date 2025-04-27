import { useState, useEffect, useCallback } from 'react';
import { GalleryResponse } from '../types/types';

export const useGalleryImages = () => {
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
        console.error('Error fetching gallery data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  return {
    loading,
    error,
    galleryData,
    getImageUrl
  };
};