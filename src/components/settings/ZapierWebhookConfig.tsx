import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Updated to include alternative investments
const WEBHOOK_TYPES = [
  { id: 'crm', label: 'CRM Integration' },
  { id: 'consultation', label: 'Consultation Scheduling' },
  { id: 'solo401k', label: 'Solo 401k Applications' },
  { id: 'llc', label: 'LLC Applications' },
  { id: 'first_responder', label: 'First Responder Applications' },
  { id: 'alternative_investments', label: 'Alternative Investment Applications' }
] as const;

type WebhookType = typeof WEBHOOK_TYPES[number]['id'];

const ZapierWebhookConfig: React.FC = () => {
  const [webhookType, setWebhookType] = useState<WebhookType>('crm');
  const [webhookUrl, setWebhookUrl] = useState("");
  const { toast } = useToast();

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
      // Save the webhook URL with its specific type
      localStorage.setItem(`zapier_${webhookType}_webhook_url`, webhookUrl);
      
      toast({
        title: "Success",
        description: `${WEBHOOK_TYPES.find(type => type.id === webhookType)?.label} webhook URL has been saved`,
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

  useEffect(() => {
    // Load current webhook URL for the selected type on component mount or type change
    const storedUrl = localStorage.getItem(`zapier_${webhookType}_webhook_url`) || "";
    setWebhookUrl(storedUrl);
  }, [webhookType]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Zapier Webhook Configuration</CardTitle>
        <CardDescription>
          Configure webhook URLs for different form submission types
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Webhook Type</Label>
          <Select 
            value={webhookType} 
            onValueChange={(value: WebhookType) => setWebhookType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select webhook type" />
            </SelectTrigger>
            <SelectContent>
              {WEBHOOK_TYPES.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="webhook-url">Zapier Webhook URL</Label>
          <Input
            id="webhook-url"
            placeholder="https://hooks.zapier.com/hooks/catch/your-webhook-id/"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
          />
          <p className="text-sm text-gray-500">
            Enter the webhook URL from your Zapier zap for the selected integration type.
          </p>
        </div>
        <Button onClick={handleSave}>Save Webhook URL</Button>
      </CardContent>
    </Card>
  );
};

export default ZapierWebhookConfig;
