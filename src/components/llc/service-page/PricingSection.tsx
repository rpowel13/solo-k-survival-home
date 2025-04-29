
import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, DollarSign } from 'lucide-react';

const PricingSection = () => {
  return (
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
  );
};

export default PricingSection;
