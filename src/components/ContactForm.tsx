
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, defaultValues, ContactFormValues } from "./contact/ContactFormSchema";
import FallbackContactForm from "./contact/FallbackContactForm";
import { testSupabaseConnection, logSupabaseInfo, insertTestContact } from "@/services/debugService";
import { useToast } from "@/components/ui/use-toast";
import ZapierConfig from "@/components/common/ZapierConfig";
import { getZapierWebhookUrl, isWebhookConfigured, initZapierConfig, validateZapierWebhook } from "@/services/zapierConfigService";

const ContactForm = () => {
  const { toast } = useToast();
  
  // Perform diagnostic tests on mount
  useEffect(() => {
    console.log(`[${new Date().toISOString()}] ContactForm component mounted`);
    
    // Initialize Zapier configuration with a forced update
    initZapierConfig('crm');
    
    // Check webhook configuration
    const crmWebhookUrl = localStorage.getItem('zapier_crm_webhook_url');
    const isConfigured = isWebhookConfigured('crm');
    
    console.log(`[${new Date().toISOString()}] CRM webhook is configured: ${isConfigured}`);
    console.log(`[${new Date().toISOString()}] CRM webhook URL: ${crmWebhookUrl}`);
    
    if (!isConfigured) {
      console.warn(`[${new Date().toISOString()}] CRM webhook is not configured. Form submissions may not be processed correctly.`);
      toast({
        title: "Zapier Integration Not Configured",
        description: "The CRM integration is not fully configured. Your form will still be submitted to our database.",
        duration: 8000
      });
    } else {
      // If configured, verify it's working with a test ping
      const testZapierConnection = async () => {
        try {
          const validationResult = await validateZapierWebhook('crm');
          if (!validationResult.success) {
            console.warn(`[${new Date().toISOString()}] Zapier webhook validation failed: ${validationResult.message}`);
          } else {
            console.log(`[${new Date().toISOString()}] Zapier webhook validation successful`);
          }
        } catch (error) {
          console.error(`[${new Date().toISOString()}] Error validating Zapier webhook:`, error);
        }
      };
      
      testZapierConnection();
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
  
  // Initialize the form with validation
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  return (
    <div className="relative">
      {/* Initialize Zapier configuration using the common component with validateWebhook=false */}
      <ZapierConfig webhookType="crm" validateWebhook={false} />
      <FallbackContactForm form={form} />
    </div>
  );
};

export default ContactForm;
