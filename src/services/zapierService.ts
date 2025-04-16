
import { ContactFormData } from './vcitaService';

// Use an environment variable for the Zapier webhook URL
const ZAPIER_EMAIL_WEBHOOK = import.meta.env.VITE_ZAPIER_EMAIL_WEBHOOK || 'https://hooks.zapier.com/hooks/catch/YOUR_ZAPPIER_HOOK_ID/';

interface ZapierResponse {
  success: boolean;
  message?: string;
}

/**
 * Gets the Zapier webhook URL - preferring the environment variable
 */
const getWebhookUrl = (): string => {
  return ZAPIER_EMAIL_WEBHOOK;
};

/**
 * Sends form data to Zapier webhook which can forward to email
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
      subject: data.subject || "Solo 401k Application Submission",
      message: `
Solo 401k Application Details:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Additional Details:
Business Name: ${data.businessName}
Business Type: ${data.businessType}
Annual Income: ${data.annualIncome}
Trustees: ${data.trustee1Name}, ${data.trustee2Name || 'N/A'}
Participants: ${data.participant1Name}, ${data.participant2Name || 'N/A'}
Additional Info: ${data.additionalInfo || 'N/A'}
      `,
      consent: data.consent,
      source: window.location.href,
      timestamp: new Date().toISOString()
    };
    
    // In development, we'll simulate a successful response
    if (import.meta.env.DEV) {
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
