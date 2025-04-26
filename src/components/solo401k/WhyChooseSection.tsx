
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';

const benefits = [
  "Complete plan documentation and IRS compliance",
  "Ongoing support and consultation",
  "Educational resources and investment guidance",
  "Simplified administration and reporting",
  "Access to our network of investment professionals",
  "Tax-advantaged retirement savings",
  "Protection from creditors and lawsuits",
  "Ability to invest in alternative assets",
  "Roth and traditional contribution options",
  "Potential for higher investment returns",
  "No custodian fees or restrictions",
  "Checkbook control of your investments"
];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex items-start p-3 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <CheckCircle2 className="h-4 w-4 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
