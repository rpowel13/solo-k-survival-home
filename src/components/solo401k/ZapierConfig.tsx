
import React, { useEffect } from "react";
import { initZapierConfig } from "@/services/zapierConfigService";
import { useToast } from "@/components/ui/use-toast";

interface ZapierConfigProps {
  hidden?: boolean;
  validateWebhook?: boolean;
}

const ZapierConfig: React.FC<ZapierConfigProps> = ({ hidden = false, validateWebhook = false }) => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize the correct webhook type for solo401k
    console.log(`[${new Date().toISOString()}] Initializing Solo401k Zapier webhook config`);
    initZapierConfig('solo401k');
    
    // Validate the webhook by sending a test ping if requested
    if (validateWebhook) {
      validateZapierWebhook();
    }
  }, [validateWebhook]);

  const validateZapierWebhook = async () => {
    try {
      // Get the webhook URL from localStorage
      const webhookUrl = localStorage.getItem('zapier_solo401k_webhook_url');
      
      if (!webhookUrl) {
        console.error(`[${new Date().toISOString()}] Cannot validate Solo401k webhook - URL not configured`);
        toast({
          title: "Webhook Not Configured",
          description: "Solo401k Zapier webhook URL is not configured. Please set it up in the Settings panel.",
          variant: "destructive",
        });
        return;
      }
      
      console.log(`[${new Date().toISOString()}] Validating Solo401k webhook URL: ${webhookUrl}`);
      
      // Send a test ping to the webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          testPing: true,
          timestamp: new Date().toISOString(),
          message: 'Solo401k webhook validation test',
          source: window.location.href
        }),
        mode: 'no-cors'
      });
      
      console.log(`[${new Date().toISOString()}] Solo401k webhook validation triggered`);
      toast({
        title: "Webhook Test Triggered",
        description: "A test ping was sent to your Solo401k Zapier webhook. Check your Zapier account for the incoming test data.",
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
