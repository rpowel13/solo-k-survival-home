
import { ContactFormData } from './vcitaService';

// Default webhook URL (for demonstration purposes)
const DEFAULT_WEBHOOK_URL = '';

interface ZapierResponse {
  success: boolean;
  message?: string;
}

/**
 * Gets the Zapier webhook URL from localStorage or uses the default
 */
const getWebhookUrl = (): string => {
  const storedUrl = localStorage.getItem('zapier_webhook_url');
  return storedUrl || DEFAULT_WEBHOOK_URL;
};

/**
 * Sends contact form data to Zapier webhook which can connect to WooSender
 */
export const triggerZapierWebhook = async (data: ContactFormData): Promise<ZapierResponse> => {
  try {
    console.log('Triggering Zapier webhook with data:', data);
    
    const webhookUrl = getWebhookUrl();
    
    // If no webhook URL is set, log a warning and simulate success in development
    if (!webhookUrl) {
      console.warn('No Zapier webhook URL configured. Please set your webhook URL in the Zapier configuration.');
      
      if (process.env.NODE_ENV !== 'production') {
        console.log('Development mode: Simulating Zapier webhook submission');
        return { 
          success: true,
          message: 'Development mode: Zapier webhook submission simulated'
        };
      } else {
        return {
          success: false,
          message: 'No Zapier webhook URL configured'
        };
      }
    }
    
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
