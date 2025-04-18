
import React, { useEffect } from "react";
import { initZapierConfig, validateZapierWebhook } from "@/services/zapierConfigService";
import { useToast } from "@/components/ui/use-toast";

interface ZapierConfigProps {
  hidden?: boolean;
  validateWebhook?: boolean;
}

const ZapierConfig: React.FC<ZapierConfigProps> = ({ hidden = false, validateWebhook = false }) => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize the correct webhook type for contact forms
    console.log(`[${new Date().toISOString()}] Initializing Contact CRM Zapier webhook config`);
    initZapierConfig('crm');
    
    // Validate the webhook by sending a test ping if requested
    if (validateWebhook) {
      validateCrmWebhook();
    }
  }, [validateWebhook]);

  const validateCrmWebhook = async () => {
    try {
      // Get the webhook URL from localStorage
      const webhookUrl = localStorage.getItem('zapier_crm_webhook_url');
      
      if (!webhookUrl) {
        console.error(`[${new Date().toISOString()}] Cannot validate CRM webhook - URL not configured`);
        toast({
          title: "Webhook Not Configured",
          description: "CRM Zapier webhook URL is not configured. Please set it up in the Settings panel.",
          variant: "destructive",
        });
        return;
      }
      
      console.log(`[${new Date().toISOString()}] Validating CRM webhook URL: ${webhookUrl}`);
      
      // Send a test ping to the webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          testPing: true,
          timestamp: new Date().toISOString(),
          message: 'CRM webhook validation test',
          source: window.location.href
        }),
        mode: 'no-cors'
      });
      
      console.log(`[${new Date().toISOString()}] CRM webhook validation triggered`);
      toast({
        title: "Webhook Test Triggered",
        description: "A test ping was sent to your CRM Zapier webhook. Check your Zapier account for the incoming test data.",
      });
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Error validating webhook:`, error);
      toast({
        title: "Webhook Test Failed",
        description: error instanceof Error ? error.message : "Failed to send test to webhook",
        variant: "destructive",
      });
    }
  };

  return null;
};

export default ZapierConfig;
