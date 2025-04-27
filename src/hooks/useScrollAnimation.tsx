import { useEffect, useRef, MutableRefObject } from 'react';
import { useInView } from 'react-intersection-observer';

interface ScrollAnimationOptions {
  threshold?: number;
  delay?: number;
  distance?: string;
  origin?: 'top' | 'right' | 'bottom' | 'left';
  easing?: string;
}

export const useScrollAnimation = (
  options: ScrollAnimationOptions = {}
): [(el: any) => void, boolean] => {
  const {
    threshold = 0.1,
    delay = 0,
    distance = '50px',
    origin = 'bottom',
    easing = 'cubic-bezier(0.5, 0, 0, 1)'
  } = options;

  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial styles
    let translateX = '0';
    let translateY = '0';
    
    switch (origin) {
      case 'top':
        translateY = `-${distance}`;
        break;
      case 'right':
        translateX = distance;
        break;
      case 'bottom':
        translateY = distance;
        break;
      case 'left':
        translateX = `-${distance}`;
        break;
    }
    
    element.style.opacity = '0';
    element.style.transform = `translate(${translateX}, ${translateY})`;
    element.style.transition = `opacity 0.8s ${easing} ${delay}ms, transform 0.8s ${easing} ${delay}ms`;
    
    if (inView) {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translate(0, 0)';
      }, 100);
    }
  }, [inView, delay, distance, origin, easing]);

  const setRefs = (el: any) => {
    elementRef.current = el;
    ref(el);
  };

  return [setRefs, inView];
};

export default useScrollAnimation;