
import React from "react";
import CommonZapierConfig from "@/components/common/ZapierConfig";
import { WebhookType } from "@/services/zapierConfigService";

interface ZapierConfigProps {
  hidden?: boolean;
  validateWebhook?: boolean;
}

const ZapierConfig: React.FC<ZapierConfigProps> = ({ 
  hidden = false,
  validateWebhook = false
}) => {
  return (
    <CommonZapierConfig
      webhookType={"solo401k" as WebhookType}
      validateWebhook={validateWebhook}
      hidden={hidden}
    />
  );
};

export default ZapierConfig;
