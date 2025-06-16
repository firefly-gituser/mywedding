import React from 'react';
import styled from 'styled-components';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const FamiliesSection = styled.section`
  background-color: var(--light-color);
  position: relative;
  padding: 5rem 0;
  background-color: rgba(212, 176, 140, 0.1);
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
  margin-bottom: 2rem;
  animation: spin 4s infinite linear;
  display: inline-block;
  width: 60px;
  margin-right: 1rem;
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

const FamilyCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
  margin-top: 2rem;
`;

const FamilyCard = styled.div`
  background-color: var(--light-color);
  padding: 2.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  flex: 1 1 400px;
  max-width: 500px;
  text-align: left;
  transition: transform var(--transition-medium), box-shadow var(--transition-medium);
  border: var(--border-width) solid rgba(193, 158, 103, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 1px dashed rgba(193, 158, 103, 0.2);
    border-radius: calc(var(--border-radius) - 8px);
    pointer-events: none;
  }
  
  &:hover {
    transform: var(--hover-transform);
    border-color: rgba(193, 158, 103, 0.3);
  }

  h3 {
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 600;
    color: var(--dark-color);
    font-family: 'Cormorant Garamond', serif;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(193, 158, 103, 0.2);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 50px;
      height: 2px;
      background-color: var(--accent-color);
    }
  }
`;

const BrideFamily = styled(FamilyCard)`
  border-top: 4px solid var(--primary-color);
  animation: fadeInLeft 1s ease;
`;

const GroomFamily = styled(FamilyCard)`
  border-top: 4px solid var(--accent-color);
  animation: fadeInRight 1s ease;
`;

const FamilyContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FamilyMember = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px dashed rgba(0,0,0,0.1);
  position: relative;
  padding-left: 20px;
  
  &::before {
    content: '❧';
    position: absolute;
    left: 0;
    color: var(--primary-color);
    opacity: 0.5;
    font-size: 0.8rem;
  }
  
  h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--accent-color);
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
`;

const FamilyAddress = styled.div`
  position: relative;
  padding-left: 20px;
  
  &::before {
    content: '❧';
    position: absolute;
    left: 0;
    color: var(--primary-color);
    opacity: 0.5;
    font-size: 0.8rem;
  }
  
  h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--accent-color);
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
`;

const Families: React.FC = () => {
  const [headingRef, inView] = useScrollAnimation({
    delay: 200,
    distance: '30px',
    origin: 'bottom'
  });
  
  const [brideRef, brideInView] = useScrollAnimation({
    delay: 300,
    distance: '50px',
    origin: 'left'
  });
  
  const [groomRef, groomInView] = useScrollAnimation({
    delay: 300,
    distance: '50px',
    origin: 'right'
  });

  return (
    <FamiliesSection>
      <Container>
        <Ornament>❦</Ornament>
        <h2 ref={headingRef}>Gia Đình Chúng Tôi</h2>
        <FamilyCards>
          <BrideFamily ref={brideRef}>
            <h3>Nhà Trai</h3>
            <FamilyContent>
              <FamilyMember>
                <h4>Cha</h4>
                <p>Ông Thạch Ngọc Truyền</p>
              </FamilyMember>
              <FamilyMember>
                <h4>Mẹ</h4>
                <p>Bà Bùi Thị Kim Phương</p>
              </FamilyMember>
              <FamilyAddress>
                <h4>Địa Chỉ</h4>
                <p>Ấp Đông Phú I, Xã Vĩnh Thành</p>
                <p>Huyện Châu Thành, An Giang</p>
              </FamilyAddress>
            </FamilyContent>
          </BrideFamily>
          
          <GroomFamily ref={groomRef}>
            <h3>Nhà Gái</h3>
            <FamilyContent>
              <FamilyMember>
                <h4>Mẹ</h4>
                <p>Bà Lê Thị Mỹ Linh</p>
              </FamilyMember>
              <FamilyAddress>
                <h4>Địa Chỉ</h4>
                <p>Ấp Trường Thuận, Xã Trường Long</p>
                <p>Phong Điền, Cần Thơ</p>
              </FamilyAddress>
            </FamilyContent>
          </GroomFamily>
        </FamilyCards>
      </Container>
    </FamiliesSection>
  );
};

export default Families;