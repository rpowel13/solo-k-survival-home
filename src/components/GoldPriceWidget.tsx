
import React, { useState, useEffect } from 'react';

const GoldPriceWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const widgetContainer = document.getElementById('gold-price-widget-container');
    if (widgetContainer) {
      observer.observe(widgetContainer);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div id="gold-price-widget-container" className="border border-gray-200 w-[280px] h-[250px] bg-white">
      {isVisible ? (
        <div>
          <div id="gec-widget-price-frame">
            <iframe 
              src="https://www.goldeneaglecoin.com/widget/price" 
              frameBorder="0" 
              width="280" 
              height="215" 
              scrolling="no" 
              style={{ display: 'block' }}
              title="Gold Eagle Coin Price Widget"
              loading="lazy"
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
