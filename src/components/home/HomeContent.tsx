
import React, { lazy, Suspense } from 'react';
import HeroSection from "@/components/HeroSection";
import PrequalificationBanner from "@/components/PrequalificationBanner";
import { Separator } from "@/components/ui/separator";
import LazySection from "@/components/common/LazySection";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazily load non-critical sections
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const BenefitsSection = lazy(() => import("@/components/BenefitsSection"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const ComparisonSection = lazy(() => import("@/components/ComparisonSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const InvestmentOptionsSection = lazy(() => import("@/components/InvestmentOptionsSection"));

// Simple loading placeholders
const SectionPlaceholder = () => (
  <div className="w-full py-8">
    <div className="max-w-sm mx-auto h-8 rounded-md bg-gray-200 animate-pulse mb-4"></div>
    <div className="max-w-3xl mx-auto h-4 rounded-md bg-gray-100 animate-pulse mb-2"></div>
    <div className="max-w-2xl mx-auto h-4 rounded-md bg-gray-100 animate-pulse"></div>
  </div>
);

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
  const isMobile = useIsMobile();
  
  return (
    <main className="flex-grow">
      {/* Hero is critical, load immediately */}
      <HeroSection />
      
      <Suspense fallback={<SectionPlaceholder />}>
        <LazySection 
          className={sectionBackgrounds.services}
          priority={!isMobile} // Load immediately on desktop
        >
          <ServicesSection className="" />
        </LazySection>
      </Suspense>
      
      <Suspense fallback={<SectionPlaceholder />}>
        <LazySection className={`py-12 ${sectionBackgrounds.benefits}`}>
          <BenefitsSection />
        </LazySection>
      </Suspense>
      
      <Suspense fallback={<SectionPlaceholder />}>
        <LazySection className={sectionBackgrounds.investments}>
          <InvestmentOptionsSection className="" />
        </LazySection>
      </Suspense>
      
      <Suspense fallback={<SectionPlaceholder />}>
        <LazySection className={`py-12 ${sectionBackgrounds.features}`}>
          <FeaturesSection />
        </LazySection>
      </Suspense>
      
      <PrequalificationBanner className={sectionBackgrounds.prequalificationBanner} />
      
      <Suspense fallback={<SectionPlaceholder />}>
        <LazySection className={`py-12 ${sectionBackgrounds.comparison}`}>
          <ComparisonSection />
        </LazySection>
      </Suspense>
      
      <Suspense fallback={<SectionPlaceholder />}>
        <LazySection className={`py-12 ${sectionBackgrounds.faq}`}>
          <FAQSection />
          <Separator className="max-w-5xl mx-auto my-12 bg-gray-200" />
          <CTASection />
        </LazySection>
      </Suspense>
    </main>
  );
});

HomeContent.displayName = 'HomeContent';

export default HomeContent;
