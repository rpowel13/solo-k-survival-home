import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { getWebhookUrl, isWebhookConfigured, initWebhook } from "@/services/zapier";

interface WebhookStatusProps {
  webhookStatus: 'unconfigured' | 'configured' | 'unknown';
  lastTestedTime: string | null;
  onValidateWebhook: () => void;
  webhookUrl: string;
}

const WebhookStatus: React.FC<WebhookStatusProps> = ({
  webhookStatus: initialStatus,
  lastTestedTime,
  onValidateWebhook,
  webhookUrl: initialUrl
}) => {
  const [webhookUrl, setWebhookUrl] = useState(initialUrl);
  const [status, setStatus] = useState<'configured' | 'unconfigured' | 'unknown'>(
    initialStatus || 'unknown'
  );

  useEffect(() => {
    const webhookTypes = ['crm', 'consultation', 'solo401k', 'llc', 'first_responder'];
    webhookTypes.forEach(type => initWebhook(type as any));
    
    const checkWebhookStatus = () => {
      const currentUrl = getWebhookUrl('crm');
      setWebhookUrl(currentUrl);
      
      const isConfigured = currentUrl !== "https://hooks.zapier.com/hooks/catch/your-webhook-id/";
      setStatus(isConfigured ? 'configured' : 'unconfigured');

      if (!isConfigured) {
        for (const type of webhookTypes) {
          const otherUrl = localStorage.getItem(`zapier_${type}_webhook_url`);
          if (otherUrl && otherUrl !== "https://hooks.zapier.com/hooks/catch/your-webhook-id/") {
            localStorage.setItem('zapier_crm_webhook_url', otherUrl);
            setWebhookUrl(otherUrl);
            setStatus('configured');
            break;
          }
        }
      }
    };
    
    checkWebhookStatus();
    
    const interval = setInterval(checkWebhookStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  const effectiveStatus = status === 'configured' ? 'configured' : 'unconfigured';

  return (
    <div className="fixed bottom-4 left-4 z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F1F0FB] rounded-full opacity-50 hover:opacity-80 hover:cursor-pointer transition-opacity" onClick={onValidateWebhook}>
        <span className="text-xs font-medium text-gray-500">CRM Webhook:</span>
        {effectiveStatus === 'configured' ? (
          <span className="flex items-center text-green-600">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Configured
          </span>
        ) : effectiveStatus === 'unconfigured' ? (
          <span className="flex items-center text-red-600">
            <XCircle className="h-3 w-3 mr-1" /> Not Configured
          </span>
        ) : (
          <span className="text-gray-500">Checking...</span>
        )}
      </div>
    </div>
  );
};

export default WebhookStatus;
