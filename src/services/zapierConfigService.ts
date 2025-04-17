
/**
 * Zapier Configuration Service
 * Handles Zapier webhook URL configuration and retrieval
 */

// The key used to store the Zapier webhook URL in localStorage
export const ZAPIER_WEBHOOK_STORAGE_KEY = "zapier_webhook_url";

// Default webhook URL if not configured in env or localStorage
const DEFAULT_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/your-webhook-id/";

/**
 * Initialize Zapier configuration by checking environment variables
 * and storing in localStorage if available
 */
export const initZapierConfig = (): void => {
  // Check for environment variable
  const envWebhookUrl = import.meta.env.VITE_ZAPIER_WEBHOOK_URL;
  
  // If environment variable exists, use it and store in localStorage
  if (envWebhookUrl) {
    localStorage.setItem(ZAPIER_WEBHOOK_STORAGE_KEY, envWebhookUrl);
    console.log(`[${new Date().toISOString()}] Zapier webhook URL initialized from env var`);
  }
};

/**
 * Get the configured Zapier webhook URL
 * @returns The webhook URL from localStorage or default if not found
 */
export const getZapierWebhookUrl = (): string => {
  const storedUrl = localStorage.getItem(ZAPIER_WEBHOOK_STORAGE_KEY);
  return storedUrl || DEFAULT_WEBHOOK_URL;
};

/**
 * Set a custom Zapier webhook URL
 * @param url The webhook URL to store
 */
export const setZapierWebhookUrl = (url: string): void => {
  if (!url) return;
  localStorage.setItem(ZAPIER_WEBHOOK_STORAGE_KEY, url);
  console.log(`[${new Date().toISOString()}] Zapier webhook URL updated manually`);
};
