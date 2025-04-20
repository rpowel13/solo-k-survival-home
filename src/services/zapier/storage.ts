
import { WebhookType, ZAPIER_WEBHOOK_STORAGE_PREFIX, DEFAULT_WEBHOOK_URL } from './types';

/**
 * Get the storage key for a specific webhook type
 */
export const getWebhookStorageKey = (type: WebhookType): string => 
  `${ZAPIER_WEBHOOK_STORAGE_PREFIX}${type}_webhook_url`;

/**
 * Find any configured webhook URL across all types
 */
export const findConfiguredWebhook = (): { type: WebhookType, url: string } | null => {
  const webhookTypes: WebhookType[] = ['crm', 'consultation', 'solo401k', 'llc', 'first_responder'];
  
  for (const type of webhookTypes) {
    const url = localStorage.getItem(getWebhookStorageKey(type));
    if (url && url !== DEFAULT_WEBHOOK_URL) {
      return { type, url };
    }
  }
  
  // If no config found in localStorage, try to use the default env variable
  const envWebhookUrl = import.meta.env.VITE_ZAPIER_CRM_WEBHOOK_URL;
  if (envWebhookUrl && envWebhookUrl !== DEFAULT_WEBHOOK_URL) {
    return { type: 'crm', url: envWebhookUrl };
  }
  
  return null;
};

/**
 * Set webhook URL in localStorage and ensure it persists
 */
export const setStoredWebhookUrl = (url: string, type: WebhookType, updateAll: boolean = false): void => {
  // Store in localStorage for current session
  localStorage.setItem(getWebhookStorageKey(type), url);
  
  // For better persistence across devices, also store in sessionStorage as backup
  sessionStorage.setItem(getWebhookStorageKey(type), url);
  
  // Store a timestamp to track when this was last updated
  localStorage.setItem(`${getWebhookStorageKey(type)}_updated`, new Date().toISOString());
  
  console.log(`[${new Date().toISOString()}] Webhook URL for ${type} saved: ${url}`);
  
  if (updateAll) {
    const webhookTypes: WebhookType[] = ['crm', 'consultation', 'solo401k', 'llc', 'first_responder', 
                                         'first_responder_401k', 'first_responder_llc', 
                                         'alternative_investments', 'prequalification'];
    for (const otherType of webhookTypes) {
      if (otherType !== type) {
        localStorage.setItem(getWebhookStorageKey(otherType), url);
        sessionStorage.setItem(getWebhookStorageKey(otherType), url);
        localStorage.setItem(`${getWebhookStorageKey(otherType)}_updated`, new Date().toISOString());
        console.log(`[${new Date().toISOString()}] Webhook URL for ${otherType} also updated to match ${type}`);
      }
    }
  }
  
  // Try to use browser sync if available
  try {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().then(isPersisted => {
        console.log(`Persisted storage granted: ${isPersisted}`);
      });
    }
  } catch (error) {
    console.error('Error trying to persist storage:', error);
  }
};

/**
 * Retrieve the webhook URL from storage with fallback mechanisms
 */
export const getStoredWebhookUrl = (type: WebhookType): string => {
  // First try localStorage
  let url = localStorage.getItem(getWebhookStorageKey(type));
  
  // If not in localStorage, try sessionStorage as backup
  if (!url) {
    url = sessionStorage.getItem(getWebhookStorageKey(type));
    // If found in sessionStorage but not localStorage, restore to localStorage
    if (url) {
      localStorage.setItem(getWebhookStorageKey(type), url);
      console.log(`[${new Date().toISOString()}] Restored ${type} webhook URL from sessionStorage`);
    }
  }
  
  // If still not found, try environment variables
  if (!url) {
    const envKey = `VITE_ZAPIER_${type.toUpperCase()}_WEBHOOK_URL`;
    const envUrl = import.meta.env[envKey];
    if (envUrl) {
      url = envUrl;
      localStorage.setItem(getWebhookStorageKey(type), url);
      sessionStorage.setItem(getWebhookStorageKey(type), url);
      console.log(`[${new Date().toISOString()}] Using ${type} webhook URL from environment: ${url}`);
    }
  }
  
  // If still not found, check for CRM webhook as default fallback
  if (!url && type !== 'crm') {
    const crmUrl = localStorage.getItem(getWebhookStorageKey('crm'));
    if (crmUrl && crmUrl !== DEFAULT_WEBHOOK_URL) {
      url = crmUrl;
      localStorage.setItem(getWebhookStorageKey(type), url);
      sessionStorage.setItem(getWebhookStorageKey(type), url);
      console.log(`[${new Date().toISOString()}] Using CRM webhook URL as fallback for ${type}: ${url}`);
    }
  }
  
  // If nothing else worked, use hardcoded fallback from .env if it exists
  if (!url || url === DEFAULT_WEBHOOK_URL) {
    // Use the CRM fallback URL that was provided by the user
    const hardcodedFallback = "https://hooks.zapier.com/hooks/catch/22537237/2xtjoqu/";
    if (hardcodedFallback && hardcodedFallback !== DEFAULT_WEBHOOK_URL) {
      url = hardcodedFallback;
      localStorage.setItem(getWebhookStorageKey(type), url);
      sessionStorage.setItem(getWebhookStorageKey(type), url);
      console.log(`[${new Date().toISOString()}] Using hardcoded fallback URL for ${type}: ${url}`);
    } else {
      url = DEFAULT_WEBHOOK_URL;
    }
  }
  
  return url;
};
