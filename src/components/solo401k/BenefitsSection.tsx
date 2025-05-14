
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Wallet,
  PiggyBank,
  Briefcase,
  Users,
  CircleDollarSign,
  Receipt,
  Key,
  ArrowLeftRight,
  UserMinus,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';

const BenefitsSection = () => {
  const benefits = [
    {
      title: "Tax Advantages Galore",
      description: "Solo 401ks offer both pre-tax (traditional) and after-tax (Roth) options. You can reduce your taxable income today with pre-tax contributions or enjoy tax-free withdrawals in retirement by opting for Roth contributions.",
      icon: Wallet
    },
    {
      title: "High Contribution Limits",
      description: "The Solo 401k allows you to contribute as both an employee and employer, with total annual limits that far exceed those of traditional IRAs or even SEP IRAs. In 2025, freelancers can stash away up to $73,500 if they qualify.",
      icon: PiggyBank
    },
    {
      title: "Greater Control Over Investments",
      description: "Say goodbye to cookie-cutter options. With Solo 401ks, you're the investment decision-maker, allowing you to explore real estate, cryptocurrency, precious metals, startups, and more—perfect for the financially adventurous.",
      icon: Briefcase
    },
    {
      title: "Spouse Inclusion",
      description: "If your spouse earns income from your business, they can participate in your Solo 401k plan. Together, you can turbocharge your retirement savings and double the benefits.",
      icon: Users
    },
    {
      title: "Loan Opportunities",
      description: "Need cash for a personal project or unexpected expenses? Solo 401k plans offer loans up to $50,000 or 50% of the account value. Plus, you repay yourself with interest, keeping the money within your retirement savings.",
      icon: CircleDollarSign
    },
    {
      title: "Tax Deductions",
      description: "Freelancers can deduct their contributions to their Solo 401k directly from their taxable income, reducing the tax burden while planning for a secure future.",
      icon: Receipt
    },
    {
      title: "No Custodian Required",
      description: "Unlike traditional IRAs, Solo 401ks offer \"checkbook control,\" meaning you're not dependent on a custodian. You can invest directly and access funds without additional fees or delays.",
      icon: Key
    },
    {
      title: "Rollover Freedom",
      description: "If you already have funds in an IRA or other retirement accounts, you can roll them into a Solo 401k seamlessly. This gives you the flexibility to consolidate accounts and streamline your financial management.",
      icon: ArrowLeftRight
    },
    {
      title: "No Employees, No Problem",
      description: "Solo 401ks are tailored for self-employed individuals or business owners with no full-time employees. If you're running a solo enterprise, this plan fits perfectly into your setup.",
      icon: UserMinus
    },
    {
      title: "Long-Term Growth Potential",
      description: "Solo 401ks let freelancers take advantage of compound growth with larger contributions and flexible investment options. This makes them a powerful tool for building a robust retirement portfolio.",
      icon: TrendingUp
    },
    {
      title: "Asset Protection",
      description: "Solo 401ks offer robust legal protections, helping safeguard your retirement savings from potential creditors and legal claims in most states.",
      icon: Shield
    },
    {
      title: "Flexible Contribution Timing",
      description: "You can make contributions up until your tax filing deadline, giving you more flexibility and strategic planning opportunities for your retirement savings.",
      icon: Clock
    }
  ];

  return (
    <section>
      <SectionHeading className="text-2xl font-bold mb-6 text-survival-800">
        Key Benefits
      </SectionHeading>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="transition-all duration-300 hover:scale-105 hover:shadow-lg h-full flex flex-col"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <benefit.icon className="h-5 w-5 text-finance-600" />
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

