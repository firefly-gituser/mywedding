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
  margin-right: 1rem;
  animation: spin 4s infinite linear;
  display: inline-block;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid var(--primary-color);
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
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
    flex-direction: column;
    gap: 1rem;
  }
  
  @media (max-width: 576px) {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 0.5rem;
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
  
  @media (max-width: 768px) {
    margin: 0.5rem 0;
    font-size: 2.5rem;
  }
  
  @media (max-width: 576px) {
    margin: 0.5rem 0;
    font-size: 2rem;
  }
`;

// Component hiển thị lịch
const Calendar = styled.div`
  margin: 3rem auto;
  max-width: 350px;
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  background-color: #fff;
`;

const CalendarHeader = styled.div`
  background-color: var(--primary-color);
  color: #fff;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0.5rem;
`;

const WeekDay = styled.div`
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
  color: var(--dark-color);
`;

const DayCell = styled.div<{ $isHighlighted?: boolean }>`
  padding: 0.8rem 0.5rem;
  text-align: center;
  position: relative;
  color: ${props => props.$isHighlighted ? 'var(--accent-color)' : 'var(--text-color)'};
  font-weight: ${props => props.$isHighlighted ? 'bold' : 'normal'};
  
  ${props => props.$isHighlighted && `
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      border: 2px solid var(--accent-color);
      border-radius: 50%;
      z-index: 1;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' fill='%23c19e67' /%3E%3C/svg%3E") center no-repeat;
      opacity: 0.6;
    }
  `}
`;

const EmptyCell = styled.div`
  padding: 0.8rem 0.5rem;
`;

const Invitation: React.FC = () => {
  const [containerRef, inView] = useScrollAnimation({
    delay: 300,
    distance: '50px',
    origin: 'bottom'
  });

  // Tháng 7 năm 2025 bắt đầu từ thứ Ba
  // Ngày 1/7/2025 là thứ ba, offset = 2
  // Ngày 13/7/2025 cần rơi vào chủ nhật (offset = 0)
  const daysInJuly = 31;
  const firstDayOffset = 2; // 0 = Chủ nhật, 1 = Thứ hai, 2 = Thứ ba, ..., 6 = Thứ bảy
  
  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const highlightedDay = 13; // Ngày 13/7/2025
  
  return (
    <InvitationSection>
      <Container ref={containerRef}>
        <Ornament>❦</Ornament>
        <h2>Lời mời</h2>
        <p>
          Tâm và Giao: "Trân trọng kính mời bạn đến chung vui cùng chúng tôi trong ngày trọng đại,<br/> để cùng sẻ chia những khoảnh khắc thiêng liêng và ngập tràn hạnh phúc của lễ thành hôn. <br/>Ngày chúng tôi chính thức cùng nhau bước vào một chương mới."
        </p>
        <Names>
          <Bride>Thạch Chí Tâm</Bride>
          <And>&</And>
          <Groom>Lê Cẩm Giao</Groom>
        </Names>
        
        {/* Hiển thị lịch với ngày 13/7/2025 được khoanh trái tim */}
        <Calendar>
          <CalendarHeader>Tháng 7, 2025</CalendarHeader>
          <CalendarGrid>
            {weekDays.map(day => (
              <WeekDay key={day}>{day}</WeekDay>
            ))}
            
            {/* Ô trống trước ngày 1/7/2025 */}
            {Array.from({ length: firstDayOffset }).map((_, index) => (
              <EmptyCell key={`empty-${index}`}></EmptyCell>
            ))}
            
            {/* Các ngày trong tháng 7 */}
            {Array.from({ length: daysInJuly }).map((_, index) => {
              const day = index + 1;
              return (
                <DayCell 
                  key={day} 
                  $isHighlighted={day === highlightedDay}
                >
                  {day}
                </DayCell>
              );
            })}
          </CalendarGrid>
        </Calendar>
      </Container>
    </InvitationSection>
  );
};

export default Invitation;