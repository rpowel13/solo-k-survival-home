
import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import { Link } from 'react-router-dom';
import PrequalificationSection from '@/components/solo401k/PrequalificationSection';
import IntroSection from '@/components/solo401k/IntroSection';
import BenefitsSection from '@/components/solo401k/BenefitsSection';
import QualificationSection from '@/components/solo401k/QualificationSection';
import WhyChooseSection from '@/components/solo401k/WhyChooseSection';
import PricingSection from '@/components/solo401k/PricingSection';
import ReinstatementSection from '@/components/solo401k/ReinstatementSection';
import CTASection from '@/components/solo401k/CTASection';

const Solo401k = () => {
  return (
    <ServiceLayout
      title="Solo 401k Plans"
      description="Maximize your retirement savings with a personalized Solo 401k plan designed specifically for self-employed professionals and small business owners."
      callToAction={{ text: "Apply Now", link: "/apply/solo-401k" }}
    >
      <div className="space-y-12">
        <IntroSection />
        <PrequalificationSection />
        <BenefitsSection />
        <QualificationSection />
        <WhyChooseSection />
        <PricingSection />
        <ReinstatementSection />
        <CTASection />
      </div>
    </ServiceLayout>
  );
};

export default Solo401k;
