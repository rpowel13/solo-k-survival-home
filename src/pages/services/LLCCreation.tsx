
import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import IntroSection from '@/components/llc/service-page/IntroSection';
import KeyBenefitsSection from '@/components/llc/service-page/KeyBenefitsSection';
import FinancialFutureSection from '@/components/llc/service-page/FinancialFutureSection';
import VehiclePurchaseSection from '@/components/llc/service-page/VehiclePurchaseSection';
import FirstResponderBenefitsSection from '@/components/llc/service-page/FirstResponderBenefitsSection';
import WhatsIncludedSection from '@/components/llc/service-page/WhatsIncludedSection';
import ProcessMapSection from '@/components/llc/service-page/ProcessMapSection';
import PricingSection from '@/components/llc/service-page/PricingSection';

const LLCCreation = () => {
  // Top features to display in the header
  const topFeatures = [
    "Personal asset protection and liability shield",
    "Pass-through taxation to avoid double taxation",
    "Easy management and flexible ownership options",
    "Enhanced business credibility and professionalism",
    "Tax deductions for business expenses",
    "Vehicle purchase and first responder tax benefits"
  ];
  
  return (
    <ServiceLayout
      title="LLC Creation Service"
      description="Protect your personal assets and optimize your tax situation with our professional LLC formation services."
      topFeatures={topFeatures}
    >
      <div className="space-y-16 max-w-4xl mx-auto">
        <IntroSection />
        <KeyBenefitsSection />
        <FinancialFutureSection />
        <VehiclePurchaseSection />
        <FirstResponderBenefitsSection />
        <WhatsIncludedSection />
        <ProcessMapSection />
        <PricingSection />
      </div>
    </ServiceLayout>
  );
};

export default LLCCreation;
