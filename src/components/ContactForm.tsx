
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, defaultValues, ContactFormValues } from "./contact/ContactFormSchema";
import VCitaIframe from "./contact/VCitaIframe";
import FallbackContactForm from "./contact/FallbackContactForm";
import WooSenderConfig from "./contact/WooSenderConfig";
import ZapierConfig from "./contact/ZapierConfig";

const ContactForm = () => {
  // Start with iframeError as true to show the fallback form by default
  const [iframeError, setIframeError] = useState(true);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const handleIframeError = () => {
    setIframeError(true);
  };

  // Always use the fallback form for now until we fix the iframe
  return (
    <div className="relative">
      <WooSenderConfig />
      <ZapierConfig />
      <FallbackContactForm form={form} />
    </div>
  );
};

export default ContactForm;

declare global {
  interface Window {
    vcitaFormToSubmit: any;
  }
}
