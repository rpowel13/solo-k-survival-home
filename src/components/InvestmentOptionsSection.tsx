
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Building2, WalletCards, ChartPie, DollarSign, HandCoins } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const InvestmentOptionsSection = ({ className }: { className?: string }) => {
  const investments = [
    {
      title: "Precious Metals",
      description: "Invest in IRS-approved gold, silver, platinum, and palladium bullion coins.",
      tooltip: "Protect your wealth with time-tested precious metals - a safe haven in uncertain times.",
      icon: <Coins className="h-6 w-6 text-yellow-600" />
    },
    {
      title: "Real Estate",
      description: "Purchase residential, commercial properties, or invest in real estate notes.",
      tooltip: "Build lasting wealth through tangible property investments with strong growth potential.",
      icon: <Building2 className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Private Equity",
      description: "Invest in private businesses, startups, and venture capital opportunities.",
      tooltip: "Access high-growth potential investments before they hit the public markets.",
      icon: <ChartPie className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Wall Street Assets",
      description: "Access traditional stocks, bonds, ETFs, mutual funds, and other publicly traded securities.",
      tooltip: "Diversify your portfolio with established market securities for steady growth.",
      icon: <DollarSign className="h-6 w-6 text-green-600" />
    },
    {
      title: "Hardmoney Lending",
      description: "Provide direct loans secured by real estate with competitive interest rates.",
      tooltip: "Generate passive income through secured, high-yield private lending opportunities.",
      icon: <HandCoins className="h-6 w-6 text-teal-600" />
    },
    {
      title: "Cryptocurrency",
      description: "Diversify with Bitcoin and other approved digital currencies.",
      tooltip: "Embrace the future of finance with strategic cryptocurrency investments.",
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
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Card className="bg-white transition-shadow duration-300 hover:shadow-lg cursor-pointer">
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
              </TooltipTrigger>
              <TooltipContent>
                <p>{investment.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentOptionsSection;
