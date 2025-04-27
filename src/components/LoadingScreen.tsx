import React, { useEffect, useState, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import useImagePreloader from '../hooks/useImagePreloader';
import { useGalleryImages } from '../hooks/useGalleryImages';

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const LoadingContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 1;
  visibility: visible;
  animation: ${props => !props.$isVisible ? fadeOut : 'none'} 0.8s ease-in-out forwards;
`;

const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.7;
  }
`;

const LoadingLogo = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  animation: ${logoSpin} 2s infinite linear;
  font-size: 4rem;
  color: var(--primary-color);
  
  &::before {
    content: '❤';
    animation: ${pulseAnimation} 1.5s infinite ease-in-out;
    display: inline-block;
  }
`;

const Title = styled.h1`
  font-family: 'Great Vibes', cursive;
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const ProgressText = styled.p`
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 4px;
  background-color: rgba(0,0,0,0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${props => props.$progress}%;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  transition: width 0.3s ease;
`;

const LoadingScreen: React.FC = () => {
  const { isLoading } = useTheme();
  const { galleryData, getImageUrl } = useGalleryImages();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  
  // Tạo danh sách tất cả các URL hình ảnh cần tải
  const imageUrls = useMemo(() => {
    if (!galleryData) return [];
    
    const urls: string[] = [];
    
    // Thêm hình ảnh chính
    if (galleryData.hero) {
      urls.push(getImageUrl(galleryData.hero));
    }
    
    // Thêm hình ảnh cho thiết bị di động
    if (galleryData.mobileHero) {
      urls.push(getImageUrl(galleryData.mobileHero));
    }
    
    // Thêm các hình ảnh gallery
    if (galleryData.gallary && Array.isArray(galleryData.gallary)) {
      galleryData.gallary.forEach(img => {
        urls.push(getImageUrl(img));
      });
    }
    
    return urls;
  }, [galleryData, getImageUrl]);
  
  // Sử dụng hook để theo dõi quá trình tải hình ảnh
  const { imagesLoaded, loadedCount, totalCount } = useImagePreloader(imageUrls);
  
  // Tính toán tiến trình tải
  useEffect(() => {
    if (totalCount === 0) {
      // Nếu không có hình ảnh nào, tiến trình sẽ dựa trên API
      if (!isLoading) {
        setProgress(100);
      } else {
        // Giả lập tiến trình khi đang gọi API
        const interval = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev + Math.random() * 15;
            return newProgress > 90 ? 90 : newProgress;
          });
        }, 300);
        
        return () => clearInterval(interval);
      }
    } else {
      // Nếu có hình ảnh, tiến trình sẽ dựa trên số lượng đã tải
      // 90% cho việc tải hình ảnh, 10% cho việc khởi tạo khác
      const loadingProgress = (loadedCount / totalCount) * 90;
      setProgress(isLoading ? loadingProgress : loadingProgress + 10);
    }
  }, [isLoading, loadedCount, totalCount]);
  
  // Xử lý khi tất cả đã tải xong
  useEffect(() => {
    // Chỉ ẩn loading screen khi cả API và hình ảnh đã tải xong
    if (!isLoading && (imagesLoaded || totalCount === 0)) {
      setProgress(100);
      
      // Thêm khoảng delay nhỏ trước khi ẩn
      setTimeout(() => {
        setVisible(false);
      }, 1500);
    }
  }, [isLoading, imagesLoaded, totalCount]);
  
  // Hiển thị thông tin tiến trình
  const getLoadingMessage = () => {
    if (totalCount === 0 || loadedCount === 0) {
      return "Đang tải thiệp cưới...";
    }
    return `Đang tải hình ảnh (${loadedCount}/${totalCount})...`;
  };
  
  return (
    <LoadingContainer $isVisible={visible}>
      <LoadingLogo />
      <Title>Tâm & Giao</Title>
      <ProgressText>{getLoadingMessage()}</ProgressText>
      <ProgressBar>
        <ProgressFill $progress={progress} />
      </ProgressBar>
    </LoadingContainer>
  );
};

export default LoadingScreen;