
import { WebhookType } from './webhookTypes';
import { getZapierWebhookUrl } from './webhookUrlManager';

/**
 * Validate the Zapier webhook URL for a specific type
 */
export const validateZapierWebhook = async (type: WebhookType = 'crm'): Promise<{success: boolean, message: string}> => {
  try {
    const webhookUrl = getZapierWebhookUrl(type);
    
    if (webhookUrl === "https://hooks.zapier.com/hooks/catch/your-webhook-id/") {
      return { 
        success: false, 
        message: `The ${type} webhook URL is not configured. Please set it in Settings.` 
      };
    }
    
    console.log(`[${new Date().toISOString()}] Validating ${type} webhook: ${webhookUrl}`);
    
    // Create type-specific test data to better test the webhook
    let testData: Record<string, any> = {
      testValidation: true,
      isTest: true,
      webhookType: type,
      timestamp: new Date().toISOString(),
      source: typeof window !== 'undefined' ? window.location.href : 'server-side'
    };
    
    // Add form-specific test fields based on webhook type
    if (type === 'solo401k') {
      testData = {
        ...testData,
        formType: 'Solo401k',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '555-123-4567',
        // Include address fields that were missing
        street: '123 Test St',
        city: 'Test City',
        state: 'TX',
        zipCode: '12345'
      };
    } else if (type === 'llc') {
      testData = {
        ...testData,
        formType: 'LLC_Formation',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        desiredLLCName: 'Test LLC',
        // Include address fields
        street: '123 Test St',
        city: 'Test City',
        state: 'TX',
        zipCode: '12345'
      };
    }
    
    // Send a test ping to the webhook
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData),
      mode: 'no-cors'
    });
    
    console.log(`[${new Date().toISOString()}] Test ping sent to ${type} webhook`);
    
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
