import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Coins, Gem, Landmark, BarChart4, Map, Lightbulb, DollarSign } from 'lucide-react';

const AlternativeInvestments = () => {
  return (
    <ServiceLayout
      title="Alternative Investments"
      description="Diversify your retirement portfolio beyond traditional stocks and bonds with self-directed alternative investment options."
    >
      <div id="top" className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6 text-survival-800">Beyond the Stock Market</h2>
          <div className="prose max-w-none">
            <p className="text-lg">
              One of the most powerful benefits of a self-directed Solo 401k is the ability to invest in a wide range of alternative assets beyond traditional stocks, bonds, and mutual funds.
            </p>
            <p className="mt-4">
              At Survival 401k, we help you navigate the world of alternative investments, providing education, resources, and connections to help you build a truly diversified retirement portfolio aligned with your expertise and interests.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-survival-800">Alternative Investment Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-finance-600" />
                  Real Estate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Invest directly in residential or commercial properties, rehab projects, tax liens, trust deeds, and real estate notes.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-finance-600" />
                  Precious Metals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Purchase IRS-approved gold, silver, platinum, and palladium bullion and coins as a hedge against inflation.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-finance-600" />
                  Private Lending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Act as a private lender and earn interest income by providing mortgage loans, business loans, or peer-to-peer lending.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart4 className="h-5 w-5 text-finance-600" />
                  Private Equity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Invest in private companies, startups, venture capital funds, and private placements not available on public markets.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-finance-600" />
                  Tax Lien Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Purchase tax lien certificates from local governments and earn returns through interest or property acquisition.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gem className="h-5 w-5 text-finance-600" />
                  Cryptocurrency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Invest in Bitcoin, Ethereum, and other digital currencies through specialized custodians.</p>
              </CardContent>
            </Card>
          </div>
        </section>

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

        <section>
          <h2 className="text-2xl font-bold mb-6 text-survival-800">How Survival 401k Supports Your Alternative Investment Strategy</h2>
          <div className="prose max-w-none">
            <p>
              Our Solo 401k plans are specifically designed to maximize your alternative investment opportunities. We provide:
            </p>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start">
                <div className="bg-survival-100 p-1 rounded-full mr-3 mt-1">
                  <span className="text-survival-700 font-bold text-sm">1</span>
                </div>
                <div>
                  <strong className="text-survival-800">Educational Resources:</strong> Comprehensive guides, webinars, and workshops on various alternative investment strategies.
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-survival-100 p-1 rounded-full mr-3 mt-1">
                  <span className="text-survival-700 font-bold text-sm">2</span>
                </div>
                <div>
                  <strong className="text-survival-800">Checkbook Control:</strong> Our plans provide direct checkbook control, allowing you to act quickly on investment opportunities without custodian delays.
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-survival-100 p-1 rounded-full mr-3 mt-1">
                  <span className="text-survival-700 font-bold text-sm">3</span>
                </div>
                <div>
                  <strong className="text-survival-800">Professional Network:</strong> Access to our network of alternative investment specialists, including real estate experts, precious metals dealers, and private equity opportunities.
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-survival-100 p-1 rounded-full mr-3 mt-1">
                  <span className="text-survival-700 font-bold text-sm">4</span>
                </div>
                <div>
                  <strong className="text-survival-800">Compliance Guidance:</strong> Clear guidelines on prohibited transactions and investment restrictions to keep your retirement plan compliant with IRS regulations.
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-survival-100 p-1 rounded-full mr-3 mt-1">
                  <span className="text-survival-700 font-bold text-sm">5</span>
                </div>
                <div>
                  <strong className="text-survival-800">Due Diligence Support:</strong> Resources to help you evaluate alternative investment opportunities and conduct proper due diligence.
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ServiceLayout>
  );
};

export default AlternativeInvestments;
