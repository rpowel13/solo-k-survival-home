
import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import CommonZapierConfig from "@/components/common/ZapierConfig";
import { WebhookType } from "@/services/zapierConfigService";

interface ZapierConfigProps {
  validateWebhook?: boolean;
  hidden?: boolean;
}

/**
 * Solo 401k specific Zapier webhook configuration
 * Wraps the common ZapierConfig component with Solo 401k specific settings
 */
const ZapierConfig: React.FC<ZapierConfigProps> = ({ 
  validateWebhook = false,
  hidden = false
}) => {
  const { toast } = useToast();

  useEffect(() => {
    console.log(`[${new Date().toISOString()}] Solo 401k Zapier Config mounted`);
    
    // Show a toast for developers in debug environment
    if (import.meta.env.DEV && !hidden) {
      toast({
        title: "Solo 401k Zapier Configuration",
        description: "The Solo 401k Zapier webhook is being initialized. Check console for details.",
        duration: 3000,
      });
    }
  }, [toast, hidden]);

  return (
    <CommonZapierConfig 
      webhookType="solo401k" as WebhookType
      validateWebhook={validateWebhook}
      hidden={hidden}
    />
  );
};

export default ZapierConfig;
