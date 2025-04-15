
import React, { useState, useEffect } from "react";
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
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [widgetError, setWidgetError] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  useEffect(() => {
    const loadWidget = () => {
      const script = document.createElement('script');
      script.src = "https://secure.vcita.com/widgets/api/vcita_widget.js";
      script.async = true;
      
      let timeoutId: number;
      
      const handleLoad = () => {
        clearTimeout(timeoutId);
        if (window.vcita_widgets) {
          try {
            window.vcita_widgets.init({
              business_id: "izk040b42jnjcf3c",
              widget_type: "Contact",
              api_integration: true,
              show_consent_checkbox: true,
              invitation_texts: { 
                consent_checkbox_text: "By clicking \"submit\", I consent to join the email list and receive SMS from Survival 401k, with access to latest offers and services. Message and data rates may apply. Message frequency varies. More details on this are in our Privacy Policy and Terms of Service. Text \"HELP\" for help or contact us at (833) 224-5517. Text \"STOP\" to cancel."
              },
              elementsIds: {
                widget: "vcita-contact-widget"
              }
            });
            setWidgetLoaded(true);
          } catch (error) {
            console.error("Error initializing vCita widget:", error);
            setWidgetError(true);
          }
        } else {
          setWidgetError(true);
        }
      };
      
      script.onload = handleLoad;
      script.onerror = () => {
        console.error("Failed to load vCita widget script");
        setWidgetError(true);
      };
      
      // Set a timeout to fall back to the form if widget doesn't load quickly
      timeoutId = window.setTimeout(() => {
        console.log("Widget load timeout - falling back to form");
        setWidgetError(true);
      }, 5000);
      
      document.body.appendChild(script);
      
      return () => {
        clearTimeout(timeoutId);
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    };
    
    loadWidget();
  }, []);

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

  if (widgetLoaded && !widgetError) {
    return <div id="vcita-contact-widget" className="w-full min-h-[500px]"></div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {widgetError && (
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
