
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
        <p className="text-lg">
          At Survival 401k, we specialize in creating customized Solo 401k plans that provide maximum flexibility and investment options. Our services include:
        </p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
            <span>Complete plan documentation and IRS compliance</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
            <span>Ongoing support and consultation</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
            <span>Educational resources and investment guidance</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
            <span>Simplified administration and reporting</span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
            <span>Access to our network of investment professionals</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseSection;
