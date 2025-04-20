
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { setZapierWebhookUrl, getZapierWebhookUrl, WebhookType, validateZapierWebhook } from "@/services/zapierConfigService";
import { AlertCircle, Check } from "lucide-react";

const WEBHOOK_TYPES = [
  { id: 'crm', label: 'CRM Integration' },
  { id: 'consultation', label: 'Consultation Scheduling' },
  { id: 'solo401k', label: 'Solo 401k Applications' },
  { id: 'llc', label: 'LLC Applications' },
  { id: 'first_responder', label: 'First Responder Applications' },
  { id: 'first_responder_401k', label: 'First Responder 401k Applications' },
  { id: 'first_responder_llc', label: 'First Responder LLC Applications' },
  { id: 'alternative_investments', label: 'Alternative Investment Applications' },
  { id: 'prequalification', label: 'Prequalification Quiz' }
] as const;

type WebhookTypeOption = typeof WEBHOOK_TYPES[number]['id'];

const ZapierWebhookConfig: React.FC = () => {
  const [webhookType, setWebhookType] = useState<WebhookTypeOption>('crm');
  const [webhookUrl, setWebhookUrl] = useState("");
  const [updateAllWebhooks, setUpdateAllWebhooks] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
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
      // Save the webhook URL and optionally update all other webhooks
      setZapierWebhookUrl(webhookUrl, webhookType as WebhookType, updateAllWebhooks);
      
      toast({
        title: "Success",
        description: updateAllWebhooks 
          ? "Webhook URL has been saved for all integration types" 
          : `${WEBHOOK_TYPES.find(type => type.id === webhookType)?.label} webhook URL has been saved`,
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

  const handleValidate = async () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter a webhook URL to validate",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    try {
      // First save the webhook URL
      setZapierWebhookUrl(webhookUrl, webhookType as WebhookType, updateAllWebhooks);
      
      // Then validate it
      const result = await validateZapierWebhook(webhookType as WebhookType);
      
      if (result.success) {
        toast({
          title: "Validation Successful",
          description: "A test ping was sent to your webhook. Check your Zapier account to confirm it was received.",
        });
      } else {
        toast({
          title: "Validation Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error validating webhook:", error);
      toast({
        title: "Error",
        description: "Failed to validate the webhook",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    const storedUrl = getZapierWebhookUrl(webhookType as WebhookType);
    setWebhookUrl(storedUrl === "https://hooks.zapier.com/hooks/catch/your-webhook-id/" ? "" : storedUrl);
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
            onValueChange={(value: WebhookTypeOption) => setWebhookType(value)}
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
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="update-all" 
            checked={updateAllWebhooks} 
            onCheckedChange={(checked) => setUpdateAllWebhooks(checked === true)}
          />
          <Label 
            htmlFor="update-all" 
            className="text-sm font-normal cursor-pointer"
          >
            Use this URL for all webhook types (recommended)
          </Label>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleSave} className="flex-1">
            <Check className="mr-2 h-4 w-4" />
            Save Webhook URL
          </Button>
          <Button 
            onClick={handleValidate} 
            variant="outline" 
            disabled={isValidating}
            className="flex-1"
          >
            {isValidating 
              ? <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-b-transparent rounded-full"></div>
                  Testing...
                </div>
              : <div className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Validate Connection
                </div>
            }
          </Button>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-md mt-4">
          <p className="text-sm text-gray-600">
            <strong>Pro Tip:</strong> Using the same webhook URL for all integration types simplifies your setup. 
            You can use the same zap in Zapier and create different paths based on the form type that's included in the data.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZapierWebhookConfig;
