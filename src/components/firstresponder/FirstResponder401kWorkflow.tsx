
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, DollarSign } from 'lucide-react';
import { formSchema as solo401kFormSchema } from '@/components/solo401k/FormSchema';
import { supabase } from '@/integrations/supabase/client';
import { triggerZapierWebhook } from '@/services/zapierService';
import { getWebhookUrl, isWebhookConfigured } from '@/services/zapier';
import PersonalInfoFields from '@/components/solo401k/PersonalInfoFields';
import AddressFields from '@/components/solo401k/AddressFields';
import BusinessInfoFields from '@/components/solo401k/BusinessInfoFields';
import PlanInfoFields from '@/components/solo401k/PlanInfoFields';
import ZapierConfig from '@/components/firstresponder/ZapierConfig';
import FirstResponder401kForm from './FirstResponder401kForm';

interface FirstResponder401kWorkflowProps {
  onComplete: () => void;
}

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
      
      const isZapierConfigured = isWebhookConfigured('first_responder');
      console.log(`[${new Date().toISOString()}] First Responder Zapier webhook configured: ${isZapierConfigured}`);
      
      if (isZapierConfigured) {
        const zapierData = {
          ...data,
          formType: 'First_Responder_401k',
          occupation: 'First Responder',
          department: data.businessType || 'Not specified',
          yearsOfService: 'Not specified',
        };
        
        console.log(`[${new Date().toISOString()}] Sending 401k data to First Responder Zapier webhook:`, zapierData);
        
        await triggerZapierWebhook(zapierData);
      }
      
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

  const handleBack = () => {
    toast({
      title: "Navigation",
      description: "This is a standalone form. Please use browser navigation to go back.",
    });
  };

  const typedSolo401kForm = solo401kForm as unknown as Solo401kFormProps['form'];

  return (
    <div className="space-y-8">
      <ZapierConfig validateWebhook={true} />
      
      <FirstResponder401kForm
        form={typedSolo401kForm}
        isSubmitting={isSubmitting}
        onSubmit={solo401kForm.handleSubmit(on401kSubmit)}
        onBack={handleBack}
      />
    </div>
  );
};

export default FirstResponder401kWorkflow;
