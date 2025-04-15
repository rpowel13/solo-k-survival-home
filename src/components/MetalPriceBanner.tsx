
import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, Coins, ExternalLink, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice, formatChange, getChangeColor } from '@/utils/metalPriceUtils';
import { useMetalPrices } from '@/services/metalPriceService';

const MetalPriceBanner = () => {
  const { data, isLoading, refetch, error } = useMetalPrices();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const handleRefresh = () => {
    refetch();
    setLastUpdated(new Date());
  };

  // Set up auto-refresh every 5 minutes
  useEffect(() => {
    const intervalId = setInterval(handleRefresh, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading && !data) {
    return (
      <div className="bg-gradient-to-r from-survival-50 to-finance-50 py-2 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <div className="text-sm text-gray-600 flex items-center justify-center">
            <RefreshCw className="h-3 w-3 animate-spin mr-2" />
            Loading precious metal prices...
          </div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return null; // Don't show the banner if there's an error and no fallback data
  }

  return (
    <div className="bg-gradient-to-r from-survival-50 to-finance-50 py-2 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Coins className="h-4 w-4 mr-2 text-yellow-600" />
            <a 
              href="https://www.kitco.com/market/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-survival-700 flex items-center"
            >
              Live Precious Metals
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
          
          <div className="flex space-x-6">
            {/* Gold Price */}
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Gold:</span>
              <span className="text-sm font-bold">{formatPrice(data!.gold.price)}</span>
              <span className={`text-xs ml-1 ${getChangeColor(data!.gold.change)}`}>
                {data!.gold.change > 0 ? (
                  <ArrowUp className="h-3 w-3 inline" />
                ) : data!.gold.change < 0 ? (
                  <ArrowDown className="h-3 w-3 inline" />
                ) : null}
                {formatChange(data!.gold.change)}
              </span>
            </div>
            
            {/* Silver Price */}
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Silver:</span>
              <span className="text-sm font-bold">{formatPrice(data!.silver.price)}</span>
              <span className={`text-xs ml-1 ${getChangeColor(data!.silver.change)}`}>
                {data!.silver.change > 0 ? (
                  <ArrowUp className="h-3 w-3 inline" />
                ) : data!.silver.change < 0 ? (
                  <ArrowDown className="h-3 w-3 inline" />
                ) : null}
                {formatChange(data!.silver.change)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={handleRefresh} 
              className="mr-3 text-xs text-finance-600 hover:text-finance-700 flex items-center"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </button>
            <Link to="/services/metal-prices" className="text-xs text-finance-600 hover:text-finance-700 font-medium flex items-center">
              View All Prices
              <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetalPriceBanner;
