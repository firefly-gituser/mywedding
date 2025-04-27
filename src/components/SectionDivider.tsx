import React from 'react';
import styled from 'styled-components';

const Divider = styled.div`
  height: 50px;
  margin: 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--primary-color), transparent);
    transform: translate(-50%, -50%);
  }

  &::after {
    content: '❦';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--secondary-color);
    padding: 0 20px;
    color: var(--primary-color);
    font-size: 1.2rem;
  }
`;

const SectionDivider: React.FC = () => {
  return <Divider className="section-divider" />;
};

export default SectionDivider;