
import React, { useEffect, useState } from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Coins, Info } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

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

const fetchMetalPrices = async (): Promise<MetalPrices> => {
  // In a real implementation, this would call an actual API
  // For demo purposes, we're using mock data
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

const MetalPrices = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['metalPrices'],
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

  const formatChangePercentage = (percentage: number) => {
    const prefix = percentage > 0 ? '+' : '';
    return `${prefix}${percentage.toFixed(2)}%`;
  };

  const getChangeColor = (change: number) => {
    return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600';
  };

  return (
    <ServiceLayout
      title="Precious Metal Prices"
      description="Monitor current market prices for gold, silver, platinum, and palladium to inform your investment decisions."
    >
      <div className="space-y-12">
        <section>
          <div className="bg-survival-50 rounded-xl p-6 border border-survival-100">
            <h2 className="text-2xl font-bold mb-4 text-survival-800 flex items-center gap-2">
              <Coins className="h-6 w-6 text-finance-600" />
              Live Precious Metal Prices
            </h2>
            <p className="text-lg">
              Monitor current market prices for the major precious metals. These prices are updated regularly to help you make informed investment decisions for your retirement portfolio.
            </p>
            <p className="mt-4 flex items-center text-sm text-gray-600">
              <Info className="h-4 w-4 mr-2" />
              Prices shown are per troy ounce in USD
            </p>
          </div>
        </section>

        <section>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-pulse w-12 h-12 rounded-full bg-survival-200 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading current prices...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              <p>There was an error fetching the latest metal prices. Please try again later.</p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Gold Price Card */}
                <Card className="border-t-4 border-t-yellow-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Gold</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">{formatPrice(data!.gold.price)}</div>
                    <div className={`flex items-center ${getChangeColor(data!.gold.change)}`}>
                      {data!.gold.change > 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : data!.gold.change < 0 ? (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      ) : null}
                      <span>{formatChange(data!.gold.change)} ({formatChangePercentage(data!.gold.changePercentage)})</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Silver Price Card */}
                <Card className="border-t-4 border-t-gray-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Silver</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">{formatPrice(data!.silver.price)}</div>
                    <div className={`flex items-center ${getChangeColor(data!.silver.change)}`}>
                      {data!.silver.change > 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : data!.silver.change < 0 ? (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      ) : null}
                      <span>{formatChange(data!.silver.change)} ({formatChangePercentage(data!.silver.changePercentage)})</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Platinum Price Card */}
                <Card className="border-t-4 border-t-blue-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Platinum</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">{formatPrice(data!.platinum.price)}</div>
                    <div className={`flex items-center ${getChangeColor(data!.platinum.change)}`}>
                      {data!.platinum.change > 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : data!.platinum.change < 0 ? (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      ) : null}
                      <span>{formatChange(data!.platinum.change)} ({formatChangePercentage(data!.platinum.changePercentage)})</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Palladium Price Card */}
                <Card className="border-t-4 border-t-gray-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Palladium</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">{formatPrice(data!.palladium.price)}</div>
                    <div className={`flex items-center ${getChangeColor(data!.palladium.change)}`}>
                      {data!.palladium.change > 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : data!.palladium.change < 0 ? (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      ) : null}
                      <span>{formatChange(data!.palladium.change)} ({formatChangePercentage(data!.palladium.changePercentage)})</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 text-right text-sm text-gray-500">
                Last updated: {new Date(data!.timestamp).toLocaleString()}
              </div>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-survival-800">Investing in Precious Metals with Your Solo 401k</h2>
          <div className="prose max-w-none">
            <p>
              Precious metals have long been considered a safe haven asset and a hedge against inflation. With a self-directed Solo 401k from Survival 401k, you can invest in physical gold, silver, platinum, and palladium as part of your retirement strategy.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Benefits of Precious Metals in Your Retirement Portfolio</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start">
                <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-1">
                  <Coins className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <strong>Portfolio Diversification:</strong> Precious metals often move independently of stocks and bonds, providing true diversification.
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-1">
                  <Coins className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <strong>Inflation Protection:</strong> Physical gold and silver have historically maintained purchasing power through periods of high inflation.
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-1">
                  <Coins className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <strong>Crisis Hedge:</strong> Precious metals often perform well during periods of economic uncertainty or geopolitical crisis.
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-1">
                  <Coins className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <strong>Tangible Assets:</strong> Unlike paper assets, physical precious metals represent tangible wealth that cannot be printed or diluted.
                </div>
              </li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">How Survival 401k Facilitates Precious Metal Investments</h3>
            <p>
              Our Solo 401k plans provide the structure and flexibility needed to invest in IRS-approved precious metals. We guide you through the entire process, from selecting a reputable precious metals dealer to arranging secure storage solutions that comply with IRS requirements.
            </p>
            <p className="mt-4">
              Contact us today to learn more about incorporating precious metals into your retirement strategy. Our experts can help you determine the appropriate allocation based on your financial goals and risk tolerance.
            </p>
          </div>
        </section>
      </div>
    </ServiceLayout>
  );
};

export default MetalPrices;
