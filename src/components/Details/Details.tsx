import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faCar } from '@fortawesome/free-solid-svg-icons';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const DetailsSection = styled.section`
  background-color: var(--secondary-color);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const DetailCard = styled.div`
  background-color: var(--light-color);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  flex: 1 1 300px;
  max-width: 350px;
  transition: transform var(--transition-medium), box-shadow var(--transition-medium);
  border: var(--border-width) solid rgba(193, 158, 103, 0.1);
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  }

  &:hover {
    transform: var(--hover-transform);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
    border-color: rgba(193, 158, 103, 0.3);
  }
  
  h3 {
    margin: 1rem 0;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 576px) {
    padding: 1.5rem;
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  transition: transform var(--transition-medium), color var(--transition-medium);
  
  ${DetailCard}:hover & {
    transform: scale(1.2);
    color: var(--accent-color);
  }
`;

const Details: React.FC = () => {
  const [timeRef, timeInView] = useScrollAnimation({
    delay: 200,
    distance: '40px',
    origin: 'bottom'
  });
  
  const [locationRef, locationInView] = useScrollAnimation({
    delay: 400,
    distance: '40px',
    origin: 'bottom'
  });
  
  const [receptionRef, receptionInView] = useScrollAnimation({
    delay: 600,
    distance: '40px',
    origin: 'bottom'
  });

  return (
    <DetailsSection>
      <Container>
        <DetailCard ref={timeRef}>
          <IconWrapper>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </IconWrapper>
          <h3>Thời Gian</h3>
          <p>11:00 - 13:00</p>
          <p>Chủ Nhật, ngày 13 tháng 7, 2025</p>
          <p>Nhằm ngày 19 tháng 6, Ất Tỵ</p>
        </DetailCard>
        
        <DetailCard ref={locationRef}>
          <IconWrapper>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </IconWrapper>
          <h3>Địa Điểm</h3>
          <p>Tư Gia Nhà Gái</p>
          <p>Ấp Trường Thuận, Xã Trường Long</p>
          <p>Phong Điền, Cần Thơ</p>
        </DetailCard>
        
        <DetailCard ref={receptionRef}>
          <IconWrapper>
            <FontAwesomeIcon icon={faCar} />
          </IconWrapper>
          <h3>Phương tiện di chuyển</h3>
          <p>Xe 7 hoặc 16 chỗ</p>
        </DetailCard>
      </Container>
    </DetailsSection>
  );
};

export default Details;