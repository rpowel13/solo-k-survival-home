
import React from 'react';
import { Coins } from 'lucide-react';

const InvestmentBenefitsSection = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-survival-800">Investing in Precious Metals with Your Solo 401k</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
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
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="rounded-xl overflow-hidden shadow-xl border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1610375461369-d5c68fce41a1?auto=format&fit=crop&q=80&w=800" 
              alt="Gold and silver investments" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 mt-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/3">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=800" 
                alt="Financial planning with gold" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-xl font-semibold mb-3">How Survival 401k Facilitates Precious Metal Investments</h3>
            <p>
              Our Solo 401k plans provide the structure and flexibility needed to invest in IRS-approved precious metals. We guide you through the entire process, from selecting a reputable precious metals dealer to arranging secure storage solutions that comply with IRS requirements.
            </p>
            <p className="mt-4">
              Contact us today to learn more about incorporating precious metals into your retirement strategy. Our experts can help you determine the appropriate allocation based on your financial goals and risk tolerance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentBenefitsSection;
