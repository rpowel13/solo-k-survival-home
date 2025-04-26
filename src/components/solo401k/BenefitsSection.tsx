
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';

const BenefitsSection = () => {
  const benefits = [
    {
      title: "Higher Contribution Limits",
      description: "Contribute up to $70,000 annually (2025), far exceeding traditional IRA limits."
    },
    {
      title: "Tax-Deferred Growth",
      description: "Investments grow tax-deferred until withdrawal, maximizing compound growth potential."
    },
    {
      title: "Investment Flexibility",
      description: "Freedom to invest in a wide range of assets including real estate, precious metals, and private companies."
    },
    {
      title: "Loan Provisions",
      description: "Borrow up to 50% or $50,000 from your account for any purpose."
    },
    {
      title: "Roth Option",
      description: "Choose between traditional tax-deferred or Roth after-tax contributions."
    },
    {
      title: "Asset Protection",
      description: "Strong creditor protection for your retirement assets under ERISA guidelines."
    },
    {
      title: "Checkbook Control",
      description: "Direct control over investments without custodian approval requirements."
    },
    {
      title: "Cost Effective",
      description: "No percentage-based fees or assets under management charges."
    },
    {
      title: "Easy Administration",
      description: "Simplified reporting and compliance requirements for single-participant plans."
    },
    {
      title: "Spousal Contributions",
      description: "Include your spouse in the plan, doubling potential contribution limits."
    }
  ];

  return (
    <section>
      <SectionHeading className="text-2xl font-bold mb-6 text-survival-800">
        Key Benefits
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index} className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="h-5 w-5 text-finance-600" />
                {benefit.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
