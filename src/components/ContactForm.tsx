
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, defaultValues, ContactFormValues } from "./contact/ContactFormSchema";
import VCitaIframe from "./contact/VCitaIframe";
import FallbackContactForm from "./contact/FallbackContactForm";

const ContactForm = () => {
  const [iframeError, setIframeError] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const handleIframeError = () => {
    setIframeError(true);
  };

  if (!iframeError) {
    return <VCitaIframe onError={handleIframeError} />;
  }

  return <FallbackContactForm form={form} />;
};

export default ContactForm;

declare global {
  interface Window {
    vcitaFormToSubmit: any;
  }
}
