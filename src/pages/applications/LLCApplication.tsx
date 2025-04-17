
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FormHeader from '@/components/llc/FormHeader';
import PersonalInfoFields from '@/components/llc/PersonalInfoFields';
import AddressFields from '@/components/llc/AddressFields';
import BusinessInfoFields from '@/components/llc/BusinessInfoFields';
import AdditionalInfoFields from '@/components/llc/AdditionalInfoFields';
import SubmitButton from '@/components/llc/SubmitButton';
import ZapierConfig from '@/components/llc/ZapierConfig';
import { formSchema, type LLCFormValues } from '@/components/llc/FormSchema';
import { triggerZapierWebhook } from '@/services/zapierService';

const LLCApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<LLCFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      desiredLLCName: '',
      alternativeName1: '',
      alternativeName2: '',
      memberCount: '',
      businessPurpose: '',
      additionalInfo: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (values: LLCFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Store application data in sessionStorage for payment process
      sessionStorage.setItem('llc_application', JSON.stringify({
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode
        },
        applicationDate: new Date().toISOString()
      }));
      
      // Send the form data via Zapier webhook
      const emailResult = await triggerZapierWebhook(values);
      
      if (emailResult.success) {
        toast({
          title: "Application Submitted",
          description: "We've received your LLC formation application and notification sent to our team. Please proceed to payment.",
        });
        
        // Redirect to payment page after a short delay
        setTimeout(() => {
          navigate('/payment/llc');
        }, 1500);
      } else {
        throw new Error(emailResult.message || "Failed to submit application");
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
      <ZapierConfig />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <FormHeader />

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
                <h2 className="text-xl font-semibold text-survival-800">Additional Information</h2>
                <AdditionalInfoFields form={form} />
              </div>
              
              <SubmitButton isSubmitting={isSubmitting} />
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LLCApplication;

