
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
    console.log("Form submitted with data:", data);
    
    try {
      // Submit data to Supabase first to ensure database persistence
      const supabaseResult = await submitContactForm(data);
      console.log("Supabase submission result:", supabaseResult);
      
      if (!supabaseResult.success) {
        console.error("Supabase submission error:", supabaseResult.error);
      }
      
      // Secondary submission to WooSender through Zapier
      let zapierResult = { success: false, message: "" };
      try {
        zapierResult = await triggerZapierWebhook(data);
        console.log("Zapier submission result:", zapierResult);
      } catch (zapierError) {
        console.error("Zapier submission error:", zapierError);
        // Continue execution even if Zapier fails
      }
      
      // Check if at least one submission was successful
      if (supabaseResult.success || zapierResult.success) {
        toast({
          title: "Message sent successfully",
          description: "We'll get back to you as soon as possible.",
        });
        
        form.reset();
      } else {
        throw new Error(supabaseResult.error?.message || zapierResult.message || "Failed to send message");
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
