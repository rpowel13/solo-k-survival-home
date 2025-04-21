
import { WebhookType, ZAPIER_WEBHOOK_STORAGE_PREFIX } from './webhookTypes';

export const FIRST_RESPONDER_LLC_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/22537237/2x9p97g/";

export const getWebhookStorageKey = (type: WebhookType): string => 
  `${ZAPIER_WEBHOOK_STORAGE_PREFIX}${type}_webhook_url`;

export const getZapierWebhookUrl = (type: WebhookType = 'crm'): string => {
  // Always return the hardcoded URL for First Responder LLC
  if (type === 'first_responder_llc') {
    return FIRST_RESPONDER_LLC_WEBHOOK_URL;
  }
  
  const storedUrl = localStorage.getItem(getWebhookStorageKey(type));
  return storedUrl || "https://hooks.zapier.com/hooks/catch/your-webhook-id/";
};

export const setZapierWebhookUrl = (url: string, type: WebhookType = 'crm', updateAll: boolean = false): void => {
  // For First Responder LLC, always use the hardcoded URL
  if (type === 'first_responder_llc') {
    console.log(`[${new Date().toISOString()}] First Responder LLC webhook URL is hardcoded and cannot be changed`);
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
  // For First Responder LLC, always consider the hardcoded URL as configured
  if (type === 'first_responder_llc') {
    return true;
  }
  
  const url = getZapierWebhookUrl(type);
  const isConfigured = url !== "https://hooks.zapier.com/hooks/catch/your-webhook-id/";
  console.log(`[${new Date().toISOString()}] ${type} webhook is configured: ${isConfigured}`);
  return isConfigured;
};

