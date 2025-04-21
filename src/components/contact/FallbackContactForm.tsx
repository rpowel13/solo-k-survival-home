import React, { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ContactFormValues } from "./ContactFormSchema";
import { submitContactForm } from "@/services/supabaseFormService";
import { triggerZapierWebhook } from "@/services/zapierService";
import { UseFormReturn } from "react-hook-form";
import NameField from "./NameField";
import EmailField from "./EmailField";
import PhoneField from "./PhoneField";
import SubjectField from "./SubjectField";
import MessageField from "./MessageField";
import OptInCheckbox from "./OptInCheckbox";
import SubmitButton from "./SubmitButton";
import { supabase } from "@/integrations/supabase/client";
import { getZapierWebhookUrl, isWebhookConfigured, initZapierConfig } from "@/services/zapierConfigService";

interface FallbackContactFormProps {
  form: UseFormReturn<ContactFormValues>;
}

const FallbackContactForm: React.FC<FallbackContactFormProps> = ({ form }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zapierConfigured, setZapierConfigured] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Force initialization of all Zapier webhook types to ensure consistency across devices
    const initializeWebhooks = () => {
      console.log(`[${new Date().toISOString()}] ContactForm: Initializing all webhook types`);
      
      // Initialize all webhook types to ensure cross-sharing
      const webhookTypes = ['crm', 'consultation', 'solo401k', 'llc', 'first_responder'];
      webhookTypes.forEach(type => initZapierConfig(type as any));
      
      // Check if the CRM webhook is configured
      const isConfigured = isWebhookConfigured('crm');
      setZapierConfigured(isConfigured);
      
      console.log(`[${new Date().toISOString()}] ContactForm: CRM webhook configured: ${isConfigured}`);
      
      // Get and log the webhook URL 
      const webhookUrl = getZapierWebhookUrl('crm');
      console.log(`[${new Date().toISOString()}] ContactForm: Current CRM webhook URL: ${webhookUrl}`);
      
      // If not configured, try every possible webhook as a fallback
      if (!isConfigured) {
        for (const type of webhookTypes.filter(t => t !== 'crm')) {
          const otherUrl = localStorage.getItem(`zapier_${type}_webhook_url`);
          if (otherUrl && otherUrl !== 'https://hooks.zapier.com/hooks/catch/your-webhook-id/') {
            console.log(`[${new Date().toISOString()}] ContactForm: Using ${type} webhook URL for CRM: ${otherUrl}`);
            localStorage.setItem('zapier_crm_webhook_url', otherUrl);
            setZapierConfigured(true);
            break;
          }
        }
      }
    };
    
    // Run initialization immediately
    initializeWebhooks();
    
    // Also set up a periodic check to ensure webhook configuration stays updated
    const interval = setInterval(initializeWebhooks, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    console.log(`[${new Date().toISOString()}] Contact form submitted with data:`, data);
    
    try {
      // Force a recheck of webhook configuration before submission
      const isConfigured = isWebhookConfigured('crm');
      setZapierConfigured(isConfigured);
      console.log(`[${new Date().toISOString()}] Zapier CRM webhook configured: ${isConfigured}`);
      
      let zapierSuccess = false;
      if (isConfigured) {
        console.log(`[${new Date().toISOString()}] Sending form data to Zapier CRM webhook`);
        
        const zapierData = {
          ...data,
          formType: 'Contact',
          submissionDate: new Date().toISOString(),
          source: typeof window !== 'undefined' ? window.location.href : 'unknown'
        };
        
        console.log(`[${new Date().toISOString()}] Complete Zapier data being sent:`, zapierData);
        const zapierResult = await triggerZapierWebhook(zapierData);
        zapierSuccess = zapierResult.success;
        console.log(`[${new Date().toISOString()}] Zapier submission result:`, zapierResult);
        
        if (zapierSuccess) {
          console.log(`[${new Date().toISOString()}] Successfully sent to Zapier`);
        } else {
          console.warn(`[${new Date().toISOString()}] Failed to send to Zapier: ${zapierResult.message}`);
        }
      } else {
        console.warn(`[${new Date().toISOString()}] Zapier CRM webhook not configured, skipping Zapier submission`);
      }
      
      console.log(`[${new Date().toISOString()}] Attempting to store in Supabase`);
      
      const formattedData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject || null,
        message: data.message,
        opt_in: data.consent || false
      };
      
      console.log(`[${new Date().toISOString()}] Formatted data for Supabase:`, formattedData);
      
      const supabaseResult = await submitContactForm(data);
      console.log(`[${new Date().toISOString()}] Supabase submission result:`, supabaseResult);
      
      let supabaseSuccess = supabaseResult.success;
      
      if (!supabaseSuccess) {
        console.log(`[${new Date().toISOString()}] Service method failed, trying direct insertion`);
        
        try {
          const { data: insertResult, error: insertError } = await supabase
            .from('contacts')
            .insert(formattedData)
            .select();
            
          if (insertError) {
            console.error(`[${new Date().toISOString()}] Direct insertion failed:`, insertError);
            console.error('Error details:', JSON.stringify(insertError, null, 2));
          } else {
            console.log(`[${new Date().toISOString()}] Direct insertion successful:`, insertResult);
            supabaseSuccess = true;
          }
        } catch (directInsertError) {
          console.error(`[${new Date().toISOString()}] Exception during direct insertion:`, directInsertError);
        }
      }
      
      if (zapierSuccess && supabaseSuccess) {
        toast({
          title: "Message sent successfully",
          description: "Your message has been received in our CRM system and database.",
        });
        form.reset();
      } else if (zapierSuccess) {
        toast({
          title: "Message sent to CRM",
          description: "Your message has been received in our CRM system.",
        });
        form.reset();
      } else if (supabaseSuccess) {
        toast({
          title: "Message saved",
          description: "Your message has been saved to our database. We'll get back to you soon.",
        });
        form.reset();
      } else {
        throw new Error("Failed to send message through any channel");
      }
      
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Contact form submission error:`, error);
      console.error('Error stringify:', JSON.stringify(error, null, 2));
      
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NameField form={form} />
            <EmailField form={form} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PhoneField form={form} />
            <SubjectField form={form} />
          </div>
          
          <MessageField form={form} />
          
          <OptInCheckbox form={form} />
          
          <SubmitButton isSubmitting={isSubmitting} />
          
          <p className="text-xs text-gray-500 text-center mt-2">
            Your information is secure and will never be shared with third parties.
          </p>
        </form>
      </Form>
    </>
  );
};

export default FallbackContactForm;
