
import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import {
  IntroSection,
  InvestmentOptionsSection,
  BenefitsSection,
  SupportSection
} from '@/components/alternative-investments';

const AlternativeInvestments = () => {
  // Define the top investment opportunities to display in the header
  const topOpportunities = [
    "Direct real estate ownership with checkbook control",
    "Private lending with secured returns of 8-15%",
    "Precious metals as inflation protection",
    "Cryptocurrency and digital assets",
    "Private equity and startup investments", 
    "Tax lien certificates with potential returns of 8-36%"
  ];

  return (
    <ServiceLayout
      title="Alternative Investments"
      description="Diversify your retirement portfolio beyond traditional stocks and bonds with self-directed alternative investment options."
      callToAction={{ text: "Schedule Consultation", link: "/contact" }}
      topFeatures={topOpportunities}
    >
      <div id="top" className="space-y-12">
        <IntroSection />
        <InvestmentOptionsSection />
        <BenefitsSection />
        <SupportSection />
      </div>
    </ServiceLayout>
  );
};

export default AlternativeInvestments;
