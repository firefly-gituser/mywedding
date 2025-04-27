import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useScrollAnimation from '../../hooks/useScrollAnimation';

// Import images
import HDS_5560 from '../../assets/HDS_5560.JPG';
import HDS_5943 from '../../assets/HDS_5943.JPG';
import HDS_6073 from '../../assets/HDS_6073.JPG';
import HDS_4821 from '../../assets/HDS_4821.JPG';
import HDS_5521 from '../../assets/HDS_5521.JPG';
import HDS_6119 from '../../assets/HDS_6119.JPG';

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

const GalleryItem = styled.div<{ isVisible: boolean; index: number }>`
  overflow: hidden;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  height: 300px;
  transition: box-shadow var(--transition-medium), transform var(--transition-medium);
  border: var(--border-width) solid rgba(193, 158, 103, 0.05);
  position: relative;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(40px)'};
  animation: ${props => props.isVisible ? `fadeIn 1s forwards ${props.index * 150}ms` : 'none'};
  
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

const Gallery: React.FC = () => {
  const [titleRef, titleInView] = useScrollAnimation({
    delay: 200,
    distance: '30px',
    origin: 'bottom'
  });
  
  // Define image data
  const images = [
    { src: HDS_5560, alt: 'Ảnh cặp đôi' },
    { src: HDS_5943, alt: 'Ảnh cặp đôi' },
    { src: HDS_6073, alt: 'Ảnh cặp đôi' },
    { src: HDS_4821, alt: 'Ảnh cặp đôi' },
    { src: HDS_5521, alt: 'Ảnh cặp đôi' },
    { src: HDS_6119, alt: 'Ảnh cặp đôi' }
  ];
  
  // Use a single ref for the entire grid
  const [gridRef, gridInView] = useScrollAnimation({
    threshold: 0.1,
    delay: 0,
  });
  
  // State to track other images being hovered over
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // State to track which images are visible
  const [visibleImages, setVisibleImages] = useState<boolean[]>(Array(images.length).fill(false));

  // Animate images sequentially after grid is in view
  useEffect(() => {
    if (gridInView) {
      const timers = images.map((_, index) => {
        return setTimeout(() => {
          setVisibleImages(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, 150 * index);
      });
      
      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [gridInView, images.length]);

  return (
    <GallerySection>
      <Container>
        <h2 ref={titleRef}>Câu Chuyện Của Chúng Tôi</h2>
        <GalleryGrid ref={gridRef}>
          {images.map((image, index) => (
            <GalleryItem 
              key={index}
              isVisible={visibleImages[index]}
              index={index}
              style={{
                opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.6 : (visibleImages[index] ? 1 : 0),
                transform: hoveredIndex !== null && hoveredIndex !== index ? 'scale(0.95)' : ''
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img src={image.src} alt={image.alt} />
            </GalleryItem>
          ))}
        </GalleryGrid>
      </Container>
    </GallerySection>
  );
};

export default Gallery;