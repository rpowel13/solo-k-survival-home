
import { useEffect } from 'react';
import { getZapierWebhookUrl, isWebhookConfigured, WebhookType } from '@/services/zapierConfigService';
import { useToast } from '@/hooks/use-toast';

interface ZapierConfigProps {
  webhookType?: WebhookType;
}

const ZapierConfig = ({ webhookType = 'solo401k' }: ZapierConfigProps) => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if Zapier webhook is configured
    const webhookConfigured = isWebhookConfigured(webhookType);
    console.log(`[${new Date().toISOString()}] ${webhookType} Zapier webhook configured: ${webhookConfigured}`);
    
    const webhookUrl = getZapierWebhookUrl(webhookType);
    console.log(`[${new Date().toISOString()}] Current ${webhookType} Zapier webhook URL: ${webhookUrl}`);
    
    // Only show warning toast if we're not on the settings page
    if (!webhookConfigured && !window.location.pathname.includes('/admin/')) {
      toast({
        title: "Zapier Webhook Not Configured",
        description: `The ${webhookType} webhook is not configured, applications may not be properly processed in the CRM system.`,
        variant: "default",
        duration: 5000,
      });
    }
  }, [toast, webhookType]);
  
  // Component doesn't render anything visible
  return null;
};

export default ZapierConfig;
