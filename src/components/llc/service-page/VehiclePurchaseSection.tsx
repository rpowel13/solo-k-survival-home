
import React from 'react';
import SectionHeading from '@/components/common/SectionHeading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Car, Shield, CreditCard, FileCheck, Receipt, FileText } from 'lucide-react';

const VehiclePurchaseSection = () => {
  return (
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
  );
};

export default VehiclePurchaseSection;
