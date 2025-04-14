
import { useQuery } from '@tanstack/react-query';

export interface MetalPrice {
  price: number;
  change: number;
  changePercentage: number;
}

export interface MetalPrices {
  gold: MetalPrice;
  silver: MetalPrice;
  platinum: MetalPrice;
  palladium: MetalPrice;
  timestamp: string;
}

export const fetchMetalPrices = async (): Promise<MetalPrices> => {
  // In a real implementation, this would call Kitco API
  // Since direct API access may require authentication, we're using mock data for demo
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
  
  // Mock data for demo
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
    platinum: {
      price: 959.80,
      change: -3.20,
      changePercentage: -0.33
    },
    palladium: {
      price: 1087.50,
      change: -5.75,
      changePercentage: -0.53
    },
    timestamp: new Date().toISOString()
  };
};

export const useMetalPrices = () => {
  return useQuery({
    queryKey: ['metalPrices'],
    queryFn: fetchMetalPrices,
    refetchInterval: 300000, // Refetch every 5 minutes (300,000 ms)
  });
};
