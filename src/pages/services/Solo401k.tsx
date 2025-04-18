
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ServiceLayout from '@/components/ServiceLayout';
import PrequalificationSection from '@/components/solo401k/PrequalificationSection';
import IntroSection from '@/components/solo401k/IntroSection';
import BenefitsSection from '@/components/solo401k/BenefitsSection';
import QualificationSection from '@/components/solo401k/QualificationSection';
import WhyChooseSection from '@/components/solo401k/WhyChooseSection';
import PricingSection from '@/components/solo401k/PricingSection';
import ReinstatementSection from '@/components/solo401k/ReinstatementSection';
import CTASection from '@/components/solo401k/CTASection';

const Solo401k = () => {
  const location = useLocation();
  const prequalSectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check if we should automatically open the quiz
    if (location.state && location.state.openEligibilityQuiz && prequalSectionRef.current) {
      // Scroll to the section
      prequalSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      
      // Open the collapsible after scrolling
      setTimeout(() => {
        const collapsibleTrigger = prequalSectionRef.current?.querySelector('button');
        if (collapsibleTrigger) {
          collapsibleTrigger.click();
        }
      }, 500);
    }
  }, [location.state]);

  return (
    <ServiceLayout
      title="Solo 401k Plans"
      description="Maximize your retirement savings with a personalized Solo 401k plan designed specifically for self-employed professionals and small business owners."
      callToAction={{ text: "Apply Now", link: "/apply/solo-401k" }}
    >
      <div className="space-y-12">
        <IntroSection />
        <div ref={prequalSectionRef}>
          <PrequalificationSection />
        </div>
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
