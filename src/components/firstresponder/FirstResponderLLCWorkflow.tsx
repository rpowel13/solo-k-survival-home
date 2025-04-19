
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { formSchema as llcFormSchema } from '@/components/llc/FormSchema';
import { supabase } from '@/integrations/supabase/client';
import { triggerZapierWebhook } from '@/services/zapierService';
import { getZapierWebhookUrl, isWebhookConfigured } from '@/services/zapierConfigService';
import PersonalInfoFields from '@/components/llc/PersonalInfoFields';
import AddressFields from '@/components/llc/AddressFields';
import BusinessInfoFields from '@/components/llc/BusinessInfoFields';
import AdditionalInfoFields from '@/components/llc/AdditionalInfoFields';
import ZapierConfig from '@/components/firstresponder/ZapierConfig';

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

  return (
    <div className="space-y-8">
      {/* Add ZapierConfig component to initialize webhook */}
      <ZapierConfig validateWebhook={true} />
      
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
              "Submit First Responder LLC Application"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FirstResponderLLCWorkflow;
