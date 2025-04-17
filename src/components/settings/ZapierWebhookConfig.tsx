
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getZapierWebhookUrl, setZapierWebhookUrl } from "@/services/zapierConfigService";

/**
 * Component for configuring Zapier webhook URL
 * Can be shown in an admin/settings area
 */
const ZapierWebhookConfig: React.FC = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Load current webhook URL on component mount
    setWebhookUrl(getZapierWebhookUrl());
  }, []);

  const handleSave = () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter a valid webhook URL",
        variant: "destructive",
      });
      return;
    }

    try {
      // Save the webhook URL
      setZapierWebhookUrl(webhookUrl);
      
      toast({
        title: "Success",
        description: "Zapier webhook URL has been saved",
      });
    } catch (error) {
      console.error("Error saving webhook URL:", error);
      toast({
        title: "Error",
        description: "Failed to save the webhook URL",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>CRM Integration Settings</CardTitle>
        <CardDescription>
          Configure your Zapier webhook URL to connect form submissions to your CRM
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="webhook-url">Zapier Webhook URL</Label>
          <Input
            id="webhook-url"
            placeholder="https://hooks.zapier.com/hooks/catch/your-webhook-id/"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
          />
          <p className="text-sm text-gray-500">
            Enter the webhook URL from your Zapier zap that connects to your CRM system.
          </p>
        </div>
        <Button onClick={handleSave}>Save Webhook URL</Button>
      </CardContent>
    </Card>
  );
};

export default ZapierWebhookConfig;
