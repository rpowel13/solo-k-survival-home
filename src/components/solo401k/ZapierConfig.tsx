
import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import CommonZapierConfig from "@/components/common/ZapierConfig";
import { WebhookType } from "@/services/zapier/webhookTypes";
import { validateZapierWebhook } from "@/services/zapier/webhookValidator";
import { getZapierWebhookUrl } from "@/services/zapier/webhookUrlManager";

interface ZapierConfigProps {
  validateWebhook?: boolean;
  webhookType?: WebhookType;
  hidden?: boolean;
}

/**
 * Solo 401k specific Zapier webhook configuration
 * Wraps the common ZapierConfig component with Solo 401k specific settings
 */
const ZapierConfig: React.FC<ZapierConfigProps> = ({ 
  validateWebhook = false,
  webhookType = "solo401k" as WebhookType,
  hidden = false
}) => {
  const { toast } = useToast();

  useEffect(() => {
    console.log(`[${new Date().toISOString()}] Solo 401k Zapier Config mounted with type: ${webhookType}`);
    console.log(`[${new Date().toISOString()}] Solo 401k webhook URL: ${getZapierWebhookUrl(webhookType)}`);
    
    // Validate the webhook if requested
    if (validateWebhook) {
      // Add a small delay to ensure initialization is complete
      setTimeout(() => {
        validateZapierWebhook(webhookType)
          .then(result => {
            if (!result.success) {
              console.warn(`[${new Date().toISOString()}] Solo 401k webhook validation failed: ${result.message}`);
              // Only show warning in development
              if (import.meta.env.DEV) {
                toast({
                  title: "Webhook Validation",
                  description: result.message,
                  duration: 5000,
                });
              }
            } else {
              console.log(`[${new Date().toISOString()}] Solo 401k webhook validation successful`);
            }
          })
          .catch(error => {
            console.error(`[${new Date().toISOString()}] Error validating webhook:`, error);
          });
      }, 1000);
    }
    
    // Show a toast for developers in debug environment
    if (import.meta.env.DEV && !hidden) {
      toast({
        title: "Solo 401k Zapier Configuration",
        description: "The Solo 401k Zapier webhook is being initialized. Check console for details.",
        duration: 3000,
      });
    }
  }, [toast, hidden, validateWebhook, webhookType]);

  return (
    <CommonZapierConfig 
      webhookType={webhookType}
      validateWebhook={validateWebhook}
      hidden={hidden}
    />
  );
};

export default ZapierConfig;
