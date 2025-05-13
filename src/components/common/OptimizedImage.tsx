
import React, { useState, useEffect, memo } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
  decoding?: 'async' | 'sync' | 'auto';
  priority?: boolean;
  aspectRatio?: number;
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
  priority = false,
  aspectRatio,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px', // Load images 200px before they enter viewport
  });
  
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

  // Use native loading="lazy" except for priority images
  const loadingAttribute = priority ? 'eager' : loading;
  
  const imageElement = (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      loading={loadingAttribute}
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
      fetchPriority={priority || loading === 'eager' ? 'high' : 'auto'}
    />
  );
  
  return (
    <div ref={ref} className="relative">
      {(!isLoaded) && (
        <Skeleton 
          className={`${className} absolute inset-0`} 
          style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
        />
      )}
      
      {(inView || priority) && (
        aspectRatio ? (
          <AspectRatio ratio={aspectRatio}>
            {imageElement}
          </AspectRatio>
        ) : (
          imageElement
        )
      )}
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(OptimizedImage);
