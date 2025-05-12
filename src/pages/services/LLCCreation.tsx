
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
import { PageSEO } from '@/components/SEO';

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
  
  // Enhanced SEO keywords
  const primaryKeywords = "LLC creation, limited liability company, business formation, asset protection, pass-through taxation, business entity";
  
  const focusKeywords = [
    "start an LLC",
    "LLC tax benefits",
    "small business liability protection",
    "form an LLC online",
    "LLC vs sole proprietorship",
    "LLC for real estate investing",
    "business asset protection",
    "professional LLC setup",
    "LLC for contractors",
    "business startup legal structure",
    "LLC for vehicle purchases",
    "self-employed LLC benefits"
  ];
  
  // Structured data for this page
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "LLC Formation Services",
      "provider": {
        "@type": "FinancialService",
        "name": "Survival 401k",
        "url": "https://survival401k.com"
      },
      "description": "Professional LLC formation services to protect your personal assets and optimize your tax situation with expert guidance.",
      "serviceType": "Business Formation Services",
      "keywords": focusKeywords.join(', '),
      "offers": {
        "@type": "Offer",
        "description": "Complete LLC formation services with ongoing support and tax optimization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the benefits of forming an LLC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "LLCs provide personal asset protection, pass-through taxation, management flexibility, enhanced credibility, and potential tax advantages for business expenses."
          }
        },
        {
          "@type": "Question",
          "name": "How can an LLC help with vehicle purchases?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An LLC can provide tax benefits for business vehicle purchases, including potential deductions for depreciation, maintenance, and operational costs when used for business purposes."
          }
        }
      ]
    }
  ];
  
  return (
    <>
      <PageSEO 
        title="LLC Creation and Formation Services"
        description="Protect your personal assets and optimize your tax situation with our professional LLC formation services. Get expert guidance on business structure, compliance, and ongoing support."
        keywords={primaryKeywords}
        canonicalPath="/services/llc-creation"
        type="website"
        structuredData={structuredData}
        focusKeywords={focusKeywords}
      />
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
    </>
  );
};

export default LLCCreation;
