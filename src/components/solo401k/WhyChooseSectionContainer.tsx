
import React, { useState } from 'react';
import WhyChooseSection from './WhyChooseSection';
import WhyChooseSectionEditor from './WhyChooseSectionEditor';
import { Card } from '@/components/ui/card';

interface WhyChooseSectionContainerProps {
  isEditing?: boolean;
}

const WhyChooseSectionContainer = ({ isEditing = false }: WhyChooseSectionContainerProps) => {
  const [benefits, setBenefits] = useState<{text: string}[]>([
    { text: "Complete plan documentation and IRS compliance" },
    { text: "Ongoing support and consultation" },
    { text: "Educational resources and investment guidance" },
    { text: "Simplified administration and reporting" },
    { text: "Access to our network of investment professionals" },
    { text: "Tax-advantaged retirement savings" },
    { text: "Protection from creditors and lawsuits" },
    { text: "Ability to invest in alternative assets" },
    { text: "Roth and traditional contribution options" },
    { text: "Potential for higher investment returns" },
    { text: "No custodian fees or restrictions" },
    { text: "Checkbook control of your investments" }
  ]);
  
  const handleSave = (updatedBenefits: {text: string}[]) => {
    setBenefits(updatedBenefits);
    // In the future, we would save this to the database
    console.log("Saving benefits:", updatedBenefits);
  };

  return (
    <div className="space-y-8">
      {isEditing ? (
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Edit Why Choose Section</h2>
          <WhyChooseSectionEditor 
            initialBenefits={benefits} 
            onSave={handleSave} 
          />
        </Card>
      ) : (
        <WhyChooseSection />
      )}
    </div>
  );
};

export default WhyChooseSectionContainer;
