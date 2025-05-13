
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeContent from "@/components/home/HomeContent";
import PhoneBanner from "@/components/home/PhoneBanner";
import WebhookStatusSection from "@/components/home/WebhookStatusSection";
import HomePageSEO from "@/components/home/HomePageSEO";
import HomeStructuredData from "@/components/home/HomeStructuredData";
import { useSEOKeywords } from "@/components/home/useSEOKeywords";
import { useWebhookStatus } from "@/hooks/useWebhookStatus";

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
  const { 
    validateWebhook,
    webhookStatus,
    lastTestedTime,
    webhookUrl,
    handleValidateWebhook
  } = useWebhookStatus();
  
  const { homepageKeywords, focusKeywords } = useSEOKeywords();
  const { structuredData } = HomeStructuredData({ focusKeywords });

  return (
    <div className="min-h-screen flex flex-col">
      <HomePageSEO 
        homepageKeywords={homepageKeywords}
        focusKeywords={focusKeywords}
        structuredData={structuredData}
      />
      
      <Header />
      <PhoneBanner />
      <HomeContent sectionBackgrounds={sectionBackgrounds} />
      <Footer />
      
      <WebhookStatusSection 
        webhookStatus={webhookStatus}
        lastTestedTime={lastTestedTime}
        webhookUrl={webhookUrl}
        validateWebhook={validateWebhook}
        onValidateWebhook={handleValidateWebhook}
      />
    </div>
  );
};

export default Index;
