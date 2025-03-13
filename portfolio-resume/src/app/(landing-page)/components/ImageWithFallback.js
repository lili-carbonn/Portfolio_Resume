"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const ImageWithFallback = ({
  src,
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Process the image source and reset state when src changes
  useEffect(() => {
    setLoading(true);
    setError(false);
    
    let processedSrc = src;
    
    // If src is an object with a URL property, extract the URL
    if (typeof src === 'object' && src?.url) {
      processedSrc = src.url;
    }
    
    // Simplify image path handling - just use the filename directly
    if (typeof processedSrc === 'string') {
      console.log('Original image URL:', processedSrc);
      
      // Handle special cases
      if (processedSrc.includes('20241225_160255')) {
        processedSrc = '/20241225_160255.webp';
      }
      // For API paths, extract just the filename
      else if (processedSrc.includes('/api/') || processedSrc.includes('/api/media/')) {
        const filenameMatch = processedSrc.match(/\/([^\/]+)$/);
        if (filenameMatch && filenameMatch[1]) {
          processedSrc = `/${filenameMatch[1]}`;
        }
      }
      // Ensure path starts with a slash
      else if (!processedSrc.startsWith('/')) {
        processedSrc = `/${processedSrc}`;
      }
      
      console.log('Using image path:', processedSrc);
    }
    
    setImgSrc(processedSrc);
  }, [src]);
  
  // Handle image load success
  const handleLoad = () => {
    console.log('Image loaded successfully:', imgSrc);
    setLoading(false);
  };

  // Handle image load error
  const handleError = () => {
    console.error('Error loading image:', imgSrc);
    setError(true);
    setLoading(false);
    
    // If the image fails to load, try to use a fallback
    if (imgSrc !== '/Orb_Example_Image.webp') {
      console.log('Trying fallback image');
      setError(false); // Reset error state
      setLoading(true); // Show loading spinner again
      setImgSrc('/Orb_Example_Image.webp');
    }
  };

  return (
    <>
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-0 bg-gray-100">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-0 bg-gray-100 text-red-500 text-sm text-center p-2">
          <p>Image could not be loaded</p>
        </div>
      )}
      
      {/* Image */}
      <Image
        src={imgSrc}
        alt={alt || "Image"}
        onLoad={handleLoad}
        onError={handleError}
        className={`z-10 ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        unoptimized={true}
        {...props}
      />
    </>
  );
};

export default ImageWithFallback;
