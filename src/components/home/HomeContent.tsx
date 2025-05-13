
import React from 'react';
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturesSection from "@/components/FeaturesSection";
import ComparisonSection from "@/components/ComparisonSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import PrequalificationBanner from "@/components/PrequalificationBanner";
import { Separator } from "@/components/ui/separator";
import InvestmentOptionsSection from "@/components/InvestmentOptionsSection";

interface HomeContentProps {
  sectionBackgrounds: {
    services: string;
    benefits: string;
    features: string;
    investments: string;
    prequalificationBanner: string;
    comparison: string;
    faq: string;
  };
}

const HomeContent: React.FC<HomeContentProps> = React.memo(({ sectionBackgrounds }) => {
  return (
    <main className="flex-grow">
      <HeroSection />
      
      <ServicesSection className={sectionBackgrounds.services} />
      
      <div className={`py-12 ${sectionBackgrounds.benefits}`}>
        <BenefitsSection />
      </div>
      
      <InvestmentOptionsSection className={sectionBackgrounds.investments} />
      
      <div className={`py-12 ${sectionBackgrounds.features}`}>
        <FeaturesSection />
      </div>
      
      <PrequalificationBanner className={sectionBackgrounds.prequalificationBanner} />
      
      <div className={`py-12 ${sectionBackgrounds.comparison}`}>
        <ComparisonSection />
      </div>
      
      <div className={`py-12 ${sectionBackgrounds.faq}`}>
        <FAQSection />
        <Separator className="max-w-5xl mx-auto my-12 bg-gray-200" />
        <CTASection />
      </div>
    </main>
  );
});

HomeContent.displayName = 'HomeContent';

export default HomeContent;
