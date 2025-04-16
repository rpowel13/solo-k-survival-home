
import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ContactFormValues } from "./ContactFormSchema";
import { submitContactForm } from "@/services/supabaseFormService";
import { submitToWooSender } from "@/services/wooSenderService";
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

interface FallbackContactFormProps {
  form: UseFormReturn<ContactFormValues>;
}

const FallbackContactForm: React.FC<FallbackContactFormProps> = ({ form }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    console.log(`[${new Date().toISOString()}] Form submitted with data:`, data);
    console.log(`[${new Date().toISOString()}] Supabase client status:`, supabase ? "Initialized" : "Not initialized");
    
    try {
      // Format the data for direct insertion
      const formattedData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject || null,
        message: data.message,
        opt_in: data.consent || false
      };
      
      console.log(`[${new Date().toISOString()}] Attempting direct Supabase insertion with data:`, formattedData);
      
      // Try direct submission to Supabase first
      const { data: insertResult, error: insertError } = await supabase
        .from('contacts')
        .insert(formattedData)
        .select();
        
      if (insertError) {
        console.error(`[${new Date().toISOString()}] Direct Supabase insertion failed:`, insertError);
        console.error('Error details:', JSON.stringify(insertError, null, 2));
        
        // Try fallback methods
        const supabaseResult = await submitContactForm(data);
        console.log(`[${new Date().toISOString()}] Fallback service submission result:`, supabaseResult);
        
        // Try Zapier as secondary backup
        let zapierResult = { success: false, message: "Zapier not attempted" };
        try {
          console.log(`[${new Date().toISOString()}] Attempting Zapier submission as backup`);
          zapierResult = await triggerZapierWebhook(data);
          console.log(`[${new Date().toISOString()}] Zapier submission result:`, zapierResult);
        } catch (zapierError) {
          console.error(`[${new Date().toISOString()}] Zapier submission error:`, zapierError);
        }
        
        // Check if at least one fallback method was successful
        if (supabaseResult.success || zapierResult.success) {
          console.log(`[${new Date().toISOString()}] At least one fallback submission method succeeded`);
          toast({
            title: "Message sent successfully",
            description: "We'll get back to you as soon as possible.",
          });
          
          form.reset();
        } else {
          throw new Error(insertError.message || supabaseResult.error?.message || "Failed to send message");
        }
      } else {
        console.log(`[${new Date().toISOString()}] Direct Supabase insertion successful:`, insertResult);
        toast({
          title: "Message sent successfully",
          description: "Your message has been received. We'll get back to you as soon as possible.",
        });
        
        form.reset();
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
  );
};

export default FallbackContactForm;
