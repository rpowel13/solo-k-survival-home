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
import { Phone } from "lucide-react";

const sectionBackgrounds = {
  services: "bg-gradient-to-br from-soft-purple/20 to-soft-blue/20",
  benefits: "bg-gradient-to-br from-soft-green/30 to-soft-yellow/30",
  features: "bg-gradient-to-br from-soft-peach/30 to-soft-pink/30",
  prequalificationBanner: "bg-gradient-to-r from-soft-orange/30 to-soft-yellow/30",
  prequalificationSection: "bg-gradient-to-br from-soft-blue/20 to-soft-purple/20",
  comparison: "bg-gradient-to-b from-white to-soft-pink/30",
  faq: "bg-gradient-to-br from-soft-gray/20 to-soft-purple/20",
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="bg-survival-100 py-3 text-center flex items-center justify-center text-survival-800 font-medium">
        <Phone className="h-5 w-5 mr-2 text-survival-600" />
        Questions? Call Our Support Line: 
        <span className="ml-2 text-survival-600 font-bold">(833) 224-5517</span>
      </div>
      
      <main className="flex-grow">
        <HeroSection />
        
        <ServicesSection className={sectionBackgrounds.services} />
        
        <div className={`py-12 ${sectionBackgrounds.benefits}`}>
          <BenefitsSection />
        </div>
        
        <div className={`py-12 ${sectionBackgrounds.features}`}>
          <FeaturesSection />
        </div>
        
        <PrequalificationBanner className={sectionBackgrounds.prequalificationBanner} />
        
        <div className={`container mx-auto px-4 ${sectionBackgrounds.prequalificationSection}`}>
          <PrequalificationSection />
        </div>
        
        <div className={`py-12 ${sectionBackgrounds.comparison}`}>
          <ComparisonSection />
        </div>
        
        <div className={`py-12 ${sectionBackgrounds.faq}`}>
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
