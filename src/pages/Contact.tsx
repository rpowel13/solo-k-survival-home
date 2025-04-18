import React, { useState, useEffect } from "react";
import { Mail, Phone, MessageSquare, Calendar, CheckCircle2, XCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import ContactForm from "@/components/ContactForm";
import ScheduleConsultationForm from "@/components/ScheduleConsultationForm";
import { testSupabaseConnection, logSupabaseInfo, insertTestContact } from "@/services/debugService";
import { useToast } from "@/components/ui/use-toast";
import { getZapierWebhookUrl, validateZapierWebhook } from "@/services/zapierConfigService";
import ZapierConfig from "@/components/common/ZapierConfig";

const Contact = () => {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [validateWebhook, setValidateWebhook] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<'unconfigured' | 'configured' | 'unknown'>('unknown');
  const [lastTestedTime, setLastTestedTime] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Run comprehensive diagnostics on page load
    console.log(`[${new Date().toISOString()}] Contact page mounted, running comprehensive diagnostics`);
    logSupabaseInfo();
    
    // Check webhook configuration
    const crmWebhookUrl = localStorage.getItem('zapier_crm_webhook_url');
    const defaultUrl = 'https://hooks.zapier.com/hooks/catch/your-webhook-id/';
    
    if (!crmWebhookUrl || crmWebhookUrl === defaultUrl) {
      setWebhookStatus('unconfigured');
      console.warn(`[${new Date().toISOString()}] CRM webhook is not configured`);
    } else {
      setWebhookStatus('configured');
      console.log(`[${new Date().toISOString()}] CRM webhook is configured: ${crmWebhookUrl}`);
    }
    
    // Test Supabase connection on page load
    const runDiagnostics = async () => {
      // Test connection
      const connectionResult = await testSupabaseConnection();
      
      if (!connectionResult.success) {
        console.error(`[${new Date().toISOString()}] Supabase connection test failed on Contact page load:`, connectionResult.error);
        
        // Check for RLS policy issues
        if (connectionResult.error?.message?.includes('new row violates row-level security policy')) {
          toast({
            title: "Database Permission Issue",
            description: "Row Level Security is preventing data insertion. This is a configuration issue that needs to be addressed in Supabase.",
            variant: "destructive",
            duration: 10000
          });
        } else {
          toast({
            title: "Database Connection Issue",
            description: "There may be an issue connecting to our database. Your message will still be received through backup systems.",
            variant: "destructive",
            duration: 5000
          });
        }
      } else {
        console.log(`[${new Date().toISOString()}] Supabase connection test successful on Contact page load`);
      }
      
      // Attempt a direct insert as a final test
      const insertResult = await insertTestContact();
      if (insertResult.success) {
        console.log(`[${new Date().toISOString()}] Direct test insert successful on page load`);
      } else {
        console.error(`[${new Date().toISOString()}] Direct test insert failed on page load:`, insertResult.error);
      }
    };
    
    runDiagnostics();
  }, [toast]);
  
  const handleValidateWebhook = async () => {
    setValidateWebhook(true);
    
    try {
      const result = await validateZapierWebhook('crm');
      
      if (result.success) {
        toast({
          title: "Webhook Test Successful",
          description: "Test data was sent to your CRM webhook. Check your Zapier account to confirm it was received.",
        });
        setLastTestedTime(new Date().toLocaleTimeString());
      } else {
        toast({
          title: "Webhook Test Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error testing webhook:", error);
      toast({
        title: "Webhook Test Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    }
    
    // Reset after a timeout to allow for re-validation
    setTimeout(() => setValidateWebhook(false), 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 text-center mb-12">
              Have questions about Solo 401(k) plans? Our retirement specialists are here to help.
            </p>

            {/* Zapier Webhook Status & Validation */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-3">
                <span className="text-sm font-medium">CRM Webhook Status:</span>
                {webhookStatus === 'configured' ? (
                  <span className="flex items-center text-green-600">
                    <CheckCircle2 className="h-4 w-4 mr-1" /> Configured
                  </span>
                ) : webhookStatus === 'unconfigured' ? (
                  <span className="flex items-center text-red-600">
                    <XCircle className="h-4 w-4 mr-1" /> Not Configured
                  </span>
                ) : (
                  <span className="text-gray-500">Checking...</span>
                )}
              </div>
              
              <div className="flex flex-col items-center gap-2 mb-6">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleValidateWebhook}
                  disabled={webhookStatus !== 'configured'}
                >
                  Test CRM Webhook
                </Button>
                
                {lastTestedTime && (
                  <span className="text-xs text-gray-500">
                    Last tested: {lastTestedTime}
                  </span>
                )}
              </div>
              
              {webhookStatus === 'unconfigured' && (
                <div className="text-sm text-red-500 max-w-md mx-auto mb-6 p-3 bg-red-50 rounded-md border border-red-200">
                  <p className="font-medium mb-1">Webhook Not Configured</p>
                  <p>
                    Zapier webhook is not configured. Form submissions may not be processed correctly. 
                    Please configure it in the <a href="/admin/zapier-settings" className="underline">Settings</a> page.
                  </p>
                  <p className="mt-2 text-xs">
                    Current webhook URL: {getZapierWebhookUrl('crm')}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Reach Out to Us</CardTitle>
                  <CardDescription>We're available to assist you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-3 text-survival-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-gray-600">(833) 224-5517</p>
                        <p className="text-sm text-gray-500 mt-1">Monday-Friday, 9am-6pm CT</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-3 text-survival-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-gray-600">info@survival401k.com</p>
                        <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-3 text-survival-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Schedule a Call</h3>
                        <p className="text-gray-600">Book a free consultation</p>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-survival-600 mt-1" 
                          onClick={() => setIsSchedulerOpen(true)}
                        >
                          Choose a time →
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Send a Message</CardTitle>
                  <CardDescription>Get in touch with our team</CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-8">
              <h2 className="text-2xl font-semibold mb-4">Schedule a Consultation</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                Want to discuss your retirement planning options in detail? Schedule a free 30-minute consultation with one of our Solo 401(k) specialists.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white"
                onClick={() => setIsSchedulerOpen(true)}
              >
                Book a Free Consultation
              </Button>
              
              <Dialog open={isSchedulerOpen} onOpenChange={setIsSchedulerOpen}>
                <DialogContent 
                  className="sm:max-w-[700px] md:max-w-[800px] p-6 z-50" 
                >
                  <DialogHeader>
                    <DialogTitle>Schedule a Free Consultation</DialogTitle>
                    <DialogDescription>Select a date and time that works for you. Our specialist will call you at the scheduled time.</DialogDescription>
                  </DialogHeader>
                  <ScheduleConsultationForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      <ZapierConfig webhookType="crm" validateWebhook={validateWebhook} />
    </div>
  );
};

export default Contact;
