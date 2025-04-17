
import React, { useEffect } from "react";
import { initZapierConfig } from "@/services/zapierConfigService";

interface ZapierConfigProps {
  hidden?: boolean;
}

/**
 * Handles Zapier webhook configuration initialization
 * This component should be mounted once on app startup or on forms
 * that need to ensure Zapier is configured
 */
const ZapierConfig: React.FC<ZapierConfigProps> = ({ hidden = false }) => {
  useEffect(() => {
    // Initialize Zapier configuration
    initZapierConfig();
  }, []);

  return null;
};

export default ZapierConfig;
