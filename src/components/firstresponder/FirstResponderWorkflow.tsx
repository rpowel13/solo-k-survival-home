
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { formSchema as llcFormSchema } from '@/components/llc/FormSchema';
import { formSchema as solo401kFormSchema } from '@/components/solo401k/FormSchema';
import { triggerZapierWebhook } from '@/services/zapierService';
import { isWebhookConfigured } from '@/services/zapier';
import ZapierConfig from '@/components/firstresponder/ZapierConfig';
import FirstResponderLLCForm from './FirstResponderLLCForm';
import FirstResponder401kForm from './FirstResponder401kForm';
import { Step, LLCFormProps, Solo401kFormProps } from './types';

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
      console.log(`[${new Date().toISOString()}] LLC Form Data:`, data);
      
      if (isWebhookConfigured('first_responder')) {
        const zapierData = {
          ...data,
          formType: 'First_Responder_Package',
          occupation: 'First Responder',
          department: 'To be provided',
          yearsOfService: 'To be provided',
          verify401kInterest: true
        };
        
        await triggerZapierWebhook(zapierData);
      }
      
      const tempLLCData = {
        id: crypto.randomUUID(),
        ...data,
        is_first_responder: true,
      };
      
      setLlcData(tempLLCData);
      
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
        title: "LLC Information Saved",
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
      console.log(`[${new Date().toISOString()}] 401k Form Data:`, data);
      
      const combinedData = {
        llc: llcData,
        solo401k: data
      };
      
      if (isWebhookConfigured('first_responder')) {
        const zapierData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          occupation: 'First Responder',
          department: data.businessType || 'Not specified',
          yearsOfService: '1+',
          desiredLLCName: data.businessName,
          state: data.state,
          additionalInfo: data.additionalInfo || '',
          verify401kInterest: true,
          formType: 'First_Responder_Package',
          businessName: data.businessName,
          ssn: data.ssn,
          businessType: data.businessType,
          annualIncome: data.annualIncome
        };
        
        await triggerZapierWebhook(zapierData);
      }
      
      sessionStorage.setItem('first_responder_application', JSON.stringify({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        applicationDate: new Date().toISOString(),
        llcName: llcData.desiredLLCName,
        state: data.state
      }));

      toast({
        title: "Success",
        description: "Your First Responder Package applications have been submitted.",
      });

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

  const typedLLCForm = llcForm as unknown as LLCFormProps['form'];
  const typedSolo401kForm = solo401kForm as unknown as Solo401kFormProps['form'];

  return (
    <div className="space-y-8">
      <ZapierConfig validateWebhook={true} />
      
      {currentStep === 'llc' ? (
        <FirstResponderLLCForm 
          form={typedLLCForm}
          isSubmitting={isSubmitting}
          onSubmit={llcForm.handleSubmit(onLLCSubmit)}
        />
      ) : (
        <FirstResponder401kForm
          form={typedSolo401kForm}
          isSubmitting={isSubmitting}
          onSubmit={solo401kForm.handleSubmit(on401kSubmit)}
          onBack={() => setCurrentStep('llc')}
        />
      )}
    </div>
  );
};

export default FirstResponderWorkflow;
