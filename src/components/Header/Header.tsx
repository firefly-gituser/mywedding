import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import useScrollAnimation from '../../hooks/useScrollAnimation';

// Styled components for the Header
const HeaderContainer = styled.header<{ bgImage: string }>`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),
    url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: var(--dark-color);
  transition: background-image var(--transition-slow);
`;

const HeroContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.85);
  padding: 3rem 5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  animation: fadeIn 1.2s ease, floatUp 1.5s ease;
  transition: all var(--transition-medium);
  border: var(--border-width) solid rgba(255, 255, 255, 0.4);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid var(--primary-color);
    opacity: 0.5;
    margin: 10px;
    border-radius: calc(var(--border-radius) - 5px);
    pointer-events: none;
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
  
  h1 {
    animation: fadeInDown 1.5s ease;
  }
  
  h2 {
    animation: fadeInUp 1.5s ease;
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
  
  @media (max-width: 576px) {
    padding: 1.5rem;
  }
`;

// Renamed from Date to EventDate to avoid conflict with JavaScript Date object
const EventDate = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--accent-color);
  animation: fadeInUp 1.8s ease;
`;

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 576px) {
    gap: 1rem;
  }
`;

const CountdownItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  span:first-child {
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--accent-color);
    font-family: 'Cormorant Garamond', serif;
    position: relative;
    transition: transform 0.5s ease;
    
    &.flip {
      animation: flipNumber 0.5s;
    }
    
    @keyframes flipNumber {
      0% {
        transform: translateY(0);
        opacity: 1;
      }
      50% {
        transform: translateY(-100%);
        opacity: 0;
      }
      51% {
        transform: translateY(100%);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
  
  @media (max-width: 576px) {
    span:first-child {
      font-size: 1.8rem;
    }
  }
`;

const CountdownLabel = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 0.3rem;
  
  @media (max-width: 576px) {
    font-size: 0.7rem;
  }
`;

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Header: React.FC = () => {
  const { currentTheme } = useTheme();
  const [heroRef, inView] = useScrollAnimation();
  
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState<CountdownValues>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [prevTimeLeft, setPrevTimeLeft] = useState<CountdownValues>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Wedding date (July 17, 2025)
  const weddingDateStr = 'July 17, 2025 00:00:00';
  const weddingDate = window.Date.parse(weddingDateStr);
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = window.Date.now();
      const distance = weddingDate - now;
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setPrevTimeLeft(prev => ({...timeLeft}));
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    
    calculateTimeLeft(); // Calculate immediately
    
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]); // Removed timeLeft from dependencies

  return (
    <HeaderContainer bgImage={currentTheme.backgroundImage}>
      <HeroContainer ref={heroRef}>
        <h1>Tâm & Giao</h1>
        <h2>Chúng Tôi Sắp Cưới</h2>
        <EventDate>17 Tháng 7, 2025</EventDate>
        
        <CountdownContainer>
          <CountdownItem>
            <span className={timeLeft.days !== prevTimeLeft.days ? 'flip' : ''}>
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <CountdownLabel>Ngày</CountdownLabel>
          </CountdownItem>
          
          <CountdownItem>
            <span className={timeLeft.hours !== prevTimeLeft.hours ? 'flip' : ''}>
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <CountdownLabel>Giờ</CountdownLabel>
          </CountdownItem>
          
          <CountdownItem>
            <span className={timeLeft.minutes !== prevTimeLeft.minutes ? 'flip' : ''}>
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <CountdownLabel>Phút</CountdownLabel>
          </CountdownItem>
          
          <CountdownItem>
            <span className={timeLeft.seconds !== prevTimeLeft.seconds ? 'flip' : ''}>
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <CountdownLabel>Giây</CountdownLabel>
          </CountdownItem>
        </CountdownContainer>
      </HeroContainer>
    </HeaderContainer>
  );
};

export default Header;