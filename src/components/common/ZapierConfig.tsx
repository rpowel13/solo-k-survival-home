
import React, { useEffect } from "react";
import { initZapierConfig, validateZapierWebhook, WebhookType } from "@/services/zapierConfigService";
import { useToast } from "@/components/ui/use-toast";

interface ZapierConfigProps {
  hidden?: boolean;
  webhookType?: WebhookType;
  validateWebhook?: boolean;
}

/**
 * Handles Zapier webhook configuration initialization
 * This component should be mounted once on app startup or on forms
 * that need to ensure Zapier is configured
 */
const ZapierConfig: React.FC<ZapierConfigProps> = ({ 
  hidden = false, 
  webhookType = 'crm',
  validateWebhook = false 
}) => {
  const { toast } = useToast();

  useEffect(() => {
    // Initialize Zapier configuration with the specified webhook type
    console.log(`[${new Date().toISOString()}] Initializing ${webhookType} Zapier webhook config`);
    
    // Force localStorage to be properly initialized regardless of device
    const existingUrl = localStorage.getItem(`zapier_${webhookType}_webhook_url`);
    
    // Check if we need to copy configuration from another webhook type (for shared webhooks)
    if (webhookType === 'crm' && (!existingUrl || existingUrl === 'https://hooks.zapier.com/hooks/catch/your-webhook-id/')) {
      // Try to use the consultation webhook if available (often configured first)
      const consultationUrl = localStorage.getItem('zapier_consultation_webhook_url');
      if (consultationUrl && consultationUrl !== 'https://hooks.zapier.com/hooks/catch/your-webhook-id/') {
        console.log(`[${new Date().toISOString()}] Using consultation webhook URL for CRM: ${consultationUrl}`);
        localStorage.setItem(`zapier_${webhookType}_webhook_url`, consultationUrl);
      }
    }
    
    initZapierConfig(webhookType);
    
    // Validate the webhook if requested
    if (validateWebhook) {
      validateWebhookUrl();
    }
  }, [webhookType, validateWebhook]);

  const validateWebhookUrl = async () => {
    try {
      // Get the webhook URL from localStorage
      const webhookUrl = localStorage.getItem(`zapier_${webhookType}_webhook_url`);
      
      if (!webhookUrl || webhookUrl === 'https://hooks.zapier.com/hooks/catch/your-webhook-id/') {
        console.error(`[${new Date().toISOString()}] Cannot validate ${webhookType} webhook - URL not configured or using default value`);
        toast({
          title: "Webhook Not Configured",
          description: `${webhookType.toUpperCase()} Zapier webhook URL is not configured. Please set it up in the Settings panel.`,
          variant: "destructive",
        });
        return;
      }
      
      console.log(`[${new Date().toISOString()}] Validating ${webhookType} webhook URL: ${webhookUrl}`);
      
      // Send a test ping to the webhook
      const testPingData = {
        testPing: true,
        timestamp: new Date().toISOString(),
        message: `${webhookType} webhook validation test`,
        source: window.location.href,
        isTest: true,
        testData: {
          name: "Test Contact",
          email: "test@example.com",
          message: "This is a test ping from the validation feature."
        }
      };
      
      console.log(`[${new Date().toISOString()}] Sending test data:`, testPingData);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testPingData),
        mode: 'no-cors'
      });
      
      console.log(`[${new Date().toISOString()}] ${webhookType} webhook validation triggered`);
      toast({
        title: "Webhook Test Triggered",
        description: `A test ping was sent to your ${webhookType} Zapier webhook. Check your Zapier account for the incoming test data.`,
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
