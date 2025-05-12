
import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import {
  IntroSection,
  InvestmentOptionsSection,
  BenefitsSection,
  SupportSection
} from '@/components/alternative-investments';
import { PageSEO } from '@/components/SEO';

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

  // Enhanced SEO keywords
  const primaryKeywords = "alternative investments, self-directed 401k investments, real estate investing, precious metals retirement, private lending, tax liens, cryptocurrency retirement";
  const focusKeywords = [
    "alternative retirement investments",
    "self-directed retirement accounts",
    "real estate in 401k",
    "invest in gold with 401k",
    "tax lien investing retirement",
    "private equity retirement",
    "crypto in retirement accounts",
    "retirement portfolio diversification",
    "checkbook control investing",
    "non-traditional retirement assets"
  ];

  // Structured data for this page
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Alternative Investment Options",
      "provider": {
        "@type": "FinancialService",
        "name": "Survival 401k",
        "url": "https://survival401k.com"
      },
      "description": "Diversify your retirement portfolio beyond traditional stocks and bonds with self-directed alternative investment options.",
      "serviceType": "Retirement Investment Services",
      "keywords": focusKeywords.join(', '),
      "offers": {
        "@type": "Offer",
        "description": "Alternative investment options for self-directed retirement accounts"
      }
    }
  ];

  return (
    <>
      <PageSEO 
        title="Alternative Investments for Self-Directed Retirement"
        description="Diversify your retirement portfolio beyond traditional stocks and bonds with self-directed alternative investment options including real estate, precious metals, private equity, and more."
        keywords={primaryKeywords}
        canonicalPath="/services/alternative-investments"
        type="website"
        structuredData={structuredData}
        focusKeywords={focusKeywords}
      />
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
    </>
  );
};

export default AlternativeInvestments;
