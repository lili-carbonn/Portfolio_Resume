"use client";

import { useState, useEffect, useRef } from 'react';

export default function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Update state when element enters viewport
      if (entry.isIntersecting) {
        setIsInView(true);
        // Once it's in view, we can stop observing
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, {
      root: null, // Use the viewport as root
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the element is visible
      ...options
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return { ref, isInView };
}
