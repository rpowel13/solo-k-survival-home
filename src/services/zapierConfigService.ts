
/**
 * Zapier Configuration Service
 * Handles Zapier webhook URL configuration and retrieval for multiple integration types
 */

import { supabase } from '@/integrations/supabase/client';

// The prefix used to store webhook URLs in localStorage
export const ZAPIER_WEBHOOK_STORAGE_PREFIX = "zapier_";

// Webhook types supported
export type WebhookType = 
  | 'crm' 
  | 'consultation' 
  | 'solo401k' 
  | 'llc' 
  | 'first_responder'
  | 'alternative_investments';

// Default webhook URL if not configured in env or localStorage
const DEFAULT_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/your-webhook-id/";

/**
 * Get the storage key for a specific webhook type
 * @param type The type of webhook
 * @returns The localStorage key for the webhook URL
 */
export const getWebhookStorageKey = (type: WebhookType): string => 
  `${ZAPIER_WEBHOOK_STORAGE_PREFIX}${type}_webhook_url`;

/**
 * Initialize Zapier configuration by checking environment variables
 * @param type The type of webhook to initialize
 */
export const initZapierConfig = (webhookType: WebhookType) => {
  console.log(`[${new Date().toISOString()}] Initializing Zapier webhook for type: ${webhookType}`);
  
  // Check if Supabase is properly connected first
  supabase.from('contacts')
    .select('id')
    .limit(1)
    .then(({ error }) => {
      if (error) {
        console.error(`[${new Date().toISOString()}] Supabase connection error while initializing Zapier config:`, error);
        // Consider showing a toast notification here to inform users
      } else {
        console.log(`[${new Date().toISOString()}] Supabase connection OK for Zapier webhook`);
        // Continue with webhook initialization
        // Check for environment variable specific to the webhook type
        const envKey = `VITE_ZAPIER_${webhookType.toUpperCase()}_WEBHOOK_URL`;
        const envWebhookUrl = import.meta.env[envKey];
        
        console.log(`[${new Date().toISOString()}] Checking for ${envKey} environment variable`);
        
        // If environment variable exists, use it and store in localStorage
        if (envWebhookUrl) {
          localStorage.setItem(getWebhookStorageKey(webhookType), envWebhookUrl);
          console.log(`[${new Date().toISOString()}] Zapier ${webhookType} webhook URL initialized from env var: ${envWebhookUrl}`);
        } else {
          console.log(`[${new Date().toISOString()}] No env var found for ${webhookType} webhook`);
          
          // Check if we already have a stored URL
          const storedUrl = localStorage.getItem(getWebhookStorageKey(webhookType));
          if (storedUrl) {
            console.log(`[${new Date().toISOString()}] Using stored ${webhookType} webhook URL: ${storedUrl}`);
          } else {
            console.log(`[${new Date().toISOString()}] No stored URL found for ${webhookType} webhook, using default`);
            localStorage.setItem(getWebhookStorageKey(webhookType), DEFAULT_WEBHOOK_URL);
          }
        }
      }
    });
};

/**
 * Get the configured Zapier webhook URL for a specific type
 * @param type The type of webhook to retrieve
 * @returns The webhook URL from localStorage or default if not found
 */
export const getZapierWebhookUrl = (type: WebhookType = 'crm'): string => {
  const storedUrl = localStorage.getItem(getWebhookStorageKey(type));
  const url = storedUrl || DEFAULT_WEBHOOK_URL;
  
  // Log and warn if using default URL
  if (url === DEFAULT_WEBHOOK_URL) {
    console.warn(`[${new Date().toISOString()}] ${type} is using the default webhook URL - CRM integration may not work`);
  } else {
    console.log(`[${new Date().toISOString()}] ${type} Zapier webhook URL: ${url}`);
  }
  
  return url;
};

/**
 * Set a custom Zapier webhook URL for a specific type
 * @param url The webhook URL to store
 * @param type The type of webhook
 */
export const setZapierWebhookUrl = (url: string, type: WebhookType = 'crm'): void => {
  if (!url) return;
  localStorage.setItem(getWebhookStorageKey(type), url);
  console.log(`[${new Date().toISOString()}] Zapier ${type} webhook URL updated manually: ${url}`);
};

/**
 * Check if a webhook is properly configured (not using the default URL)
 * @param type The type of webhook to check
 * @returns Boolean indicating if the webhook is configured
 */
export const isWebhookConfigured = (type: WebhookType = 'crm'): boolean => {
  const url = getZapierWebhookUrl(type);
  return url !== DEFAULT_WEBHOOK_URL;
};

/**
 * Validate the Zapier webhook URL for a specific type by sending a test ping
 * @param type The type of webhook to validate
 * @returns Promise resolving to success/error status
 */
export const validateZapierWebhook = async (type: WebhookType = 'crm'): Promise<{success: boolean, message: string}> => {
  try {
    const webhookUrl = getZapierWebhookUrl(type);
    
    if (webhookUrl === DEFAULT_WEBHOOK_URL) {
      return { 
        success: false, 
        message: `The ${type} webhook URL is not configured. Please set it in Settings.` 
      };
    }
    
    console.log(`[${new Date().toISOString()}] Validating ${type} webhook: ${webhookUrl}`);
    
    // Send a test ping to the webhook
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        testValidation: true,
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
