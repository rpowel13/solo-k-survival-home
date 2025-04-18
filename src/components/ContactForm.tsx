
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, defaultValues, ContactFormValues } from "./contact/ContactFormSchema";
import FallbackContactForm from "./contact/FallbackContactForm";
import { testSupabaseConnection, insertTestContact } from "@/services/debugService";
import { useToast } from "@/components/ui/use-toast";
import ZapierConfig from "@/components/common/ZapierConfig";

const ContactForm = () => {
  const { toast } = useToast();
  
  // Perform diagnostic tests on mount
  useEffect(() => {
    console.log(`[${new Date().toISOString()}] ContactForm component mounted`);
    
    // Check webhook configuration
    const crmWebhookUrl = localStorage.getItem('zapier_crm_webhook_url');
    if (!crmWebhookUrl || crmWebhookUrl === 'https://hooks.zapier.com/hooks/catch/your-webhook-id/') {
      console.warn(`[${new Date().toISOString()}] CRM webhook is not configured. Form submissions may not be processed correctly.`);
    } else {
      console.log(`[${new Date().toISOString()}] CRM webhook is configured: ${crmWebhookUrl}`);
    }
    
    const runDiagnostics = async () => {
      // Test the connection to Supabase
      const connectionResult = await testSupabaseConnection();
      
      if (!connectionResult.success) {
        console.error(`[${new Date().toISOString()}] Connection test failed:`, connectionResult.error);
        toast({
          title: "Database Connection Issue",
          description: connectionResult.message,
          variant: "destructive",
          duration: 10000
        });
      } else {
        console.log(`[${new Date().toISOString()}] Connection test successful`);
      }
      
      // Try a direct insert test
      const insertResult = await insertTestContact();
      
      if (!insertResult.success) {
        console.error(`[${new Date().toISOString()}] Direct insert test failed:`, insertResult.error);
        // Check for RLS policy errors
        if (insertResult.error?.message?.includes('new row violates row-level security policy')) {
          toast({
            title: "Database Permission Issue",
            description: "Row Level Security is preventing data insertion. Please check your Supabase configuration.",
            variant: "destructive",
            duration: 10000
          });
        }
      } else {
        console.log(`[${new Date().toISOString()}] Direct insert test successful`);
      }
    };
    
    runDiagnostics();
  }, [toast]);
  
  // Always use our form - VCita iframe is completely disabled
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  return (
    <div className="relative">
      {/* Initialize Zapier configuration using the common component */}
      <ZapierConfig webhookType="crm" />
      <FallbackContactForm form={form} />
    </div>
  );
};

export default ContactForm;
