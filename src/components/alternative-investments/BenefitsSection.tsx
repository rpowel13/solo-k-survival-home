
import React from 'react';
import { Lightbulb, DollarSign, Building2, Coins } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-survival-800">Benefits of Alternative Investments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-survival-100 p-3 rounded-full mr-4">
              <Lightbulb className="h-6 w-6 text-survival-700" />
            </div>
            <h3 className="text-xl font-semibold">Portfolio Diversification</h3>
          </div>
          <p>
            Alternative investments often have low correlation with traditional markets, helping to reduce overall portfolio volatility and risk. When stock markets decline, many alternative assets may remain stable or even increase in value.
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-survival-100 p-3 rounded-full mr-4">
              <DollarSign className="h-6 w-6 text-survival-700" />
            </div>
            <h3 className="text-xl font-semibold">Potentially Higher Returns</h3>
          </div>
          <p>
            Many alternative investments offer the potential for higher returns than traditional investments, especially in areas where you have specialized knowledge or expertise. Direct ownership of assets can eliminate management fees that eat into returns.
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-finance-100 p-3 rounded-full mr-4">
              <Building2 className="h-6 w-6 text-finance-700" />
            </div>
            <h3 className="text-xl font-semibold">Leverage Your Expertise</h3>
          </div>
          <p>
            Alternative investments allow you to invest in what you know. If you have expertise in real estate, private businesses, or other non-traditional assets, you can leverage that knowledge to make informed investment decisions.
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-finance-100 p-3 rounded-full mr-4">
              <Coins className="h-6 w-6 text-finance-700" />
            </div>
            <h3 className="text-xl font-semibold">Inflation Protection</h3>
          </div>
          <p>
            Many alternative assets, such as real estate and precious metals, have historically provided excellent protection against inflation, preserving purchasing power over the long term.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
