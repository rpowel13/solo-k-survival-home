
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { testSupabaseConnection, logSupabaseInfo, insertTestContact } from "@/services/debugService";
import { getZapierWebhookUrl, validateZapierWebhook, initZapierConfig } from "@/services/zapierConfigService";
import ZapierConfig from "@/components/common/ZapierConfig";
import WebhookStatus from "@/components/contact-page/WebhookStatus";
import ContactMethods from "@/components/contact-page/ContactMethods";
import MessageCard from "@/components/contact-page/MessageCard";

const Contact = () => {
  const [validateWebhook, setValidateWebhook] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<'unconfigured' | 'configured' | 'unknown'>('unknown');
  const [lastTestedTime, setLastTestedTime] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    console.log(`[${new Date().toISOString()}] Contact page mounted, running comprehensive diagnostics`);
    logSupabaseInfo();
    
    // Force initialization of Zapier configuration
    initZapierConfig('crm');
    
    // Try to use consultation webhook if CRM webhook is not configured
    const crmWebhookUrl = localStorage.getItem('zapier_crm_webhook_url');
    const defaultUrl = 'https://hooks.zapier.com/hooks/catch/your-webhook-id/';
    
    if (!crmWebhookUrl || crmWebhookUrl === defaultUrl) {
      const consultationUrl = localStorage.getItem('zapier_consultation_webhook_url');
      if (consultationUrl && consultationUrl !== defaultUrl) {
        localStorage.setItem('zapier_crm_webhook_url', consultationUrl);
        console.log(`[${new Date().toISOString()}] Copied consultation webhook URL to CRM: ${consultationUrl}`);
        setWebhookStatus('configured');
      } else {
        setWebhookStatus('unconfigured');
        console.warn(`[${new Date().toISOString()}] CRM webhook is not configured`);
      }
    } else {
      setWebhookStatus('configured');
      console.log(`[${new Date().toISOString()}] CRM webhook is configured: ${crmWebhookUrl}`);
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
        webhookUrl={getZapierWebhookUrl('crm')}
      />
      
      <ZapierConfig webhookType="crm" validateWebhook={validateWebhook} />
    </div>
  );
};

export default Contact;
