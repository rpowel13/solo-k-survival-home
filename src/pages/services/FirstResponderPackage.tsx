import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Award, Briefcase, Shield, CheckCircle2, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FirstResponderPackage = () => {
  return (
    <ServiceLayout
      title="First Responder Services"
      description="Specialized retirement and asset protection solutions designed exclusively for firefighters, police officers, EMTs, and other first responders."
    >
      <div className="space-y-12">
        <section>
          <div className="bg-survival-50 rounded-xl p-6 border border-survival-100">
            <h2 className="text-2xl font-bold mb-4 text-survival-800 flex items-center gap-2">
              <Award className="h-6 w-6 text-finance-600" />
              Exclusively for First Responders
            </h2>
            <p className="text-lg">
              At Survival 401k, we recognize the unique financial challenges and opportunities that first responders face. We offer specialized LLC and Solo 401k services designed to help those who serve our communities every day.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LLC Section */}
          <Card className="border-l-4 border-l-survival-600">
            <CardHeader>
              <CardTitle className="text-2xl">LLC Formation</CardTitle>
              <CardDescription>Asset Protection for First Responders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Professional liability protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Side business structuring</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Complete formation service</span>
                </li>
              </ul>
              <div className="pt-4">
                <div className="text-2xl font-bold text-center mb-4">$699</div>
                <Link to="/apply/llc">
                  <Button className="w-full bg-survival-600 hover:bg-survival-700">
                    Get Started with LLC
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Solo 401k Section */}
          <Card className="border-l-4 border-l-finance-600">
            <CardHeader>
              <CardTitle className="text-2xl">Solo 401k</CardTitle>
              <CardDescription>Retirement Planning for First Responders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Pension complement strategy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>High contribution limits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Tax-advantaged savings</span>
                </li>
              </ul>
              <div className="pt-4">
                <div className="text-2xl font-bold text-center mb-4">$1,095</div>
                <Link to="/apply/solo-401k">
                  <Button className="w-full bg-finance-600 hover:bg-finance-700">
                    Get Started with Solo 401k
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-survival-800">Special Benefits for First Responders</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-finance-600" />
                Side Business Optimization
              </h3>
              <p>
                Many first responders maintain side businesses or consulting work during off-duty hours. Our package is specifically designed to help you legally structure these activities to maximize tax benefits and protection.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-finance-600" />
                Pension Complement Strategy
              </h3>
              <p>
                We'll help you develop a retirement strategy that complements your existing pension benefits, allowing you to build additional tax-advantaged savings that you control.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-finance-600" />
                Asset Protection Planning
              </h3>
              <p>
                First responders face unique liability concerns. Our comprehensive asset protection strategy helps shield your personal assets from professional liabilities and lawsuits.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-finance-600" />
                Preferred Pricing
              </h3>
              <p>
                As a token of our appreciation for your service, first responders receive special bundled pricing on our combined LLC and Solo 401k services, representing significant savings over our standard rates.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-survival-800">Why First Responders Choose Survival 401k</h2>
          <div className="prose max-w-none">
            <p>
              First responders trust Survival 401k because we understand the unique financial circumstances of public service careers. Our team includes specialists with experience in serving the first responder community, and we're committed to helping those who serve our communities secure their financial futures.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                <span>Specialized knowledge of first responder benefits and compensation structures</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                <span>Experience with shift work and side business optimization</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                <span>Understanding of pension systems and how to complement them</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                <span>Dedicated support team for ongoing assistance</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ServiceLayout>
  );
};

export default FirstResponderPackage;
