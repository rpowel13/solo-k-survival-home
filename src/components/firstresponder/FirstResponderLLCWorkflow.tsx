import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, DollarSign } from 'lucide-react';
import { formSchema as llcFormSchema } from '@/components/llc/FormSchema';
import { supabase } from '@/integrations/supabase/client';
import { triggerZapierWebhook } from '@/services/zapierService';
import { getZapierWebhookUrl, isWebhookConfigured } from '@/services/zapierConfigService';
import PersonalInfoFields from '@/components/llc/PersonalInfoFields';
import AddressFields from '@/components/llc/AddressFields';
import BusinessInfoFields from '@/components/llc/BusinessInfoFields';
import AdditionalInfoFields from '@/components/llc/AdditionalInfoFields';
import ZapierConfig from '@/components/firstresponder/ZapierConfig';
import FirstResponderLLCForm from './FirstResponderLLCForm';

interface FirstResponderLLCWorkflowProps {
  onComplete: () => void;
}

// Create interface for the LLC form values to match the component expectations
interface LLCFormProps {
  form: ReturnType<typeof useForm<z.infer<typeof llcFormSchema>>>;
}

const FirstResponderLLCWorkflow: React.FC<FirstResponderLLCWorkflowProps> = ({ onComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const onLLCSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      console.log(`[${new Date().toISOString()}] First Responder LLC Form Data:`, data);
      
      // Check if Zapier webhook is configured
      const isZapierConfigured = isWebhookConfigured('first_responder');
      console.log(`[${new Date().toISOString()}] First Responder Zapier webhook configured: ${isZapierConfigured}`);
      
      if (isZapierConfigured) {
        // Prepare Zapier data
        const zapierData = {
          ...data,
          formType: 'First_Responder_LLC',
          occupation: 'First Responder',
          department: data.businessPurpose || 'Not specified',
          yearsOfService: 'Not specified',
        };
        
        console.log(`[${new Date().toISOString()}] Sending LLC data to First Responder Zapier webhook:`, zapierData);
        
        // Send to Zapier
        await triggerZapierWebhook(zapierData);
      }
      
      // Store application data in sessionStorage for payment process
      sessionStorage.setItem('first_responder_llc_application', JSON.stringify({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        applicationDate: new Date().toISOString(),
        llcName: data.desiredLLCName,
        state: data.state
      }));
      
      toast({
        title: "Success",
        description: "Your First Responder LLC application has been submitted.",
      });

      // Add a small delay before redirecting to ensure toast is seen
      setTimeout(() => {
        console.log(`[${new Date().toISOString()}] Redirecting to payment page...`);
        onComplete();
      }, 1500);
    } catch (error) {
      console.error('Error submitting First Responder LLC application:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use type casting to ensure compatibility with component props
  const typedLLCForm = llcForm as unknown as LLCFormProps['form'];

  const PricingSection = () => {
    return (
      <div className="mt-6 bg-gray-100 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <DollarSign className="h-6 w-6 text-finance-600 mr-2" />
          <h3 className="text-2xl font-bold text-survival-800">Package Price</h3>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold">
            <span className="text-survival-700">First Responder LLC:</span> $699.00
          </p>
          <p className="text-sm text-gray-600">
            This service includes complete LLC formation with special benefits for first responders.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Add ZapierConfig component to initialize webhook */}
      <ZapierConfig validateWebhook={true} />
      
      <FirstResponderLLCForm 
        form={typedLLCForm}
        isSubmitting={isSubmitting}
        onSubmit={llcForm.handleSubmit(onLLCSubmit)}
        pricingComponent={<PricingSection />}
      />
    </div>
  );
};

export default FirstResponderLLCWorkflow;
