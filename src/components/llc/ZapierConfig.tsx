
import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import CommonZapierConfig from "@/components/common/ZapierConfig";
import { WebhookType, validateZapierWebhook } from "@/services/zapierConfigService";
import { getZapierWebhookUrl } from "@/services/zapier/webhookUrlManager";

interface ZapierConfigProps {
  hidden?: boolean;
  validateWebhook?: boolean;
  skipTestPayload?: boolean;
}

/**
 * LLC specific Zapier webhook configuration
 * Wraps the common ZapierConfig component with LLC specific settings
 */
const ZapierConfig: React.FC<ZapierConfigProps> = ({ 
  hidden = false,
  validateWebhook = false,
  skipTestPayload = true // Default to skipping test payload
}) => {
  const { toast } = useToast();

  useEffect(() => {
    console.log(`[${new Date().toISOString()}] LLC Zapier Config mounted`);
    console.log(`[${new Date().toISOString()}] LLC webhook URL: ${getZapierWebhookUrl('llc')}`);
    
    // Validate webhook if needed
    if (validateWebhook) {
      validateZapierWebhook("llc" as WebhookType, skipTestPayload)
        .then(result => {
          if (result.success) {
            console.log(`[${new Date().toISOString()}] LLC Zapier webhook validated successfully`);
          } else {
            console.warn(`[${new Date().toISOString()}] LLC Zapier webhook validation issue: ${result.message}`);
            // Only show toast in development environment
            if (import.meta.env.DEV) {
              toast({
                title: "Zapier Webhook Warning",
                description: result.message,
                duration: 5000,
              });
            }
          }
        })
        .catch(error => {
          console.error(`[${new Date().toISOString()}] LLC Zapier webhook validation error:`, error);
        });
    }
    
    // Show a toast for developers in debug environment
    if (import.meta.env.DEV && !hidden) {
      toast({
        title: "LLC Zapier Configuration",
        description: "The LLC Zapier webhook is being initialized. Check console for details.",
        duration: 3000,
      });
    }
  }, [toast, hidden, validateWebhook, skipTestPayload]);

  return (
    <CommonZapierConfig
      webhookType={"llc" as WebhookType}
      validateWebhook={validateWebhook}
      hidden={hidden}
      skipTestPayload={skipTestPayload}
    />
  );
};

export default ZapierConfig;
