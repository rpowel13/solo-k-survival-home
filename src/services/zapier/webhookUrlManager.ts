
import { WebhookType, ZAPIER_WEBHOOK_STORAGE_PREFIX, DEFAULT_WEBHOOK_URL } from './webhookTypes';

/**
 * Get the storage key for a specific webhook type
 */
export const getWebhookStorageKey = (type: WebhookType): string => 
  `${ZAPIER_WEBHOOK_STORAGE_PREFIX}${type}_webhook_url`;

/**
 * Get the configured Zapier webhook URL for a specific type
 */
export const getZapierWebhookUrl = (type: WebhookType = 'crm'): string => {
  const storedUrl = localStorage.getItem(getWebhookStorageKey(type));
  return storedUrl || DEFAULT_WEBHOOK_URL;
};

/**
 * Set a custom Zapier webhook URL for a specific type
 */
export const setZapierWebhookUrl = (url: string, type: WebhookType = 'crm', updateAll: boolean = false): void => {
  if (!url) return;
  
  localStorage.setItem(getWebhookStorageKey(type), url);
  console.log(`[${new Date().toISOString()}] Zapier ${type} webhook URL updated manually: ${url}`);
  
  if (updateAll) {
    const webhookTypes: WebhookType[] = ['crm', 'consultation', 'solo401k', 'llc', 'first_responder'];
    for (const otherType of webhookTypes) {
      if (otherType !== type) {
        localStorage.setItem(getWebhookStorageKey(otherType), url);
        console.log(`[${new Date().toISOString()}] Also updated ${otherType} webhook URL with the same value`);
      }
    }
  }
};

/**
 * Check if a webhook is properly configured
 */
export const isWebhookConfigured = (type: WebhookType = 'crm'): boolean => {
  const url = getZapierWebhookUrl(type);
  const isConfigured = url !== DEFAULT_WEBHOOK_URL;
  console.log(`[${new Date().toISOString()}] ${type} webhook is configured: ${isConfigured}`);
  return isConfigured;
};
