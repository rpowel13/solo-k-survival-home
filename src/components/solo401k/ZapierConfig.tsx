
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
    const webhookUrl = getZapierWebhookUrl(webhookType);
    console.log(`[${new Date().toISOString()}] Solo 401k webhook URL: ${webhookUrl}`);
    
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
              
              // Send an additional test payload specifically for the formData format
              try {
                const testUrl = getZapierWebhookUrl(webhookType);
                fetch(testUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    formType: 'Solo401kTest',
                    firstName: 'Test',
                    lastName: 'User',
                    email: 'test@example.com',
                    street: '123 Test St',
                    city: 'Test City',
                    state: 'TX',
                    zipCode: '12345',
                    isTest: true,
                    timestamp: new Date().toISOString()
                  }),
                  mode: 'no-cors'
                }).then(() => {
                  console.log(`[${new Date().toISOString()}] Additional test payload sent to ${webhookType} webhook`);
                });
              } catch (error) {
                console.error(`[${new Date().toISOString()}] Error sending additional test payload:`, error);
              }
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
    
    return () => {
      console.log(`[${new Date().toISOString()}] Solo401k Zapier Config unmounted`);
    };
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
