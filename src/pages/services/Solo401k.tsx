
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
import { PageSEO } from '@/components/SEO';

const Solo401k = () => {
  const location = useLocation();
  const prequalSectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Top features to display in the header
  const topFeatures = [
    "High contribution limits up to $73,500 (2025)",
    "Both traditional and Roth contribution options",
    "Alternative investments including real estate & crypto",
    "Full checkbook control of your investments",
    "Loan provisions up to $50,000",
    "Protection from creditors in most states"
  ];

  // Enhanced SEO keywords
  const primaryKeywords = "solo 401k, individual 401k, self-employed retirement plan, small business retirement, tax-advantaged savings, retirement account";
  
  const focusKeywords = [
    "high contribution limit retirement",
    "checkbook control 401k",
    "self-directed retirement plan",
    "tax-deferred retirement savings",
    "roth solo 401k",
    "solo 401k eligibility",
    "business owner retirement options",
    "401k plan setup",
    "retirement plan compliance",
    "retirement account contribution limits",
    "solo 401k loans",
    "retirement investment flexibility"
  ];
  
  // Structured data for this page
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Solo 401k Plans",
      "provider": {
        "@type": "FinancialService",
        "name": "Survival 401k",
        "url": "https://survival401k.com"
      },
      "description": "Maximize your retirement savings with a personalized Solo 401k plan designed specifically for self-employed professionals and small business owners.",
      "serviceType": "Retirement Plan Services",
      "keywords": focusKeywords.join(', '),
      "offers": {
        "@type": "Offer",
        "description": "Custom Solo 401k plans with high contribution limits, checkbook control, and investment flexibility"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who qualifies for a Solo 401k?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To qualify for a Solo 401k, you must have self-employment income with no full-time employees other than yourself and possibly a spouse."
          }
        },
        {
          "@type": "Question",
          "name": "What are the contribution limits for a Solo 401k?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For 2025, you can contribute up to $73,500 through a combination of employee and employer contributions, depending on your income and age."
          }
        }
      ]
    }
  ];
  
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
    <>
      <PageSEO 
        title="Solo 401k Plans for Self-Employed Professionals"
        description="Maximize your retirement savings with a customized Solo 401k plan offering high contribution limits, investment flexibility, and checkbook control for self-employed individuals and small business owners."
        keywords={primaryKeywords}
        canonicalPath="/services/solo-401k"
        type="website"
        structuredData={structuredData}
        focusKeywords={focusKeywords}
      />
      <ServiceLayout
        title="Solo 401k Plans"
        description="Maximize your retirement savings with a personalized Solo 401k plan designed specifically for self-employed professionals and small business owners."
        callToAction={{ text: "Apply Now", link: "/apply/solo-401k" }}
        topFeatures={topFeatures}
      >
        <ZapierConfig />
        
        <div className="space-y-8 sm:space-y-12 px-4 sm:px-0">
          <IntroSection />
          <QualificationSection />
          <div ref={prequalSectionRef} id="prequalification">
            <PrequalificationSection />
          </div>
          <BenefitsSection />
          <WhyChooseSection />
          <PricingSection />
          <ReinstatementSection />
          <CTASection />
        </div>
      </ServiceLayout>
    </>
  );
};

export default Solo401k;
