
export * from './types';
export * from './storage';
export * from './validation';
export * from './webhookService';

// Re-export with compatibility names to avoid breaking changes
import { WebhookType } from './types';
import { getWebhookUrl, setWebhookUrl, isWebhookConfigured, initWebhook } from './webhookService';
import { validateWebhook } from './validation';

/**
 * @deprecated Use initWebhook from @/services/zapier
 */
export const initZapierConfig = initWebhook;

/**
 * @deprecated Use getWebhookUrl from @/services/zapier
 */
export const getZapierWebhookUrl = getWebhookUrl;

/**
 * @deprecated Use validateWebhook from @/services/zapier
 */
export const validateZapierWebhook = validateWebhook;
