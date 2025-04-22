
import React from "react";
import CommonZapierConfig from "@/components/common/ZapierConfig";
import type { WebhookType } from "@/services/zapierConfigService";

interface ZapierConfigProps {
  hidden?: boolean;
  validateWebhook?: boolean;
  skipTestPayload?: boolean;
}

const ZapierConfig: React.FC<ZapierConfigProps> = ({ 
  hidden = false,
  validateWebhook = false,
  skipTestPayload = true // Default to skipping test payload
}) => {
  return (
    <CommonZapierConfig
      webhookType={"first_responder" as WebhookType}
      validateWebhook={validateWebhook}
      hidden={hidden}
      skipTestPayload={skipTestPayload}
    />
  );
};

export default ZapierConfig;
