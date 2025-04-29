
import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { 
  Briefcase, Shield, Clock, FileText, PieChart, CheckCircle2, 
  DollarSign, Building, LineChart, Target, Car, CreditCard, 
  FileCheck, Receipt, ArrowRight
} from 'lucide-react';
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
      <div className="space-y-16 max-w-4xl mx-auto">
        {/* Introduction Section - Simplified */}
        <section>
          <SectionHeading className="text-3xl font-bold mb-6 text-survival-800 border-b border-gray-200 pb-2" highlightTerm="LLC">
            Why Form an LLC?
          </SectionHeading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-survival-800">Personal Asset Protection</h3>
              <p className="text-gray-700">
                A Limited Liability Company (LLC) creates a legal separation between your personal and business assets, 
                protecting your personal wealth from business liabilities.
              </p>
            </div>
            
            <div className="bg-survival-50 p-6 rounded-xl shadow-sm border border-survival-100">
              <h3 className="text-xl font-semibold mb-3 text-survival-800">First Responders & Gig Workers</h3>
              <p className="text-gray-700">
                If you're a first responder with side income or working in the gig economy, an LLC can help protect 
                your personal assets while providing tax benefits for your income.
              </p>
            </div>
          </div>
        </section>

        {/* Key Benefits Section - Enhanced with cards */}
        <section>
          <SectionHeading className="text-3xl font-bold mb-8 text-survival-800 border-b border-gray-200 pb-2">
            Key Benefits of an LLC
          </SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
              <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-finance-600" />
                  Asset Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Shield your personal assets from business debts, lawsuits, and other liabilities from your business operations.</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
              <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-finance-600" />
                  Tax Flexibility
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Choose how your LLC is taxed—as a sole proprietorship, partnership, S-Corporation, or C-Corporation.</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
              <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-finance-600" />
                  Enhanced Credibility
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Establish credibility with clients, vendors, and partners by operating as a formal business entity.</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Building Your Financial Future Section */}
        <section className="py-8">
          <SectionHeading className="text-3xl font-bold mb-8 text-survival-800 border-b border-gray-200 pb-2">
            Building Your Financial Future
          </SectionHeading>
          
          <div className="space-y-8">
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
            
            <div className="bg-survival-50 rounded-xl p-6 border border-survival-100">
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
          </div>
        </section>

        {/* Vehicle Purchase Section */}
        <section className="py-8">
          <SectionHeading className="text-3xl font-bold mb-8 text-survival-800 border-b border-gray-200 pb-2">
            Vehicle Purchases Through Your LLC
          </SectionHeading>
          
          <div className="space-y-8">
            <p className="text-lg">
              Purchasing vehicles through your LLC can provide significant tax advantages and liability protection. Here's how an LLC structure can optimize your vehicle-related expenses and protect your assets:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-gray-200 hover:border-survival-300 transition-all duration-300 hover:shadow-md h-full">
                <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Car className="h-5 w-5 text-finance-600" />
                    Tax Deductions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p>Deduct vehicle expenses including depreciation, insurance, maintenance, fuel, and loan interest when used for business purposes.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 hover:border-survival-300 transition-all duration-300 hover:shadow-md h-full">
                <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-finance-600" />
                    Liability Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p>Reduce personal liability in case of accidents when the vehicle is properly registered and insured under your LLC's name.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 hover:border-survival-300 transition-all duration-300 hover:shadow-md h-full">
                <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="h-5 w-5 text-finance-600" />
                    Business Credit
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p>Build business credit history separate from your personal credit when financing vehicles through your LLC.</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-survival-50 rounded-xl p-6 border border-survival-100">
              <h3 className="text-xl font-semibold mb-4 text-survival-800">First Responder Vehicle Benefits</h3>
              <p>
                For first responders, purchasing personal or work-related vehicles through your LLC can provide additional tax benefits, especially when the vehicle is used for side gigs, consulting, or community service work outside of your primary employment.
              </p>
            </div>
            
            <div className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="vehicle-documentation">
                  <AccordionTrigger className="text-lg font-medium text-survival-800">Required Documentation</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-survival-50 p-2 rounded-full mr-4 flex-shrink-0">
                          <FileCheck className="h-5 w-5 text-finance-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">LLC Operating Agreement</h4>
                          <p className="text-gray-600 mt-1">Your operating agreement should explicitly authorize the purchase and use of vehicles.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-survival-50 p-2 rounded-full mr-4 flex-shrink-0">
                          <Receipt className="h-5 w-5 text-finance-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Mileage Log</h4>
                          <p className="text-gray-600 mt-1">Maintain detailed records of business vs. personal use to maximize legitimate tax deductions.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-survival-50 p-2 rounded-full mr-4 flex-shrink-0">
                          <FileText className="h-5 w-5 text-finance-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Insurance Documentation</h4>
                          <p className="text-gray-600 mt-1">Proper business insurance for vehicles owned by your LLC.</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="tax-considerations">
                  <AccordionTrigger className="text-lg font-medium text-survival-800">Tax Considerations</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">
                      When purchasing vehicles through your LLC, you have several tax options:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Section 179 deduction for immediate write-off of qualifying vehicles</li>
                      <li>Bonus depreciation options for significant first-year deductions</li>
                      <li>Standard mileage rate vs. actual expenses - we'll help you determine which is more advantageous</li>
                      <li>Leasing vs. purchasing analysis based on your specific business needs</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* First Responder & Gig Economy Benefits - Simplified */}
        <section className="bg-gradient-to-r from-survival-50 to-white p-8 rounded-xl shadow-sm border border-survival-100">
          <SectionHeading className="text-2xl font-bold mb-6 text-survival-800 border-b border-survival-100 pb-2">
            First Responder & Gig Economy Benefits
          </SectionHeading>
          
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
          </div>
        </section>

        {/* LLC Formation Process - Process Map Style */}
        <section>
          <SectionHeading className="text-3xl font-bold mb-8 text-survival-800 border-b border-gray-200 pb-2">
            Our LLC Formation Process
          </SectionHeading>
          <div className="relative">
            {/* Process timeline line */}
            <div className="absolute left-8 top-10 bottom-10 w-1 bg-survival-100 hidden md:block"></div>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-6 relative">
                <div className="md:w-16 h-16 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold shadow-sm flex-shrink-0 z-10">1</div>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex-grow">
                  <h3 className="text-xl font-semibold mb-3">Consultation</h3>
                  <p className="text-gray-700">We start with a detailed consultation to understand your business needs, goals, and specific requirements for your LLC.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 relative">
                <div className="md:w-16 h-16 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold shadow-sm flex-shrink-0 z-10">2</div>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex-grow">
                  <h3 className="text-xl font-semibold mb-3">Document Preparation</h3>
                  <p className="text-gray-700">Our team prepares all necessary formation documents, including Articles of Organization, Operating Agreement, and EIN application.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 relative">
                <div className="md:w-16 h-16 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold shadow-sm flex-shrink-0 z-10">3</div>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex-grow">
                  <h3 className="text-xl font-semibold mb-3">Filing & Registration</h3>
                  <p className="text-gray-700">We file your documents with the appropriate state agency and secure your LLC registration.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 relative">
                <div className="md:w-16 h-16 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold shadow-sm flex-shrink-0 z-10">4</div>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex-grow">
                  <h3 className="text-xl font-semibold mb-3">EIN & Banking Setup</h3>
                  <p className="text-gray-700">We obtain your Federal Employer Identification Number (EIN) and provide banking resolution documents to establish your business accounts.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 relative">
                <div className="md:w-16 h-16 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold shadow-sm flex-shrink-0 z-10">5</div>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex-grow">
                  <h3 className="text-xl font-semibold mb-3">Compliance Support</h3>
                  <p className="text-gray-700">We provide ongoing compliance support for your first year, ensuring you meet all state requirements and deadlines.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Section - Enhanced with cards */}
        <section>
          <SectionHeading className="text-3xl font-bold mb-8 text-survival-800 border-b border-gray-200 pb-2">
            What's Included in Our LLC Formation Service
          </SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
              <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                <div className="bg-survival-50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-5 w-5 text-finance-600" />
                </div>
                <CardTitle>Name Availability Search</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>We verify that your desired LLC name is available in your state before filing.</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
              <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                <div className="bg-survival-50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-5 w-5 text-finance-600" />
                </div>
                <CardTitle>Articles of Organization</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Preparation and filing of your Articles of Organization with the state.</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
              <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                <div className="bg-survival-50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-5 w-5 text-finance-600" />
                </div>
                <CardTitle>Custom Operating Agreement</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>A comprehensive operating agreement tailored to your specific business needs and state requirements.</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
              <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                <div className="bg-survival-50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-5 w-5 text-finance-600" />
                </div>
                <CardTitle>EIN Obtainment</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Application for your Federal Employer Identification Number (EIN) with the IRS.</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
              <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                <div className="bg-survival-50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-5 w-5 text-finance-600" />
                </div>
                <CardTitle>Banking Resolution</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>Documentation required to open a business bank account for your new LLC.</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
              <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
                <div className="bg-survival-50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-5 w-5 text-finance-600" />
                </div>
                <CardTitle>Compliance Calendar</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>A customized calendar of important filing dates and compliance deadlines for your LLC.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Section - Enhanced card format */}
        <section className="mb-12">
          <SectionHeading className="text-3xl font-bold mb-8 text-survival-800 border-b border-gray-200 pb-2">
            Pricing
          </SectionHeading>
          
          <Card className="overflow-hidden border-2 border-survival-100 shadow-lg">
            <CardHeader className="bg-gradient-to-br from-survival-50 to-white border-b border-survival-100">
              <div className="mx-auto mb-4 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                <DollarSign className="h-10 w-10 text-finance-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-center text-survival-800">$795</CardTitle>
              <CardDescription className="text-xl text-center text-gray-700">Complete LLC Formation Package</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-finance-600 mr-3 flex-shrink-0" />
                  <span>State filing fees included</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-finance-600 mr-3 flex-shrink-0" />
                  <span>All required legal documents</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-finance-600 mr-3 flex-shrink-0" />
                  <span>EIN application assistance</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-finance-600 mr-3 flex-shrink-0" />
                  <span>One year of compliance support</span>
                </li>
              </ul>
            </CardContent>
            
            <CardFooter className="flex justify-center pb-8 pt-2">
              <Link to="/apply/llc">
                <Button size="lg" className="bg-survival-600 hover:bg-survival-700 text-white font-medium px-8 py-6 text-lg">
                  Start Your LLC Formation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </section>
      </div>
    </ServiceLayout>
  );
};

export default LLCCreation;

