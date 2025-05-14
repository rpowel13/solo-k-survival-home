
import React, { useState, useEffect, memo } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";

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

const OptimizedImage: React.FC<OptimizedImageProps> = memo(({
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
  const isMobile = useIsMobile();
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: isMobile ? '100px 0px' : '300px 0px', // Reduced margin on mobile
    threshold: 0.1,
  });
  
  // Check if the image is from an external source or local
  const isExternal = src.startsWith('http') || src.startsWith('//');
  
  // If it's an uploadedImage (lovable-uploads), make sure we add the public path
  const imgSrc = (!isExternal && !src.startsWith('/')) ? `/${src}` : src;
  
  // For mobile devices, use smaller images if available
  const getOptimizedSrc = () => {
    if (isMobile && isExternal && !src.includes('lovable-uploads')) {
      // Add logic here to use a smaller version if available
      return imgSrc;
    }
    return imgSrc;
  };
  
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
  
  // Apply size hint for layout stability
  const sizeStyle = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : 'auto',
  };
  
  const optimizedSrc = getOptimizedSrc();
  
  const imageElement = (
    <img
      src={optimizedSrc}
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
      }}
      fetchPriority={priority || loading === 'eager' ? 'high' : 'auto'}
    />
  );
  
  // Cleanup function to reduce memory usage
  useEffect(() => {
    return () => {
      if (isLoaded) {
        // Help browser know this image can be garbage collected if needed
        const img = new Image();
        img.src = 'about:blank';
      }
    };
  }, [isLoaded]);
  
  return (
    <div ref={ref} className="relative" style={sizeStyle}>
      {(!isLoaded) && (
        <Skeleton 
          className={`${className} absolute inset-0`} 
          style={sizeStyle}
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
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
