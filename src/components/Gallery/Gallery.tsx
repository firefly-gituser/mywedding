import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { useGalleryImages } from '../../hooks/useGalleryImages';
import { GalleryImage } from '../../types/types';

// Placeholder image for loading state
const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="%23999"%3ELoading...%3C/text%3E%3C/svg%3E';

const GallerySection = styled.section`
  background-color: var(--light-color);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--primary-color), transparent);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--primary-color), transparent);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const GalleryItem = styled.div<{ $isVisible: boolean; index: number }>`
  overflow: hidden;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  height: 300px;
  transition: box-shadow var(--transition-medium), transform var(--transition-medium);
  border: var(--border-width) solid rgba(193, 158, 103, 0.05);
  position: relative;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(40px)'};
  animation: ${props => props.$isVisible ? `fadeIn 1s forwards ${props.index * 150}ms` : 'none'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 3px solid transparent;
    z-index: 2;
    transition: all var(--transition-medium);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }
  
  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
  }
  
  &:hover::before {
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border-color: rgba(255, 255, 255, 0.6);
  }
  
  &:hover img {
    transform: scale(1.1) rotate(1deg);
  }
`;

const LoadingMessage = styled.p`
  color: var(--text-color);
  font-style: italic;
  margin: 2rem 0;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  padding: 1rem;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 8px;
  margin: 2rem 0;
`;

const Gallery: React.FC = () => {
  // Refs
  const animationStartedRef = useRef<boolean>(false);
  const timersRef = useRef<number[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // State
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [visibleImages, setVisibleImages] = useState<boolean[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isGridInView, setIsGridInView] = useState<boolean>(false);
  const [isTitleInView, setIsTitleInView] = useState<boolean>(false);
  
  // Use our custom hook to get gallery images
  const { loading, error, galleryData, getImageUrl } = useGalleryImages();

  // Initialize gallery images when data is available
  useEffect(() => {
    // Clear any existing timers when data changes
    if (timersRef.current.length > 0) {
      timersRef.current.forEach(timer => window.clearTimeout(timer));
      timersRef.current = [];
    }
    
    // Reset animation flag
    animationStartedRef.current = false;
    
    if (galleryData && galleryData.gallary && galleryData.gallary.length > 0) {
      const newImages = galleryData.gallary.map(imageName => ({
        src: getImageUrl(imageName),
        alt: 'Ảnh cặp đôi'
      }));
      
      setImages(newImages);
      setVisibleImages(Array(newImages.length).fill(false));
    } else if (!loading && !error) {
      // Fallback to placeholder images
      const placeholders = Array(6).fill(null).map(() => ({
        src: placeholderImage,
        alt: 'Loading gallery image'
      }));
      setImages(placeholders);
      setVisibleImages(Array(placeholders.length).fill(false));
    }
  }, [galleryData, loading, error]);

  useEffect(() => {
  }, [error]);
  // Set up intersection observer for the grid
  useEffect(() => {
    if (!gridRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsGridInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(gridRef.current);
    
    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, []);

  // Set up intersection observer for the title
  useEffect(() => {
    if (!titleRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTitleInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(titleRef.current);
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);
  
  // Handle animation when grid comes into view
  useEffect(() => {
    // Only run if grid is in view, we have images, and animation hasn't started yet
    if (!isGridInView || images.length === 0 || animationStartedRef.current || visibleImages.length === 0) {
      return;
    }
    
    // Set flag to prevent re-running
    animationStartedRef.current = true;
    
    // Clear any existing timers
    timersRef.current.forEach(timer => window.clearTimeout(timer));
    timersRef.current = [];
    
    // Set up new animation timers
    const newTimers: number[] = [];
    
    for (let i = 0; i < images.length; i++) {
      const timer = window.setTimeout(() => {
        setVisibleImages(prev => {
          const newState = [...prev];
          if (i < newState.length) {
            newState[i] = true;
          }
          return newState;
        });
      }, 150 * i);
      
      newTimers.push(timer);
    }
    
    timersRef.current = newTimers;
    
    // Cleanup function
    return () => {
      timersRef.current.forEach(timer => window.clearTimeout(timer));
    };
  }, [isGridInView, images.length, visibleImages.length]);
  
  // Reset animation when grid goes out of view
  useEffect(() => {
    if (!isGridInView) {
      animationStartedRef.current = false;
    }
  }, [isGridInView]);
  
  // Handle mouse interactions with useCallback for memoization
  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);
  
  // Apply animation to title when it comes into view
  useEffect(() => {
    if (!titleRef.current || !isTitleInView) return;
    
    titleRef.current.style.opacity = '0';
    titleRef.current.style.transform = 'translateY(30px)';
    titleRef.current.style.transition = 'opacity 0.8s cubic-bezier(0.5, 0, 0, 1) 200ms, transform 0.8s cubic-bezier(0.5, 0, 0, 1) 200ms';
    
    // Apply animation after a short delay
    const timer = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'translateY(0)';
      }
    }, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, [isTitleInView]);

  return (
    <GallerySection>
      <Container>
        <h2 ref={titleRef}>Câu Chuyện Của Chúng Tôi</h2>
        
        {loading && <LoadingMessage>Đang tải hình ảnh...</LoadingMessage>}
        
        {error && <ErrorMessage>Không thể tải hình ảnh: {error}</ErrorMessage>}
        
        {!loading && !error && images.length === 0 && (
          <ErrorMessage>Không có hình ảnh nào trong thư viện</ErrorMessage>
        )}
        
        {images.length > 0 && (
          <GalleryGrid ref={gridRef}>
            {images.map((image, index) => (
              <GalleryItem 
                key={index}
                $isVisible={Boolean(visibleImages[index])}
                index={index}
                style={{
                  opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.6 : (visibleImages[index] ? 1 : 0),
                  transform: hoveredIndex !== null && hoveredIndex !== index ? 'scale(0.95)' : ''
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <img src={image.src} alt={image.alt} />
              </GalleryItem>
            ))}
          </GalleryGrid>
        )}
      </Container>
    </GallerySection>
  );
};

export default Gallery;