"use client";

import ScrollAnimation from './ScrollAnimation';

const AnimatedSectionTitle = ({ children, className = '' }) => {
  return (
    <ScrollAnimation>
      <h2 className={`text-4xl font-bold text-foreground mb-8 text-center tracking-tight ${className}`}>
        {children}
      </h2>
    </ScrollAnimation>
  );
};

export default AnimatedSectionTitle;
