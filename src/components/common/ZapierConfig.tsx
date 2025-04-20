
import React, { useEffect } from "react";
import { initWebhook, validateWebhook, isWebhookConfigured, WebhookType } from "@/services/zapier";
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
  validateWebhook: shouldValidateWebhook = false 
}) => {
  const { toast } = useToast();

  useEffect(() => {
    // Initialize Zapier configuration with the specified webhook type
    console.log(`[${new Date().toISOString()}] Initializing ${webhookType} Zapier webhook config`);
    
    // First initialize the webhook config to ensure shared configurations
    initWebhook(webhookType);
    
    // Validate the webhook if requested
    if (shouldValidateWebhook) {
      validateWebhookUrl();
    }
  }, [webhookType, shouldValidateWebhook]);

  const validateWebhookUrl = async () => {
    try {
      // Check if webhook is properly configured
      if (!isWebhookConfigured(webhookType)) {
        console.error(`[${new Date().toISOString()}] Cannot validate ${webhookType} webhook - URL not configured or using default value`);
        toast({
          title: "Webhook Not Configured",
          description: `${webhookType.toUpperCase()} Zapier webhook URL is not configured. Please set it up in the Settings panel.`,
          variant: "destructive",
        });
        return;
      }
      
      console.log(`[${new Date().toISOString()}] Validating ${webhookType} webhook`);
      
      const result = await validateWebhook(webhookType);
      
      if (result.success) {
        console.log(`[${new Date().toISOString()}] ${webhookType} webhook validation triggered`);
        toast({
          title: "Webhook Test Successful",
          description: `A test ping was sent to your ${webhookType} Zapier webhook. Check your Zapier account for the incoming test data.`,
        });
      } else {
        console.error(`[${new Date().toISOString()}] ${webhookType} webhook validation failed: ${result.message}`);
        toast({
          title: "Webhook Test Failed",
          description: result.message,
          variant: "destructive",
        });
      }
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
