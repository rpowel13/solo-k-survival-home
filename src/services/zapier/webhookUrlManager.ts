
import { WebhookType, ZAPIER_WEBHOOK_STORAGE_PREFIX, SOLO_401K_WEBHOOK_URL, FIRST_RESPONDER_401K_WEBHOOK_URL } from './webhookTypes';

// Add a hardcoded URL for LLC webhook
export const LLC_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/22537237/2xdpcb6/";
export const FIRST_RESPONDER_LLC_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/22537237/2x9p97g/";

export const getWebhookStorageKey = (type: WebhookType): string => 
  `${ZAPIER_WEBHOOK_STORAGE_PREFIX}${type}_webhook_url`;

export const getZapierWebhookUrl = (type: WebhookType = 'crm'): string => {
  // Log when retrieving a webhook URL for debugging
  console.log(`[${new Date().toISOString()}] Getting Zapier webhook URL for type: ${type}`);
  
  // Return hardcoded URLs for specific types
  if (type === 'first_responder_llc') {
    console.log(`[${new Date().toISOString()}] Using hardcoded first_responder_llc webhook URL: ${FIRST_RESPONDER_LLC_WEBHOOK_URL}`);
    return FIRST_RESPONDER_LLC_WEBHOOK_URL;
  }
  
  if (type === 'solo401k') {
    console.log(`[${new Date().toISOString()}] Using hardcoded solo401k webhook URL: ${SOLO_401K_WEBHOOK_URL}`);
    return SOLO_401K_WEBHOOK_URL;
  }
  
  if (type === 'first_responder_401k') {
    console.log(`[${new Date().toISOString()}] Using hardcoded first_responder_401k webhook URL: ${FIRST_RESPONDER_401K_WEBHOOK_URL}`);
    return FIRST_RESPONDER_401K_WEBHOOK_URL;
  }
  
  if (type === 'llc') {
    console.log(`[${new Date().toISOString()}] Using hardcoded LLC webhook URL: ${LLC_WEBHOOK_URL}`);
    return LLC_WEBHOOK_URL;
  }
  
  const storedUrl = localStorage.getItem(getWebhookStorageKey(type));
  console.log(`[${new Date().toISOString()}] Retrieved ${type} webhook URL from storage: ${storedUrl || "not found"}`);
  return storedUrl || "https://hooks.zapier.com/hooks/catch/your-webhook-id/";
};

export const setZapierWebhookUrl = (url: string, type: WebhookType = 'crm', updateAll: boolean = false): void => {
  // For hardcoded webhook types, prevent changes
  if (type === 'first_responder_llc' || type === 'solo401k' || type === 'first_responder_401k' || type === 'llc') {
    console.log(`[${new Date().toISOString()}] ${type} webhook URL is hardcoded and cannot be changed`);
    return;
  }
  
  if (!url) return;
  
  localStorage.setItem(getWebhookStorageKey(type), url);
  console.log(`[${new Date().toISOString()}] Zapier ${type} webhook URL updated manually: ${url}`);
  
  if (updateAll) {
    const webhookTypes: WebhookType[] = ['crm', 'consultation', 'llc', 'first_responder'];
    for (const otherType of webhookTypes) {
      if (otherType !== type && otherType !== 'solo401k' && otherType !== 'first_responder_401k' && otherType !== 'first_responder_llc') {
        localStorage.setItem(getWebhookStorageKey(otherType), url);
        console.log(`[${new Date().toISOString()}] Also updated ${otherType} webhook URL with the same value`);
      }
    }
  }
};

export const isWebhookConfigured = (type: WebhookType = 'crm'): boolean => {
  // For hardcoded webhook types, always return true
  if (type === 'first_responder_llc' || type === 'solo401k' || type === 'first_responder_401k' || type === 'llc') {
    return true;
  }
  
  const url = getZapierWebhookUrl(type);
  const isConfigured = url !== "https://hooks.zapier.com/hooks/catch/your-webhook-id/";
  console.log(`[${new Date().toISOString()}] ${type} webhook is configured: ${isConfigured}`);
  return isConfigured;
};
