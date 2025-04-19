
import { useEffect } from 'react';
import { 
  getZapierWebhookUrl, 
  isWebhookConfigured, 
  WebhookType,
  initZapierConfig 
} from '@/services/zapierConfigService';
import { useToast } from '@/hooks/use-toast';
import { testZapierWebhook } from '@/services/zapierService';

interface ZapierConfigProps {
  webhookType?: WebhookType;
}

const ZapierConfig = ({ webhookType = 'solo401k' }: ZapierConfigProps) => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize Zapier configuration
    console.log(`[${new Date().toISOString()}] Initializing Zapier webhook for ${webhookType}`);
    initZapierConfig(webhookType);
    
    // Check webhook configuration
    const webhookConfigured = isWebhookConfigured(webhookType);
    const webhookUrl = getZapierWebhookUrl(webhookType);
    
    console.log(`[${new Date().toISOString()}] ${webhookType} Zapier webhook configured: ${webhookConfigured}`);
    console.log(`[${new Date().toISOString()}] Current ${webhookType} Zapier webhook URL: ${webhookUrl || 'Not configured'}`);
    
    // Only show toast if not on admin settings page and webhook is not configured
    if (!webhookConfigured && !window.location.pathname.includes('/admin/')) {
      toast({
        title: "Zapier Webhook Configuration",
        description: `The ${webhookType} webhook is not configured. Please set it up in the Zapier Settings.`,
        variant: "default",
        duration: 5000,
      });
    }

    // Optional: Test webhook if configured
    if (webhookConfigured) {
      testZapierWebhook(webhookType)
        .then(result => {
          if (result.success) {
            console.log(`[${new Date().toISOString()}] Successful test ping for ${webhookType} webhook`);
          } else {
            console.warn(`[${new Date().toISOString()}] Test ping failed for ${webhookType} webhook`);
          }
        });
    }
  }, [toast, webhookType]);
  
  return null;
};

export default ZapierConfig;

