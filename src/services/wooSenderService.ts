
// WooSender API integration service
import { ContactFormData } from './vcitaService';

// WooSender API configuration
const WOOSENDER_API_URL = 'https://api.woosender.com/contacts'; // Replace with the actual WooSender API endpoint
const DEFAULT_API_KEY = 'your-woosender-api-key'; // Fallback API key

interface WooSenderResponse {
  success: boolean;
  message?: string;
}

/**
 * Gets the WooSender API key from localStorage or uses the default
 */
const getApiKey = (): string => {
  const storedKey = localStorage.getItem('woosender_api_key');
  return storedKey || DEFAULT_API_KEY;
};

/**
 * Sends contact form data to WooSender API
 */
export const submitToWooSender = async (data: ContactFormData): Promise<WooSenderResponse> => {
  try {
    console.log('Submitting contact form to WooSender:', data);
    
    const apiKey = getApiKey();
    
    // If no API key is set, log a warning but don't fail
    if (apiKey === DEFAULT_API_KEY) {
      console.warn('Using default WooSender API key. Set your actual API key in the WooSender configuration.');
    }
    
    // In development, we'll simulate a successful response
    if (process.env.NODE_ENV !== 'production') {
      console.log('Development mode: Simulating WooSender submission');
      return { 
        success: true,
        message: 'Development mode: WooSender submission simulated'
      };
    }
    
    // Structure the data according to WooSender's expected format
    const wooSenderData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      notes: `Subject: ${data.subject}\nMessage: ${data.message}`,
      consent: data.consent,
      source: window.location.href
    };
    
    const response = await fetch(WOOSENDER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(wooSenderData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('WooSender API Error:', response.status, errorData);
      throw new Error(`API error: ${response.status}`);
    }
    
    const responseData = await response.json();
    console.log('WooSender API Response:', responseData);
    
    return { success: true };
  } catch (error) {
    console.error('WooSender submission error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
