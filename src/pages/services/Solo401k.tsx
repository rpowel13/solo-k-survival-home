
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
import ZapierConfig from '@/components/solo401k/ZapierConfig';
import { useToast } from '@/components/ui/use-toast';

const Solo401k = () => {
  const location = useLocation();
  const prequalSectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Log that the Solo401k page is loaded for webhook validation
    console.log(`[${new Date().toISOString()}] Solo401k page loaded - validating Zapier hooks`);
    
    // Validate Zapier webhook URL from localStorage
    const webhookUrl = localStorage.getItem('zapier_solo401k_webhook_url');
    console.log(`[${new Date().toISOString()}] Current Solo401k Zapier webhook URL: ${webhookUrl || 'Not configured'}`);
    
    // Display a toast if the webhook is not configured
    if (!webhookUrl) {
      toast({
        title: "Zapier Configuration Notice",
        description: "Solo401k webhook is not configured. Set it up in Settings to enable CRM integration.",
        duration: 5000,
      });
    }
    
    // Check if we should automatically open the quiz from state (banner button click)
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
    // If the location hash includes prequalification, open the quiz
    else if (location.hash === '#prequalification' && prequalSectionRef.current) {
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
  }, [location.state, location.hash, toast]);

  return (
    <ServiceLayout
      title="Solo 401k Plans"
      description="Maximize your retirement savings with a personalized Solo 401k plan designed specifically for self-employed professionals and small business owners."
      callToAction={{ text: "Apply Now", link: "/apply/solo-401k" }}
    >
      {/* Include ZapierConfig for webhook initialization */}
      <ZapierConfig />
      
      <div className="space-y-12">
        <IntroSection />
        <div ref={prequalSectionRef} id="prequalification">
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
