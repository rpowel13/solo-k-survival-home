
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturesSection from "@/components/FeaturesSection";
import ComparisonSection from "@/components/ComparisonSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PrequalificationBanner from "@/components/PrequalificationBanner";
import PrequalificationSection from "@/components/solo401k/PrequalificationSection";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        <ServicesSection className="bg-soft-purple/20" />
        
        <div className="py-12 bg-soft-green/30">
          <BenefitsSection />
        </div>
        
        <div className="py-12 bg-soft-yellow/30">
          <FeaturesSection />
        </div>
        
        <PrequalificationBanner className="bg-soft-peach/30" />
        
        <div className="container mx-auto px-4 bg-soft-blue/20">
          <PrequalificationSection />
        </div>
        
        <div className="py-12 bg-gradient-to-b from-white to-soft-pink/30">
          <ComparisonSection />
        </div>
        
        <div className="py-12 bg-soft-gray/20">
          <FAQSection />
          <Separator className="max-w-5xl mx-auto my-12 bg-gray-200" />
          <CTASection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
