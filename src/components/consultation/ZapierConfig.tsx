
import React from "react";
import CommonZapierConfig from "@/components/common/ZapierConfig";

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
      webhookType="consultation"
      validateWebhook={validateWebhook}
      hidden={hidden}
    />
  );
};

export default ZapierConfig;
