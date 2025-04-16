
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, defaultValues, ContactFormValues } from "./contact/ContactFormSchema";
import VCitaIframe from "./contact/VCitaIframe";
import FallbackContactForm from "./contact/FallbackContactForm";

const ContactForm = () => {
  // Always show our form - VCita iframe is completely disabled now to ensure data is captured in Supabase
  const [iframeError, setIframeError] = useState(true);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const handleIframeError = () => {
    setIframeError(true);
  };

  return (
    <div className="relative">
      {iframeError ? (
        <FallbackContactForm form={form} />
      ) : (
        <VCitaIframe onError={handleIframeError} />
      )}
    </div>
  );
};

export default ContactForm;

declare global {
  interface Window {
    vcitaFormToSubmit: any;
  }
}
