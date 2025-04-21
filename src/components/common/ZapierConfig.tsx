
import React, { useEffect } from 'react';
import { getZapierWebhookUrl, WebhookType } from '@/services/zapier/webhookTypes';
import { validateZapierWebhook } from '@/services/zapier/webhookValidator';
import { useToast } from '@/hooks/use-toast';

export interface ZapierConfigProps {
  validateWebhook?: boolean;
  webhookType?: WebhookType;
  hidden?: boolean;
}

const ZapierConfig: React.FC<ZapierConfigProps> = ({ 
  validateWebhook = false, 
  webhookType = "default" as WebhookType,
  hidden = false
}) => {
  const { toast } = useToast();

  useEffect(() => {
    console.log(`[${new Date().toISOString()}] Initializing ${webhookType} Zapier webhook config`);
    
    const webhookUrl = getZapierWebhookUrl(webhookType);
    console.log(`[${new Date().toISOString()}] Zapier ${webhookType} webhook URL: ${webhookUrl}`);
    
    // Validate webhook if requested
    if (validateWebhook) {
      setTimeout(() => {
        console.log(`[${new Date().toISOString()}] Validating ${webhookType} webhook URL: ${webhookUrl}`);
        validateZapierWebhook(webhookType)
          .then(result => {
            if (!result.success) {
              console.warn(`[${new Date().toISOString()}] ${webhookType} webhook validation failed: ${result.message}`);
              if (!hidden) {
                toast({
                  title: "Webhook Validation",
                  description: result.message,
                  duration: 5000,
                });
              }
            } else {
              console.log(`[${new Date().toISOString()}] ${webhookType} webhook validation successful`);
            }
          })
          .catch(error => {
            console.error(`[${new Date().toISOString()}] Error validating ${webhookType} webhook:`, error);
          });
      }, 1000);
    }

    return () => {
      console.log(`[${new Date().toISOString()}] ${webhookType.charAt(0).toUpperCase() + webhookType.slice(1)} Zapier Config unmounted`);
    };
  }, [webhookType, validateWebhook, hidden, toast]);

  return null; // This is a non-visual component that just handles initialization
};

export default ZapierConfig;
