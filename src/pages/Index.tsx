
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturesSection from "@/components/FeaturesSection";
import ComparisonSection from "@/components/ComparisonSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import MetalPriceBanner from "@/components/MetalPriceBanner";
import PrequalificationBanner from "@/components/PrequalificationBanner";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MetalPriceBanner />
      <main className="flex-grow">
        <HeroSection />
        <BenefitsSection />
        <FeaturesSection />
        <PrequalificationBanner />
        <ComparisonSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
