
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VCitaIframe from "@/components/contact/VCitaIframe";

const MessageCard: React.FC = () => {
  const handleIframeError = () => {
    console.error("Failed to load vCita iframe");
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Send a Message</CardTitle>
        <CardDescription>Get in touch with our team</CardDescription>
      </CardHeader>
      <CardContent>
        <VCitaIframe onError={handleIframeError} />
      </CardContent>
    </Card>
  );
};

export default MessageCard;
