
import React from 'react';
import { Coins, ExternalLink, Info } from 'lucide-react';

const IntroSection = () => {
  return (
    <section>
      <div className="bg-survival-50 rounded-xl p-6 border border-survival-100">
        <h2 className="text-2xl font-bold mb-4 text-survival-800 flex items-center gap-2">
          <Coins className="h-6 w-6 text-finance-600" />
          Live Precious Metal Prices
        </h2>
        <p className="text-lg">
          Monitor current market prices for the major precious metals. These prices are updated regularly to help you make informed investment decisions for your retirement portfolio.
        </p>
        <div className="mt-4 flex items-center justify-between">
          <p className="flex items-center text-sm text-gray-600">
            <Info className="h-4 w-4 mr-2" />
            Prices shown are per troy ounce in USD
          </p>
          <a 
            href="https://www.kitco.com/market/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-finance-600 hover:text-finance-700 flex items-center"
          >
            Data provided by Kitco.com
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
