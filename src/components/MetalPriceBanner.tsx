
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowDown, ArrowUp, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MetalPrice {
  price: number;
  change: number;
  changePercentage: number;
}

interface MetalPrices {
  gold: MetalPrice;
  silver: MetalPrice;
  timestamp: string;
}

const fetchMetalPrices = async (): Promise<MetalPrices> => {
  // Simulating API call with mock data
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    gold: {
      price: 2304.75,
      change: 12.50,
      changePercentage: 0.54
    },
    silver: {
      price: 28.16,
      change: 0.23,
      changePercentage: 0.82
    },
    timestamp: new Date().toISOString()
  };
};

const MetalPriceBanner = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['metalPricesBanner'],
    queryFn: fetchMetalPrices,
    refetchInterval: 60000, // Refetch every minute
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const formatChange = (change: number) => {
    const prefix = change > 0 ? '+' : '';
    return `${prefix}${change.toFixed(2)}`;
  };

  const getChangeColor = (change: number) => {
    return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600';
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-survival-50 to-finance-50 py-2 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <div className="text-sm text-gray-600">Loading precious metal prices...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return null; // Don't show the banner if there's an error
  }

  return (
    <div className="bg-gradient-to-r from-survival-50 to-finance-50 py-2 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Coins className="h-4 w-4 mr-2 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">Live Precious Metals:</span>
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
          
          <div>
            <Link to="/services/metal-prices" className="text-xs text-finance-600 hover:text-finance-700 font-medium">
              View All Prices →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetalPriceBanner;
