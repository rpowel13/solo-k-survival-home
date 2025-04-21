
import { WebhookType, ZAPIER_WEBHOOK_STORAGE_PREFIX, DEFAULT_WEBHOOK_URL } from './webhookTypes';

export const getWebhookStorageKey = (type: WebhookType): string => 
  `${ZAPIER_WEBHOOK_STORAGE_PREFIX}${type}_webhook_url`;

export const getZapierWebhookUrl = (type: WebhookType = 'crm'): string => {
  // Always return the hardcoded URL for LLC formation
  if (type === 'llc') {
    return DEFAULT_WEBHOOK_URL;
  }
  
  const storedUrl = localStorage.getItem(getWebhookStorageKey(type));
  return storedUrl || DEFAULT_WEBHOOK_URL;
};

export const setZapierWebhookUrl = (url: string, type: WebhookType = 'crm', updateAll: boolean = false): void => {
  // For LLC, always use the hardcoded URL
  if (type === 'llc') {
    console.log(`[${new Date().toISOString()}] LLC webhook URL is hardcoded and cannot be changed`);
    return;
  }
  
  if (!url) return;
  
  localStorage.setItem(getWebhookStorageKey(type), url);
  console.log(`[${new Date().toISOString()}] Zapier ${type} webhook URL updated manually: ${url}`);
  
  if (updateAll) {
    const webhookTypes: WebhookType[] = ['crm', 'consultation', 'solo401k', 'first_responder'];
    for (const otherType of webhookTypes) {
      if (otherType !== type) {
        localStorage.setItem(getWebhookStorageKey(otherType), url);
        console.log(`[${new Date().toISOString()}] Also updated ${otherType} webhook URL with the same value`);
      }
    }
  }
};

export const isWebhookConfigured = (type: WebhookType = 'crm'): boolean => {
  // For LLC, always consider the hardcoded URL as configured
  if (type === 'llc') {
    return true;
  }
  
  const url = getZapierWebhookUrl(type);
  const isConfigured = url !== DEFAULT_WEBHOOK_URL;
  console.log(`[${new Date().toISOString()}] ${type} webhook is configured: ${isConfigured}`);
  return isConfigured;
};
