
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
  return null;
};

/**
 * Set webhook URL in localStorage
 */
export const setStoredWebhookUrl = (url: string, type: WebhookType, updateAll: boolean = false): void => {
  localStorage.setItem(getWebhookStorageKey(type), url);
  
  if (updateAll) {
    const webhookTypes: WebhookType[] = ['crm', 'consultation', 'solo401k', 'llc', 'first_responder'];
    for (const otherType of webhookTypes) {
      if (otherType !== type) {
        localStorage.setItem(getWebhookStorageKey(otherType), url);
      }
    }
  }
};
