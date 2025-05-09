
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
import WebhookStatus from "@/components/contact-page/WebhookStatus";
import ZapierConfig from "@/components/common/ZapierConfig";
import { Separator } from "@/components/ui/separator";
import { Phone } from "lucide-react";
import InvestmentOptionsSection from "@/components/InvestmentOptionsSection";
import { useState, useEffect } from "react";
import { getZapierWebhookUrl, isWebhookConfigured, validateZapierWebhook, initZapierConfig } from "@/services/zapierConfigService";
import { useToast } from "@/components/ui/use-toast";

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
  const [validateWebhook, setValidateWebhook] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<'unconfigured' | 'configured' | 'unknown'>('unknown');
  const [lastTestedTime, setLastTestedTime] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string>("");
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Survival 401k - Solo 401k Plans for Self-Employed Professionals";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Expert Solo 401k plans and retirement solutions for entrepreneurs, First Responders, and self-employed professionals. Get personalized support and maximize your retirement savings."
    );
    
    const webhookTypes = ['crm', 'consultation', 'solo401k', 'llc', 'first_responder'];
    webhookTypes.forEach(type => initZapierConfig(type as any));
    
    const currentUrl = getZapierWebhookUrl('crm');
    setWebhookUrl(currentUrl);
    
    const isConfigured = isWebhookConfigured('crm');
    setWebhookStatus(isConfigured ? 'configured' : 'unconfigured');
    
    const consolidateWebhookConfigs = () => {
      if (!isConfigured) {
        for (const type of webhookTypes) {
          const otherUrl = localStorage.getItem(`zapier_${type}_webhook_url`);
          if (otherUrl && otherUrl !== "https://hooks.zapier.com/hooks/catch/your-webhook-id/") {
            console.log(`[${new Date().toISOString()}] Found configured webhook for ${type}, using it for CRM`);
            localStorage.setItem('zapier_crm_webhook_url', otherUrl);
            setWebhookUrl(otherUrl);
            setWebhookStatus('configured');
            break;
          }
        }
      } 
      else {
        for (const type of webhookTypes) {
          const typeUrl = localStorage.getItem(`zapier_${type}_webhook_url`);
          if (!typeUrl || typeUrl === "https://hooks.zapier.com/hooks/catch/your-webhook-id/") {
            console.log(`[${new Date().toISOString()}] Sharing CRM webhook URL with ${type}`);
            localStorage.setItem(`zapier_${type}_webhook_url`, currentUrl);
          }
        }
      }
    };
    
    consolidateWebhookConfigs();
  }, []);
  
  const handleValidateWebhook = async () => {
    setValidateWebhook(true);
    
    try {
      const result = await validateZapierWebhook('crm');
      
      if (result.success) {
        toast({
          title: "Webhook Test Successful",
          description: "Test data was sent to your CRM webhook. Check your Zapier account to confirm it was received.",
        });
        setLastTestedTime(new Date().toLocaleTimeString());
      } else {
        toast({
          title: "Webhook Test Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error testing webhook:", error);
      toast({
        title: "Webhook Test Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    }
    
    setTimeout(() => setValidateWebhook(false), 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="bg-survival-100 py-3 text-center flex items-center justify-center text-survival-800 font-medium">
        <Phone className="h-5 w-5 mr-2 text-survival-600" />
        Sales and Support Line: 
        <a 
          href="tel:+18332245517" 
          className="ml-2 text-survival-600 font-bold hover:underline"
        >
          833-224-5517
        </a>
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
      
      <WebhookStatus 
        webhookStatus={webhookStatus}
        lastTestedTime={lastTestedTime}
        onValidateWebhook={handleValidateWebhook}
        webhookUrl={webhookUrl}
      />
      
      <ZapierConfig webhookType="crm" validateWebhook={validateWebhook} />
    </div>
  );
};

export default Index;
