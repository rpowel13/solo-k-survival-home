import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, DollarSign, Shield, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PrequalificationSection from '@/components/solo401k/PrequalificationSection';
import SectionHeading from '@/components/common/SectionHeading';

const Solo401k = () => {
  return (
    <ServiceLayout
      title="Solo 401k Plans"
      description="Maximize your retirement savings with a personalized Solo 401k plan designed specifically for self-employed professionals and small business owners."
      callToAction={{ text: "Apply Now", link: "/apply/solo-401k" }}
    >
      <div className="space-y-12">
        <section>
          <SectionHeading className="text-2xl font-bold mb-6 text-survival-800">
            What is a Solo 401k?
          </SectionHeading>
          <div className="prose max-w-none">
            <p className="text-lg">
              A Solo 401k, also known as an Individual 401k, is a tax-advantaged retirement plan specifically designed for self-employed individuals and small business owners with no full-time employees (other than a spouse).
            </p>
            <p className="mt-4">
              With a Solo 401k, you can contribute both as the employer and the employee, allowing for significantly higher contribution limits compared to traditional IRAs or even SEP IRAs.
            </p>
          </div>
        </section>

        <PrequalificationSection />

        <section>
          <SectionHeading className="text-2xl font-bold mb-6 text-survival-800">
            Key Benefits
          </SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
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
            <Card>
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
            <Card>
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
            <Card>
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
            <Card>
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
            <Card>
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

        <section>
          <SectionHeading className="text-2xl font-bold mb-6 text-survival-800">
            Who Qualifies for a Solo 401k?
          </SectionHeading>
          <div className="prose max-w-none">
            <p>To qualify for a Solo 401k, you must:</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                <span>Have self-employment income (full-time or part-time)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                <span>Have no full-time employees other than yourself and your spouse</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                <span>Generate self-employment income through a sole proprietorship, LLC, partnership, or corporation</span>
              </li>
            </ul>
            <p className="mt-4">
              Even if you have a full-time job with an employer-sponsored retirement plan, you can still establish a Solo 401k for your side business or freelance income.
            </p>
          </div>
        </section>

        <section>
          <SectionHeading className="text-2xl font-bold mb-6 text-survival-800">
            Why Choose Survival 401k?
          </SectionHeading>
          <div className="prose max-w-none">
            <p className="text-lg">
              At Survival 401k, we specialize in creating customized Solo 401k plans that provide maximum flexibility and investment options. Our services include:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                <span>Complete plan documentation and IRS compliance</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                <span>Ongoing support and consultation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                <span>Educational resources and investment guidance</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                <span>Simplified administration and reporting</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                <span>Access to our network of investment professionals</span>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-survival-800">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm text-center">
              <div className="flex items-center justify-center mb-4">
                <DollarSign className="h-8 w-8 text-finance-600 mr-2" />
                <h3 className="text-3xl font-bold text-survival-800">$1,200</h3>
              </div>
              <p className="text-lg mb-4 text-gray-600">
                Comprehensive Solo 401k Plan Documentation and Setup
              </p>
              <div className="flex items-center justify-center text-finance-600 text-sm mb-4">
                <CalendarCheck className="h-4 w-4 mr-1" />
                <span>2025 Contribution Year Ready</span>
              </div>
              <Link to="/apply/solo-401k">
                <Button size="lg" className="bg-survival-600 hover:bg-survival-700 text-white font-medium">
                  Get Started
                </Button>
              </Link>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm text-center">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-finance-600 mr-2" />
                <h3 className="text-3xl font-bold text-survival-800">$200</h3>
              </div>
              <p className="text-lg mb-2 text-gray-600">
                Annual Maintenance Fee
              </p>
              <p className="text-sm text-gray-500 mb-4">
                For IRS compliance and unlimited support
              </p>
              <Link to="/payment/annual-fee">
                <Button size="lg" className="bg-survival-600 hover:bg-survival-700 text-white font-medium">
                  Pay Annual Fee
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="bg-gray-50 rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-center text-survival-800">Need to Reinstate Your Plan?</h2>
          <p className="text-center text-lg mb-6">
            If your Solo 401k plan needs to be reinstated, we can help you bring it back into good standing.
          </p>
          <div className="flex justify-center">
            <Link to="/payment/reinstatement-fee">
              <Button size="lg" className="bg-survival-600 hover:bg-survival-700 text-white font-medium">
                Pay Reinstatement Fee ($250)
              </Button>
            </Link>
          </div>
        </section>

        <section className="text-center">
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-survival-800">Ready to Get Started?</h2>
            <p className="text-lg mb-6">
              Take the first step toward financial independence and retirement security with a Solo 401k.
            </p>
            <Link to="/apply/solo-401k">
              <Button size="lg" className="bg-survival-600 hover:bg-survival-700 text-white font-medium">
                Apply for Your Solo 401k Today
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </ServiceLayout>
  );
};

export default Solo401k;
