
import React from 'react';
import HeroContent from './home/HeroContent';
import HeroBenefitsCard from './home/HeroBenefitsCard';
import { useIsMobile } from '@/hooks/use-mobile';
import OptimizedImage from './common/OptimizedImage';

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="relative overflow-hidden bg-survival-800 pt-6 pb-12 md:pt-10 md:pb-20">
      {/* Background with better mobile optimization */}
      <div 
        className="absolute inset-0 z-0 opacity-15"
        style={{ 
          backgroundColor: '#1c2056', // Fallback color (survival-950)
        }}
      >
        {!isMobile ? (
          <OptimizedImage
            src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1080"
            alt="Background pattern"
            className="object-cover w-full h-full"
            priority={true}
          />
        ) : null}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
          <HeroContent />
          <div className="relative mt-6 md:mt-0 max-w-lg mx-auto md:max-w-none">
            <HeroBenefitsCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
