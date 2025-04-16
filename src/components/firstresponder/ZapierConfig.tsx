
import React, { useEffect } from "react";

interface ZapierConfigProps {
  hidden?: boolean;
}

const ZapierConfig: React.FC<ZapierConfigProps> = ({ hidden = false }) => {
  useEffect(() => {
    // First, try to get the webhook URL from environment variables (ideal method)
    const envWebhookUrl = import.meta.env.VITE_ZAPIER_WEBHOOK_URL;
    
    // If environment variable exists, use it
    if (envWebhookUrl) {
      localStorage.setItem("zapier_webhook_url", envWebhookUrl);
    }
  }, []);

  return null;
};

export default ZapierConfig;
