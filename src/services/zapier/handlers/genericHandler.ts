
import { FormData } from '@/types/formTypes';
import { WebhookType } from '../webhookTypes';
import { getZapierWebhookUrl, isWebhookConfigured } from '../webhookUrlManager';
import { formatFormData } from '@/utils/formDataFormatter';

export const handleGenericSubmission = async (data: FormData, webhookType: WebhookType) => {
  if (!isWebhookConfigured(webhookType)) {
    console.warn(`[${new Date().toISOString()}] Zapier webhook for ${webhookType} is not properly configured`);
    
    const envKey = `VITE_ZAPIER_${webhookType.toUpperCase()}_WEBHOOK_URL`;
    const backupWebhookUrl = import.meta.env[envKey] || "https://hooks.zapier.com/hooks/catch/22537237/2xtjoqu/";
    
    if (backupWebhookUrl && backupWebhookUrl !== "https://hooks.zapier.com/hooks/catch/your-webhook-id/") {
      console.log(`[${new Date().toISOString()}] Found backup webhook URL from environment: ${backupWebhookUrl}`);
      const formattedData = formatFormData(data);
      
      await fetch(backupWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
        credentials: 'omit',
        mode: 'no-cors'
      });
      
      return { 
        success: true,
        message: `Form submitted to Zapier via backup webhook URL (${webhookType})`
      };
    }
  }

  const webhookUrl = getZapierWebhookUrl(webhookType);
  const formattedData = formatFormData(data);
  
  console.log(`[${new Date().toISOString()}] PAYLOAD TO ZAPIER:`, JSON.stringify(formattedData, null, 2));
  
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formattedData),
    credentials: 'omit',
    mode: 'no-cors'
  });
  
  return { 
    success: true,
    message: `Form submitted successfully to Zapier via ${webhookType} webhook`
  };
};
