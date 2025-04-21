
import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import CommonZapierConfig from "@/components/common/ZapierConfig";
import { WebhookType, validateZapierWebhook } from "@/services/zapierConfigService";

interface ZapierConfigProps {
  hidden?: boolean;
  validateWebhook?: boolean;
}

/**
 * LLC specific Zapier webhook configuration
 * Wraps the common ZapierConfig component with LLC specific settings
 */
const ZapierConfig: React.FC<ZapierConfigProps> = ({ 
  hidden = false,
  validateWebhook = false
}) => {
  const { toast } = useToast();

  useEffect(() => {
    console.log(`[${new Date().toISOString()}] LLC Zapier Config mounted`);
    
    // Validate webhook if needed
    if (validateWebhook) {
      validateZapierWebhook("llc" as WebhookType)
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
  }, [toast, hidden, validateWebhook]);

  return (
    <CommonZapierConfig
      webhookType={"llc" as WebhookType}
      validateWebhook={validateWebhook}
      hidden={hidden}
    />
  );
};

export default ZapierConfig;
