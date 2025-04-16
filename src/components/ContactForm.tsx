
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, defaultValues, ContactFormValues } from "./contact/ContactFormSchema";
import FallbackContactForm from "./contact/FallbackContactForm";

const ContactForm = () => {
  // Always use our form - VCita iframe is completely disabled
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  return (
    <div className="relative">
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
