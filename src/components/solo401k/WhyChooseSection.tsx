
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { Card } from '@/components/ui/card';

// Default benefits if none are provided
const defaultBenefits = [
  "Complete plan documentation and IRS compliance",
  "Ongoing support and consultation",
  "Educational resources and investment guidance",
  "Simplified administration and reporting",
  "Access to our network of investment professionals",
  "Tax-advantaged retirement savings"
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
  maxCards = 12
}: WhyChooseSectionProps) => {
  // Limit the number of cards to display
  const displayedBenefits = benefits.slice(0, maxCards);
  
  return (
    <section className="py-6">
      <SectionHeading className="text-3xl font-bold mb-8 text-center text-survival-800">
        {title}
      </SectionHeading>
      <div className="prose max-w-none">
        <p className="text-lg mb-8 text-center">
          {subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedBenefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="p-4 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105"
            >
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
