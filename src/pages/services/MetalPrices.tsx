
import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import IntroSection from '@/components/metal-prices/IntroSection';
import PriceDisplaySection from '@/components/metal-prices/PriceDisplaySection';
import InvestmentBenefitsSection from '@/components/metal-prices/InvestmentBenefitsSection';
import { useMetalPrices } from '@/services/metalPriceService';

const MetalPrices = () => {
  const { data, isLoading, error } = useMetalPrices();

  return (
    <ServiceLayout
      title="Precious Metal Prices"
      description="Monitor current market prices for gold, silver, platinum, and palladium to inform your investment decisions."
    >
      <div className="space-y-12">
        <IntroSection />
        <section>
          <PriceDisplaySection isLoading={isLoading} error={error} data={data} />
        </section>
        <InvestmentBenefitsSection />
      </div>
    </ServiceLayout>
  );
};

export default MetalPrices;
