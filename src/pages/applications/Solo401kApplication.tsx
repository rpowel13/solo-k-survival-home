
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Form } from "@/components/ui/form";
import { 
  formSchema, 
  SoloFormValues, 
  BusinessTypes, 
  IncomeRanges 
} from '@/components/solo401k/FormSchema';
import FormHeader from '@/components/solo401k/FormHeader';
import PersonalInfoFields from '@/components/solo401k/PersonalInfoFields';
import BusinessInfoFields from '@/components/solo401k/BusinessInfoFields';
import PlanInfoFields from '@/components/solo401k/PlanInfoFields';
import Solo401kAgreementSection from '@/components/solo401k/Solo401kAgreementSection';
import AddressFields from '@/components/solo401k/AddressFields';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { triggerZapierWebhook } from '@/services/zapierService';
import { submitSolo401kApplication } from '@/services/supabaseFormService';
import ZapierConfig from '@/components/solo401k/ZapierConfig';
import { getZapierWebhookUrl } from '@/services/zapier/webhookUrlManager';

const Solo401kApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Log webhook URL on component mount for debugging
    const webhookUrl = getZapierWebhookUrl('solo401k');
    console.log(`[${new Date().toISOString()}] Solo401k Application initialized with webhook URL: ${webhookUrl}`);
  }, []);
  
  const form = useForm<SoloFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      ssn: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      businessName: "",
      sponsorEin: "",
      businessType: BusinessTypes.SOLE_PROPRIETORSHIP,
      annualIncome: IncomeRanges.UNDER_50K,
      trustee1Name: "",
      trustee2Name: "",
      participant1Name: "",
      participant2Name: "",
      agreeToTerms: false
    }
  });

  const onSubmit = async (data: SoloFormValues) => {
    setIsSubmitting(true);
    console.log(`[${new Date().toISOString()}] Solo401k form submitted with data:`, JSON.stringify(data, null, 2));
    
    try {
      // Add explicit formType to ensure proper routing in Zapier service
      const formData = {
        ...data,
        formType: 'Solo401k'
      };
      
      // Save application data to session storage for payment page
      sessionStorage.setItem('solo401k_application', JSON.stringify({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        applicationDate: new Date().toISOString()
      }));
      
      // Get the webhook URL directly for direct submission
      const webhookUrl = getZapierWebhookUrl('solo401k');
      console.log(`[${new Date().toISOString()}] Submitting directly to Solo401k webhook: ${webhookUrl}`);
      
      // Submit to Zapier directly first with explicit logging for debugging
      try {
        const directResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
          credentials: 'omit',
          mode: 'no-cors'
        });
        
        console.log(`[${new Date().toISOString()}] Direct Zapier submission completed`);
      } catch (directError) {
        console.error(`[${new Date().toISOString()}] Direct Zapier submission error:`, directError);
      }
      
      // Submit to both Zapier service and Supabase in parallel for redundancy
      console.log(`[${new Date().toISOString()}] Submitting via Zapier service with formType: ${formData.formType}`);
      const zapierPromise = triggerZapierWebhook(formData);
      const supabasePromise = submitSolo401kApplication(data);
      
      const [zapierServiceResult, supabaseResult] = await Promise.allSettled([zapierPromise, supabasePromise]);
      
      const zapierSuccess = zapierServiceResult.status === 'fulfilled' && zapierServiceResult.value.success;
      const supabaseSuccess = supabaseResult.status === 'fulfilled' && supabaseResult.value.success;
      
      console.log(`[${new Date().toISOString()}] Zapier submission result:`, JSON.stringify(zapierServiceResult));
      console.log(`[${new Date().toISOString()}] Supabase submission result:`, JSON.stringify(supabaseResult));
      
      if (zapierSuccess || supabaseSuccess) {
        toast({
          title: "Application Submitted",
          description: "Your Solo 401k application has been submitted successfully. Redirecting to payment...",
        });
        
        setTimeout(() => {
          navigate('/payment/solo-401k');
        }, 1500);
      } else {
        let errorMessage = "Failed to submit application through any available method.";
        
        if (zapierServiceResult.status === 'fulfilled' && !zapierServiceResult.value.success) {
          errorMessage = zapierServiceResult.value.message;
        } else if (supabaseResult.status === 'fulfilled' && supabaseResult.value.error) {
          errorMessage = supabaseResult.value.error.message;
        }
        
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Solo401k application submission error:`, error);
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "There was a problem processing your application. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ZapierConfig webhookType="solo401k" validateWebhook={true} />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FormHeader />
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-survival-800">Personal Information</h2>
                  <PersonalInfoFields form={form} />
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-survival-800">Address Information</h2>
                  <AddressFields form={form} />
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-survival-800">Business Information</h2>
                  <BusinessInfoFields form={form} />
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-survival-800">Plan Details</h2>
                  <PlanInfoFields form={form} />
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-survival-800">Agreement</h2>
                  <Solo401kAgreementSection form={form} />
                </div>
                
                <div className="pt-4 text-center">
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">
                    By submitting this form, you'll be redirected to our payment page to complete your application.
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Solo401kApplication;
