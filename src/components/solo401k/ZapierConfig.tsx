
import { useEffect } from 'react';
import { getZapierWebhookUrl, isWebhookConfigured } from '@/services/zapierConfigService';
import { useToast } from '@/components/ui/use-toast';

const ZapierConfig = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if Zapier webhook is configured
    const webhookConfigured = isWebhookConfigured('solo401k');
    console.log(`[${new Date().toISOString()}] Solo401k Zapier webhook configured: ${webhookConfigured}`);
    
    const webhookUrl = getZapierWebhookUrl('solo401k');
    console.log(`[${new Date().toISOString()}] Current Solo401k Zapier webhook URL: ${webhookUrl}`);
    
    // Only show warning toast if we're not on the settings page
    if (!webhookConfigured && !window.location.pathname.includes('/admin/')) {
      toast({
        title: "Zapier Webhook Not Configured",
        description: "The Solo401k webhook is not configured, applications may not be properly processed in the CRM system.",
        variant: "warning",
        duration: 5000,
      });
    }
  }, [toast]);
  
  // Component doesn't render anything visible
  return null;
};

export default ZapierConfig;
