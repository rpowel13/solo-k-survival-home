
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
      ssn: '',
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
    }
  });

  const onSubmit = async (values: LLCFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log(`[${new Date().toISOString()}] Submitting LLC application:`, values);
      
      const formData = {
        ...values,
        formType: 'LLC_Formation',
        // Explicitly include all fields to ensure they're sent to Zapier
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        ssn: values.ssn,
        street: values.street,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
        desiredLLCName: values.desiredLLCName,
        alternativeName1: values.alternativeName1 || '',
        alternativeName2: values.alternativeName2 || '',
        memberCount: values.memberCount,
        businessPurpose: values.businessPurpose,
        additionalInfo: values.additionalInfo || '',
        agreeToTerms: values.agreeToTerms
      };
      
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
      
      const emailResult = await triggerZapierWebhook(formData);
      
      if (emailResult.success) {
        toast({
          title: "Application Submitted",
          description: "We've received your LLC formation application and notification sent to our team. Please proceed to payment.",
        });
        
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
      <ZapierConfig validateWebhook={true} />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
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
                  <h2 className="text-xl font-semibold text-survival-800">Additional Information</h2>
                  <AdditionalInfoFields form={form} />
                </div>
                
                <SubmitButton isSubmitting={isSubmitting} />
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LLCApplication;
