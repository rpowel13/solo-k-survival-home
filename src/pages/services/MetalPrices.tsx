
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
  );
};

export default MetalPrices;
