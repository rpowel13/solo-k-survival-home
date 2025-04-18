
import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WebhookStatusProps {
  webhookStatus: 'unconfigured' | 'configured' | 'unknown';
  lastTestedTime: string | null;
  onValidateWebhook: () => void;
  webhookUrl: string;
}

const WebhookStatus: React.FC<WebhookStatusProps> = ({
  webhookStatus,
  lastTestedTime,
  onValidateWebhook,
  webhookUrl
}) => {
  return (
    <div className="mb-8 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-3">
        <span className="text-sm font-medium">CRM Webhook Status:</span>
        {webhookStatus === 'configured' ? (
          <span className="flex items-center text-green-600">
            <CheckCircle2 className="h-4 w-4 mr-1" /> Configured
          </span>
        ) : webhookStatus === 'unconfigured' ? (
          <span className="flex items-center text-red-600">
            <XCircle className="h-4 w-4 mr-1" /> Not Configured
          </span>
        ) : (
          <span className="text-gray-500">Checking...</span>
        )}
      </div>
      
      <div className="flex flex-col items-center gap-2 mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onValidateWebhook}
          disabled={webhookStatus !== 'configured'}
        >
          Test CRM Webhook
        </Button>
        
        {lastTestedTime && (
          <span className="text-xs text-gray-500">
            Last tested: {lastTestedTime}
          </span>
        )}
      </div>
      
      {webhookStatus === 'unconfigured' && (
        <div className="text-sm text-red-500 max-w-md mx-auto mb-6 p-3 bg-red-50 rounded-md border border-red-200">
          <p className="font-medium mb-1">Webhook Not Configured</p>
          <p>
            Zapier webhook is not configured. Form submissions may not be processed correctly. 
            Please configure it in the <a href="/admin/zapier-settings" className="underline">Settings</a> page.
          </p>
          <p className="mt-2 text-xs">
            Current webhook URL: {webhookUrl}
          </p>
        </div>
      )}
    </div>
  );
};

export default WebhookStatus;
