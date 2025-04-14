
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
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse w-12 h-12 rounded-full bg-survival-200 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading current prices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>There was an error fetching the latest metal prices. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetalPriceCard 
          name="Gold" 
          data={data!.gold} 
          color="border-t-yellow-500" 
          kitcoUrl="https://www.kitco.com/charts/livegold.html" 
        />
        <MetalPriceCard 
          name="Silver" 
          data={data!.silver} 
          color="border-t-gray-400" 
          kitcoUrl="https://www.kitco.com/charts/livesilver.html" 
        />
        <MetalPriceCard 
          name="Platinum" 
          data={data!.platinum} 
          color="border-t-blue-300" 
          kitcoUrl="https://www.kitco.com/charts/liveplatinum.html" 
        />
        <MetalPriceCard 
          name="Palladium" 
          data={data!.palladium} 
          color="border-t-gray-500" 
          kitcoUrl="https://www.kitco.com/charts/livepalladium.html" 
        />
      </div>

      <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
        <span>Last updated: {new Date(data!.timestamp).toLocaleString()}</span>
        <a 
          href="https://www.kitco.com/market/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-finance-600 hover:text-finance-700 flex items-center"
        >
          Visit Kitco.com for more details
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
    </div>
  );
};

export default PriceDisplaySection;
