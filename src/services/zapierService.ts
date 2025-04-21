import { FormData, EmailResponse } from '@/types/formTypes';
import { getZapierWebhookUrl, isWebhookConfigured } from './zapier/webhookUrlManager';
import { WebhookType, WEBHOOK_FALLBACKS, SOLO_401K_WEBHOOK_URL } from './zapier/webhookTypes';
import { formatFormData } from '@/utils/formDataFormatter';

/**
 * Sends the form data to a Zapier webhook for CRM integration
 */
export const triggerZapierWebhook = async (data: FormData): Promise<EmailResponse> => {
  try {
    console.log(`[${new Date().toISOString()}] Preparing to send form data to Zapier:`, data);
    
    // Validate that the data is an object before continuing
    if (!data || typeof data !== 'object') {
      console.error(`[${new Date().toISOString()}] Invalid data format for Zapier webhook:`, data);
      return {
        success: false,
        message: 'Invalid data format. Data must be an object.'
      };
    }
    
    // Format the data for the webhook
    const formattedData = formatFormData(data);
    
    // Determine webhook type from formType property or from formatted data
    let webhookType = 'crm'; // Default webhook type
    
    if ('formType' in data && typeof data.formType === 'string') {
      // Get webhook type from form data
      if (data.formType.toLowerCase().includes('solo401k') || data.formType.toLowerCase() === 'solo401k') {
        webhookType = 'solo401k';
        console.log(`[${new Date().toISOString()}] Solo401k form type detected, using specific webhook`);
      } else if (data.formType.toLowerCase().includes('llc') || data.formType.toLowerCase().includes('formation')) {
        webhookType = 'llc';
        console.log(`[${new Date().toISOString()}] LLC form type detected, using specific webhook`);
      } else if (data.formType.toLowerCase().includes('first_responder')) {
        webhookType = 'first_responder';
      } else if (data.formType.toLowerCase().includes('schedule') || data.formType.toLowerCase().includes('consultation')) {
        webhookType = 'consultation';
      } else if (data.formType.toLowerCase().includes('contact')) {
        webhookType = 'crm';
      }
    } else if (formattedData.formType) {
      // Get webhook type from formatted data if not in original data
      if (formattedData.formType.toLowerCase().includes('solo401k') || formattedData.formType.toLowerCase() === 'solo401k') {
        webhookType = 'solo401k';
      } else if (formattedData.formType.toLowerCase().includes('llc') || formattedData.formType.toLowerCase().includes('formation')) {
        webhookType = 'llc';
        console.log(`[${new Date().toISOString()}] LLC form type detected from formatted data`);
      } else if (formattedData.formType.toLowerCase().includes('first_responder')) {
        webhookType = 'first_responder';
      } else if (formattedData.formType.toLowerCase().includes('schedule') || formattedData.formType.toLowerCase().includes('consultation')) {
        webhookType = 'consultation';
      }
    }
    
    console.log(`[${new Date().toISOString()}] Determined webhook type: ${webhookType}`);
    
    // For Solo401k forms, always use the hardcoded webhook URL
    if (webhookType === 'solo401k') {
      console.log(`[${new Date().toISOString()}] Using hardcoded Solo401k webhook URL: ${SOLO_401K_WEBHOOK_URL}`);
      
      // Log the full Solo401k payload for debugging
      console.log(`[${new Date().toISOString()}] Solo401k complete payload:`, JSON.stringify(formattedData, null, 2));
      
      try {
        // Send directly to the hardcoded URL for Solo401k
        await fetch(SOLO_401K_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formattedData),
          credentials: 'omit',
          mode: 'no-cors'
        });
        
        console.log(`[${new Date().toISOString()}] Successfully sent to Solo401k webhook URL`);
        
        return { 
          success: true,
          message: `Form submitted to Zapier via Solo401k webhook URL`
        };
      } catch (soloError) {
        console.error(`[${new Date().toISOString()}] Error sending to Solo401k webhook:`, soloError);
        throw soloError;
      }
    }
    
    // For LLC forms, always use the hardcoded webhook URL
    if (webhookType === 'llc') {
      const llcWebhookUrl = getZapierWebhookUrl('llc');
      console.log(`[${new Date().toISOString()}] Using hardcoded LLC webhook URL: ${llcWebhookUrl}`);
      
      // Log the full LLC payload for debugging
      console.log(`[${new Date().toISOString()}] LLC complete payload:`, JSON.stringify(formattedData, null, 2));
      
      try {
        // Send directly to the hardcoded URL for LLC
        await fetch(llcWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formattedData),
          credentials: 'omit',
          mode: 'no-cors'
        });
        
        console.log(`[${new Date().toISOString()}] Successfully sent to LLC webhook URL`);
        
        return { 
          success: true,
          message: `Form submitted to Zapier via LLC webhook URL`
        };
      } catch (llcError) {
        console.error(`[${new Date().toISOString()}] Error sending to LLC webhook:`, llcError);
        throw llcError;
      }
    }
    
    // Check if webhook is properly configured before processing
    if (!isWebhookConfigured(webhookType as WebhookType)) {
      console.warn(`[${new Date().toISOString()}] Zapier webhook for ${webhookType} is not properly configured, retrying with default URL`);
      
      // Try resetting the webhook URL from environment variables or config
      const envKey = `VITE_ZAPIER_${webhookType.toUpperCase()}_WEBHOOK_URL`;
      const backupWebhookUrl = import.meta.env[envKey] || "https://hooks.zapier.com/hooks/catch/22537237/2xtjoqu/";
      
      if (backupWebhookUrl && backupWebhookUrl !== "https://hooks.zapier.com/hooks/catch/your-webhook-id/") {
        console.log(`[${new Date().toISOString()}] Found backup webhook URL from environment: ${backupWebhookUrl}`);
        
        // Try sending with the backup webhook URL
        try {
          console.log(`[${new Date().toISOString()}] Attempting with backup webhook URL: ${backupWebhookUrl}`);
          console.log(`[${new Date().toISOString()}] Sending data:`, formattedData);
          
          await fetch(backupWebhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedData),
            credentials: 'omit',
            mode: 'no-cors'
          });
          
          console.log(`[${new Date().toISOString()}] Successfully sent to backup webhook URL`);
          
          return { 
            success: true,
            message: `Form submitted to Zapier via backup webhook URL (${webhookType})`
          };
        } catch (backupError) {
          console.error(`[${new Date().toISOString()}] Error sending to backup webhook:`, backupError);
        }
      }
      
      // Return a partial success to allow the application to continue with other submission methods
      return { 
        success: true,
        message: `Zapier webhook for ${webhookType} is not properly configured, but the application will be saved via other methods.`
      };
    }
    
    const webhookUrl = getZapierWebhookUrl(webhookType as WebhookType);
    console.log(`[${new Date().toISOString()}] Using Zapier webhook URL (${webhookType}): ${webhookUrl}`);
    
    // DEBUG: Log exact payload going to Zapier
    console.log(`[${new Date().toISOString()}] PAYLOAD TO ZAPIER:`, JSON.stringify(formattedData, null, 2));
    
    // Try sending with fetch but explicitly set credentials to 'omit'
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedData),
      credentials: 'omit', // Explicitly avoid sending credentials
      mode: 'no-cors' // This prevents CORS issues but also prevents reading response
    });
    
    console.log(`[${new Date().toISOString()}] Zapier webhook triggered successfully (${webhookType})`);
    return { 
      success: true,
      message: `Form submitted successfully to Zapier via ${webhookType} webhook`
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error sending data to Zapier:`, error);
    // Return a partial success to allow the application to continue with other submission methods
    return { 
      success: false, 
      message: 'Failed to submit to Zapier: ' + (error instanceof Error ? error.message : 'Unknown error')
    };
  }
};

/**
 * Manually trigger a test ping to the Zapier webhook
 * Useful for testing webhook connectivity and configuration
 */
export const testZapierWebhook = async (webhookType: string): Promise<EmailResponse> => {
  try {
    const webhookUrl = getZapierWebhookUrl(webhookType as WebhookType);
    console.log(`[${new Date().toISOString()}] Testing Zapier webhook (${webhookType}): ${webhookUrl}`);
    
    if (!isWebhookConfigured(webhookType as WebhookType)) {
      return { 
        success: false,
        message: `Zapier webhook for ${webhookType} is not configured. Please set it up in the Settings page.`
      };
    }
    
    const testData = {
      formType: webhookType,
      name: "Test Contact",
      email: "test@example.com",
      phone: "555-123-4567",
      subject: "Zapier Test",
      message: "This is a manual test ping from the application.",
      timestamp: new Date().toISOString(),
      sourceUrl: typeof window !== 'undefined' ? window.location.href : 'Unknown'
    };
    
    console.log(`[${new Date().toISOString()}] Sending test data:`, testData);
    
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData),
      credentials: 'omit',
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
