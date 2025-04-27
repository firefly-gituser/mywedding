import { createGlobalStyle } from 'styled-components';
import { Theme } from '../types/types';

interface GlobalStyleProps {
  theme: Theme;
}

const GlobalStyles = createGlobalStyle<GlobalStyleProps>`
  :root {
    --primary-color: ${props => props.theme.primary};
    --secondary-color: ${props => props.theme.secondary};
    --text-color: ${props => props.theme.text};
    --dark-color: ${props => props.theme.dark};
    --light-color: ${props => props.theme.light};
    --accent-color: ${props => props.theme.accent};
    --transition-slow: 0.8s ease;
    --transition-medium: 0.5s ease;
    --transition-fast: 0.3s ease;
    --border-width: 2px;
    --border-radius: 8px;
    --box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    --hover-transform: translateY(-8px);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--secondary-color);
    position: relative;
  }

  /* Theme transition */
  .theme-transition * {
    transition: 
        color var(--transition-medium),
        background-color var(--transition-medium),
        border-color var(--transition-medium),
        box-shadow var(--transition-medium);
  }

  header.theme-transition {
    transition: background-image var(--transition-slow);
  }

  .overlay {
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
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  h1, h2, h3 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 500;
    color: var(--dark-color);
  }

  h1 {
    font-family: 'Great Vibes', cursive;
    font-size: 4.5rem;
    font-weight: 400;
    margin-bottom: 1rem;
    color: var(--accent-color);
  }

  h2 {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
    font-weight: 300;
  }

  section {
    padding: 5rem 0;
    text-align: center;
  }

  /* Section reveal animations */
  section {
    position: relative;
    overflow: hidden;
    padding: 5rem 0;
    text-align: center;
    border-top: 1px solid rgba(193, 158, 103, 0.1);
  }

  section::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: linear-gradient(to bottom, rgba(193, 158, 103, 0.05), transparent);
  }

  section .container {
    position: relative;
    z-index: 2;
  }

  section h2 {
    position: relative;
    display: inline-block;
    margin-bottom: 2.5rem;
  }

  section h2::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: linear-gradient(to right, transparent, var(--accent-color), transparent);
  }

  section h2::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: linear-gradient(to right, transparent, var(--primary-color), transparent);
  }

  /* Add a decorative divider */
  .section-divider {
    height: 50px;
    margin: 0;
    position: relative;
    overflow: hidden;
  }

  .section-divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--primary-color), transparent);
    transform: translate(-50%, -50%);
  }

  .section-divider::after {
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

  /* Keyframe Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes floatUp {
    0% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes glow {
    from {
      text-shadow: 0 0 5px rgba(193, 158, 103, 0.2);
    }
    to {
      text-shadow: 0 0 20px rgba(193, 158, 103, 0.4), 0 0 30px rgba(193, 158, 103, 0.2);
    }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    h1 {
      font-size: 3.5rem;
    }
    
    h2 {
      font-size: 1.8rem;
    }
    
    .names {
      font-size: 2.8rem;
    }
    
    section {
      padding: 4rem 0;
    }
  }

  @media (max-width: 576px) {
    h1 {
      font-size: 3rem;
    }
    
    .names {
      font-size: 2.5rem;
    }
    
    .and {
      font-size: 2rem;
    }
  }
`;

export default GlobalStyles;