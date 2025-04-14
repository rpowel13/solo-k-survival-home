import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Award, Briefcase, ShieldCheck, CheckCircle2, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FirstResponderPackage = () => {
  return (
    <ServiceLayout
      title="First Responder Package"
      description="A specialized retirement and asset protection solution designed exclusively for firefighters, police officers, EMTs, and other first responders."
      callToAction={{ text: "Get Started Today", link: "/contact" }}
    >
      <div className="space-y-12">
        <section>
          <div className="bg-survival-50 rounded-xl p-6 border border-survival-100">
            <h2 className="text-2xl font-bold mb-4 text-survival-800 flex items-center gap-2">
              <Award className="h-6 w-6 text-finance-600" />
              Exclusively for First Responders
            </h2>
            <p className="text-lg">
              At Survival 401k, we recognize the unique financial challenges and opportunities that first responders face. Our First Responder Package combines our LLC Creation and Solo 401k services at a special rate for those who serve our communities every day.
            </p>
            <p className="mt-4">
              This comprehensive package is designed to help first responders build wealth, protect assets, and create tax-advantaged retirement savings while maximizing the benefits available to public service professionals.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-survival-800">Package Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-survival-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-finance-600" />
                  LLC Formation
                </CardTitle>
                <CardDescription>Complete business entity setup</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Name availability search</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Articles of Organization filing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Customized Operating Agreement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>EIN obtainment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Banking resolution</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-finance-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-finance-600" />
                  Solo 401k Plan
                </CardTitle>
                <CardDescription>Customized retirement plan</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Complete plan documentation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Adoption agreement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Setup of plan trust</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Investment strategy consultation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ongoing compliance support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

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
                <ShieldCheck className="h-5 w-5 text-finance-600" />
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

        <section>
          <h2 className="text-2xl font-bold mb-6 text-survival-800">Pricing</h2>
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm text-center">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="h-8 w-8 text-finance-600 mr-2" />
              <h3 className="text-3xl font-bold text-survival-800">$1,700</h3>
            </div>
            <p className="text-lg mb-4 text-gray-600">
              Comprehensive First Responder Package (LLC + Solo 401k)
            </p>
            <Link to="/apply/first-responder">
              <Button size="lg" className="bg-survival-600 hover:bg-survival-700 text-white font-medium">
                Get Started
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </ServiceLayout>
  );
};

export default FirstResponderPackage;
