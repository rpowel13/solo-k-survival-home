
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { formSchema as solo401kFormSchema } from '@/components/solo401k/FormSchema';
import { supabase } from '@/integrations/supabase/client';
import { triggerZapierWebhook } from '@/services/zapierService';
import { getZapierWebhookUrl, isWebhookConfigured } from '@/services/zapierConfigService';
import PersonalInfoFields from '@/components/solo401k/PersonalInfoFields';
import AddressFields from '@/components/solo401k/AddressFields';
import BusinessInfoFields from '@/components/solo401k/BusinessInfoFields';
import PlanInfoFields from '@/components/solo401k/PlanInfoFields';
import ZapierConfig from '@/components/firstresponder/ZapierConfig';

interface FirstResponder401kWorkflowProps {
  onComplete: () => void;
}

// Create interface for the Solo 401k form values to match the component expectations
interface Solo401kFormProps {
  form: ReturnType<typeof useForm<z.infer<typeof solo401kFormSchema>>>;
}

const FirstResponder401kWorkflow: React.FC<FirstResponder401kWorkflowProps> = ({ onComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const on401kSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      console.log(`[${new Date().toISOString()}] First Responder 401k Form Data:`, data);
      
      // Check if Zapier webhook is configured
      const isZapierConfigured = isWebhookConfigured('first_responder');
      console.log(`[${new Date().toISOString()}] First Responder Zapier webhook configured: ${isZapierConfigured}`);
      
      if (isZapierConfigured) {
        // Prepare Zapier data
        const zapierData = {
          ...data,
          formType: 'First_Responder_401k',
          occupation: 'First Responder',
          department: data.businessType || 'Not specified',
          yearsOfService: 'Not specified',
        };
        
        console.log(`[${new Date().toISOString()}] Sending 401k data to First Responder Zapier webhook:`, zapierData);
        
        // Send to Zapier
        await triggerZapierWebhook(zapierData);
      }
      
      // Store application data in sessionStorage for payment process
      sessionStorage.setItem('first_responder_401k_application', JSON.stringify({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        applicationDate: new Date().toISOString(),
        businessName: data.businessName,
        state: data.state
      }));
      
      toast({
        title: "Success",
        description: "Your First Responder Solo 401k application has been submitted.",
      });

      // Add a small delay before redirecting to ensure toast is seen
      setTimeout(() => {
        console.log(`[${new Date().toISOString()}] Redirecting to payment page...`);
        onComplete();
      }, 1500);
    } catch (error) {
      console.error('Error submitting First Responder 401k application:', error);
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
  const typedSolo401kForm = solo401kForm as unknown as Solo401kFormProps['form'];

  return (
    <div className="space-y-8">
      {/* Add ZapierConfig component to initialize webhook */}
      <ZapierConfig validateWebhook={true} />
      
      <Form {...solo401kForm}>
        <form onSubmit={solo401kForm.handleSubmit(on401kSubmit)} className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-survival-800">Personal Information</h2>
            <PersonalInfoFields form={typedSolo401kForm} />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-survival-800">Address Information</h2>
            <AddressFields form={typedSolo401kForm} />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-survival-800">Business Information</h2>
            <BusinessInfoFields form={typedSolo401kForm} />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-survival-800">Plan Details</h2>
            <PlanInfoFields form={typedSolo401kForm} />
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
              "Submit First Responder Solo 401k Application"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FirstResponder401kWorkflow;
