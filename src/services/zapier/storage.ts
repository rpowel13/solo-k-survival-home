
import { WebhookType } from './types';

// Define a default webhook URL
const DEFAULT_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/your-webhook-id/";

// Function to check if a URL is the default webhook URL
export function isDefaultWebhookUrl(url: string): boolean {
  // relaxed check using string includes or equality to avoid literal type mismatch
  return url === DEFAULT_WEBHOOK_URL || url.includes('hooks.zapier.com/hooks/catch/');
}

/**
 * Generate a unique storage key for a webhook type
 */
export const getWebhookStorageKey = (type: WebhookType): string => {
  return `zapier_webhook_url_${type}`;
};

/**
 * Store a Zapier webhook URL in local storage
 */
export const setStoredWebhookUrl = (url: string, type: WebhookType, updateAll: boolean = false): void => {
  const key = getWebhookStorageKey(type);
  localStorage.setItem(key, url);
  
  if (updateAll) {
    // Iterate over all WebhookType values and update their URLs
    const webhookTypes: WebhookType[] = [
      'crm', 'consultation', 'solo401k', 'llc', 'first_responder',
      'first_responder_401k', 'first_responder_llc', 'alternative_investments',
      'prequalification'
    ];
    webhookTypes.forEach(webhookType => {
      const webhookKey = getWebhookStorageKey(webhookType);
      localStorage.setItem(webhookKey, url);
    });
  }
};

/**
 * Retrieve a Zapier webhook URL from local storage
 */
export const getStoredWebhookUrl = (type: WebhookType): string => {
  const key = getWebhookStorageKey(type);
  return localStorage.getItem(key) || DEFAULT_WEBHOOK_URL;
};

/**
 * Find a configured webhook URL in local storage
 */
export const findConfiguredWebhook = (): { type: WebhookType; url: string } | undefined => {
  const webhookTypes: WebhookType[] = [
    'crm', 'consultation', 'solo401k', 'llc', 'first_responder',
    'first_responder_401k', 'first_responder_llc', 'alternative_investments',
    'prequalification'
  ];
  
  for (const type of webhookTypes) {
    const url = getStoredWebhookUrl(type);
    if (url && !isDefaultWebhookUrl(url)) {
      return { type, url };
    }
  }
  
  return undefined;
};
