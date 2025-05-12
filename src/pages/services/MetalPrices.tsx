
import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import IntroSection from '@/components/metal-prices/IntroSection';
import PriceDisplaySection from '@/components/metal-prices/PriceDisplaySection';
import InvestmentBenefitsSection from '@/components/metal-prices/InvestmentBenefitsSection';
import { useMetalPrices } from '@/services/metalPriceService';
import { PageSEO } from '@/components/SEO';

const MetalPrices = () => {
  const { data, isLoading, error } = useMetalPrices();

  // Enhanced SEO keywords
  const primaryKeywords = "precious metals prices, gold investment, silver prices, platinum investment, palladium prices, metals in 401k, alternative investments";
  const focusKeywords = [
    "current gold prices",
    "precious metals in retirement accounts",
    "silver investment 401k",
    "precious metals investing",
    "inflation hedge metals",
    "gold silver price tracker",
    "investing in precious metals",
    "retirement portfolio diversification",
    "metals investment strategy",
    "physical gold in solo 401k"
  ];

  // Structured data for this page
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      "name": "Precious Metals Investment Options",
      "description": "Current market prices for gold, silver, platinum, and palladium to inform your retirement investment decisions.",
      "provider": {
        "@type": "FinancialService",
        "name": "Survival 401k",
        "url": "https://survival401k.com"
      },
      "category": "Alternative Investments",
      "feesAndCommissionsSpecification": "Contact for details on precious metals investment options and associated fees",
      "termsOfService": "https://survival401k.com/terms-of-service"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I invest in precious metals with my Solo 401k?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, with a self-directed Solo 401k plan you can invest in precious metals including gold, silver, platinum and palladium. These investments can serve as a hedge against inflation and market volatility."
          }
        }
      ]
    }
  ];

  return (
    <>
      <PageSEO 
        title="Precious Metal Prices & Investment Options"
        description="Monitor current market prices for gold, silver, platinum, and palladium. Learn how to include precious metals in your self-directed retirement portfolio as a hedge against inflation."
        keywords={primaryKeywords}
        canonicalPath="/services/metal-prices"
        type="website"
        structuredData={structuredData}
        focusKeywords={focusKeywords}
        modifiedTime={new Date().toISOString()}
      />
      <ServiceLayout
        title="Precious Metal Prices"
        description="Monitor current market prices for gold, silver, platinum, and palladium to inform your investment decisions."
        image="https://images.unsplash.com/photo-1610375461369-d5c68fce41a1?auto=format&fit=crop&q=80&w=1200"
      >
        <div className="space-y-12">
          <IntroSection />
          <section>
            <PriceDisplaySection isLoading={isLoading} error={error} data={data} />
          </section>
          <InvestmentBenefitsSection />
        </div>
      </ServiceLayout>
    </>
  );
};

export default MetalPrices;
