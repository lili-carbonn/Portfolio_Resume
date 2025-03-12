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
    
    // Check if the image URL is from the API
    const isApiImage = typeof processedSrc === 'string' && (
      processedSrc.startsWith('/api/') || 
      processedSrc.includes('/api/media/')
    );
    
    // For API images, use the API route for uploads with the full image
    if (isApiImage) {
      console.log('Original API image URL:', processedSrc);
      
      // Special handling for Example_Image_OS_Project.webp
      if (processedSrc.includes('Example_Image_OS_Project')) {
        processedSrc = `/uploads/Example_Image_OS_Project.webp`;
        console.log('Using direct path for Example_Image_OS_Project:', processedSrc);
      }
      // Special handling for embeddings_visualization.webp
      else if (processedSrc.includes('embeddings_visualization')) {
        processedSrc = `/uploads/embeddings_visualization.webp`;
        console.log('Using direct path for embeddings_visualization:', processedSrc);
      }
      // For other API images
      else {
        // Extract the filename from the API URL
        const filenameMatch = processedSrc.match(/\/([^\/]+)$/);
        if (filenameMatch && filenameMatch[1]) {
          let filename = filenameMatch[1];
          
          // Remove any size suffixes like -150x150, -600x400, etc.
          filename = filename.replace(/-\d+x\d+(\.\w+)$/, '$1');
          
          // Use the direct path to the uploads directory
          processedSrc = `/uploads/${filename}`;
          console.log('Using direct path for image:', processedSrc);
        }
      }
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
        unoptimized={imgSrc.includes('Example_Image_OS_Project') || imgSrc.includes('embeddings_visualization')}
        {...props}
      />
    </>
  );
};

export default ImageWithFallback;
