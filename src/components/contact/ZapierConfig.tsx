
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Cog } from "lucide-react";

const ZapierConfig: React.FC = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Load the saved webhook URL on component mount
  useEffect(() => {
    const savedUrl = localStorage.getItem("zapier_webhook_url");
    if (savedUrl) {
      setWebhookUrl(savedUrl);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("zapier_webhook_url", webhookUrl);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="absolute top-2 right-2">
          <Cog className="h-4 w-4" />
          <span className="sr-only">Zapier Webhook Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Zapier Webhook Configuration</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Zapier Webhook URL</Label>
            <Input
              id="webhookUrl"
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="Enter your Zapier webhook URL"
            />
            <p className="text-xs text-gray-500">
              This URL will be used to send contact form data to Zapier, which can then connect to WooSender.
              Create a Zap with a Webhook trigger and paste the webhook URL here.
            </p>
          </div>
          <Button onClick={handleSave}>Save Configuration</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZapierConfig;
