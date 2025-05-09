import React, { useEffect } from 'react';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { GalleryProvider } from './contexts/GalleryContext';
import LoadingScreen from './components/LoadingScreen';
import { Routes, Route } from 'react-router-dom';
import RSVPList from './components/RSVPList/RSVPList';

// Components
import Header from './components/Header/Header';
import Invitation from './components/Invitation/Invitation';
import Families from './components/Families/Families';
import Details from './components/Details/Details';
import Timeline from './components/Timeline/Timeline';
import Gallery from './components/Gallery/Gallery';
import RSVP from './components/RSVP/RSVP';
import Footer from './components/Footer/Footer';
import SectionDivider from './components/SectionDivider';

// Floating Hearts animation
const FloatingHearts = styled.div`
  .floating-heart {
    position: fixed;
    color: var(--primary-color);
    opacity: 0;
    z-index: 1111;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    animation: floatHeart 3s ease-in forwards;
  }
  
  @keyframes floatHeart {
    0% {
      opacity: 0;
      transform: translateY(0) rotate(0deg);
    }
    20% {
      opacity: 0.6;
    }
    100% {
      opacity: 0;
      transform: translateY(-100vh) rotate(360deg);
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="none"/><path d="M20,50 Q30,30 50,50 T80,50" stroke="%23d4b08c20" fill="none" stroke-width="0.5" /></svg>');
  background-size: 300px;
  opacity: 0.3;
  z-index: -1;
  pointer-events: none;
`;

// Main wedding page component
const WeddingPage: React.FC = () => {
  const { currentTheme, isLoading } = useTheme();
  
  // Add floating hearts animation
  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerHTML = '❤';
      heart.style.fontSize = `${Math.random() * 20 + 10}px`;
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.top = '100vh';
      heart.style.animationDuration = `${Math.random() * 6 + 4}s`;
      
      const heartsContainer = document.querySelector('.floating-hearts-container');
      if (heartsContainer) {
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
          if (heart && heart.parentNode === heartsContainer) {
            heartsContainer.removeChild(heart);
          }
        }, 10000);
      }
    };
    
    // Create hearts periodically
    const interval = setInterval(createHeart, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <LoadingScreen />
      <Overlay />
      <FloatingHearts className="floating-hearts-container" />
      
      <div className={currentTheme.layoutClass}>
        <Header />
        <main>
          <Invitation />
          <SectionDivider />
          <Families />
          <SectionDivider />
          <Details />
          <SectionDivider />
          <Timeline />
          <SectionDivider />
          <Gallery />
          <SectionDivider />
          <RSVP />
        </main>
        <Footer />
      </div>
    </>
  );
};

// App wrapper with theme handling
const AppWithTheme: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <StyledThemeProvider theme={currentTheme}>
      <GlobalStyles theme={currentTheme} />
      <Routes>
        <Route path="/" element={<WeddingPage />} />
        <Route path="/list" element={<RSVPList />} />
      </Routes>
    </StyledThemeProvider>
  );
};

// Root App component with theme context
const App: React.FC = () => {
  return (
    <GalleryProvider>
      <ThemeProvider>
        <AppWithTheme />
      </ThemeProvider>
    </GalleryProvider>
  );
};

export default App;
