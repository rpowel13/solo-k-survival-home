
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';

const BenefitsSection = () => {
  return (
    <section>
      <SectionHeading className="text-2xl font-bold mb-6 text-survival-800">
        Key Benefits
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-finance-600" />
              Higher Contribution Limits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contribute up to $70,000 annually (2025), far exceeding traditional IRA limits, allowing you to accelerate your retirement savings.</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-finance-600" />
              Flexible Investment Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Invest in a wide range of assets beyond traditional stocks and bonds, including real estate, precious metals, private equity, and more.</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-finance-600" />
              Loan Provisions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access to loan provisions allowing you to borrow up to 50% of your account value (maximum $50,000) for any purpose.</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-finance-600" />
              Roth Option Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Choose between traditional tax-deferred contributions or Roth contributions for tax-free growth and distributions in retirement.</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-finance-600" />
              Checkbook Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Maintain direct control over your retirement funds without requiring custodian approval for investments.</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-finance-600" />
              Tax Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Reduce your current tax liability while building tax-advantaged retirement savings for your future.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BenefitsSection;
