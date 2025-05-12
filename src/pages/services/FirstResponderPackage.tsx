import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Award, Briefcase, Shield, CheckCircle2, BadgePercent } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wallet, PiggyBank, CircleDollarSign, Receipt, Key, ArrowLeftRight, UserMinus, TrendingUp, Clock } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import FirstResponderBenefitsSection from '@/components/llc/service-page/FirstResponderBenefitsSection';

const FirstResponderPackage = () => {
  // Top features to display in the header
  const topFeatures = [
    "Asset protection through LLC formation",
    "Enhanced retirement planning with Solo 401k",
    "Tax advantages specific to first responders",
    "Vehicle purchase tax benefits",
    "High contribution limits up to $73,500 (2025)",
    "Special discounts for firefighters, police, and EMTs"
  ];
  
  return (
    <ServiceLayout
      title="First Responder Services"
      description="Specialized retirement and asset protection solutions designed exclusively for firefighters, police officers, EMTs, and other first responders."
      topFeatures={topFeatures}
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

        {/* Reformatted LLC Benefits Section with Linear Bands */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold px-6 text-survival-800">LLC Benefits for First Responders</h2>
          
          <div className="bg-finance-50 rounded-lg p-6 border border-finance-100">
            <h3 className="text-xl font-semibold mb-4 text-finance-700 flex items-center gap-2">
              <Shield className="h-5 w-5 text-finance-600" />
              Personal Asset Protection
            </h3>
            <p className="text-gray-700">
              First responders face unique liability concerns due to the nature of their work. An LLC creates a legal separation between personal and business assets, helping protect personal savings, property, and investments from business-related liabilities and lawsuits.
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
            <h3 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
              <BadgePercent className="h-5 w-5 text-finance-600" />
              Enhanced Tax Benefits
            </h3>
            <p className="text-gray-700">
              Gain access to tax deductions specifically valuable for first responders, including equipment purchases, specialized training costs, home office expenses for side consulting, and business use of personal vehicles for travel between work sites.
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h3 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-finance-600" />
              Retirement Planning Enhancement
            </h3>
            <p className="text-gray-700">
              An LLC structure is the foundation for setting up a Solo 401(k), allowing you to build significant additional retirement savings beyond your department pension. This two-tier approach creates financial security while maximizing tax advantages.
            </p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6 border border-green-100">
            <h3 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-finance-600" />
              Equipment Acquisition
            </h3>
            <p className="text-gray-700">
              Purchase specialized equipment, vehicles, and tactical gear through your LLC for significant tax advantages. This is particularly valuable for first responders who often invest in high-quality personal equipment for both official duties and side work.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-survival-50 to-finance-50 rounded-lg p-6 border border-survival-100">
            <h3 className="text-xl font-semibold mb-4 text-survival-800">First Responder Specific Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-medium text-survival-800 mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-finance-600" />
                  Asset Protection
                </h4>
                <p className="text-sm text-gray-600">Separate personal assets from liabilities associated with side business work.</p>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-medium text-survival-800 mb-2 flex items-center gap-2">
                  <BadgePercent className="h-4 w-4 text-finance-600" />
                  Tax Advantages
                </h4>
                <p className="text-sm text-gray-600">Deductions for business expenses related to your first responder side gig.</p>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-medium text-survival-800 mb-2 flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-finance-600" />
                  Simplified Accounting
                </h4>
                <p className="text-sm text-gray-600">Clear separation between personal and business finances for easier tax filing.</p>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-medium text-survival-800 mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-finance-600" />
                  Credibility
                </h4>
                <p className="text-sm text-gray-600">Enhanced professional image when providing services outside your primary role.</p>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-medium text-survival-800 mb-2 flex items-center gap-2">
                  <PiggyBank className="h-4 w-4 text-finance-600" />
                  Retirement Planning
                </h4>
                <p className="text-sm text-gray-600">Access to business retirement plans like Solo 401(k)s with higher contribution limits.</p>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-medium text-survival-800 mb-2 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-finance-600" />
                  Asset Acquisition
                </h4>
                <p className="text-sm text-gray-600">Purchase vehicles and equipment through your LLC for better tax treatment.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-survival-800">Benefits of Solo 401k for First Responders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wallet className="h-5 w-5 text-finance-600" />
                  Tax-Smart Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Choose between traditional pre-tax or Roth contributions to complement your pension. Perfect for first responders looking to maximize their retirement benefits beyond standard department plans.</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <PiggyBank className="h-5 w-5 text-finance-600" />
                  High Contribution Potential
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Perfect for your off-duty or consulting income. In 2025, eligible first responders can contribute up to $73,500, significantly boosting their retirement savings beyond pension benefits.</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="h-5 w-5 text-finance-600" />
                  Investment Freedom
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Take control of your investments beyond standard pension options. Explore real estate, precious metals, and other alternative investments that align with your long-term security goals.</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-finance-600" />
                  Family Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">If your spouse helps with your side business or consulting work, they can participate in the plan, creating an additional layer of financial security for your family.</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CircleDollarSign className="h-5 w-5 text-finance-600" />
                  Emergency Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Access loans up to $50,000 when needed. Perfect for unexpected expenses or opportunities, with the flexibility first responders need while keeping your retirement funds working for you.</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Receipt className="h-5 w-5 text-finance-600" />
                  Tax Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Deduct contributions from your side business income, reducing your tax burden while building a secure future. Especially valuable for first responders with additional income streams.</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Key className="h-5 w-5 text-finance-600" />
                  Direct Control
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Enjoy "checkbook control" over your retirement funds. No need to wait for third-party approvals, giving you the quick response time first responders are accustomed to.</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ArrowLeftRight className="h-5 w-5 text-finance-600" />
                  Easy Transfers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Seamlessly roll over existing retirement accounts. Perfect for consolidating various retirement funds from previous departments or private sector employment.</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <UserMinus className="h-5 w-5 text-finance-600" />
                  Perfect for Side Work
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Ideal for first responders with independent consulting, training, or other off-duty business activities. No full-time employees needed to qualify.</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-finance-600" />
                  Growth Potential
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Build substantial retirement savings alongside your pension. Perfect for first responders wanting to maximize their long-term financial security through diversified investments.</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-finance-600" />
                  Asset Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Enjoy strong legal protections for your retirement savings, crucial for first responders who face unique liability concerns in their line of duty.</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-finance-600" />
                  Flexible Timing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Make contributions until your tax filing deadline, giving first responders the flexibility needed to manage contributions around shift work and varying income schedules.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-survival-800">First Responder Service Pricing</h2>
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
                  <li className="flex items-start">
                    <BadgePercent className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>10% Discount at Checkout</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <div className="text-2xl font-bold text-center mb-4">$795</div>
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
                  <li className="flex items-start">
                    <BadgePercent className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>10% Discount at Checkout</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <div className="text-2xl font-bold text-center mb-4">$1,200</div>
                  <Link to="/apply/solo-401k">
                    <Button className="w-full bg-finance-600 hover:bg-finance-700">
                      Get Started with Solo 401k
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
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
