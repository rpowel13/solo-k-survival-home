
import React, { useEffect } from "react";
import { initZapierConfig } from "@/services/zapierConfigService";

interface ZapierConfigProps {
  hidden?: boolean;
}

const ZapierConfig: React.FC<ZapierConfigProps> = ({ hidden = false }) => {
  useEffect(() => {
    // Initialize the correct webhook type for contact forms
    initZapierConfig('crm');
  }, []);

  return null;
};

export default ZapierConfig;
