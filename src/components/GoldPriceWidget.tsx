
import React, { useState, useEffect, useRef } from 'react';

const GoldPriceWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    
    const widgetContainer = document.getElementById('gold-price-widget-container');
    if (widgetContainer) {
      observer.observe(widgetContainer);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Track iframe loading performance
  const handleIframeLoad = () => {
    setIsLoaded(true);
    if (performance && performance.getEntriesByType) {
      const resources = performance.getEntriesByType('resource');
      const widgetResource = resources.find(r => r.name.includes('goldeneaglecoin'));
      if (widgetResource) {
        console.log('Gold price widget loaded in:', Math.round(widgetResource.duration), 'ms');
      }
    }
  };

  return (
    <div id="gold-price-widget-container" className="border border-gray-200 w-[280px] h-[250px] bg-white">
      {isVisible ? (
        <div>
          <div id="gec-widget-price-frame">
            {!isLoaded && (
              <div className="flex items-center justify-center h-[215px] w-full">
                <div className="text-sm text-gray-400">Loading price data...</div>
              </div>
            )}
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
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-sm text-gray-400">Loading price widget...</div>
        </div>
      )}
    </div>
  );
};

export default GoldPriceWidget;
