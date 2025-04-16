
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
      // Explicitly log submission attempt
      console.log(`[${new Date().toISOString()}] ATTEMPTING SUPABASE SUBMISSION`);
      
      // Submit data to Supabase first as the primary method
      const supabaseResult = await submitContactForm(data);
      console.log(`[${new Date().toISOString()}] Supabase submission result:`, supabaseResult);
      
      if (!supabaseResult.success) {
        console.error(`[${new Date().toISOString()}] Supabase submission error:`, supabaseResult.error);
      }
      
      // Log Supabase result details for debugging
      console.log(`[${new Date().toISOString()}] SUPABASE SUBMISSION COMPLETED`, {
        success: supabaseResult.success,
        id: supabaseResult.id || "no-id",
        error: supabaseResult.error || "no-error",
        timestamp: new Date().toISOString()
      });
      
      // Try Zapier as secondary backup
      let zapierResult = { success: false, message: "Zapier not attempted" };
      try {
        console.log(`[${new Date().toISOString()}] Attempting Zapier submission as backup`);
        zapierResult = await triggerZapierWebhook(data);
        console.log(`[${new Date().toISOString()}] Zapier submission result:`, zapierResult);
      } catch (zapierError) {
        console.error(`[${new Date().toISOString()}] Zapier submission error:`, zapierError);
        // Continue execution even if Zapier fails
      }
      
      // Check if at least one submission was successful
      if (supabaseResult.success || zapierResult.success) {
        console.log(`[${new Date().toISOString()}] At least one submission method succeeded`);
        toast({
          title: "Message sent successfully",
          description: "We'll get back to you as soon as possible.",
        });
        
        form.reset();
      } else {
        // If both failed, throw an error to be caught by the catch block
        console.error(`[${new Date().toISOString()}] All submission methods failed`);
        throw new Error(supabaseResult.error?.message || zapierResult.message || "Failed to send message");
      }
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Contact form submission error:`, error);
      console.error('Error stringify:', JSON.stringify(error, null, 2));
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack available');
      
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
