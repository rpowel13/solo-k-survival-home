
import React from 'react';
import { Coins, TrendingUp, BadgeDollarSign, ShieldCheck, PiggyBank } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
            <ul className="mt-2 space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <Badge className="mb-1 bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">Portfolio Diversification</Badge>
                  <p className="text-gray-700">Precious metals often move independently of stocks and bonds, providing true diversification.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-full mr-4 mt-1">
                  <BadgeDollarSign className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <Badge className="mb-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-none">Inflation Protection</Badge>
                  <p className="text-gray-700">Physical gold and silver have historically maintained purchasing power through periods of high inflation.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-4 mt-1">
                  <ShieldCheck className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <Badge className="mb-1 bg-red-100 text-red-800 hover:bg-red-200 border-none">Crisis Hedge</Badge>
                  <p className="text-gray-700">Precious metals often perform well during periods of economic uncertainty or geopolitical crisis.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                  <PiggyBank className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <Badge className="mb-1 bg-green-100 text-green-800 hover:bg-green-200 border-none">Tangible Assets</Badge>
                  <p className="text-gray-700">Unlike paper assets, physical precious metals represent tangible wealth that cannot be printed or diluted.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="rounded-xl overflow-hidden shadow-xl border-4 border-white">
            <img 
              src="/lovable-uploads/be71559b-7615-4648-886f-57d84b585d2e.png" 
              alt="Gold bars and coins with scale of justice" 
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
                src="/lovable-uploads/1a9cd712-eda5-4c0c-8082-4f6a8d41ef09.png" 
                alt="Gold bars with trading chart in background" 
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
