"use client";

import { useRef } from 'react';
import useInView from '../hooks/useInView';

const ScrollAnimation = ({ 
  children, 
  className = '', 
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  animation = 'animate-scroll-fade-in'
}) => {
  const { ref, isInView } = useInView({
    threshold,
    rootMargin
  });

  return (
    <div 
      ref={ref} 
      className={`opacity-0 ${isInView ? animation : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
