
import React from 'react';
import SectionHeading from '@/components/common/SectionHeading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const WhatsIncludedSection = () => {
  return (
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
  );
};

export default WhatsIncludedSection;
