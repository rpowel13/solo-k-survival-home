
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';

const WhyChooseSection = () => {
  return (
    <section>
      <SectionHeading className="text-2xl font-bold mb-6 text-survival-800">
        Why Choose Survival 401k?
      </SectionHeading>
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          At Survival 401k, we specialize in creating customized Solo 401k plans that provide maximum flexibility and investment options. Our services include:
        </p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
            <span>Complete plan documentation and IRS compliance assistance</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
            <span>Ongoing support and expert consultation</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
            <span>Comprehensive educational resources and investment guidance</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
            <span>Streamlined administration and simplified reporting</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
            <span>Access to our extensive network of investment professionals</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
            <span>Tax-advantaged retirement savings strategies</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseSection;
