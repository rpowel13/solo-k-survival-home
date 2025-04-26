
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';

const benefits = [
  "Complete plan documentation and IRS compliance",
  "Ongoing support and consultation",
  "Educational resources and investment guidance",
  "Simplified administration and reporting",
  "Access to our network of investment professionals"
];

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex items-start p-3 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
