
import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Shield, Clock, FileText, PieChart, CheckCircle2 } from 'lucide-react';

const LLCCreation = () => {
  return (
    <ServiceLayout
      title="LLC Creation Service"
      description="Protect your personal assets and optimize your tax situation with our professional LLC formation services."
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6 text-survival-800">Why Form an LLC?</h2>
          <div className="prose max-w-none">
            <p className="text-lg">
              A Limited Liability Company (LLC) provides the liability protection of a corporation with the tax benefits and operational flexibility of a partnership or sole proprietorship.
            </p>
            <p className="mt-4">
              For self-employed professionals, small business owners, and real estate investors, forming an LLC creates a legal separation between your personal and business assets, protecting your personal wealth from business liabilities.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-survival-800">Key Benefits of an LLC</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-finance-600" />
                  Personal Asset Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Shield your personal assets from business debts, lawsuits, and other liabilities that may arise from your business operations.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-finance-600" />
                  Tax Flexibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Choose how your LLC is taxed—as a sole proprietorship, partnership, S-Corporation, or C-Corporation—to optimize your tax situation.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-finance-600" />
                  Simplified Paperwork
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Enjoy less paperwork and fewer formalities compared to corporations, while still maintaining legal protection.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-finance-600" />
                  Enhanced Credibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Establish credibility with clients, vendors, and partners by operating as a formal business entity rather than a sole proprietorship.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-finance-600" />
                  Perpetual Existence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your LLC can continue to exist even if ownership changes, providing continuity for your business.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-survival-800">Our LLC Formation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <div className="w-12 h-12 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Consultation</h3>
              <p>We start with a detailed consultation to understand your business needs, goals, and specific requirements for your LLC.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <div className="w-12 h-12 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Document Preparation</h3>
              <p>Our team prepares all necessary formation documents, including Articles of Organization, Operating Agreement, and EIN application.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <div className="w-12 h-12 bg-survival-100 text-survival-800 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Filing & Setup</h3>
              <p>We file your documents with the appropriate state agency, obtain your EIN from the IRS, and help set up your new LLC properly.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-survival-800">What's Included in Our LLC Creation Service</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Name Availability Search</h3>
                  <p className="text-gray-600 mt-1">We verify that your desired LLC name is available in your state before filing.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Articles of Organization</h3>
                  <p className="text-gray-600 mt-1">Preparation and filing of your Articles of Organization with the state.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Custom Operating Agreement</h3>
                  <p className="text-gray-600 mt-1">A comprehensive operating agreement tailored to your specific business needs and state requirements.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">EIN Obtainment</h3>
                  <p className="text-gray-600 mt-1">Application for your Federal Employer Identification Number (EIN) with the IRS.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Banking Resolution</h3>
                  <p className="text-gray-600 mt-1">Documentation required to open a business bank account for your new LLC.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Compliance Calendar</h3>
                  <p className="text-gray-600 mt-1">A customized calendar of important filing dates and compliance deadlines for your LLC.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ServiceLayout>
  );
};

export default LLCCreation;
