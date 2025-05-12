
import React from 'react';
import { ExternalLink } from 'lucide-react';
import MetalPriceCard from './MetalPriceCard';

interface MetalPrice {
  price: number;
  change: number;
  changePercentage: number;
}

interface MetalPrices {
  gold: MetalPrice;
  silver: MetalPrice;
  platinum: MetalPrice;
  palladium: MetalPrice;
  timestamp: string;
}

interface PriceDisplaySectionProps {
  isLoading: boolean;
  error: unknown;
  data: MetalPrices | undefined;
}

const PriceDisplaySection = ({ isLoading, error, data }: PriceDisplaySectionProps) => {
  // Show optimized loading state
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse w-10 h-10 rounded-full bg-survival-200 mx-auto mb-3"></div>
        <p className="text-gray-600 text-sm">Loading prices...</p>
      </div>
    );
  }

  // Handle errors efficiently
  if (error) {
    return (
      <div className="text-center py-8 text-red-600 text-sm">
        <p>Unable to fetch latest prices. Please try again later.</p>
      </div>
    );
  }

  // Ensure data exists
  if (!data) {
    return null;
  }

  // Format the timestamp once
  const formattedTime = new Date(data.timestamp).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetalPriceCard 
          name="Gold" 
          data={data.gold} 
          color="border-t-yellow-500" 
          kitcoUrl="https://www.kitco.com/charts/livegold.html" 
        />
        <MetalPriceCard 
          name="Silver" 
          data={data.silver} 
          color="border-t-gray-400" 
          kitcoUrl="https://www.kitco.com/charts/livesilver.html" 
        />
        <MetalPriceCard 
          name="Platinum" 
          data={data.platinum} 
          color="border-t-blue-300" 
          kitcoUrl="https://www.kitco.com/charts/liveplatinum.html" 
        />
        <MetalPriceCard 
          name="Palladium" 
          data={data.palladium} 
          color="border-t-gray-500" 
          kitcoUrl="https://www.kitco.com/charts/livepalladium.html" 
        />
      </div>

      <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
        <span>Updated: {formattedTime}</span>
        <a 
          href="https://www.kitco.com/market/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-finance-600 hover:text-finance-700 flex items-center"
        >
          More details
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
    </div>
  );
};

export default PriceDisplaySection;
