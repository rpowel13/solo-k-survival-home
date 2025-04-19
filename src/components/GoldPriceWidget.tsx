
import React from 'react';

const GoldPriceWidget = () => {
  return (
    <div className="border border-gray-200 w-[280px] h-[250px] bg-white">
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
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GoldPriceWidget;
