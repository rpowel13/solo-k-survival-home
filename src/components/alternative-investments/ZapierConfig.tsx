
import React, { useEffect } from "react";
import { initWebhook } from "@/services/zapier";

interface ZapierConfigProps {
  hidden?: boolean;
}

const ZapierConfig: React.FC<ZapierConfigProps> = ({ hidden = false }) => {
  useEffect(() => {
    // Initialize the correct webhook type for alternative investments
    initWebhook('alternative_investments');
  }, []);

  return null;
};

export default ZapierConfig;
