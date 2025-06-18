import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGalleryImages } from '../../hooks/useGalleryImages';
import { GalleryImage } from '../../types/types';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { useInView } from 'react-intersection-observer';

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

const GalleryItem = styled.div`
  overflow: hidden;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  height: 300px;
  border: var(--border-width) solid rgba(193, 158, 103, 0.05);
  position: relative;
  transition: opacity 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 0px solid rgba(255, 255, 255, 0.7);
    z-index: 2;
    transition: all 0.3s ease;
    pointer-events: none;
  }
  
  &:hover::before {
    top: 12px;
    left: 12px;
    right: 12px;
    bottom: 12px;
    border-width: 3px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

// Tạo styled component mới cho hình ảnh có vị trí đặc biệt
const OffsetImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  object-position: center 15%;  /* Điều chỉnh vị trí ảnh xuống 15% */
  
  ${GalleryItem}:hover & {
    transform: scale(1.1);
  }
`;

// New styled component for items that need full height on mobile
const MobileFullHeightItem = styled(GalleryItem)`
  @media (max-width: 768px) {
    height: 450px; /* Increased height for mobile view */
    grid-row: span 2; /* Make the item span two rows in the grid */
  }
`;

// Regular images use the default styling in GalleryItem

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

// Component để áp dụng hiệu ứng cho từng hình ảnh
const AnimatedGalleryItem: React.FC<{
  image: GalleryImage;
  index: number;
}> = ({ image, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Kiểm tra xem phần tử có thuộc vào các vị trí đặc biệt không (offset)
  const specialOffsetPositions = [0, 2, 5];
  const isSpecialOffsetPosition = specialOffsetPositions.includes(index);
  
  // Kiểm tra xem phần tử có cần hiển thị full height trên mobile hay không
  const mobileFullHeightPositions = [0, 2, 4];
  const isMobileFullHeightPosition = mobileFullHeightPositions.includes(index);

    // Determine if we need to use special offset image positioning
  const useOffsetImage = isSpecialOffsetPosition;

  // Choose appropriate container based on mobile full-height requirement
  const ItemComponent = isMobileFullHeightPosition ? MobileFullHeightItem : GalleryItem;

  return (
    <ItemComponent ref={ref}>
      {useOffsetImage ? (
        <OffsetImage src={image.src} alt={image.alt} />
      ) : (
        <img src={image.src} alt={image.alt} />
      )}
    </ItemComponent>
  );
};

const Gallery: React.FC = () => {
  // State
  const [images, setImages] = useState<GalleryImage[]>([]);
  // Use our custom hook to get gallery images
  const { loading, error, galleryData, getImageUrl } = useGalleryImages();
  
  // Sử dụng useScrollAnimation cho hiệu ứng fadeIn chỉ dành cho tiêu đề
  const [titleRef, titleInView] = useScrollAnimation({
    threshold: 0.1,
    distance: '30px',
    origin: 'bottom',
    delay: 200
  });
  
  // Initialize gallery images when data is available
  useEffect(() => {
    if (galleryData && galleryData.gallary && galleryData.gallary.length > 0) {
      const newImages = galleryData.gallary.map(imageName => ({
        src: getImageUrl(imageName),
        alt: 'Ảnh cặp đôi'
      }));
      
      setImages(newImages);
    } else if (!loading && !error) {
      // Fallback to placeholder images
      const placeholders = Array(6).fill(null).map(() => ({
        src: placeholderImage,
        alt: 'Loading gallery image'
      }));
      setImages(placeholders);
    }
  }, [galleryData, loading, error, getImageUrl]);

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
          <GalleryGrid>
            {images.map((image, index) => (
              <AnimatedGalleryItem 
                key={index} 
                image={image}
                index={index}
              />
            ))}
          </GalleryGrid>
        )}
      </Container>
    </GallerySection>
  );
};

export default Gallery;