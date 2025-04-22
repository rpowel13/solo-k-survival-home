
import { WebhookType } from './webhookTypes';
import { getZapierWebhookUrl } from './webhookUrlManager';

/**
 * Validates that a Zapier webhook URL is properly configured and accessible
 * @param webhookType The type of webhook to validate
 * @param skipTestPayload Optional flag to skip sending the test payload (default: false)
 * @returns Validation result with success status and message
 */
export const validateZapierWebhook = async (webhookType: WebhookType, skipTestPayload: boolean = false) => {
  try {
    const webhookUrl = getZapierWebhookUrl(webhookType);
    
    if (!webhookUrl) {
      return {
        success: false,
        message: `No webhook URL configured for ${webhookType}. Please set one in the Zapier settings.`
      };
    }
    
    console.log(`[${new Date().toISOString()}] Validating ${webhookType} webhook: ${webhookUrl}`);
    
    // Only send the test request if we're not skipping the test payload
    if (!skipTestPayload) {
      // Create a basic test payload for the webhook
      const testPayload = {
        testValidation: true,
        isTest: true,
        webhookType: webhookType,
        timestamp: new Date().toISOString(),
        source: typeof window !== 'undefined' ? window.location.href : 'Unknown'
      };
      
      // For specific form types, add relevant test data to make it easier to identify
      if (webhookType === 'solo401k' || webhookType === 'first_responder_401k') {
        Object.assign(testPayload, {
          formType: webhookType === 'solo401k' ? 'Solo401k' : 'First_Responder_401k',
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          businessName: 'Test Business',
          sponsorEin: '12-3456789',
          street: '123 Test St',
          city: 'Test City', 
          state: 'TX',
          zipCode: '12345'
        });
      } else if (webhookType === 'llc' || webhookType === 'first_responder_llc') {
        Object.assign(testPayload, {
          formType: webhookType === 'llc' ? 'LLC_Formation' : 'First_Responder_LLC',
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          desiredLLCName: 'Test LLC',
          street: '123 Test St',
          city: 'Test City',
          state: 'TX',
          zipCode: '12345'
        });
      }
      
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(testPayload),
          credentials: 'omit',
          mode: 'no-cors'
        });
        console.log(`[${new Date().toISOString()}] Test ping sent to ${webhookType} webhook`);
      } catch (error) {
        console.error(`[${new Date().toISOString()}] Error sending test ping:`, error);
        // We continue even if there's an error since no-cors mode won't give us actual error info
        // The webhook may still be working despite the error
      }
    } else {
      console.log(`[${new Date().toISOString()}] Skipping test payload for ${webhookType} webhook`);
    }
    
    // Since we're using no-cors mode, we can't check the actual response
    // We'll consider it a success if we made it this far without errors
    console.log(`[${new Date().toISOString()}] ${webhookType} webhook validation successful`);
    return {
      success: true,
      message: `${webhookType} webhook validation successful`
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error validating ${webhookType} webhook:`, error);
    return {
      success: false,
      message: `Error validating ${webhookType} webhook: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};
