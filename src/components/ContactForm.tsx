
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { submitContactForm } from "@/services/vcitaService";
import { contactFormSchema, defaultValues, ContactFormValues } from "./contact/ContactFormSchema";
import NameField from "./contact/NameField";
import EmailField from "./contact/EmailField";
import PhoneField from "./contact/PhoneField";
import SubjectField from "./contact/SubjectField";
import MessageField from "./contact/MessageField";
import ConsentField from "./contact/ConsentField";
import SubmitButton from "./contact/SubmitButton";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    console.log("Form submitted with data:", data);
    
    try {
      const result = await submitContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        consent: data.consent
      });
      
      if (result.success) {
        toast({
          title: "Message sent successfully",
          description: result.message || "We'll get back to you as soon as possible.",
        });
        
        form.reset();
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast({
        title: "Error sending message",
        description: error instanceof Error 
          ? error.message 
          : "Please try again or contact us directly at (833) 224-5517.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIframeError = () => {
    console.error("Failed to load vCita iframe");
    setIframeError(true);
  };

  // If we're showing the iframe-based contact form
  if (!iframeError) {
    return (
      <div className="w-full">
        <iframe 
          src="https://www.vcita.com/widgets/contact_form/izk040b42jnjcf3c?frontage_iframe=true&v=3&show_consent_checkbox=true&consent_checkbox_text=By+clicking+submit,+I+consent+to+join+the+email+list+and+receive+SMS+from+Survival+401k,+with+access+to+latest+offers+and+services.+Message+and+data+rates+may+apply." 
          width="100%" 
          height="700" 
          scrolling="no" 
          frameBorder="0" 
          onError={handleIframeError}
          title="Contact Form"
          className="w-full min-h-[700px]"
        >
          <p>Please contact me via my contact form at vcita:</p>
          <a href='https://www.vcita.com/v/izk040b42jnjcf3c/contact?frontage_iframe=true&invite=vr_cf_pb-izk040b42jnjcf3c'>
            Contact Form for Survival 401k, LLC
          </a>
        </iframe>
      </div>
    );
  }

  // Fallback to our custom form if iframe fails
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {iframeError && (
          <div className="p-4 mb-4 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-amber-700 text-sm">
              The contact widget could not be loaded. You can still use this form to send us a message.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NameField form={form} />
          <EmailField form={form} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PhoneField form={form} />
          <SubjectField form={form} />
        </div>
        
        <MessageField form={form} />
        <ConsentField form={form} />
        
        <SubmitButton isSubmitting={isSubmitting} />
        
        <p className="text-xs text-gray-500 text-center mt-2">
          Your information is secure and will never be shared with third parties.
        </p>
      </form>
    </Form>
  );
};

export default ContactForm;
