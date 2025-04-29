import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Shield, Clock, FileText, PieChart, CheckCircle2, DollarSign, Building, LineChart, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/common/SectionHeading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const LLCCreation = () => {
  return (
    <ServiceLayout
      title="LLC Creation Service"
      description="Protect your personal assets and optimize your tax situation with our professional LLC formation services."
    >
      <div className="space-y-12 max-w-4xl mx-auto">
        {/* Introduction Section */}
        <section>
          <SectionHeading className="text-3xl font-bold mb-6 text-survival-800 border-b border-gray-200 pb-2" highlightTerm="LLC">
            Why Form an LLC?
          </SectionHeading>
          <div className="prose max-w-none">
            <p className="text-lg">
              A Limited Liability Company (LLC) provides the liability protection of a corporation with the tax benefits and operational flexibility of a partnership or sole proprietorship.
            </p>
            <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="mb-0">
                For self-employed professionals, small business owners, and real estate investors, forming an LLC creates a legal separation between your personal and business assets, protecting your personal wealth from business liabilities.
              </p>
            </div>
            <div className="mt-6 bg-survival-50 p-6 rounded-xl shadow-sm border border-survival-100">
              <p className="font-medium text-survival-800 mb-2 text-lg">First Responders and Gig Workers</p>
              <p className="mb-0">
                If you're a first responder with side income or working in the gig economy (rideshare, delivery, freelancing, consulting, etc.), an LLC can help protect your personal assets while providing tax benefits for your income. Any gig income qualifies and can be significantly helped by operating under an LLC structure.
              </p>
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section>
          <SectionHeading className="text-3xl font-bold mb-6 text-survival-800 border-b border-gray-200 pb-2">
            Key Benefits of an LLC
          </SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border border-gray-200 hover:border-survival-300 transition-all duration-300 hover:shadow-md">
              <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-finance-600" />
                  Personal Asset Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Shield your personal assets from business debts, lawsuits, and other liabilities that may arise from your business operations.</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:border-survival-300 transition-all duration-300 hover:shadow-md">
              <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-finance-600" />
                  Tax Flexibility
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Choose how your LLC is taxed—as a sole proprietorship, partnership, S-Corporation, or C-Corporation—to optimize your tax situation.</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:border-survival-300 transition-all duration-300 hover:shadow-md">
              <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-finance-600" />
                  Simplified Paperwork
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Enjoy less paperwork and fewer formalities compared to corporations, while still maintaining legal protection.</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:border-survival-300 transition-all duration-300 hover:shadow-md">
              <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-finance-600" />
                  Enhanced Credibility
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Establish credibility with clients, vendors, and partners by operating as a formal business entity rather than a sole proprietorship.</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:border-survival-300 transition-all duration-300 hover:shadow-md">
              <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-finance-600" />
                  Perpetual Existence
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Your LLC can continue to exist even if ownership changes, providing continuity for your business.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our LLC Formation Process */}
        <section>
          <SectionHeading className="text-3xl font-bold mb-6 text-survival-800 border-b border-gray-200 pb-2">
            Our LLC Formation Process
          </SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-survival-50 rounded-bl-3xl -z-10"></div>
              <div className="w-12 h-12 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-sm">1</div>
              <h3 className="text-xl font-semibold mb-3">Consultation</h3>
              <p className="text-gray-700">We start with a detailed consultation to understand your business needs, goals, and specific requirements for your LLC.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-survival-50 rounded-bl-3xl -z-10"></div>
              <div className="w-12 h-12 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-sm">2</div>
              <h3 className="text-xl font-semibold mb-3">Document Preparation</h3>
              <p className="text-gray-700">Our team prepares all necessary formation documents, including Articles of Organization, Operating Agreement, and EIN application.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-survival-50 rounded-bl-3xl -z-10"></div>
              <div className="w-12 h-12 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-sm">3</div>
              <h3 className="text-xl font-semibold mb-3">Filing & Setup</h3>
              <p className="text-gray-700">We file your documents with the appropriate state agency, obtain your EIN from the IRS, and help set up your new LLC properly.</p>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section>
          <SectionHeading className="text-3xl font-bold mb-6 text-survival-800 border-b border-gray-200 pb-2">
            What's Included in Our LLC Formation Service
          </SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-survival-50 p-2 rounded-full mr-4 flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-finance-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Name Availability Search</h3>
                  <p className="text-gray-600 mt-1">We verify that your desired LLC name is available in your state before filing.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-survival-50 p-2 rounded-full mr-4 flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-finance-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Articles of Organization</h3>
                  <p className="text-gray-600 mt-1">Preparation and filing of your Articles of Organization with the state.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-survival-50 p-2 rounded-full mr-4 flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-finance-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Custom Operating Agreement</h3>
                  <p className="text-gray-600 mt-1">A comprehensive operating agreement tailored to your specific business needs and state requirements.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-survival-50 p-2 rounded-full mr-4 flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-finance-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">EIN Obtainment</h3>
                  <p className="text-gray-600 mt-1">Application for your Federal Employer Identification Number (EIN) with the IRS.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-survival-50 p-2 rounded-full mr-4 flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-finance-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Banking Resolution</h3>
                  <p className="text-gray-600 mt-1">Documentation required to open a business bank account for your new LLC.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-survival-50 p-2 rounded-full mr-4 flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-finance-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Compliance Calendar</h3>
                  <p className="text-gray-600 mt-1">A customized calendar of important filing dates and compliance deadlines for your LLC.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Building Your Financial Future Section */}
        <section className="py-8">
          <SectionHeading className="text-3xl font-bold mb-6 text-survival-800 border-b border-gray-200 pb-2">
            Building Your Financial Future
          </SectionHeading>
          
          <div className="space-y-6">
            <p className="text-lg">
              An LLC is more than just a legal entity—it's a foundational building block for your financial future. Here's how an LLC can help you build wealth and secure your financial goals:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 relative">
                <div className="h-12 w-12 bg-survival-100 rounded-full mb-4 flex items-center justify-center">
                  <Building className="h-6 w-6 text-survival-700" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-survival-800">Asset Building</h3>
                <p className="text-gray-600">
                  Create a distinct entity to acquire assets, from real estate to investments, with enhanced protection and favorable tax treatment.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 relative">
                <div className="h-12 w-12 bg-survival-100 rounded-full mb-4 flex items-center justify-center">
                  <LineChart className="h-6 w-6 text-survival-700" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-survival-800">Tax Optimization</h3>
                <p className="text-gray-600">
                  Take advantage of business deductions, retirement plan options, and strategic income planning not available to individuals.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 relative">
                <div className="h-12 w-12 bg-survival-100 rounded-full mb-4 flex items-center justify-center">
                  <Target className="h-6 w-6 text-survival-700" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-survival-800">Legacy Planning</h3>
                <p className="text-gray-600">
                  Establish a structure that can outlive you, creating a vehicle for generational wealth transfer and business continuity.
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-survival-50 rounded-xl p-6 border border-survival-100">
              <h3 className="text-xl font-semibold mb-4 text-survival-800">First Responders: Building Financial Security</h3>
              <p>
                For first responders, an LLC offers a pathway to build financial security beyond your primary career. Whether it's structuring your side business, managing rental properties, or creating a consulting practice, an LLC gives you the flexibility to build wealth while protecting what you've already earned.
              </p>
            </div>
            
            <div className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="retirement-planning">
                  <AccordionTrigger className="text-lg font-medium text-survival-800">Retirement Planning with an LLC</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">
                      When you operate through an LLC, you gain access to powerful retirement planning options not available to individuals, including:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Solo 401(k) plans with higher contribution limits than traditional IRAs</li>
                      <li>SEP IRAs that allow for substantial tax-deferred retirement savings</li>
                      <li>The ability to build a self-directed retirement portfolio including alternative assets like real estate, precious metals, and private equity</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="wealth-building">
                  <AccordionTrigger className="text-lg font-medium text-survival-800">Wealth Building Strategies</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">
                      Your LLC can serve as the foundation for various wealth-building strategies:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Creating multiple income streams through various business activities</li>
                      <li>Building a portfolio of income-generating assets under the protection of your LLC</li>
                      <li>Establishing business credit separate from your personal credit</li>
                      <li>Structuring joint ventures and partnerships with enhanced liability protection</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="exit-strategies">
                  <AccordionTrigger className="text-lg font-medium text-survival-800">Exit Strategies and Business Value</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">
                      A properly structured LLC creates long-term value that can be monetized:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Ability to sell membership interests in your LLC</li>
                      <li>Option to merge with or be acquired by larger entities</li>
                      <li>Creation of a business with transferable value independent of your personal involvement</li>
                      <li>Structured succession planning for family businesses</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/apply/llc">
                <Button size="lg" className="bg-survival-600 hover:bg-survival-700 text-white font-medium px-10">
                  Start Building Your Financial Future
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* First Responder & Gig Economy Benefits */}
        <section className="bg-gradient-to-r from-survival-50 to-white p-8 rounded-xl shadow-sm border border-survival-100">
          <SectionHeading className="text-2xl font-bold mb-6 text-survival-800">
            First Responder & Gig Economy Benefits
          </SectionHeading>
          
          <div className="space-y-4">
            <p className="text-lg">
              We offer specialized LLC formation services for first responders (firefighters, EMTs, paramedics, etc.) and gig economy workers with additional benefits:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <Shield className="h-5 w-5 text-finance-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-survival-800">Asset Protection</h3>
                  <p className="text-sm text-gray-600">Separate your personal assets from any liabilities associated with your side business or gig work.</p>
                </div>
              </div>
              
              <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <DollarSign className="h-5 w-5 text-finance-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-survival-800">Tax Advantages</h3>
                  <p className="text-sm text-gray-600">Potential deductions for business expenses related to your side gig that may not be available as an individual.</p>
                </div>
              </div>
              
              <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <FileText className="h-5 w-5 text-finance-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-survival-800">Simplified Accounting</h3>
                  <p className="text-sm text-gray-600">Clearer separation between personal and business finances for easier tax filing and record keeping.</p>
                </div>
              </div>
              
              <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <Briefcase className="h-5 w-5 text-finance-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-survival-800">Credibility</h3>
                  <p className="text-sm text-gray-600">Enhanced professional image when providing services outside your primary role.</p>
                </div>
              </div>
              
              <div className="flex items-start bg-white p-4 rounded-lg shadow-sm md:col-span-2">
                <PieChart className="h-5 w-5 text-finance-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-survival-800">Gig Income Optimization</h3>
                  <p className="text-sm text-gray-600">Structure your rideshare, delivery, freelance, or other gig income in the most advantageous way possible, minimizing taxes and maximizing deductions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section>
          <SectionHeading className="text-3xl font-bold mb-6 text-survival-800 border-b border-gray-200 pb-2">
            Pricing
          </SectionHeading>
          
          <div className="bg-soft-purple rounded-xl p-8 shadow-lg text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-[#D6BCFA]/20 to-[#8B5CF6]/20 opacity-50 -z-10"></div>
            
            <div className="mx-auto mb-6 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
              <DollarSign className="h-10 w-10 text-finance-600" />
            </div>
            
            <h3 className="text-4xl font-bold text-survival-800 mb-2">$795</h3>
            <p className="text-xl mb-6 text-gray-700">
              Complete LLC Formation and Documentation
            </p>
            
            <ul className="text-left mb-8 max-w-md mx-auto space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-finance-600 mr-2" />
                <span className="text-gray-700">State filing fees included</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-finance-600 mr-2" />
                <span className="text-gray-700">All required legal documents</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-finance-600 mr-2" />
                <span className="text-gray-700">EIN application assistance</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-finance-600 mr-2" />
                <span className="text-gray-700">One year of compliance support</span>
              </li>
            </ul>
            
            <Link to="/apply/llc">
              <Button size="lg" className="bg-survival-600 hover:bg-survival-700 text-white font-medium px-10">
                Get Started
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </ServiceLayout>
  );
};

export default LLCCreation;
