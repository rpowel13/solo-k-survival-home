
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Coins, Gem, Landmark, BarChart4, Map } from 'lucide-react';

const InvestmentOptionsSection = () => {
  return (
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
  );
};

export default InvestmentOptionsSection;
