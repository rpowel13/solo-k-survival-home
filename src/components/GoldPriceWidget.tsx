
import React from 'react';

const GoldPriceWidget = () => {
  return (
    <div className="border border-gray-200 w-[280px] h-[215px] bg-white overflow-hidden">
      <div id="gec-widget-price-frame">
        <iframe 
          src="https://www.goldeneaglecoin.com/widget/price" 
          frameBorder="0" 
          width="280" 
          height="215" 
          scrolling="no" 
          style={{ display: 'block', marginTop: '-35px' }}
          title="Gold Eagle Coin Price Widget"
        />
      </div>
    </div>
  );
};

export default GoldPriceWidget;
