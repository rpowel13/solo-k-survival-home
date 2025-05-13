
import React, { useState, useCallback, memo } from 'react';
import { ArrowDown, ArrowUp, Coins, ExternalLink, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice, formatChange, getChangeColor } from '@/utils/metalPriceUtils';
import { useMetalPrices } from '@/services/metalPriceService';
import { useIsMobile } from "@/hooks/use-mobile";

const MetalPriceItem = memo(({ 
  label, 
  price, 
  change 
}: { 
  label: string; 
  price: number; 
  change: number;
}) => (
  <div className="flex items-center space-x-1">
    <span className="text-xs sm:text-sm font-medium">{label}:</span>
    <span className="text-xs sm:text-sm font-bold">{formatPrice(price)}</span>
    <span className={`text-xs ${getChangeColor(change)}`}>
      {change > 0 ? (
        <ArrowUp className="h-3 w-3 inline" />
      ) : change < 0 ? (
        <ArrowDown className="h-3 w-3 inline" />
      ) : null}
      {formatChange(change)}
    </span>
  </div>
));

MetalPriceItem.displayName = 'MetalPriceItem';

const LoadingState = memo(() => (
  <div className="bg-gradient-to-r from-survival-50 to-finance-50 py-1 border-b border-gray-200">
    <div className="container mx-auto px-2 text-center">
      <div className="text-xs text-gray-600 flex items-center justify-center">
        <RefreshCw className="h-3 w-3 animate-spin mr-2" />
        Loading prices...
      </div>
    </div>
  </div>
));

LoadingState.displayName = 'LoadingState';

const MetalPriceBanner: React.FC = () => {
  const { data, isLoading, refetch, error } = useMetalPrices();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const isMobile = useIsMobile();

  const handleRefresh = useCallback(() => {
    refetch();
    setLastUpdated(new Date());
  }, [refetch]);

  // Set up auto-refresh every 5 minutes
  React.useEffect(() => {
    const intervalId = setInterval(handleRefresh, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [handleRefresh]);

  if (isLoading && !data) {
    return <LoadingState />;
  }

  if (error && !data) {
    return null; // Don't show the banner if there's an error and no fallback data
  }

  return (
    <div className="bg-gradient-to-r from-survival-50 to-finance-50 py-1 border-b border-gray-200">
      <div className="container mx-auto px-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Coins className="h-3 w-3 mr-1 text-yellow-600" />
            <span className="text-xs font-medium text-gray-700">Live Metals</span>
          </div>
          
          <div className="flex space-x-2 sm:space-x-6">
            {/* Gold Price */}
            <MetalPriceItem 
              label="Gold" 
              price={data!.gold.price}
              change={data!.gold.change}
            />
            
            {/* Silver Price - Hide on small mobile */}
            {!isMobile && (
              <MetalPriceItem 
                label="Silver" 
                price={data!.silver.price}
                change={data!.silver.change}
              />
            )}
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={handleRefresh} 
              className="mr-1 text-xs text-finance-600 hover:text-finance-700 flex items-center"
            >
              <RefreshCw className="h-3 w-3" />
              <span className="sr-only sm:not-sr-only sm:ml-1">Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MetalPriceBanner);
