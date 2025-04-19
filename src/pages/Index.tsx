
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
import { Separator } from "@/components/ui/separator";
import { Phone } from "lucide-react";
import InvestmentOptionsSection from "@/components/InvestmentOptionsSection";

const sectionBackgrounds = {
  services: "bg-gradient-to-br from-soft-blue/20 to-soft-blue/10",
  benefits: "bg-gradient-to-br from-[#D3E4FD]/30 to-[#e1ebff]/30",
  features: "bg-gradient-to-br from-[#C9D9FF]/30 to-[#A4BEFE]/30",
  investments: "bg-gradient-to-br from-[#F3F4F6]/50 to-[#E5E7EB]/50",
  prequalificationBanner: "bg-gradient-to-r from-soft-orange/30 to-soft-yellow/30",
  comparison: "bg-gradient-to-b from-[#e7f0fd]/20 to-[#accbee]/20",
  faq: "bg-gradient-to-br from-soft-gray/20 to-soft-purple/20",
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="bg-survival-100 py-3 text-center flex items-center justify-center text-survival-800 font-medium">
        <Phone className="h-5 w-5 mr-2 text-survival-600" />
        Sales and Support Line: 
        <span className="ml-2 text-survival-600 font-bold">(833) 224-5517</span>
      </div>
      
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
      <Footer />
    </div>
  );
};

export default Index;
