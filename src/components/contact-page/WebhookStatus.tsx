
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
    <div className="fixed bottom-4 left-4 z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F1F0FB] rounded-full opacity-50 hover:opacity-70 transition-opacity">
        <span className="text-xs font-medium text-gray-500">CRM Webhook:</span>
        {webhookStatus === 'configured' ? (
          <span className="flex items-center text-green-600">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Configured
          </span>
        ) : webhookStatus === 'unconfigured' ? (
          <span className="flex items-center text-red-600">
            <XCircle className="h-3 w-3 mr-1" /> Not Configured
          </span>
        ) : (
          <span className="text-gray-500">Checking...</span>
        )}
      </div>
      
      {webhookStatus === 'configured' && (
        <div className="text-center mt-1">
          <Button 
            variant="ghost" 
            size="sm"  // Changed from "xs" to "sm"
            onClick={onValidateWebhook}
            className="text-[10px] text-gray-400 hover:text-gray-600"
          >
            Test Webhook
          </Button>
        </div>
      )}
    </div>
  );
};

export default WebhookStatus;

