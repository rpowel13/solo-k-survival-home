
import { WebhookType, WEBHOOK_FALLBACKS } from './webhookTypes';
import { getWebhookStorageKey, getZapierWebhookUrl, setZapierWebhookUrl } from './webhookUrlManager';
import { supabase } from '@/integrations/supabase/client';

/**
 * Find any configured webhook URL across all types
 */
const findConfiguredWebhook = (): { type: WebhookType, url: string } | null => {
  const webhookTypes: WebhookType[] = ['crm', 'consultation', 'solo401k', 'llc', 'first_responder'];
  for (const type of webhookTypes) {
    const url = getZapierWebhookUrl(type);
    if (url !== "https://hooks.zapier.com/hooks/catch/your-webhook-id/") {
      return { type, url };
    }
  }
  return null;
};

/**
 * Initialize Zapier configuration
 */
export const initZapierConfig = (webhookType: WebhookType) => {
  console.log(`[${new Date().toISOString()}] Initializing Zapier webhook for type: ${webhookType}`);
  
  // Check environment variables first
  const envKey = `VITE_ZAPIER_${webhookType.toUpperCase()}_WEBHOOK_URL`;
  const envWebhookUrl = import.meta.env[envKey] || 'https://hooks.zapier.com/hooks/catch/22537237/2xtjoqu/';
  
  if (envWebhookUrl) {
    setZapierWebhookUrl(envWebhookUrl, webhookType);
    return;
  }
  
  // Try to find a configured webhook URL from the fallback list
  const currentUrl = getZapierWebhookUrl(webhookType);
  if (currentUrl === "https://hooks.zapier.com/hooks/catch/your-webhook-id/") {
    const fallbacks = WEBHOOK_FALLBACKS[webhookType] || [];
    
    for (const fallbackType of fallbacks) {
      const fallbackUrl = getZapierWebhookUrl(fallbackType);
      if (fallbackUrl !== "https://hooks.zapier.com/hooks/catch/your-webhook-id/") {
        setZapierWebhookUrl(fallbackUrl, webhookType);
        break;
      }
    }
  }
  
  // Verify Supabase connection as a final check
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
