
import React from 'react';
import HeroContent from './home/HeroContent';
import HeroBenefitsCard from './home/HeroBenefitsCard';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-survival-800 pt-6 pb-12 md:pt-10 md:pb-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-15 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <HeroContent />
          <div className="relative">
            <HeroBenefitsCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
