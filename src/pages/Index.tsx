
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
        
        <ServicesSection />
        
        <div className="py-12 bg-gray-50">
          <BenefitsSection />
        </div>
        
        <div className="py-12">
          <FeaturesSection />
        </div>
        
        <PrequalificationBanner />
        
        <div className="container mx-auto px-4">
          <PrequalificationSection />
        </div>
        
        <div className="py-12 bg-gradient-to-b from-white to-gray-50">
          <ComparisonSection />
        </div>
        
        <div className="py-12">
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
