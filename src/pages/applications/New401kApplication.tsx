
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, SoloFormValues } from '@/components/solo401k/FormSchema';
import { Form } from "@/components/ui/form";
import PersonalInfoFields from '@/components/solo401k/PersonalInfoFields';
import BusinessInfoFields from '@/components/solo401k/BusinessInfoFields';
import PlanInfoFields from '@/components/solo401k/PlanInfoFields';
import AddressFields from '@/components/solo401k/AddressFields';
import Solo401kAgreementSection from '@/components/solo401k/Solo401kAgreementSection';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ZapierConfig from '@/components/common/ZapierConfig';
import { triggerZapierWebhook } from '@/services/zapierService';
import { submitSolo401kApplication } from '@/services/supabaseFormService';

const New401kApplication = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [webhookInitialized, setWebhookInitialized] = React.useState(false);
  
  // Initialize Zapier webhook on component mount
  useEffect(() => {
    console.log(`[${new Date().toISOString()}] Initializing Solo 401k Zapier webhook`);
    setWebhookInitialized(true);
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
      businessType: "sole_proprietorship",
      annualIncome: "under_50k",
      trustee1Name: "",
      trustee2Name: "",
      participant1Name: "",
      participant2Name: "",
      agreeToTerms: false
    }
  });

  const onSubmit = async (data: SoloFormValues) => {
    setIsSubmitting(true);
    try {
      // Add detailed logging for debugging
      console.log(`[${new Date().toISOString()}] Starting Solo 401k form submission process`);
      console.log(`[${new Date().toISOString()}] Form data:`, JSON.stringify(data, null, 2));
      
      // Enhanced form data structure with explicit type marker
      const formData = {
        ...data,
        formType: 'Solo401k',
        submissionTimestamp: new Date().toISOString(),
        source: window.location.href,
        webhookInitialized: webhookInitialized
      };
      
      // Submit to both Zapier and Supabase in parallel for redundancy
      console.log(`[${new Date().toISOString()}] Starting parallel submission to Zapier and Supabase`);
      
      const zapierPromise = triggerZapierWebhook(formData);
      const supabasePromise = submitSolo401kApplication(data);
      
      const [zapierResult, supabaseResult] = await Promise.allSettled([zapierPromise, supabasePromise]);
      
      console.log(`[${new Date().toISOString()}] Zapier webhook result:`, 
        zapierResult.status === 'fulfilled' ? zapierResult.value : 'Rejected');
      console.log(`[${new Date().toISOString()}] Supabase submission result:`, 
        supabaseResult.status === 'fulfilled' ? supabaseResult.value : 'Rejected');
      
      const zapierSuccess = zapierResult.status === 'fulfilled' && zapierResult.value.success;
      const supabaseSuccess = supabaseResult.status === 'fulfilled' && 
        supabaseResult.value && supabaseResult.value.success;
      
      if (!zapierSuccess && !supabaseSuccess) {
        throw new Error("Both Zapier and Supabase submissions failed");
      }
      
      // Store application data for payment process
      const applicationData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        applicationDate: new Date().toISOString(),
        submissionId: Math.random().toString(36).substring(2, 15)
      };
      
      console.log(`[${new Date().toISOString()}] Storing application data for payment:`, applicationData);
      sessionStorage.setItem('solo401k_application', JSON.stringify(applicationData));
      
      toast({
        title: "Application Submitted",
        description: "Your Solo 401k application has been submitted successfully. Redirecting to payment...",
      });
      
      // Redirect to payment page after a short delay
      console.log(`[${new Date().toISOString()}] Redirecting to payment page`);
      setTimeout(() => {
        navigate('/payment/solo-401k');
      }, 1500);
      
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Application submission error:`, error);
      toast({
        title: "Submission Error",
        description: "There was a problem processing your application. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Use the common ZapierConfig component with explicit webhook type */}
      <ZapierConfig 
        validateWebhook={true}
        webhookType="solo401k"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
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
      </div>
    </div>
  );
};

export default New401kApplication;
