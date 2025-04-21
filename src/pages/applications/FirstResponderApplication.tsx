
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FirstResponderWorkflow from '@/components/firstresponder/FirstResponderWorkflow';
import { initZapierConfig, isWebhookConfigured } from '@/services/zapierConfigService';
import { useToast } from '@/components/ui/use-toast';

const FirstResponderApplication = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize Zapier webhook configuration for first responder forms
    initZapierConfig('first_responder');
    
    // Check if the webhook is configured
    const isConfigured = isWebhookConfigured('first_responder');
    const webhookUrl = localStorage.getItem('zapier_first_responder_webhook_url') || 'Not configured';
    
    console.log(`[${new Date().toISOString()}] First Responder webhook configured: ${isConfigured}`);
    console.log(`[${new Date().toISOString()}] First Responder webhook URL: ${webhookUrl}`);
    
    if (!isConfigured) {
      toast({
        title: "Integration Not Configured",
        description: "The First Responder form integration with your CRM is not configured. Contact admin to set up the Zapier webhook.",
        variant: "destructive",
        duration: 6000
      });
    }
  }, [toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-survival-800">First Responder Package Application</h1>
            <p className="mt-4 text-gray-600">
              Complete this application to set up both your LLC and Solo 401k with our special First Responder benefits.
            </p>
          </div>

          <FirstResponderWorkflow />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FirstResponderApplication;
