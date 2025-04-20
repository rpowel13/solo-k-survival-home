
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
  | 'first_responder_401k'
  | 'first_responder_llc'
  | 'alternative_investments'
  | 'prequalification';

// Default webhook URL if not configured in env or localStorage
const DEFAULT_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/your-webhook-id/";

// Define primary webhook types and their fallbacks
const WEBHOOK_FALLBACKS: Record<WebhookType, WebhookType[]> = {
  'crm': ['consultation', 'solo401k', 'llc', 'first_responder'],
  'consultation': ['crm', 'solo401k', 'llc', 'first_responder'],
  'solo401k': ['crm', 'consultation', 'first_responder_401k'],
  'llc': ['crm', 'consultation', 'first_responder_llc'],
  'first_responder': ['crm', 'consultation', 'first_responder_401k', 'first_responder_llc'],
  'first_responder_401k': ['first_responder', 'solo401k', 'crm'],
  'first_responder_llc': ['first_responder', 'llc', 'crm'],
  'alternative_investments': ['crm', 'consultation'],
  'prequalification': ['crm', 'consultation']
};

/**
 * Get the storage key for a specific webhook type
 * @param type The type of webhook
 * @returns The localStorage key for the webhook URL
 */
export const getWebhookStorageKey = (type: WebhookType): string => 
  `${ZAPIER_WEBHOOK_STORAGE_PREFIX}${type}_webhook_url`;

/**
 * Initialize Zapier configuration by checking environment variables and 
 * attempting to share webhook URLs across webhook types
 * @param type The type of webhook to initialize
 */
export const initZapierConfig = (webhookType: WebhookType) => {
  console.log(`[${new Date().toISOString()}] Initializing Zapier webhook for type: ${webhookType}`);
  
  // Check if this webhook type is already configured properly
  const currentUrl = localStorage.getItem(getWebhookStorageKey(webhookType));
  const defaultUrl = DEFAULT_WEBHOOK_URL;
  
  if (!currentUrl || currentUrl === defaultUrl) {
    console.log(`[${new Date().toISOString()}] ${webhookType} webhook not configured, checking fallbacks`);
    
    // Try to find a configured webhook URL from the fallback list
    const fallbacks = WEBHOOK_FALLBACKS[webhookType] || [];
    
    for (const fallbackType of fallbacks) {
      const fallbackUrl = localStorage.getItem(getWebhookStorageKey(fallbackType as WebhookType));
      
      if (fallbackUrl && fallbackUrl !== defaultUrl) {
        console.log(`[${new Date().toISOString()}] Using ${fallbackType} webhook URL for ${webhookType}: ${fallbackUrl}`);
        localStorage.setItem(getWebhookStorageKey(webhookType), fallbackUrl);
        
        // Also update all other unconfigured webhook types
        for (const otherType of Object.keys(WEBHOOK_FALLBACKS) as WebhookType[]) {
          const otherUrl = localStorage.getItem(getWebhookStorageKey(otherType));
          if (!otherUrl || otherUrl === defaultUrl) {
            console.log(`[${new Date().toISOString()}] Also updating ${otherType} webhook URL with the same value`);
            localStorage.setItem(getWebhookStorageKey(otherType), fallbackUrl);
          }
        }
        
        break;
      }
    }
  }
  
  // Check for environment variable specific to the webhook type
  const envKey = `VITE_ZAPIER_${webhookType.toUpperCase()}_WEBHOOK_URL`;
  const envWebhookUrl = import.meta.env[envKey];
  
  if (envWebhookUrl) {
    localStorage.setItem(getWebhookStorageKey(webhookType), envWebhookUrl);
    console.log(`[${new Date().toISOString()}] Zapier ${webhookType} webhook URL initialized from env var: ${envWebhookUrl}`);
    
    // Share this URL with other unconfigured webhook types
    for (const otherType of Object.keys(WEBHOOK_FALLBACKS) as WebhookType[]) {
      const otherUrl = localStorage.getItem(getWebhookStorageKey(otherType));
      if (!otherUrl || otherUrl === defaultUrl) {
        console.log(`[${new Date().toISOString()}] Also updating ${otherType} webhook URL with the env var value`);
        localStorage.setItem(getWebhookStorageKey(otherType), envWebhookUrl);
      }
    }
  } else {
    // Check if we already have a stored URL
    const storedUrl = localStorage.getItem(getWebhookStorageKey(webhookType));
    if (storedUrl && storedUrl !== defaultUrl) {
      console.log(`[${new Date().toISOString()}] Using stored ${webhookType} webhook URL: ${storedUrl}`);
    } else {
      const foundConfiguredWebhook = findConfiguredWebhook();
      if (foundConfiguredWebhook) {
        console.log(`[${new Date().toISOString()}] Using ${foundConfiguredWebhook.type} webhook URL for ${webhookType}: ${foundConfiguredWebhook.url}`);
        localStorage.setItem(getWebhookStorageKey(webhookType), foundConfiguredWebhook.url);
      } else {
        console.log(`[${new Date().toISOString()}] No configured webhook found for ${webhookType}, using default`);
        localStorage.setItem(getWebhookStorageKey(webhookType), DEFAULT_WEBHOOK_URL);
      }
    }
  }
  
  // Check Supabase connection as a final verification step
  supabase.from('contacts')
    .select('id')
    .limit(1)
    .then(({ error }) => {
      if (error) {
        console.error(`[${new Date().toISOString()}] Supabase connection error while initializing Zapier config:`, error);
      } else {
        console.log(`[${new Date().toISOString()}] Supabase connection OK for Zapier webhook`);
      }
    });
};

/**
 * Find any configured webhook URL across all types
 * @returns Object with webhook type and URL if found, null otherwise
 */
const findConfiguredWebhook = (): { type: WebhookType, url: string } | null => {
  for (const type of Object.keys(WEBHOOK_FALLBACKS) as WebhookType[]) {
    const url = localStorage.getItem(getWebhookStorageKey(type));
    if (url && url !== DEFAULT_WEBHOOK_URL) {
      return { type, url };
    }
  }
  return null;
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
    
    // Try to find and use a configured webhook as a last resort
    const configuredWebhook = findConfiguredWebhook();
    if (configuredWebhook) {
      console.log(`[${new Date().toISOString()}] Found alternative webhook ${configuredWebhook.type}, using its URL for ${type}`);
      localStorage.setItem(getWebhookStorageKey(type), configuredWebhook.url);
      return configuredWebhook.url;
    }
  } else {
    console.log(`[${new Date().toISOString()}] ${type} Zapier webhook URL: ${url}`);
  }
  
  return url;
};

/**
 * Set a custom Zapier webhook URL for a specific type
 * @param url The webhook URL to store
 * @param type The type of webhook
 * @param updateAll Whether to update all webhook types with this URL
 */
export const setZapierWebhookUrl = (url: string, type: WebhookType = 'crm', updateAll: boolean = false): void => {
  if (!url) return;
  
  localStorage.setItem(getWebhookStorageKey(type), url);
  console.log(`[${new Date().toISOString()}] Zapier ${type} webhook URL updated manually: ${url}`);
  
  // Optionally update all other webhook types with the same URL
  if (updateAll) {
    for (const otherType of Object.keys(WEBHOOK_FALLBACKS) as WebhookType[]) {
      if (otherType !== type) {
        localStorage.setItem(getWebhookStorageKey(otherType), url);
        console.log(`[${new Date().toISOString()}] Also updated ${otherType} webhook URL with the same value`);
      }
    }
  }
};

/**
 * Check if a webhook is properly configured (not using the default URL)
 * @param type The type of webhook to check
 * @returns Boolean indicating if the webhook is configured
 */
export const isWebhookConfigured = (type: WebhookType = 'crm'): boolean => {
  const url = getZapierWebhookUrl(type);
  const isConfigured = url !== DEFAULT_WEBHOOK_URL;
  console.log(`[${new Date().toISOString()}] ${type} webhook is configured: ${isConfigured}`);
  return isConfigured;
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
