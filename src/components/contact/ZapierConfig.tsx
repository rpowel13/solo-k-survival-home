
import React, { useEffect } from "react";

interface ZapierConfigProps {
  hidden?: boolean;
}

const ZapierConfig: React.FC<ZapierConfigProps> = ({ hidden = false }) => {
  // Initialize with a fixed Zapier webhook URL that connects to WooSender
  useEffect(() => {
    // Set the fixed Zapier webhook URL that connects to WooSender
    // This URL would be your actual Zapier webhook that connects to WooSender
    const fixedWebhookUrl = "https://hooks.zapier.com/hooks/catch/YOUR_ZAPPIER_HOOK_ID/";
    localStorage.setItem("zapier_webhook_url", fixedWebhookUrl);
  }, []);

  // Component doesn't render anything visible
  return null;
};

export default ZapierConfig;
