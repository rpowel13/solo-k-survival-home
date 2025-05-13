
import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
  decoding?: 'async' | 'sync' | 'auto';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  onClick,
  decoding = 'async',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Check if the image is from an external source or local
  const isExternal = src.startsWith('http') || src.startsWith('//');
  
  // If it's an uploadedImage (lovable-uploads), make sure we add the public path
  const imgSrc = (!isExternal && !src.startsWith('/')) ? `/${src}` : src;
  
  // Calculate srcset for responsive images if dimensions are provided
  const calculateSrcSet = () => {
    if (!width || !height || isExternal) return undefined;
    
    if (src.includes('lovable-uploads')) {
      return undefined; // No processing for uploaded images
    }
    
    // Simple responsive srcset for local images
    if (!isExternal && width) {
      return `${imgSrc} 1x, ${imgSrc} 2x`;
    }
    
    return undefined;
  };
  
  return (
    <>
      {/* Low-quality image placeholder (LQIP) for better perceived performance */}
      {!isLoaded && (
        <div 
          className={`${className} bg-gray-200 animate-pulse`} 
          style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
        />
      )}
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        loading={loading}
        onClick={onClick}
        decoding={decoding}
        srcSet={calculateSrcSet()}
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          // Fallback to placeholder if image fails to load
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = '/placeholder.svg';
          setIsLoaded(true);
          console.log(`Image load error: ${imgSrc}`);
        }}
        fetchPriority={loading === 'eager' ? 'high' : 'auto'}
      />
    </>
  );
};

export default OptimizedImage;
