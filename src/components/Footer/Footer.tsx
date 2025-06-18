import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const FooterSection = styled.footer`
  background-color: var(--light-color);
  padding: 3rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, transparent, var(--primary-color), transparent);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Hashtag = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
  font-weight: 500;
  position: relative;
  display: inline-block;
  padding: 0.5rem 2rem;
  
  &::before,
  &::after {
    content: '❦';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--primary-color);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const CoupleNames = styled.h3`
  font-family: 'Great Vibes', cursive;
  font-size: 2.5rem;
  margin-top: 0.5rem;
  color: var(--accent-color);
  position: relative;
  padding-top: 1rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 1px;
    background-color: var(--primary-color);
  }
`;

const ThemeSelector = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  
  &::before {
    content: '❧';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--light-color);
    padding: 0 10px;
    color: var(--primary-color);
    font-size: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const ThemeButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

interface ThemeButtonProps {
  $isActive: boolean;
}

const ThemeButton = styled.button<ThemeButtonProps>`
  background-color: ${props => props.$isActive ? 'var(--accent-color)' : 'var(--secondary-color)'};
  color: ${props => props.$isActive ? 'var(--light-color)' : 'var(--dark-color)'};
  border: var(--border-width) solid ${props => props.$isActive ? 'var(--accent-color)' : 'var(--primary-color)'};
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  transition: all var(--transition-fast);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    background-color: var(--primary-color);
    color: var(--light-color);
  }
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const Footer: React.FC = () => {
  const { currentTheme, changeTheme, themeIndex } = useTheme();
  const [containerRef, inView] = useScrollAnimation({
    delay: 150,
    distance: '30px',
    origin: 'bottom'
  });

  // Theme names
  const themeNames = [
    'Vàng Cổ Điển',
    'Xanh Lá',
    'Hồng Lãng Mạn',
    'Xanh Dương',
    'Nâu Vintage',
    'Tối Giản',
    'Chuyên Nghiệp'
  ];

  return (
    <FooterSection>
      <Container ref={containerRef}>
        <Hashtag>#TâmVàGiaoKếtDuyên</Hashtag>
        <p>Trân trọng và biết ơn,</p>
        <CoupleNames>Tâm & Giao</CoupleNames>
      </Container>
    </FooterSection>
  );
};

export default Footer;