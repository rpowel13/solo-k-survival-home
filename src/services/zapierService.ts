
import { ContactFormData } from './vcitaService';

// Fixed webhook URL that connects to WooSender
const FIXED_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/YOUR_ZAPPIER_HOOK_ID/';

interface ZapierResponse {
  success: boolean;
  message?: string;
}

/**
 * Gets the Zapier webhook URL - preferring the fixed URL
 */
const getWebhookUrl = (): string => {
  return FIXED_WEBHOOK_URL;
};

/**
 * Sends contact form data to Zapier webhook which can connect to WooSender
 */
export const triggerZapierWebhook = async (data: ContactFormData): Promise<ZapierResponse> => {
  try {
    console.log('Triggering Zapier webhook with data:', data);
    
    const webhookUrl = getWebhookUrl();
    
    // Structure the data for Zapier webhook
    const zapierData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      consent: data.consent,
      source: window.location.href,
      timestamp: new Date().toISOString()
    };
    
    // In development, we'll simulate a successful response
    if (process.env.NODE_ENV !== 'production') {
      console.log('Development mode: Simulating Zapier webhook submission');
      return { 
        success: true,
        message: 'Development mode: Zapier webhook submission simulated'
      };
    }
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors', // Add this to handle CORS
      body: JSON.stringify(zapierData)
    });
    
    // Since we're using no-cors, we won't get a proper response status
    // Instead, we'll just assume it was successful
    console.log('Zapier webhook triggered');
    
    return { success: true };
  } catch (error) {
    console.error('Zapier webhook submission error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
