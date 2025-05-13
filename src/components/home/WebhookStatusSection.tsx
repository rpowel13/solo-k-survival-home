
import React from "react";
import WebhookStatus from "@/components/contact-page/WebhookStatus";
import ZapierConfig from "@/components/common/ZapierConfig";

interface WebhookStatusSectionProps {
  webhookStatus: 'unconfigured' | 'configured' | 'unknown';
  lastTestedTime: string | null;
  webhookUrl: string;
  validateWebhook: boolean;
  onValidateWebhook: () => void;
}

const WebhookStatusSection: React.FC<WebhookStatusSectionProps> = React.memo(({
  webhookStatus,
  lastTestedTime,
  webhookUrl,
  validateWebhook,
  onValidateWebhook
}) => {
  return (
    <>
      <WebhookStatus 
        webhookStatus={webhookStatus}
        lastTestedTime={lastTestedTime}
        onValidateWebhook={onValidateWebhook}
        webhookUrl={webhookUrl}
      />
      
      <ZapierConfig webhookType="crm" validateWebhook={validateWebhook} />
    </>
  );
});

WebhookStatusSection.displayName = 'WebhookStatusSection';

export default WebhookStatusSection;
