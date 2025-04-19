
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from '@/components/ui/use-toast';
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
import AdditionalInfoFields from '@/components/solo401k/AdditionalInfoFields';
import AgreementSection from '@/components/solo401k/AgreementSection';
import AddressFields from '@/components/solo401k/AddressFields';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { triggerZapierWebhook } from '@/services/zapierService';
import { submitSolo401kApplication } from '@/services/supabaseFormService';

const Solo401kApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<SoloFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      ssn: "",
      dateOfBirth: "",
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
      existingRetirement: false,
      additionalInfo: "",
      agreeToTerms: false
    }
  });

  const onSubmit = async (data: SoloFormValues) => {
    setIsSubmitting(true);
    console.log("Form submitted with data:", data);
    
    try {
      // Add formType to the data for proper identification
      const formData = {
        ...data,
        formType: 'Solo401k'
      };
      
      // Store application data in sessionStorage for payment process
      sessionStorage.setItem('solo401k_application', JSON.stringify({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        applicationDate: new Date().toISOString()
      }));
      
      // Primary submission to Zapier webhook
      const zapierResult = await triggerZapierWebhook(formData);
      
      // Secondary submission to Supabase
      const supabaseResult = await submitSolo401kApplication(data);
      
      // Check if at least one submission was successful
      if (zapierResult.success || supabaseResult.success) {
        toast({
          title: "Application Submitted",
          description: "Your Solo 401k application has been submitted successfully. Redirecting to payment...",
        });
        
        // Redirect to payment page after a short delay
        setTimeout(() => {
          navigate('/payment/solo-401k');
        }, 1500);
      } else {
        throw new Error(zapierResult.message || supabaseResult.error?.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Application submission error:", error);
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
    <div className="min-h-screen flex flex-col">
      <Header />
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
                  <h2 className="text-xl font-semibold text-survival-800">Additional Information</h2>
                  <AdditionalInfoFields form={form} />
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-survival-800">Agreement</h2>
                  <AgreementSection form={form} />
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
