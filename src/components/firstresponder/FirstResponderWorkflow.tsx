
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { formSchema as llcFormSchema } from '@/components/llc/FormSchema';
import { formSchema as solo401kFormSchema } from '@/components/solo401k/FormSchema';
import { supabase } from '@/integrations/supabase/client';
import PersonalInfoFields from '@/components/llc/PersonalInfoFields';
import AddressFields from '@/components/llc/AddressFields';
import BusinessInfoFields from '@/components/llc/BusinessInfoFields';
import AdditionalInfoFields from '@/components/llc/AdditionalInfoFields';
import Solo401kBusinessInfo from '@/components/solo401k/BusinessInfoFields';
import PlanInfoFields from '@/components/solo401k/PlanInfoFields';

type Step = 'llc' | '401k';

// Create interface for the LLC form values to match the component expectations
interface LLCFormProps {
  form: ReturnType<typeof useForm<z.infer<typeof llcFormSchema>>>;
}

const FirstResponderWorkflow = () => {
  const [currentStep, setCurrentStep] = useState<Step>('llc');
  const [llcData, setLlcData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const llcForm = useForm({
    resolver: zodResolver(llcFormSchema),
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
    }
  });

  const solo401kForm = useForm({
    resolver: zodResolver(solo401kFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      ssn: '',
      dateOfBirth: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      businessName: '',
      sponsorEin: '',
      businessType: '',
      annualIncome: '',
      trustee1Name: '',
      trustee2Name: '',
      participant1Name: '',
      participant2Name: '',
      existingRetirement: false,
      additionalInfo: '',
      agreeToTerms: false,
    }
  });

  const onLLCSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Submit LLC application
      const { data: llcApplication, error: llcError } = await supabase
        .from('llc_applications')
        .insert([
          {
            ...data,
            is_first_responder: true,
          }
        ])
        .select()
        .single();

      if (llcError) throw llcError;

      // Store LLC data and move to 401k step
      setLlcData(llcApplication);
      
      // Pre-fill 401k form with LLC data
      solo401kForm.reset({
        ...solo401kForm.getValues(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        businessName: data.desiredLLCName,
      });

      setCurrentStep('401k');
      
      toast({
        title: "LLC Application Submitted",
        description: "Please complete your Solo 401k application.",
      });
    } catch (error) {
      console.error('Error submitting LLC application:', error);
      toast({
        title: "Error",
        description: "Failed to submit LLC application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const on401kSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Submit 401k application with link to LLC application
      const { data: solo401kApplication, error: solo401kError } = await supabase
        .from('solo401k_applications')
        .insert([
          {
            ...data,
            linked_llc_application_id: llcData.id
          }
        ])
        .select()
        .single();

      if (solo401kError) throw solo401kError;

      toast({
        title: "Success",
        description: "Your First Responder Package applications have been submitted.",
      });

      // Redirect to payment page
      setTimeout(() => {
        navigate('/payment/first-responder');
      }, 1500);
    } catch (error) {
      console.error('Error submitting 401k application:', error);
      toast({
        title: "Error",
        description: "Failed to submit 401k application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use type casting to ensure compatibility with component props
  const typedLLCForm = llcForm as unknown as LLCFormProps['form'];

  return (
    <div className="space-y-8">
      {currentStep === 'llc' ? (
        <Form {...llcForm}>
          <form onSubmit={llcForm.handleSubmit(onLLCSubmit)} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-survival-800">Personal Information</h2>
              <PersonalInfoFields form={typedLLCForm} />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-survival-800">Address Information</h2>
              <AddressFields form={typedLLCForm} />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-survival-800">Business Information</h2>
              <BusinessInfoFields form={typedLLCForm} />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-survival-800">Additional Information</h2>
              <AdditionalInfoFields form={typedLLCForm} />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Continue to Solo 401k Application"
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...solo401kForm}>
          <form onSubmit={solo401kForm.handleSubmit(on401kSubmit)} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-survival-800">Solo 401k Details</h2>
              <Solo401kBusinessInfo form={solo401kForm} />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-survival-800">Plan Details</h2>
              <PlanInfoFields form={solo401kForm} />
            </div>

            <div className="flex gap-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setCurrentStep('llc')}
                disabled={isSubmitting}
              >
                Back to LLC Application
              </Button>
              
              <Button 
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit First Responder Package"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default FirstResponderWorkflow;
