
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { testSupabaseConnection, logSupabaseInfo, insertTestContact } from "@/services/debugService";
import { getZapierWebhookUrl, validateZapierWebhook, initZapierConfig, isWebhookConfigured } from "@/services/zapierConfigService";
import ZapierConfig from "@/components/common/ZapierConfig";
import WebhookStatus from "@/components/contact-page/WebhookStatus";
import ContactMethods from "@/components/contact-page/ContactMethods";
import MessageCard from "@/components/contact-page/MessageCard";
import { PageSEO } from "@/components/SEO";

const Contact = () => {
  const [validateWebhook, setValidateWebhook] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<'unconfigured' | 'configured' | 'unknown'>('unknown');
  const [lastTestedTime, setLastTestedTime] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string>("");
  const { toast } = useToast();
  
  // Enhanced SEO keywords
  const primaryKeywords = "contact retirement specialist, 401k consultation, retirement planning help, financial advisor contact, retirement questions";
  
  const focusKeywords = [
    "retirement planning consultation",
    "solo 401k specialist",
    "retirement account setup help",
    "financial advisor appointment",
    "retirement strategy meeting",
    "investment options consultation",
    "retirement tax planning",
    "self-directed retirement help",
    "401k rollover assistance",
    "retirement savings consultation"
  ];
  
  // Structured data for this page
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Survival 401k",
      "description": "Get in touch with our retirement specialists for personalized assistance with Solo 401k plans and retirement solutions.",
      "url": "https://survival401k.com/contact",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+18332245517",
        "contactType": "customer service",
        "availableLanguage": "English"
      },
      "keywords": focusKeywords.join(', ')
    }
  ];
  
  useEffect(() => {
    console.log(`[${new Date().toISOString()}] Contact page mounted, running comprehensive diagnostics`);
    logSupabaseInfo();
    
    // Force initialization of ALL Zapier webhook types
    initZapierConfig('crm');
    initZapierConfig('consultation');
    initZapierConfig('solo401k');
    initZapierConfig('llc');
    initZapierConfig('first_responder');
    
    // Get current CRM webhook URL and update state to force UI refresh
    const currentUrl = getZapierWebhookUrl('crm');
    setWebhookUrl(currentUrl);
    
    // Check configuration status
    const isConfigured = isWebhookConfigured('crm');
    setWebhookStatus(isConfigured ? 'configured' : 'unconfigured');
    
    console.log(`[${new Date().toISOString()}] CRM webhook is configured: ${isConfigured}, URL: ${currentUrl}`);
    
    if (!isConfigured) {
      // Try all available webhooks as fallbacks
      const webhookTypes = ['consultation', 'solo401k', 'llc', 'first_responder'];
      let fallbackFound = false;
      
      for (const type of webhookTypes) {
        const fallbackUrl = localStorage.getItem(`zapier_${type}_webhook_url`);
        if (fallbackUrl && fallbackUrl !== "https://hooks.zapier.com/hooks/catch/your-webhook-id/") {
          console.log(`[${new Date().toISOString()}] Found fallback webhook URL from ${type}: ${fallbackUrl}`);
          localStorage.setItem('zapier_crm_webhook_url', fallbackUrl);
          setWebhookUrl(fallbackUrl);
          setWebhookStatus('configured');
          fallbackFound = true;
          break;
        }
      }
      
      if (!fallbackFound) {
        console.warn(`[${new Date().toISOString()}] CRM webhook is not configured and no fallbacks found`);
        toast({
          title: "Zapier Integration Not Configured",
          description: "The CRM integration is not fully configured. Your form will still be submitted to our database.",
          duration: 8000
        });
      } else {
        // Refresh status after applying fallback
        const newStatus = isWebhookConfigured('crm');
        setWebhookStatus(newStatus ? 'configured' : 'unconfigured');
      }
    }
    
    const runDiagnostics = async () => {
      const connectionResult = await testSupabaseConnection();
      
      if (!connectionResult.success) {
        console.error(`[${new Date().toISOString()}] Supabase connection test failed on Contact page load:`, connectionResult.error);
        toast({
          title: "Database Connection Issue",
          description: "There may be an issue connecting to our database. Your message will still be received through backup systems.",
          variant: "destructive",
          duration: 5000
        });
      } else {
        console.log(`[${new Date().toISOString()}] Supabase connection test successful on Contact page load`);
      }
      
      const insertResult = await insertTestContact();
      if (insertResult.success) {
        console.log(`[${new Date().toISOString()}] Direct test insert successful on page load`);
      } else {
        console.error(`[${new Date().toISOString()}] Direct test insert failed on page load:`, insertResult.error);
      }
    };
    
    runDiagnostics();
  }, [toast]);
  
  // Force status refresh on component update
  useEffect(() => {
    const refreshStatus = () => {
      const currentUrl = getZapierWebhookUrl('crm');
      const isConfigured = isWebhookConfigured('crm');
      setWebhookUrl(currentUrl);
      setWebhookStatus(isConfigured ? 'configured' : 'unconfigured');
    };
    
    // Initial check
    refreshStatus();
    
    // Set up interval for periodic checking (every 3 seconds)
    const interval = setInterval(refreshStatus, 3000);
    
    return () => clearInterval(interval);
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
    <div className="min-h-screen flex flex-col relative">
      <PageSEO 
        title="Contact Our Retirement Specialists"
        description="Have questions about Solo 401(k) plans? Contact our retirement specialists for personalized assistance with your retirement planning needs and investment options."
        keywords={primaryKeywords}
        canonicalPath="/contact"
        type="website"
        structuredData={structuredData}
        focusKeywords={focusKeywords}
      />
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 text-center mb-12">
              Have questions about Solo 401(k) plans? Our retirement specialists are here to help.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <ContactMethods />
              <MessageCard />
            </div>
          </div>
        </section>
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

export default Contact;
