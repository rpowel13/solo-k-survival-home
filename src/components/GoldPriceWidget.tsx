
import React, { useState, useRef, memo, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import { useIsMobile } from "@/hooks/use-mobile";

const GoldPriceWidget = () => {
  const isMobile = useIsMobile();
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: isMobile ? '100px' : '300px',
    threshold: 0.1,
  });
  
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Don't load iframe content on mobile until user interaction
  const [userInteracted, setUserInteracted] = useState(false);
  
  const handleIframeLoad = () => {
    setIsLoaded(true);
  };
  
  const handleWidgetClick = () => {
    if (isMobile && !userInteracted) {
      setUserInteracted(true);
    }
  };

  // Should we load the iframe content?
  const shouldLoadIframe = inView && (!isMobile || userInteracted);

  // Cleanup iframe when component unmounts to free memory
  useEffect(() => {
    return () => {
      if (iframeRef.current) {
        iframeRef.current.src = 'about:blank';
      }
    };
  }, []);

  return (
    <div 
      ref={ref} 
      id="gold-price-widget-container" 
      className="border border-gray-200 w-[280px] h-[250px] bg-white"
      onClick={handleWidgetClick}
    >
      {!inView ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <div>
          <div id="gec-widget-price-frame" className="relative">
            {!isLoaded && (
              <div className="flex items-center justify-center h-[215px] w-full">
                {isMobile && !userInteracted ? (
                  <div className="text-sm text-gray-400 p-4 text-center">
                    Tap to load live gold prices
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">Loading price data...</div>
                )}
              </div>
            )}
            {shouldLoadIframe && (
              <iframe 
                ref={iframeRef}
                src="https://www.goldeneaglecoin.com/widget/price" 
                frameBorder="0" 
                width="280" 
                height="215" 
                scrolling="no" 
                style={{ display: 'block', opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
                title="Gold Eagle Coin Price Widget"
                loading="lazy"
                onLoad={handleIframeLoad}
              />
            )}
          </div>
          <div id="gec-widget-price-footer" className="text-center">
            <a 
              href="https://www.goldeneaglecoin.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-black no-underline"
            >
              <img 
                src="https://assets.goldeneaglecoin.com/resource/images/gec-logo-small-light.png" 
                alt="Golden Eagle Coin Logo"
                className="border-0"
                loading="lazy"
                width="145"
                height="20"
              />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(GoldPriceWidget);
