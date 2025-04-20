
import { WebhookType } from './types';
import { getWebhookUrl } from './webhookService';

/**
 * Validate the Zapier webhook URL for a specific type by sending a test ping
 */
export const validateWebhook = async (type: WebhookType = 'crm'): Promise<{success: boolean, message: string}> => {
  try {
    const webhookUrl = getWebhookUrl(type);
    
    if (webhookUrl === "https://hooks.zapier.com/hooks/catch/your-webhook-id/") {
      return { 
        success: false, 
        message: `The ${type} webhook URL is not configured. Please set it in Settings.` 
      };
    }
    
    console.log(`[${new Date().toISOString()}] Validating ${type} webhook: ${webhookUrl}`);
    
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        testValidation: true,
        isTest: true,
        webhookType: type,
        timestamp: new Date().toISOString(),
        source: typeof window !== 'undefined' ? window.location.href : 'server-side',
        testData: {
          name: "Test Contact",
          email: "test@example.com",
          message: "This is a test ping from the webhook validation feature."
        }
      }),
      mode: 'no-cors'
    });
    
    return {
      success: true,
      message: `Test ping sent to ${type} webhook. Check your Zapier account to confirm it was received.`
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error validating ${type} webhook:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred during validation'
    };
  }
};
