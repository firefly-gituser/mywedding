import { useGalleryContext } from '../contexts/GalleryContext';

export const useGalleryImages = () => {
  return useGalleryContext();
};