import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, defaultValues, ContactFormValues } from "./contact/ContactFormSchema";
import FallbackContactForm from "./contact/FallbackContactForm";
import { testSupabaseConnection, logSupabaseInfo, insertTestContact } from "@/services/debugService";
import { useToast } from "@/components/ui/use-toast";
import ZapierConfig from "@/components/common/ZapierConfig";
import { getWebhookUrl, isWebhookConfigured, initWebhook, validateWebhook } from "@/services/zapier";

const ContactForm = () => {
  const { toast } = useToast();
  
  // Perform diagnostic tests on mount
  useEffect(() => {
    console.log(`[${new Date().toISOString()}] ContactForm component mounted`);
    
    // Initialize all webhook types to ensure cross-sharing
    const webhookTypes = ['crm', 'consultation', 'solo401k', 'llc', 'first_responder'];
    webhookTypes.forEach(type => initWebhook(type as any));
    
    // Check webhook configuration
    const isConfigured = isWebhookConfigured('crm');
    const webhookUrl = getWebhookUrl('crm');
    
    console.log(`[${new Date().toISOString()}] CRM webhook is configured: ${isConfigured}`);
    console.log(`[${new Date().toISOString()}] CRM webhook URL: ${webhookUrl}`);
    
    if (!isConfigured) {
      console.warn(`[${new Date().toISOString()}] CRM webhook is not configured. Form submissions may not be processed correctly.`);
      
      // Search for any configured webhook and use it as a fallback
      let fallbackFound = false;
      for (const type of webhookTypes.filter(t => t !== 'crm')) {
        const otherUrl = localStorage.getItem(`zapier_${type}_webhook_url`);
        if (otherUrl && otherUrl !== 'https://hooks.zapier.com/hooks/catch/your-webhook-id/') {
          console.log(`[${new Date().toISOString()}] Found configured webhook for ${type}, using it as fallback for CRM`);
          localStorage.setItem('zapier_crm_webhook_url', otherUrl);
          fallbackFound = true;
          break;
        }
      }
      
      if (!fallbackFound) {
        toast({
          title: "Zapier Integration Not Configured",
          description: "The CRM integration is not fully configured. Your form will still be submitted to our database.",
          duration: 8000
        });
      } else {
        // If we found a fallback, validate it
        const testZapierConnection = async () => {
          try {
            const validationResult = await validateWebhook('crm');
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
    } else {
      // If configured, verify it's working with a test ping
      const testZapierConnection = async () => {
        try {
          const validationResult = await validateWebhook('crm');
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
