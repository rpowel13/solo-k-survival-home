
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { 
  getZapierWebhookUrl, 
  isWebhookConfigured, 
  validateZapierWebhook, 
  initZapierConfig 
} from "@/services/zapierConfigService";

export const useWebhookStatus = () => {
  const [validateWebhook, setValidateWebhook] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<'unconfigured' | 'configured' | 'unknown'>('unknown');
  const [lastTestedTime, setLastTestedTime] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string>("");
  
  useEffect(() => {
    const webhookTypes = ['crm', 'consultation', 'solo401k', 'llc', 'first_responder'];
    webhookTypes.forEach(type => initZapierConfig(type as any));
    
    const currentUrl = getZapierWebhookUrl('crm');
    setWebhookUrl(currentUrl);
    
    const isConfigured = isWebhookConfigured('crm');
    setWebhookStatus(isConfigured ? 'configured' : 'unconfigured');
    
    const consolidateWebhookConfigs = () => {
      if (!isConfigured) {
        for (const type of webhookTypes) {
          const otherUrl = localStorage.getItem(`zapier_${type}_webhook_url`);
          if (otherUrl && otherUrl !== "https://hooks.zapier.com/hooks/catch/your-webhook-id/") {
            console.log(`[${new Date().toISOString()}] Found configured webhook for ${type}, using it for CRM`);
            localStorage.setItem('zapier_crm_webhook_url', otherUrl);
            setWebhookUrl(otherUrl);
            setWebhookStatus('configured');
            break;
          }
        }
      } 
      else {
        for (const type of webhookTypes) {
          const typeUrl = localStorage.getItem(`zapier_${type}_webhook_url`);
          if (!typeUrl || typeUrl === "https://hooks.zapier.com/hooks/catch/your-webhook-id/") {
            console.log(`[${new Date().toISOString()}] Sharing CRM webhook URL with ${type}`);
            localStorage.setItem(`zapier_${type}_webhook_url`, currentUrl);
          }
        }
      }
    };
    
    consolidateWebhookConfigs();
  }, []);
  
  const handleValidateWebhook = async () => {
    setValidateWebhook(true);
    
    try {
      const result = await validateZapierWebhook('crm');
      
      if (result.success) {
        toast({
          title: "Webhook Test Successful",
          description: "Test data was sent to your CRM webhook. Check your Zapier account to confirm it was received.",
        });
        setLastTestedTime(new Date().toLocaleTimeString());
      } else {
        toast({
          title: "Webhook Test Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error testing webhook:", error);
      toast({
        title: "Webhook Test Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    }
    
    setTimeout(() => setValidateWebhook(false), 1000);
  };

  return {
    validateWebhook,
    webhookStatus,
    lastTestedTime,
    webhookUrl,
    handleValidateWebhook
  };
};
