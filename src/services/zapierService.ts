
import { FormData, EmailResponse } from '@/types/formTypes';
import { getZapierWebhookUrl } from './zapierConfigService';
import { formatFormData } from '@/utils/formDataFormatter';

/**
 * Sends the form data to a Zapier webhook for CRM integration
 */
export const triggerZapierWebhook = async (data: FormData): Promise<EmailResponse> => {
  try {
    console.log(`[${new Date().toISOString()}] Sending form data to Zapier:`, data);
    
    const formattedData = formatFormData(data);
    const webhookType = formattedData.formType.toLowerCase().replace(/_/g, '');
    const webhookUrl = getZapierWebhookUrl(webhookType as any);
    
    console.log(`[${new Date().toISOString()}] Using Zapier webhook URL: ${webhookUrl}`);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedData),
      mode: 'no-cors'
    });
    
    console.log(`[${new Date().toISOString()}] Zapier webhook triggered successfully`);
    return { 
      success: true,
      message: `Form submitted successfully to Zapier via ${webhookType} webhook`
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error sending data to Zapier:`, error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
