
import React, { useEffect } from 'react';
import { getZapierWebhookUrl, initZapierConfig, WebhookType } from '@/services/zapierConfigService';

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
  useEffect(() => {
    console.log(`[${new Date().toISOString()}] Initializing ${webhookType} Zapier webhook config`);
    console.log(`[${new Date().toISOString()}] Initializing Zapier webhook for type: ${webhookType}`);
    
    const webhookUrl = getZapierWebhookUrl(webhookType);
    console.log(`[${new Date().toISOString()}] Zapier ${webhookType} webhook URL from env: ${webhookUrl}`);
    
    console.log(`[${new Date().toISOString()}] ${webhookType.charAt(0).toUpperCase() + webhookType.slice(1)} Zapier Config mounted`);

    return () => {
      console.log(`[${new Date().toISOString()}] ${webhookType.charAt(0).toUpperCase() + webhookType.slice(1)} Zapier Config unmounted`);
    };
  }, [webhookType, validateWebhook]);

  return null; // This is a non-visual component that just handles initialization
};

export default ZapierConfig;
