
import React, { useState } from "react";
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
import { getZapierWebhookUrl, isWebhookConfigured } from "@/services/zapierConfigService";

interface FallbackContactFormProps {
  form: UseFormReturn<ContactFormValues>;
}

const FallbackContactForm: React.FC<FallbackContactFormProps> = ({ form }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    console.log(`[${new Date().toISOString()}] Form submitted with data:`, data);
    
    try {
      // First attempt to send to Zapier if configured
      const isZapierConfigured = isWebhookConfigured('crm');
      console.log(`[${new Date().toISOString()}] Zapier CRM webhook configured: ${isZapierConfigured}`);
      
      let zapierSuccess = false;
      if (isZapierConfigured) {
        console.log(`[${new Date().toISOString()}] Sending form data to Zapier CRM webhook`);
        // Instead of adding formType directly, pass the appropriate object structure
        // that matches what zapierService expects
        const zapierResult = await triggerZapierWebhook({
          ...data,
          // We'll cast this properly in the service to handle the type correctly
          formType: 'Contact' as any
        });
        zapierSuccess = zapierResult.success;
        console.log(`[${new Date().toISOString()}] Zapier submission result:`, zapierResult);
      } else {
        console.warn(`[${new Date().toISOString()}] Zapier CRM webhook not configured, skipping Zapier submission`);
      }
      
      // Then try to store in Supabase database
      console.log(`[${new Date().toISOString()}] Attempting to store in Supabase`);
      
      // Format the data for insertion
      const formattedData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject || null,
        message: data.message,
        opt_in: data.consent || false
      };
      
      console.log(`[${new Date().toISOString()}] Formatted data for Supabase:`, formattedData);
      
      // First try the service method
      const supabaseResult = await submitContactForm(data);
      console.log(`[${new Date().toISOString()}] Supabase submission result:`, supabaseResult);
      
      // If service method failed, try direct insertion as fallback
      let supabaseSuccess = supabaseResult.success;
      
      if (!supabaseSuccess) {
        console.log(`[${new Date().toISOString()}] Service method failed, trying direct insertion`);
        
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
      }
      
      // Consider the submission successful if either Zapier or Supabase worked
      if (zapierSuccess || supabaseSuccess) {
        toast({
          title: "Message sent successfully",
          description: "Your message has been received. We'll get back to you as soon as possible.",
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
