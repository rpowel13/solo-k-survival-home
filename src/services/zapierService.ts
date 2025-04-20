
import { getWebhookUrl, isWebhookConfigured, WebhookType } from '@/services/zapier';

/**
 * Trigger Zapier webhook with the given data
 */
export const triggerZapierWebhook = async (data: any, webhookType: WebhookType = 'crm'): Promise<{success: boolean, message: string}> => {
  try {
    const isConfigured = isWebhookConfigured(webhookType);
    
    if (!isConfigured) {
      console.warn(`[${new Date().toISOString()}] Zapier webhook for ${webhookType} is not configured.`);
      return {
        success: false,
        message: `The ${webhookType} webhook URL is not configured.`
      };
    }
    
    const webhookUrl = getWebhookUrl(webhookType);
    console.log(`[${new Date().toISOString()}] Triggering Zapier webhook for ${webhookType}: ${webhookUrl}`);
    
    if (!webhookUrl || webhookUrl === 'https://hooks.zapier.com/hooks/catch/your-webhook-id/') {
      return {
        success: false,
        message: `The ${webhookType} webhook URL is not properly configured.`
      };
    }
    
    // Add metadata to the payload
    const enrichedData = {
      ...data,
      timestamp: new Date().toISOString(),
      source: typeof window !== 'undefined' ? window.location.href : 'unknown',
      webhookType
    };
    
    // Send to Zapier with no-cors mode to handle CORS restrictions
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(enrichedData),
      mode: 'no-cors'
    });
    
    console.log(`[${new Date().toISOString()}] Successfully triggered Zapier webhook for ${webhookType}`);
    
    return {
      success: true,
      message: `Successfully sent data to ${webhookType} webhook.`
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error triggering Zapier webhook:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred while triggering webhook'
    };
  }
};

/**
 * Test if a Zapier webhook is working
 */
export const testZapierWebhook = async (webhookType: WebhookType = 'crm'): Promise<{success: boolean, message: string}> => {
  try {
    return triggerZapierWebhook({
      isTest: true,
      testMessage: `This is a test ping from the application to verify the ${webhookType} webhook is working.`,
      testTimestamp: new Date().toISOString()
    }, webhookType);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error testing Zapier webhook:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred during webhook test'
    };
  }
};
