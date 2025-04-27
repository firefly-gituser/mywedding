import React from 'react';
import styled from 'styled-components';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const InvitationSection = styled.section`
  background-color: var(--light-color);
  position: relative;
  padding: 7rem 0;
  
  &::before {
    content: '•❧•';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--primary-color);
    opacity: 0.2;
    font-size: 2rem;
  }

  &::after {
    content: '•❧•';
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
    color: var(--primary-color);
    opacity: 0.2;
    font-size: 2rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const Ornament = styled.div`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  animation: spin 4s infinite linear;
  display: inline-block;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid var(--primary-color);
  margin-bottom: 1.5rem;
  position: relative;
  background: radial-gradient(circle, rgba(212, 176, 140, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 50px;
    height: 1px;
    background: linear-gradient(to right, var(--primary-color), transparent);
  }

  &::before {
    right: 100%;
    margin-right: 10px;
  }

  &::after {
    left: 100%;
    margin-left: 10px;
    transform: rotate(180deg);
  }
`;

const Names = styled.div`
  font-family: 'Great Vibes', cursive;
  font-size: 3.5rem;
  margin: 2rem 0;
  color: var(--accent-color);
  position: relative;
  animation: glow 3s infinite alternate;
  padding: 2rem 0;
  
  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--primary-color), transparent);
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
  
  @media (max-width: 576px) {
    font-size: 2.5rem;
  }
`;

const Bride = styled.span`
  position: relative;
  display: inline-block;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--primary-color);
    opacity: 0.3;
  }
`;

const Groom = styled.span`
  position: relative;
  display: inline-block;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--primary-color);
    opacity: 0.3;
  }
`;

const And = styled.span`
  margin: 0 1.5rem;
  font-size: 2.5rem;
  vertical-align: middle;
  animation: pulse 2s infinite;
  position: relative;
  display: inline-block;
  
  &::before, &::after {
    content: '♥';
    position: absolute;
    font-size: 0.8rem;
    color: var(--primary-color);
    opacity: 0.5;
  }

  &::before {
    top: 0;
    left: -15px;
  }

  &::after {
    bottom: 0;
    right: -15px;
  }
  
  @media (max-width: 576px) {
    font-size: 2rem;
  }
`;

const Invitation: React.FC = () => {
  const [containerRef, inView] = useScrollAnimation({
    delay: 300,
    distance: '50px',
    origin: 'bottom'
  });

  return (
    <InvitationSection>
      <Container ref={containerRef}>
        <Ornament>❦</Ornament>
        <h2>Trân Trọng Kính Mời</h2>
        <p>
          Chúng tôi trân trọng kính mời quý vị đến tham dự lễ thành hôn của chúng tôi, 
          cùng chúng tôi chia sẻ niềm hạnh phúc trong giây phút thiêng liêng này.
        </p>
        <Names>
          <Bride>Tâm</Bride>
          <And>&</And>
          <Groom>Giao</Groom>
        </Names>
      </Container>
    </InvitationSection>
  );
};

export default Invitation;