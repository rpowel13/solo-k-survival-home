
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';

// Define default benefits if none are provided
const defaultBenefits = [
  "Complete plan documentation and IRS compliance assistance",
  "Ongoing support and expert consultation",
  "Comprehensive educational resources and investment guidance",
  "Streamlined administration and simplified reporting",
  "Access to our extensive network of investment professionals",
  "Tax-advantaged retirement savings strategies"
];

interface WhyChooseSectionProps {
  title?: string;
  subtitle?: string;
  benefits?: string[];
  maxCards?: number;
}

const WhyChooseSection = ({
  title = "Why Choose Survival 401k?",
  subtitle = "At Survival 401k, we specialize in creating customized Solo 401k plans that provide maximum flexibility and investment options. Our services include:",
  benefits = defaultBenefits,
  maxCards = 6
}: WhyChooseSectionProps) => {
  // Limit the number of benefits to display if maxCards is set
  const displayedBenefits = maxCards ? benefits.slice(0, maxCards) : benefits;
  
  return (
    <section>
      <SectionHeading className="text-2xl font-bold mb-6 text-survival-800">
        {title}
      </SectionHeading>
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          {subtitle}
        </p>
        <ul className="mt-4 space-y-2">
          {displayedBenefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseSection;
