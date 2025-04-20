
import { supabase } from '@/integrations/supabase/client';
import { WebhookType, DEFAULT_WEBHOOK_URL, WEBHOOK_FALLBACKS } from './types';
import { getWebhookStorageKey, setStoredWebhookUrl, findConfiguredWebhook, getStoredWebhookUrl } from './storage';

/**
 * Initialize Zapier configuration
 */
export const initWebhook = (webhookType: WebhookType) => {
  console.log(`[${new Date().toISOString()}] Initializing Zapier webhook for type: ${webhookType}`);
  
  // Check environment variables first
  const envKey = `VITE_ZAPIER_${webhookType.toUpperCase()}_WEBHOOK_URL`;
  const envWebhookUrl = import.meta.env[envKey] || 'https://hooks.zapier.com/hooks/catch/22537237/2xtjoqu/';
  
  if (envWebhookUrl && envWebhookUrl !== DEFAULT_WEBHOOK_URL) {
    console.log(`[${new Date().toISOString()}] Zapier ${webhookType} webhook URL from env: ${envWebhookUrl}`);
    setStoredWebhookUrl(envWebhookUrl, webhookType, true);
    return;
  }
  
  // Check existing configuration
  const currentUrl = getStoredWebhookUrl(webhookType);
  if (!currentUrl || currentUrl === DEFAULT_WEBHOOK_URL) {
    console.log(`[${new Date().toISOString()}] ${webhookType} webhook not configured, checking fallbacks`);
    
    const fallbacks = WEBHOOK_FALLBACKS[webhookType] || [];
    for (const fallbackType of fallbacks) {
      const fallbackUrl = getStoredWebhookUrl(fallbackType as WebhookType);
      if (fallbackUrl && fallbackUrl !== DEFAULT_WEBHOOK_URL) {
        console.log(`[${new Date().toISOString()}] Using ${fallbackType} webhook URL as fallback for ${webhookType}`);
        setStoredWebhookUrl(fallbackUrl, webhookType, false);
        break;
      }
    }
    
    // If still not found, try the hardcoded fallback
    const hardcodedFallback = "https://hooks.zapier.com/hooks/catch/22537237/2xtjoqu/";
    if (hardcodedFallback && hardcodedFallback !== DEFAULT_WEBHOOK_URL) {
      console.log(`[${new Date().toISOString()}] Using hardcoded fallback URL for ${webhookType}`);
      setStoredWebhookUrl(hardcodedFallback, webhookType, true);
    }
  }
  
  // Verify Supabase connection
  supabase.from('contacts')
    .select('id')
    .limit(1)
    .then(({ error }) => {
      if (error) {
        console.error(`[${new Date().toISOString()}] Supabase connection error:`, error);
      } else {
        console.log(`[${new Date().toISOString()}] Supabase connection OK`);
      }
    });
};

/**
 * Get the configured Zapier webhook URL
 */
export const getWebhookUrl = (type: WebhookType = 'crm'): string => {
  const url = getStoredWebhookUrl(type);
  
  if (url === DEFAULT_WEBHOOK_URL) {
    console.warn(`[${new Date().toISOString()}] ${type} using default webhook URL`);
    const configuredWebhook = findConfiguredWebhook();
    if (configuredWebhook) {
      setStoredWebhookUrl(configuredWebhook.url, type);
      return configuredWebhook.url;
    }
  }
  
  return url;
};

/**
 * Set a custom Zapier webhook URL
 */
export const setWebhookUrl = (url: string, type: WebhookType = 'crm', updateAll: boolean = false): void => {
  if (!url) return;
  setStoredWebhookUrl(url, type, updateAll);
  console.log(`[${new Date().toISOString()}] Zapier ${type} webhook URL updated: ${url}`);
};

/**
 * Check if a webhook is properly configured
 */
export const isWebhookConfigured = (type: WebhookType = 'crm'): boolean => {
  const url = getWebhookUrl(type);
  const isConfigured = url !== DEFAULT_WEBHOOK_URL;
  console.log(`[${new Date().toISOString()}] ${type} webhook is configured: ${isConfigured}`);
  return isConfigured;
};
