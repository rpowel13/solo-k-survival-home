
import { FormData, EmailResponse } from '@/types/formTypes';
import { getZapierWebhookUrl, isWebhookConfigured } from './zapierConfigService';
import { formatFormData } from '@/utils/formDataFormatter';

/**
 * Sends the form data to a Zapier webhook for CRM integration
 */
export const triggerZapierWebhook = async (data: FormData): Promise<EmailResponse> => {
  try {
    console.log(`[${new Date().toISOString()}] Preparing to send form data to Zapier:`, data);
    
    const formattedData = formatFormData(data);
    const webhookType = formattedData.formType.toLowerCase().replace(/_/g, '');
    const webhookUrl = getZapierWebhookUrl(webhookType as any);
    
    console.log(`[${new Date().toISOString()}] Using Zapier webhook URL (${webhookType}): ${webhookUrl}`);
    
    // Check if webhook is properly configured
    if (!isWebhookConfigured(webhookType as any)) {
      console.warn(`[${new Date().toISOString()}] Zapier webhook for ${webhookType} is not properly configured`);
      return { 
        success: false,
        message: `Zapier webhook for ${webhookType} is not properly configured. Please set it up in the Settings page.`
      };
    }
    
    // Log the full formatted payload for debugging
    console.log(`[${new Date().toISOString()}] Sending data to Zapier:`, JSON.stringify(formattedData, null, 2));
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedData),
      mode: 'no-cors'
    });
    
    console.log(`[${new Date().toISOString()}] Zapier webhook triggered successfully (${webhookType})`);
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

/**
 * Manually trigger a test ping to the Zapier webhook
 * Useful for testing webhook connectivity and configuration
 */
export const testZapierWebhook = async (webhookType: string): Promise<EmailResponse> => {
  try {
    const webhookUrl = getZapierWebhookUrl(webhookType as any);
    console.log(`[${new Date().toISOString()}] Testing Zapier webhook (${webhookType}): ${webhookUrl}`);
    
    if (!isWebhookConfigured(webhookType as any)) {
      return { 
        success: false,
        message: `Zapier webhook for ${webhookType} is not configured. Please set it up in the Settings page.`
      };
    }
    
    const testData = {
      testMode: true,
      testSource: 'Manual Test',
      formType: webhookType,
      timestamp: new Date().toISOString(),
      sourceUrl: typeof window !== 'undefined' ? window.location.href : 'Unknown',
      sessionInfo: {
        userAgent: navigator.userAgent,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        language: navigator.language
      }
    };
    
    console.log(`[${new Date().toISOString()}] Sending test data:`, testData);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData),
      mode: 'no-cors'
    });
    
    console.log(`[${new Date().toISOString()}] Test ping sent successfully to ${webhookType} webhook`);
    return { 
      success: true,
      message: `Test ping sent to Zapier ${webhookType} webhook. Check your Zapier account to verify receipt.`
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error testing Zapier webhook:`, error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
