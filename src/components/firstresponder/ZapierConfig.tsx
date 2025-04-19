
import React, { useEffect } from "react";
import { initZapierConfig } from "@/services/zapierConfigService";
import { testZapierWebhook } from "@/services/zapierService";
import { useToast } from "@/components/ui/use-toast";

interface ZapierConfigProps {
  hidden?: boolean;
  validateWebhook?: boolean;
}

const ZapierConfig: React.FC<ZapierConfigProps> = ({ hidden = false, validateWebhook = false }) => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize the correct webhook type for first responder
    console.log(`[${new Date().toISOString()}] Initializing First Responder Zapier webhook config`);
    initZapierConfig('first_responder');
    
    // Log webhook URL to console for debugging
    const webhookUrl = localStorage.getItem('zapier_first_responder_webhook_url') || '';
    console.log(`[${new Date().toISOString()}] First Responder Zapier webhook URL: ${webhookUrl}`);
    
    // Validate the webhook by sending a test ping if requested
    if (validateWebhook) {
      validateZapierWebhook();
    }
  }, [validateWebhook]);

  const validateZapierWebhook = async () => {
    try {
      console.log(`[${new Date().toISOString()}] Testing First Responder webhook`);
      const result = await testZapierWebhook('first_responder');
      
      if (result.success) {
        toast({
          title: "Webhook Test Successful",
          description: "Test data was sent to your First Responder webhook",
        });
      } else {
        toast({
          title: "Webhook Test Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Error testing webhook:`, error);
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
