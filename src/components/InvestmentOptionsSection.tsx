
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Building2, BarChart4, WalletCards, ChartPie } from "lucide-react";
import GoldPriceWidget from './GoldPriceWidget';

const InvestmentOptionsSection = ({ className }: { className?: string }) => {
  const investments = [
    {
      title: "Precious Metals",
      description: "Invest in IRS-approved gold, silver, platinum, and palladium bullion coins.",
      icon: <Coins className="h-6 w-6 text-yellow-600" />
    },
    {
      title: "Real Estate",
      description: "Purchase residential, commercial properties, or invest in real estate notes.",
      icon: <Building2 className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Private Equity",
      description: "Invest in private businesses, startups, and venture capital opportunities.",
      icon: <ChartPie className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Stock Market",
      description: "Trade stocks, bonds, mutual funds, and ETFs with complete control.",
      icon: <BarChart4 className="h-6 w-6 text-green-600" />
    },
    {
      title: "Cryptocurrency",
      description: "Diversify with Bitcoin and other approved digital currencies.",
      icon: <WalletCards className="h-6 w-6 text-orange-600" />
    }
  ];

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-survival-800 mb-4">
            Diverse Investment Options
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your Solo 401k opens the door to a wide range of investment opportunities beyond traditional options. Take control of your retirement with these powerful investment choices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {investments.map((investment, index) => (
            <Card key={index} className="bg-white transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {investment.icon}
                  {investment.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{investment.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-semibold text-survival-800 mb-2">
              Live Precious Metals Pricing
            </h3>
            <p className="text-gray-600">
              Stay updated with current precious metal prices for your investment decisions
            </p>
          </div>
          <GoldPriceWidget />
        </div>
      </div>
    </section>
  );
};

export default InvestmentOptionsSection;
