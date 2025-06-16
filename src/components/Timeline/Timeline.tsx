import React from 'react';
import styled from 'styled-components';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const TimelineSection = styled.section`
  background-color: var(--light-color);
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 3rem auto 0;
  padding: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background-color: var(--primary-color);
    transform: translateX(-50%);
  }
  
  @media (max-width: 768px) {
    &::before {
      left: 30px;
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--accent-color);
  border: 4px solid var(--light-color);
  box-shadow: 0 0 0 var(--border-width) var(--primary-color);
  z-index: 1;
  transition: transform var(--transition-fast), background-color var(--transition-fast);
  
  ${TimelineItem}:hover & {
    transform: translateX(-50%) scale(1.5);
    background-color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    left: 30px;
    
    ${TimelineItem}:hover & {
      transform: translateX(0) scale(1.5);
    }
  }
`;

const TimelineContent = styled.div`
  width: calc(50% - 40px);
  padding: 1.5rem;
  background-color: var(--secondary-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  text-align: center;
  position: relative;
  transition: transform var(--transition-medium), box-shadow var(--transition-medium);
  border: var(--border-width) solid rgba(193, 158, 103, 0.1);
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    background-color: var(--secondary-color);
    transform: translateY(-50%) rotate(45deg);
    border: var(--border-width) solid rgba(193, 158, 103, 0.1);
    border-width: 0;
  }
  
  ${TimelineItem}:hover & {
    transform: var(--hover-transform);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    border-color: rgba(193, 158, 103, 0.3);
  }
  
  ${TimelineItem}:nth-child(odd) & {
    margin-right: 40px;
    margin-left: auto;
    
    &::after {
      right: -10px;
      border-top: 0;
      border-left: 0;
    }
  }
  
  ${TimelineItem}:nth-child(even) & {
    margin-left: 40px;
    margin-right: auto;
    
    &::after {
      left: -10px;
      border-right: 0;
      border-bottom: 0;
    }
  }
  
  @media (max-width: 768px) {
    width: calc(100% - 80px);
    margin-left: 80px !important;
    margin-right: 0 !important;
    
    &::after {
      left: -10px !important;
      right: auto !important;
      border-right: 0 !important;
      border-bottom: 0 !important;
      border-top: var(--border-width) solid rgba(193, 158, 103, 0.1);
      border-left: var(--border-width) solid rgba(193, 158, 103, 0.1);
    }
  }
`;

const TimelineTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: var(--accent-color);
  transition: color var(--transition-medium);
  
  ${TimelineItem}:hover & {
    color: var(--primary-color);
  }
`;

const TimelineText = styled.p`
  margin-bottom: 0;
`;

interface TimelineEventProps {
  time: string;
  event: string;
  delay: number;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ time, event, delay }) => {
  const [itemRef, inView] = useScrollAnimation({
    delay,
    distance: '50px',
    origin: 'bottom'
  });

  return (
    <TimelineItem ref={itemRef}>
      <TimelineDot />
      <TimelineContent>
        <TimelineTitle>{time}</TimelineTitle>
        <TimelineText>{event}</TimelineText>
      </TimelineContent>
    </TimelineItem>
  );
};

const Timeline: React.FC = () => {
  const [headerRef, headerInView] = useScrollAnimation({
    delay: 200,
    distance: '30px',
    origin: 'bottom'
  });

  return (
    <TimelineSection>
      <Container>
        <h2 ref={headerRef}>Lịch Trình Chuyến Đi</h2>
        <TimelineContainer>
          <TimelineEvent 
            time="6:50 Sáng" 
            event="Chuẩn bị tại LAB 6 công ty TMA" 
            delay={250}
          />
          <TimelineEvent 
            time="7:00 Sáng" 
            event="Bắt đầu chuyến đi." 
            delay={500}
          />
          <TimelineEvent 
            time="11:00 Trưa" 
            event="Đến Nhà Gái và bắt đầu nhập tiệc." 
            delay={750}
          />
          <TimelineEvent 
            time="13:30 Chiều" 
            event="Kết thúc và trở về công ty." 
            delay={1000}
          />
        </TimelineContainer>
      </Container>
    </TimelineSection>
  );
};

export default Timeline;